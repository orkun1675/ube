# 0004 — Promote Wordmark to top-level `Wordmark.astro`

**Type**: AFK

## What to build

Move the Wordmark out of `src/components/sections/` (where it doesn't belong — it's not a page section) and convert it to Astro. The Wordmark is the brand SVG used by Nav, Footer, and the favicon generators in `designs/`.

In scope:

- Create `src/components/Wordmark.astro` with the SVG markup
- Component accepts `accent: 'umlaut' | 'cursor' | 'bracket'` and `size?: number` (default 30) as props
- Renders the three accent variants conditionally in Astro template syntax (same visual output as today)
- Delete `src/components/sections/wordmark.tsx`
- Update consumers: Footer (already `.astro` after slice 0003), Nav (still `.tsx` at this point — see slice 0005), any references in `designs/`

This slice is sequenced before Nav conversion (slice 0005) because the new Nav will need `Wordmark.astro` to be available.

## Acceptance criteria

- [ ] `src/components/Wordmark.astro` exists at the top of `components/` (not under `sections/`)
- [ ] All three accent variants render correctly when toggled via prop
- [ ] Footer renders the Wordmark via the new `.astro` component
- [ ] No remaining `wordmark.tsx` file
- [ ] References in `designs/` (favicon HTML files, social preview) point to the new location if applicable
- [ ] Manual visual diff: Wordmark renders identically on every page
- [ ] `tsc --noEmit` clean

## Blocked by

- [0002](./0002-extract-tweak-defaults.md)
