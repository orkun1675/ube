---
status: accepted
---

# Astro + React islands for ube.dev

The original site was hand-rolled: `index.html` with `<script type="text/babel">` tags compiled in-browser via `@babel/standalone` during dev, and a custom `build.mjs` for prod that concatenated JSX files in a strict load order, transformed them with esbuild, and produced HTML by regex-rewriting `index.html` per route. As the site grew from one page to three (with `/publisher/` and `/pricing/` planned), the regex-driven per-route HTML generation, the global `Object.assign(window, …)` component publishing pattern, and the eval-the-bundle-in-Node SSR trick all became fragile in ways that aren't recoverable by polishing — adding a page meant touching three files and re-deriving meta-tag substitutions by hand. We adopted Astro because it solves exactly this shape of problem: file-based routing for per-route HTML, a real bundler (Vite) replacing the load-order array, native React island support so existing components migrate with minimal change, and built-in handling for sitemaps and per-page metadata.

## Considered Options

- **Stay on the custom build.** Rejected: terms-of-service and privacy-policy were already shipping with empty `<div id="root">` (SPA-rendered, not pre-rendered), so the stated SEO/GEO goal was already not met for two of three pages. Every new route adds another block of regex substitutions, and the trend is bad.
- **Vite + a custom SSG script.** Rejected: half the wins of Astro with most of the migration cost. We'd still own the route-to-file mapping, per-page meta rewriting, and sitemap generation. The bundling story would improve but the rest of the custom code would remain custom.
- **Next.js with static export.** Rejected: heavier than Astro for the same output (more JS shipped per page), static export is a second-class citizen in the framework, and we'd fight conventions designed for a server runtime we don't have.

## Consequences

- The no-tool-install dev workflow (open `index.html` directly) is gone. `npm install` is now required to dev.
- Cross-island state needs Nano Stores (React context does not cross island boundaries). See ADR 0002 for the implication on modal placement.
- The `EDITMODE-BEGIN`/`EDITMODE-END` tweaks-panel pattern still works but is now scoped to a single defaults file (see ADR 0003).
