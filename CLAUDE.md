# Ube landing — CLAUDE.md

## Purpose
Landing page at [ube.dev](https://ube.dev) whose sole job is to **measure interest in Ube**. The product itself doesn't exist yet — this site is a demand probe. Background essays live at `../ube-app/app_distribution_essay.md` (Publisher) and `../ube-app/app_maintenance_essay.md` (Maintainer). The Request Access modal's "Which product matters more to you?" radio (Maintainer vs Publisher) is the key signal we're collecting.

## Working alongside other agents
Other Claude Code sessions may be running in this repo in parallel.
- Treat uncommitted working-tree changes as possibly belonging to another agent.
- Don't reuse another agent's preview server. `preview_start` silently attaches to an existing instance with the same name. Call `preview_list` to see which slots are in use, then pick an unused one from the `dev-a` … `dev-f` pool in [.claude/launch.json](.claude/launch.json).
- If there are no slots available, STOP.

## Build / run
- **Dev server:** `npm run dev` (or use the `preview_*` tools with the `dev-a`..`dev-f` configs in [.claude/launch.json](.claude/launch.json) — each runs `astro dev --port {port}`).
- **Prod build:** `npm run build` → Astro emits one HTML file per route into `dist/`, plus `sitemap-index.xml`. GitHub Actions deploys `dist/` to Pages on push to `main`.
- **Prod preview locally:** `npm run preview` serves `dist/`.

## File layout
Astro + React islands; one big `<PageApp client:load />` per route for now (slice 0001 baseline; later slices peel sections into native `.astro` components).

```
astro.config.mjs               # output: static, redirects { /maintainer: / }, sitemap
tsconfig.json                  # strict; ADR 0004
src/
  pages/                       # one .astro per route
    index.astro                # /
    terms-of-service.astro     # /terms-of-service/
    privacy-policy.astro       # /privacy-policy/
  layouts/BaseLayout.astro     # <head> props API + Amplitude + RequestAccessIsland
  components/
    pages/                     # *PageApp.tsx — page-level React islands
    sections/                  # Nav, Hero, Footer, page sections (.tsx)
    modals/                    # Sources, Dedupe, FixLoop, RequestAccess (.tsx)
    mockups/                   # in-page product mockups (.tsx)
  stores/request-access.ts     # nano store + openRequestAccess(source) wrapper
  data/                        # faq-items.ts (single source of truth for the
                               #   FAQ component + the FAQPage JSON-LD)
                               # tweak-defaults.ts (EDITMODE-marked block)
  lib/                         # analytics, palette, modal primitive, asset registry
  dev/                         # tweaks panel (dev-only; gated by import.meta.env.DEV)
  styles.css                   # tokens + components + mockups
public/                        # copied verbatim to dist/ — served at site root
  assets/                      # customer logos, integration icons, favicons, og image
  CNAME, robots.txt
```

## Things to know before editing
- **The Request Access form posts to Basin** (`src/components/modals/request-access-modal.tsx`). reCAPTCHA v3 is lazy-loaded on first open; submissions go to `BASIN_ENDPOINT`. The conversion modal is mounted once globally by `BaseLayout.astro` (ADR 0002) and any CTA island opens it by calling `openRequestAccess(source)` from `src/stores/request-access.ts`. The wrapper fires `request_access_modal_opened` so no call site can forget the analytics event.
- **Two-product positioning is intentional.** Hero currently leans Maintainer, but the modal surfaces both — preserve both signals unless explicitly narrowing focus.
- **Tweaks panel is dev-only** (`src/dev/tweaks-panel.tsx`, gated by `import.meta.env.DEV`). It still mutates values in-memory, but the EDITMODE writeback to `src/data/tweak-defaults.ts` is deferred to spec slice 0009. Don't reformat the `EDITMODE-BEGIN/END` block by hand.
- **Amplitude is gated to production.** `BaseLayout.astro` loads Amplitude's Unified Script and initializes it, but only when `location.hostname` is `ube.dev` or a subdomain. On `localhost` the snippet stub installs but `init` is skipped, so no events or replays fire. Escape hatch for local verification: append `?amplitude=1` to the URL. **Only test Amplitude locally if explicitly asked.**
- **TypeScript is strict** (per ADR 0004): `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`. Match what's already in the codebase rather than weakening the config.
- No test suite. Don't add tooling unless asked.
