# Ube — Landing site

Static marketing site for [ube.dev](https://ube.dev). Astro + plain CSS, no client-side framework, deploys to GitHub Pages on every push to `main`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # builds to ./dist
npm run preview  # serves the built site locally
```

## Project layout

```
src/
  layouts/                    # <head>, fonts, Nav, Footer, Modal, etc.
  components/
    Nav.astro                 # top nav + product switcher
    Footer.astro
    Wordmark.astro            # `ube` lockup with purple accent dot
    RequestAccessModal.astro  # global waitlist form
    xyz.astro                 # Site sections
    mockups/                  # Mock UIs
  pages/
    index.astro               # /
    pricing.astro             # /pricing/  (placeholder)
    publisher.astro           # /publisher/ (placeholder)
  styles/
    tokens.css                # :root tokens, reset, type scale, layout primitives
    components.css            # buttons, pills, wordmark, cards, FAQ, modal, form
    layout.css                # nav, hero, how-it-works frame, final CTA, footer
    mockups.css               # in-page product mockups — only loaded on /
public/
  page.js                     # served at /page.js
  CNAME                       # domain name
```

## TODOs before publishing

- [ ] Real `og-image.png` (1200×630) — drop in `public/`, add `<meta property="og:image">` in `BaseLayout`.
- [ ] Favicon set.
- [ ] Wire `#access-form` submit to a real backend (Formspark / Netlify Forms / Cloudflare Worker).
- [ ] Headline + sub-headline copy review (currently first-draft per the design brief).
- [ ] Swap mockup tool chrome (Crashlytics, Sentry, GitHub icons) to real brand marks icons.
- [ ] Analytics
