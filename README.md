# Ube — Landing site

Static landing for [ube.dev](https://ube.dev). React + JSX rendered in a single page, served from GitHub Pages.

## Local edits (no tooling)

Just open `index.html` in a browser. React and `@babel/standalone` come from
unpkg and compile the JSX in the page. Edit any `.jsx` or `styles.css` and
reload — no install step, no dev server.

If you want a local HTTP server (so relative paths behave like prod):

```
python3 -m http.server
```

## Production build

GitHub Actions runs this on every push to `main`; you generally don't need to
run it by hand. If you want to:

```
npm install
npm run build
# ./dist/ gets deployed
```

`build.mjs` pre-compiles the five JSX files into one minified `bundle.js`,
minifies `styles.css`, and rewrites `index.html` to load React's
`*.production.min.js` builds without the Babel runtime.

## Layout

```
index.html               # dev entry — loads JSX via @babel/standalone
app.jsx                  # mount + page composition
components.jsx           # Nav, Hero, Footer, sections
mockups.jsx              # in-page product mockups
logos.jsx                # brand/integration logos
tweaks-panel.jsx         # design tweak overlay (dev affordance)
styles.css               # tokens, layout, components, mockups
build.mjs                # esbuild-based production build
.github/workflows/       # Pages deploy workflow
```
