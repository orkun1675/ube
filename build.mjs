// Production build for ube.dev.
//
// Local dev opens index.html directly and lets the browser compile JSX via
// @babel/standalone — zero tooling. This script is what GitHub Actions runs
// to pre-compile that same source into a minified bundle, swap React to its
// production build, and drop the Babel runtime so visitors don't pay for it.

import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { transform } from "esbuild"
import React from "react"
import { renderToString } from "react-dom/server"

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
  "src/components/pages/landing-page.jsx",
  "src/components/pages/terms-page.jsx",
  "src/components/pages/privacy-page.jsx",
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

// --- SSR pre-render ---------------------------------------------------------
// Run the bundle inside Node with a minimal browser shim, then capture the
// HTML of <App /> via react-dom/server. Without this step the production
// HTML's <div id="root"></div> is empty, so non-JS crawlers (GPTBot,
// ClaudeBot, PerplexityBot, OAI-SearchBot, …) see only the meta description.
// The browser still hydrates via ReactDOM.hydrateRoot, so behavior is
// unchanged for real users.
//
// How it works: the JSX files publish their components onto `window` via
// Object.assign(window, {…}). We alias window → globalThis so those writes
// land on Node's global object, then indirect-eval the already-bundled JS so
// its top-level Object.assign calls actually execute. App's mount call is
// guarded with `typeof document !== "undefined"` in src/app.jsx and is
// skipped here.
globalThis.window = globalThis
globalThis.React = React
// Stubs for browser APIs that the bundle's top-level code might touch. All
// real usage is inside useEffect (so it only fires on the client), but the
// stubs keep us safe if a future top-level reference sneaks in.
globalThis.sessionStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}
globalThis.ReactDOM = {
  hydrateRoot: () => {},
  createRoot: () => ({ render: () => {} }),
}
// Indirect eval runs in global scope, so `const X = …` followed by
// `Object.assign(window, { X })` correctly publishes X to globalThis.
// biome-ignore lint/security/noGlobalEval: SSR pre-render requires evaluating the bundled JSX in this Node script's global scope; no untrusted input.
// biome-ignore lint/complexity/noCommaOperator: `(0, eval)` is the indirect-eval idiom — the comma is what forces global-scope evaluation.
;(0, eval)(js.code)
const appHtml = renderToString(React.createElement(globalThis.App))

// --- FAQPage JSON-LD --------------------------------------------------------
// Generated from the same FAQ_ITEMS array the React component renders, so the
// structured-data answers and the visible HTML can never drift apart. AI
// answer engines (Gemini, ChatGPT search, Perplexity, …) parse this block to
// quote answers verbatim.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: globalThis.FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}
// JSON.stringify is HTML-safe for our content (no `<`, `>`, or `&`); if FAQ
// copy ever introduces those, escape them here.
const faqLdScript = `<script type="application/ld+json">\n${JSON.stringify(faqJsonLd, null, 2)}\n  </script>`

// --- index.html: rewrite for production -------------------------------------
// 1. Switch React/ReactDOM to .production.min.js
// 2. Drop @babel/standalone (no longer needed — JSX is pre-compiled)
// 3. Drop SRI integrity attrs (dev hashes don't match the prod URLs)
// 4. Replace the five <script type="text/babel"> tags with one bundle.js
// 5. Inject SSR'd markup into the empty <div id="root">
// 6. Replace the FAQPage JSON-LD placeholder with the generated block
let html = await readFile("index.html", "utf8")

html = html
  .replace('href="/src/styles.css"', 'href="/styles.css"')
  .replace("react.development.js", "react.production.min.js")
  .replace("react-dom.development.js", "react-dom.production.min.js")
  .replace(/\s+integrity="sha384-[^"]*"/g, "")
  .replace(
    /\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone[^>]*><\/script>\n?/,
    "\n",
  )
  .replace(
    /\s*<!-- Component scripts[^>]*-->\n(\s*<script type="text\/babel"[^>]*><\/script>\s*\n?)+/,
    '\n  <script src="/bundle.js" defer></script>\n',
  )
  // Placeholder comment (not magic insertion before </head>) so the source
  // index.html shows future maintainers exactly where the FAQPage JSON-LD lands.
  .replace("<!-- FAQPAGE_JSON_LD -->", faqLdScript)

// Landing page — inject SSR'd markup into the root div.
const landingHtml = html.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`,
)
await writeFile(join(DIST, "index.html"), landingHtml)

// --- Per-route HTML shells --------------------------------------------------
// Terms and Privacy reuse the same template + bundle but ship with an empty
// <div id="root"> so the client renders fresh (no SSR'd content for these
// routes today — acceptable trade-off; see CLAUDE.md). Each gets a distinct
// <title>, meta description, og/twitter title, and canonical link so search
// engines and browser tabs see the right metadata.
const legalRoutes = [
  {
    path: "terms-of-service",
    title: "Terms of Service — Ube",
    description:
      "Terms of Service for Ube, a software platform by Chunky Tofu Studios, LLC.",
  },
  {
    path: "privacy-policy",
    title: "Privacy Policy — Ube",
    description:
      "Privacy Policy for Ube, a software platform by Chunky Tofu Studios, LLC.",
  },
]

for (const { path: routePath, title, description } of legalRoutes) {
  const canonical = `https://ube.dev/${routePath}/`
  const routeHtml = html
    // Replace document <title>. The source HTML's first <title> tag is the
    // landing-page one; swap it for the route-specific title.
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    // Description is duplicated across <meta name=description>, og:description,
    // twitter:description. Swap them all together so a single source of truth
    // covers SEO, social, and AI answer engines.
    .replace(
      /<meta name="description" content="[^"]*"\/>/,
      `<meta name="description" content="${escapeHtml(description)}"/>`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\/>/,
      `<meta property="og:title" content="${escapeHtml(title)}"/>`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\/>/,
      `<meta property="og:description" content="${escapeHtml(description)}"/>`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\/>/,
      `<meta property="og:url" content="${canonical}"/>`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\/>/,
      `<meta name="twitter:title" content="${escapeHtml(title)}"/>`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"\/>/,
      `<meta name="twitter:description" content="${escapeHtml(description)}"/>`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\/>/,
      `<link rel="canonical" href="${canonical}"/>`,
    )
  await mkdir(join(DIST, routePath), { recursive: true })
  await writeFile(join(DIST, routePath, "index.html"), routeHtml)
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

// --- sitemap.xml ------------------------------------------------------------
// Single-URL site, but the sitemap gives Google a freshness signal and pairs
// with the Sitemap: directive in public/robots.txt.
const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ube.dev/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ube.dev/terms-of-service/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://ube.dev/privacy-policy/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
`
await writeFile(join(DIST, "sitemap.xml"), sitemap)

// --- Static assets ----------------------------------------------------------
// Mirror Astro: everything in public/ copies verbatim to the site root.
for (const entry of await readdir("public")) {
  await cp(join("public", entry), join(DIST, entry), { recursive: true })
}

console.log(`✓ built ${DIST}/`)
