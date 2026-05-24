// Production build for ube.dev.
//
// Local dev opens index.html directly and lets the browser compile JSX via
// @babel/standalone — zero tooling. This script is what GitHub Actions runs
// to pre-compile that same source into a minified bundle, swap React to its
// production build, and drop the Babel runtime so visitors don't pay for it.

import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { transform } from "esbuild"

// Files we don't ship to production: the in-page Tweaks panel + its hue
// picker UI exist only to iterate on design locally. app.jsx falls back to
// no-ops via `globalThis.X ??= ...` when these globals are absent, so prod
// renders with TWEAK_DEFAULTS baked in.
const DEV_ONLY_JSX_FILES = new Set([
  "src/dev/tweaks-panel.jsx",
  "src/dev/tweaks-config.jsx",
])

// Load order matches the <script> tags in index.html. Earlier files define
// globals (constants, helpers, components) that later ones reference.
const JSX_FILES = [
  "src/dev/tweaks-panel.jsx",
  "src/constants.jsx",
  "src/lib/analytics.jsx",
  "src/lib/assets.jsx",
  "src/lib/modal.jsx",
  "src/lib/palette.jsx",
  "src/dev/tweaks-config.jsx",
  "src/components/mockups/hero-pr.jsx",
  "src/components/mockups/hero-minimal.jsx",
  "src/components/mockups/hero-split.jsx",
  "src/components/mockups/intake.jsx",
  "src/components/mockups/triage.jsx",
  "src/components/mockups/fix.jsx",
  "src/components/mockups/report-success.jsx",
  "src/components/mockups/report-failure.jsx",
  "src/components/sections/wordmark.jsx",
  "src/components/sections/nav.jsx",
  "src/components/sections/footer.jsx",
  "src/components/sections/trusted-by.jsx",
  "src/components/sections/problems.jsx",
  "src/components/sections/benefits.jsx",
  "src/components/sections/faq.jsx",
  "src/components/sections/final-cta.jsx",
  "src/components/sections/hero.jsx",
  "src/components/modals/sources-modal.jsx",
  "src/components/modals/dedupe-modal.jsx",
  "src/components/modals/fix-loop-modal.jsx",
  "src/components/modals/request-access-modal.jsx",
  "src/components/sections/how-it-works.jsx",
  "src/app.jsx",
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
const css = await readFile("src/styles.css", "utf8")
const cssOut = await transform(css, { loader: "css", minify: true })
await writeFile(join(DIST, "styles.css"), cssOut.code)

// --- index.html: rewrite for production -------------------------------------
// 1. Switch React/ReactDOM to .production.min.js
// 2. Drop @babel/standalone (no longer needed — JSX is pre-compiled)
// 3. Drop SRI integrity attrs (dev hashes don't match the prod URLs)
// 4. Replace the five <script type="text/babel"> tags with one bundle.js
let html = await readFile("index.html", "utf8")

html = html
  .replace('href="src/styles.css"', 'href="styles.css"')
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
// Mirror Astro: everything in public/ copies verbatim to the site root.
for (const entry of await readdir("public")) {
  await cp(join("public", entry), join(DIST, entry), { recursive: true })
}

console.log(`✓ built ${DIST}/`)
