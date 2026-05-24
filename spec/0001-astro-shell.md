# 0001 — Astro shell with feature parity

**Type**: HITL (build-system swap; non-trivial verification)

## What to build

Replace the custom `build.mjs` + `dev-server.py` + in-browser Babel pipeline with Astro. After this slice the site is visually and functionally identical to today, but every byte goes through Astro / Vite. Subsequent slices peel React out of individual sections.

In scope:

- **Toolchain**: install `astro`, `@astrojs/react`, `@astrojs/sitemap`. Configure `astro.config.mjs` for static output with `redirects: { '/maintainer': '/' }` (replaces `public/maintainer/index.html`).
- **TypeScript**: add `tsconfig.json` mirroring `/Users/orkun/git/gxp-reviewer/frontend/tsconfig.json` strictness — `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`, `paths: { "@/*": ["./src/*"] }`. Drop the `tests` / `playwright.config.ts` includes (this project has no tests). Adjust `lib`, `target`, `moduleResolution`, `jsx`, `isolatedModules`, `noEmit` to match. All `.jsx` files become `.tsx`; all `.js` files become `.ts`.
- **Layout**: create `src/layouts/BaseLayout.astro` with strict props-only API per ADR 0001 reasoning + grilling Q6 (props: `title`, `description`, `canonical`, optional `ogImage`, `ogType`, `jsonLd`). Layout derives all `og:*` and `twitter:*` meta from props; no per-page duplication. JSON-LD rendered via `set:html` when prop is present.
- **Routes**: `src/pages/index.astro`, `src/pages/terms-of-service.astro`, `src/pages/privacy-policy.astro`. Each page mounts its existing React tree (Nav + sections + Footer) as one big `<PageApp client:load />` island. This is deliberate — section-by-section conversion happens in later slices.
- **Conversion modal in shared layout** (ADR 0002): `RequestAccessModal` extracted into its own small island mounted in `BaseLayout`. Hydrates on every route.
- **Nano store**: `src/stores/request-access.ts` exports `isRequestAccessOpen` atom and `openRequestAccess(source: ModalSource)` / `closeRequestAccess()` action wrappers. `ModalSource` type union covers `'nav' | 'hero' | 'final_cta'`. The wrapper fires the `request_access_modal_opened` analytics event so call sites can never forget it.
- **FAQ JSON-LD**: extract `FAQ_ITEMS` from the FAQ component into `src/data/faq-items.ts`. The landing page's frontmatter imports it, builds the FAQPage schema object, passes as `jsonLd` prop to `BaseLayout`.
- **Sitemap**: `@astrojs/sitemap` integration replaces the hand-rolled `sitemap.xml` generation in `build.mjs`.
- **Analytics**: Amplitude inline script moves from `index.html` into `BaseLayout.astro`. Same hostname gating (`ube.dev` or subdomain) preserved.
- **Infrastructure**: `package.json` scripts (`dev`, `build`, `preview`). `.claude/launch.json` updated so `dev-a`..`dev-f` slots invoke `astro dev --port {port}`. GitHub Actions workflow swaps `node build.mjs` for `npm ci && npm run build`. `biome.json` updated to lint `.ts`/`.tsx`.
- **Documentation**: `CLAUDE.md` updated to reflect new build/dev workflow (delete the "JSX load order" gotcha, the "dev opens index.html directly" claim, the stale Request Access modal claim flagged separately). `README.md` updated.

Deleted: `build.mjs`, `dev-server.py`, `index.html`, `public/maintainer/index.html`, `@babel/standalone` from `package.json`.

Out of scope (deferred to later slices): tweak panel writeback mechanism (panel may be temporarily read-only in dev — see slice 0009), per-section `.astro` conversion (slices 0003–0007), dissolving the per-page `<PageApp>` islands (slice 0008).

## Acceptance criteria

- [ ] `npm run dev` starts Astro dev server; `npm run build` produces `dist/` via Astro
- [ ] All three current routes (`/`, `/terms-of-service/`, `/privacy-policy/`) render correctly in dev and prod
- [ ] Each prod route's HTML contains real page content in `<div id="root">` (or equivalent island root) — no empty roots for terms/privacy
- [ ] `/maintainer/` returns a redirect to `/`
- [ ] `dist/sitemap-index.xml` (or equivalent) lists all canonical routes
- [ ] Conversion modal opens from Nav, Hero, and FinalCta CTAs on every page; correct `source` label fires to analytics
- [ ] Landing page's `<head>` contains a valid FAQPage JSON-LD `<script>` block
- [ ] All per-page `<title>`, `<meta name="description">`, `og:*`, `twitter:*`, `<link rel="canonical">` correct per route
- [ ] Amplitude initializes on `ube.dev` (or subdomain), is stubbed on `localhost`
- [ ] `?amplitude=1` escape hatch still works on `localhost`
- [ ] reCAPTCHA still lazy-loads on first modal open
- [ ] `tsconfig.json` strictness matches `/Users/orkun/git/gxp-reviewer/frontend/tsconfig.json` (project's chosen baseline)
- [ ] `biome check` passes against `.ts`/`.tsx`
- [ ] GitHub Actions workflow builds and deploys cleanly to `ube.dev` from `main`
- [ ] `.claude/launch.json` `dev-a`..`dev-f` slots all start Astro dev on distinct ports
- [ ] `CLAUDE.md` and `README.md` reflect new workflow
- [ ] `build.mjs`, `dev-server.py`, `index.html`, `public/maintainer/index.html`, `@babel/standalone` removed
- [ ] Manual visual diff against current `ube.dev` shows no regression on any route

## Blocked by

None — can start immediately.
