// Astro shell for ube.dev — see docs/adr/0001-astro-with-react-islands.md.
//
// Static SSG output (no server runtime — GitHub Pages serves dist/). Each
// route in src/pages/ becomes a real HTML file. React islands hydrate on the
// client via @astrojs/react. /maintainer → / lives here so it's emitted by
// the build (replaces public/maintainer/index.html).
//
// The `tweaksWritebackPlugin` is registered with `apply: "serve"` so it is
// skipped entirely during `astro build` — its source path is the only point
// of contact between the production config and `src/dev/` (ADR 0005). The
// plugin's `configureServer` hook installs a POST `/__tweaks` middleware on
// the dev connect instance; nothing in the static build output references
// it.

import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"

import { tweaksWritebackPlugin } from "./src/dev/tweaks-writeback-plugin.ts"

export default defineConfig({
  site: "https://ube.dev",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  redirects: {
    "/maintainer": "/",
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tweaksWritebackPlugin()],
  },
})
