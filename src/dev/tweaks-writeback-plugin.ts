// Vite dev-server plugin: POST /__tweaks → rewrites the EDITMODE-marked
// region of src/data/tweak-defaults.ts on disk. Wired into Astro via
// `vite.plugins` in astro.config.mjs.
//
// Dev-only by construction:
//   - `apply: "serve"` makes Vite skip this plugin entirely during
//     `astro build` (no `configureServer` hook is registered, no
//     middleware exists in the production pipeline, no reference to
//     the plugin appears in the built bundle).
//   - The plugin's only side effect (the middleware) is registered
//     against Vite's *dev* connect instance, which simply does not
//     exist in the static build output (Astro emits HTML to `dist/`).
//
// Request shape:
//   POST /__tweaks
//   Content-Type: application/json
//   { "edits": { "<key>": <value>, ... } }   // partial TweakDefaults
//
// Response:
//   200 { "ok": true, "defaults": <full updated defaults object> }
//   400 { "ok": false, "error": "<message>" }   // bad request body
//   422 { "ok": false, "error": "<message>" }   // unknown key / bad value
//   500 { "ok": false, "error": "<message>" }   // I/O or parse failure
//
// Writeback strategy:
//   The plugin reads `src/data/tweak-defaults.ts`, locates the
//   `/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/` region with a regex,
//   parses the object literal between the markers, validates that
//   every `edits` key already exists in the parsed defaults (the panel
//   may not introduce new keys — that's a source change), then
//   serializes the merged object back out with the exact same
//   formatting style and writes the result. Everything outside the
//   marker pair (imports, type aliases, comments, trailing newline)
//   is preserved byte-for-byte by string-replacing only the matched
//   substring. Vite's file watcher picks up the change and HMR
//   propagates the new defaults to the page automatically.
//
// Concurrency: writes are serialized via an async mutex so two
// near-simultaneous POSTs (e.g. dragging a TweakRadio segment) can
// never interleave reads and writes against the file. Debouncing the
// *requests* lives on the client side; the server's job is just to
// be safe under whatever the client throws at it.

import { promises as fs } from "node:fs"
import type { IncomingMessage, ServerResponse } from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import type { Plugin } from "vite"

const ENDPOINT = "/__tweaks"
// Resolved at config-load time so the path is stable regardless of
// where Vite is launched from. The plugin file lives at
// `<root>/src/dev/tweaks-writeback-plugin.ts`; the target lives at
// `<root>/src/data/tweak-defaults.ts`.
const PLUGIN_DIR = path.dirname(fileURLToPath(import.meta.url))
const DEFAULTS_FILE = path.resolve(
  PLUGIN_DIR,
  "..",
  "data",
  "tweak-defaults.ts",
)

// Matches `/*EDITMODE-BEGIN*/<whitespace>{ ... }<whitespace>/*EDITMODE-END*/`.
// We greedily capture the object body (everything between `{` and `}`)
// and rewrite *only* that body. Leading/trailing whitespace inside the
// markers is preserved by capturing it in separate groups.
//
// The `s` flag lets `.` match newlines so the multi-line object body
// is captured by `([\s\S]*?)`-equivalent. We use `[\s\S]` explicitly
// for compatibility with environments where `s` is not available.
const EDITMODE_RE =
  /(\/\*EDITMODE-BEGIN\*\/)(\s*)\{([\s\S]*?)\}(\s*)(\/\*EDITMODE-END\*\/)/

type Edits = Record<string, unknown>

// Lightweight async mutex — serializes file writes under concurrent
// POSTs without pulling in a dependency.
let writeQueue: Promise<unknown> = Promise.resolve()
function serialize<T>(task: () => Promise<T>): Promise<T> {
  const next = writeQueue.then(task, task)
  // Swallow rejections on the queue itself so one failed write does
  // not poison subsequent writes; individual callers still see their
  // own rejection via the returned promise.
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  )
  return next
}

// Parse the object body captured between the EDITMODE markers. The
// body is a TypeScript object literal with string-valued fields and
// a trailing comma — we don't need a full TS parser, just enough to
// recover { key: "value", ... } pairs while ignoring whitespace and
// line comments. Returns null if anything looks off.
function parseDefaultsBody(body: string): Record<string, string> | null {
  const out: Record<string, string> = {}
  // Strip `//`-line comments so a comment inside the marker block
  // doesn't break parsing. Block comments would, but we don't expect
  // any in the EDITMODE region — keep this dumb on purpose.
  const stripped = body.replace(/\/\/[^\n]*\n/g, "\n")
  const pairRe = /(\w+)\s*:\s*"([^"]*)"\s*,?/g
  let m: RegExpExecArray | null
  // biome-ignore lint/suspicious/noAssignInExpressions: idiomatic regex.exec loop
  while ((m = pairRe.exec(stripped)) !== null) {
    const key = m[1]
    const val = m[2]
    if (typeof key !== "string" || typeof val !== "string") return null
    out[key] = val
  }
  return Object.keys(out).length > 0 ? out : null
}

// Serialize the defaults object back to the exact formatting used in
// `tweak-defaults.ts`:
//
//   {
//     accent: "lift",
//     ...
//   }
//
// — 2-space indent, double-quoted string values, trailing comma after
// each entry, opening `{` on the same line as the BEGIN marker (with a
// single space between), closing `}` on its own line before the END
// marker (with a single space between).
function serializeDefaultsBody(defaults: Record<string, string>): string {
  const lines = Object.entries(defaults).map(([k, v]) => `  ${k}: "${v}",`)
  // Leading "\n" + trailing "\n" so the captured group lands on its
  // own lines between `{` and `}` (matching the committed format).
  return `\n${lines.join("\n")}\n`
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString("utf8")
}

function sendJson(res: ServerResponse, status: number, payload: unknown): void {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader("Cache-Control", "no-store")
  res.end(JSON.stringify(payload))
}

async function handleWriteback(edits: Edits): Promise<Record<string, string>> {
  const original = await fs.readFile(DEFAULTS_FILE, "utf8")
  const match = EDITMODE_RE.exec(original)
  if (!match) {
    throw new Error(
      `EDITMODE markers not found in ${path.relative(process.cwd(), DEFAULTS_FILE)}`,
    )
  }
  const [fullMatch, beginMarker, leadingWs, body, trailingWs, endMarker] = match
  if (
    typeof fullMatch !== "string" ||
    typeof beginMarker !== "string" ||
    typeof leadingWs !== "string" ||
    typeof body !== "string" ||
    typeof trailingWs !== "string" ||
    typeof endMarker !== "string"
  ) {
    throw new Error("EDITMODE marker capture groups malformed")
  }
  const current = parseDefaultsBody(body)
  if (!current) {
    throw new Error("Failed to parse current EDITMODE defaults block")
  }
  // Validate: every key in `edits` must already exist in the file.
  // Adding new keys requires a real source edit (and a type update).
  // Values must be plain identifier-shaped strings — the serializer
  // wraps them in unescaped double quotes, so anything containing a
  // quote, backslash, or newline would break the file (and, worse,
  // could inject arbitrary syntax). The real TweakDefaults type only
  // ranges over string-literal unions of simple identifiers anyway,
  // so this is just enforcing what the type already constrains.
  const KEY_RE = /^[A-Za-z_][A-Za-z0-9_]*$/
  const VALUE_RE = /^[A-Za-z0-9_-]+$/
  for (const [k, v] of Object.entries(edits)) {
    if (!KEY_RE.test(k)) {
      const err = new Error(`Invalid tweak key: ${k}`)
      ;(err as Error & { status?: number }).status = 422
      throw err
    }
    if (!(k in current)) {
      const err = new Error(`Unknown tweak key: ${k}`)
      ;(err as Error & { status?: number }).status = 422
      throw err
    }
    if (typeof v !== "string") {
      const err = new Error(`Tweak value for "${k}" must be a string`)
      ;(err as Error & { status?: number }).status = 422
      throw err
    }
    if (!VALUE_RE.test(v)) {
      const err = new Error(
        `Tweak value for "${k}" must match /^[A-Za-z0-9_-]+$/`,
      )
      ;(err as Error & { status?: number }).status = 422
      throw err
    }
  }
  const merged: Record<string, string> = {
    ...current,
    ...(edits as Record<string, string>),
  }
  // No-op short-circuit: skip the write entirely if nothing changed,
  // so HMR doesn't fire spuriously on a request that doesn't move a
  // value (e.g. clicking the already-selected swatch).
  const changed = Object.keys(edits).some((k) => current[k] !== merged[k])
  if (!changed) return merged

  const newBody = serializeDefaultsBody(merged)
  const replacement = `${beginMarker}${leadingWs}{${newBody}}${trailingWs}${endMarker}`
  const next = original.replace(fullMatch, replacement)
  // Belt-and-braces: if our regex round-trip somehow lost data outside
  // the marker region, refuse to write rather than corrupting source.
  const beforeMarker = original.slice(0, match.index)
  const afterMarker = original.slice(match.index + fullMatch.length)
  if (!next.startsWith(beforeMarker) || !next.endsWith(afterMarker)) {
    throw new Error(
      "Refusing to write: content outside EDITMODE markers would change",
    )
  }
  await fs.writeFile(DEFAULTS_FILE, next, "utf8")
  return merged
}

export function tweaksWritebackPlugin(): Plugin {
  return {
    name: "ube:tweaks-writeback",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(ENDPOINT, async (req, res, next) => {
        if (req.method !== "POST") {
          next()
          return
        }
        try {
          const raw = await readBody(req)
          if (!raw) {
            sendJson(res, 400, { ok: false, error: "Empty request body" })
            return
          }
          let parsed: unknown
          try {
            parsed = JSON.parse(raw)
          } catch (_e) {
            sendJson(res, 400, { ok: false, error: "Invalid JSON body" })
            return
          }
          if (
            !parsed ||
            typeof parsed !== "object" ||
            !("edits" in parsed) ||
            typeof (parsed as { edits: unknown }).edits !== "object" ||
            (parsed as { edits: unknown }).edits === null
          ) {
            sendJson(res, 400, {
              ok: false,
              error: 'Request body must be { "edits": { ... } }',
            })
            return
          }
          const edits = (parsed as { edits: Edits }).edits
          const defaults = await serialize(() => handleWriteback(edits))
          sendJson(res, 200, { ok: true, defaults })
        } catch (err) {
          const status = (err as Error & { status?: number })?.status ?? 500
          const msg = err instanceof Error ? err.message : String(err)
          console.error("[ube:tweaks-writeback]", msg)
          sendJson(res, status, { ok: false, error: msg })
        }
      })
    },
  }
}
