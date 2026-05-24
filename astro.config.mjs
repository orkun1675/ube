// Astro shell for ube.dev — see docs/adr/0001-astro-with-react-islands.md.
//
// Static SSG output (no server runtime — GitHub Pages serves dist/). Each
// route in src/pages/ becomes a real HTML file. React islands hydrate on the
// client via @astrojs/react. /maintainer → / lives here so it's emitted by
// the build (replaces public/maintainer/index.html).

import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"

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
})
