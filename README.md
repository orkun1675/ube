# Ube — Landing site

Static landing for [ube.dev](https://ube.dev). React + JSX rendered in a single page, served from GitHub Pages.

## Local edits (no tooling)

React and `@babel/standalone` come from unpkg and compile the JSX in the
page. Edit any file under `src/` and reload — no install step, no bundler.

Static assets live in `public/` (copied verbatim to the site root by the
build), so a plain `python3 -m http.server` from the repo root would serve
the HTML but 404 on `/assets/...`. Use the included dev server, which mounts
`public/` at `/` the way Astro's dev server does:

```
python3 dev-server.py    # honors $PORT, defaults to whatever you set
```

## Production build

GitHub Actions runs this on every push to `main`; you generally don't need to
run it by hand. If you want to:

```
npm install
npm run build
# ./dist/ gets deployed
```

`build.mjs` concatenates the JSX files into one minified `bundle.js`,
minifies `src/styles.css`, copies `public/*` to the dist root, and rewrites
`index.html` to load React's `*.production.min.js` builds without the Babel
runtime.

## Layout

```
index.html               # dev entry — loads JSX via @babel/standalone
build.mjs                # esbuild-based production build
dev-server.py            # dev server; aliases public/ to /
src/
  app.jsx                # mount + page composition
  constants.jsx          # shared constants
  styles.css             # tokens, layout, components, mockups
  components/
    sections/            # Nav, Hero, Footer, page sections
    modals/              # Sources, Dedupe, FixLoop, RequestAccess
    mockups/             # in-page product mockups
  lib/                   # analytics, palette, modal primitive, asset registry
  dev/                   # tweaks panel (dev-only; stripped from prod)
public/
  assets/                # customer logos, integration icons, favicons, og image
  maintainer/            # /maintainer/ static redirect
  CNAME
.github/workflows/       # Pages deploy workflow
```
