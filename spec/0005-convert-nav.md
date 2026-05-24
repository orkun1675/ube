# 0005 — Nav → `Nav.astro` + `nav.client.ts`

**Type**: AFK

## What to build

Convert the top navigation from a React component into static `.astro` markup plus a tiny vanilla TS script for the small amount of real behavior it needs (scroll-class toggle, mobile menu). Per the grilling decision, the Nav is ~90% structural markup; making it React on every page just to support a scroll listener and a menu toggle was disproportionate.

In scope:

- `src/components/nav/Nav.astro` renders the full navigation markup statically (desktop + mobile menu layout). `wordmarkAccent` is read in the frontmatter from `src/data/tweak-defaults.ts`. Active route indicator is derived from `Astro.url.pathname` (no `isLandingPage` prop drilling needed). Anchor links unchanged.
- `src/components/nav/nav.client.ts` (colocated per user direction) attaches behaviors:
  - **Scroll-class**: adds `.scrolled` to the `<nav>` element when `window.scrollY > 8`, removes below. Uses `{ passive: true }`.
  - **Mobile menu**: open/close handlers, body-scroll lock when open, Esc-key dismissal. Mobile menu HTML lives statically in `Nav.astro` (no React portal) and is toggled via a CSS class or `hidden` attribute. `<details>`/`<summary>` is acceptable if the visual design allows it; otherwise a small toggle is fine.
  - **Request access**: vanilla `onclick` on each "Request access" button calls `openRequestAccess('nav')` imported from the nano store. Same source label whether desktop or mobile button.
- `BaseLayout.astro` now renders `<Nav />` directly (in addition to `<Footer />` from slice 0003). Per-page React islands no longer render Nav.
- Delete `src/components/sections/nav.tsx`.

The mobile menu's `ReactDOM.createPortal` to `document.body` is no longer needed — static markup with appropriate z-index in CSS achieves the same visual result.

## Acceptance criteria

- [ ] `Nav.astro` renders correctly on `/`, `/terms-of-service/`, `/privacy-policy/`
- [ ] Scroll-class toggle behavior matches current (`.scrolled` past 8px)
- [ ] Mobile menu opens, closes, locks body scroll when open, dismisses on Esc
- [ ] Mobile menu's "Request access" button opens the conversion modal and dismisses the menu
- [ ] Desktop "Request access" button opens the conversion modal
- [ ] Both buttons fire `request_access_modal_opened` with `source: 'nav'`
- [ ] Active route indicator (the dot/highlight on the current page link) correct on each route
- [ ] Wordmark renders with correct accent variant per `tweak-defaults`
- [ ] Bundle analysis: no React Nav code present in any page bundle (only the vanilla `nav.client.ts`)
- [ ] No remaining `nav.tsx` file
- [ ] Manual visual diff: Nav identical on every page, both desktop and mobile
- [ ] `tsc --noEmit` clean

## Blocked by

- [0002](./0002-extract-tweak-defaults.md)
- [0004](./0004-promote-wordmark.md)
