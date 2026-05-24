# 0003 — Convert static-content sections to `.astro`

**Type**: AFK

## What to build

Convert the four sections that are pure static markup with zero interactivity into Astro components. These sections currently render inside the per-page React islands; after this slice they render server-side as plain HTML and ship zero JS.

Sections in scope:

- **Footer** — lives in `BaseLayout.astro` after this slice (it's on every page). Reads `wordmarkAccent` from `src/data/tweak-defaults.ts` and passes to `Wordmark` (still `.tsx` at this point; promoted to `.astro` in slice 0004).
- **TrustedBy** — landing-page only. Static logo grid.
- **Problems** — landing-page only. Static content cards.
- **Benefits** — landing-page only. Static content cards.

For each:

- Create `<SectionName>.astro` matching the current visual output exactly
- Frontmatter imports `TWEAK_DEFAULTS` from `src/data/tweak-defaults.ts` if any tweak values are needed
- The corresponding `.tsx` section file is deleted
- The per-page island (`LandingPage`, etc.) no longer renders this section — instead, the page's `.astro` file places `<SectionName />` directly in the markup, outside the React island

Bundling rationale (per user direction): these four share the same conversion pattern and are all small. One PR is more efficient to review than four near-identical PRs.

## Acceptance criteria

- [ ] `Footer.astro` exists; `Footer` rendered by `BaseLayout` on every route
- [ ] `TrustedBy.astro`, `Problems.astro`, `Benefits.astro` exist; placed in `src/pages/index.astro` directly (outside the page island)
- [ ] Per-page React islands no longer render these four sections
- [ ] The four old `.tsx` (formerly `.jsx`) section files are deleted
- [ ] Bundle analysis: these sections contribute zero JS to any page bundle
- [ ] Manual visual diff against pre-slice state shows no regression
- [ ] `tsc --noEmit` clean

## Blocked by

- [0002](./0002-extract-tweak-defaults.md)
