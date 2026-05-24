// Production build for ube.dev.
//
// Local dev opens index.html directly and lets the browser compile JSX via
// @babel/standalone — zero tooling. This script is what GitHub Actions runs
// to pre-compile that same source into a minified bundle, swap React to its
// production build, and drop the Babel runtime so visitors don't pay for it.

import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { transform } from "esbuild"

// Files we don't ship to production: the in-page Tweaks panel + its hue
// picker UI exist only to iterate on design locally. app.jsx falls back to
// no-ops via `globalThis.X ??= ...` when these globals are absent, so prod
// renders with TWEAK_DEFAULTS baked in.
const DEV_ONLY_JSX_FILES = new Set([
  "dev/tweaks-panel.jsx",
  "dev/tweaks-config.jsx",
])

// Load order matches the <script> tags in index.html. Earlier files define
// globals (constants, helpers, components) that later ones reference.
const JSX_FILES = [
  "dev/tweaks-panel.jsx",
  "constants.jsx",
  "lib/analytics.jsx",
  "lib/assets.jsx",
  "lib/modal.jsx",
  "lib/palette.jsx",
  "dev/tweaks-config.jsx",
  "mockups/hero-pr.jsx",
  "mockups/hero-minimal.jsx",
  "mockups/hero-split.jsx",
  "mockups/intake.jsx",
  "mockups/triage.jsx",
  "mockups/fix.jsx",
  "mockups/report-success.jsx",
  "mockups/report-failure.jsx",
  "sections/wordmark.jsx",
  "sections/nav.jsx",
  "sections/footer.jsx",
  "sections/trusted-by.jsx",
  "sections/problems.jsx",
  "sections/benefits.jsx",
  "sections/faq.jsx",
  "sections/final-cta.jsx",
  "sections/hero.jsx",
  "modals/sources-modal.jsx",
  "modals/dedupe-modal.jsx",
  "modals/fix-loop-modal.jsx",
  "modals/request-access-modal.jsx",
  "sections/how-it-works.jsx",
  "app.jsx",
]

const DIST = "dist"

await rm(DIST, { recursive: true, force: true })
await mkdir(DIST, { recursive: true })

// --- JS bundle: concat → JSX transform → minify -----------------------------
let source = ""
for (const file of JSX_FILES) {
  if (DEV_ONLY_JSX_FILES.has(file)) continue
  source += `\n// ===== ${file} =====\n`
  source += await readFile(file, "utf8")
}
const js = await transform(source, {
  loader: "jsx",
  minify: true,
  target: "es2020",
  legalComments: "none",
})
await writeFile(join(DIST, "bundle.js"), js.code)

// --- CSS: minify ------------------------------------------------------------
const css = await readFile("styles.css", "utf8")
const cssOut = await transform(css, { loader: "css", minify: true })
await writeFile(join(DIST, "styles.css"), cssOut.code)

// --- index.html: rewrite for production -------------------------------------
// 1. Switch React/ReactDOM to .production.min.js
// 2. Drop @babel/standalone (no longer needed — JSX is pre-compiled)
// 3. Drop SRI integrity attrs (dev hashes don't match the prod URLs)
// 4. Replace the five <script type="text/babel"> tags with one bundle.js
let html = await readFile("index.html", "utf8")

html = html
  .replace("react.development.js", "react.production.min.js")
  .replace("react-dom.development.js", "react-dom.production.min.js")
  .replace(/\s+integrity="sha384-[^"]*"/g, "")
  .replace(
    /\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone[^>]*><\/script>\n?/,
    "\n",
  )
  .replace(
    /\s*<!-- Component scripts[^>]*-->\n(\s*<script type="text\/babel"[^>]*><\/script>\s*\n?)+/,
    '\n  <script src="bundle.js" defer></script>\n',
  )

await writeFile(join(DIST, "index.html"), html)

// --- Static assets ----------------------------------------------------------
await cp("assets", join(DIST, "assets"), { recursive: true })
await cp("maintainer", join(DIST, "maintainer"), { recursive: true })
await cp("CNAME", join(DIST, "CNAME"))

console.log(`✓ built ${DIST}/`)
