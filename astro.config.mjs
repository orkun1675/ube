import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Custom domain on GitHub Pages — public/CNAME pins this at deploy time.
  site: 'https://ube.dev',

  // Build emits a clean ./dist of static files.
  output: 'static',

  // Keep trailing slashes consistent so internal links don't flicker between
  // /pricing and /pricing/ when GH Pages auto-rewrites.
  trailingSlash: 'always',

  build: {
    // GitHub Pages serves /pricing/ as /pricing/index.html — this matches.
    format: 'directory',
  },

  // We don't need a framework integration; everything is .astro + a tiny
  // vanilla JS file shipped from /public.
});
