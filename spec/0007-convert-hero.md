# 0007 — Hero + Hero mockups → `.astro`

**Type**: AFK

## What to build

The Hero is the largest section conversion. It has variant selection (`heroVariant`: `pr` / `minimal` / `split`), copy selection (`heroCopy`: `agent` / `autopilot`), a CTA button, and three mockup components.

In scope:

- `src/components/sections/Hero.astro` renders the selected variant
- Frontmatter reads `heroVariant`, `heroCopy`, `accent`-related fields from `src/data/tweak-defaults.ts`
- Conditional rendering in Astro template syntax picks the correct mockup and copy
- Three Hero mockup variants converted to `.astro`:
  - `src/components/mockups/HeroPr.astro` (currently `hero-pr.jsx`)
  - `src/components/mockups/HeroMinimal.astro` (currently `hero-minimal.jsx`)
  - `src/components/mockups/HeroSplit.astro` (currently `hero-split.jsx`)
- Hero CTA → vanilla `onclick` calling `openRequestAccess('hero')`
- Delete the four old `.tsx` files
- Hero placed directly in `src/pages/index.astro` outside the page React island

After this slice, all six listed mockup files referenced by the landing page (the three Hero variants here, plus HowItWorks's IntakeMockup/TriageMockup/FixMockup/ReportSuccessMockup/ReportFailureMockup) split into two groups: **Hero mockups are `.astro`** (this slice), **HowItWorks mockups stay `.tsx`** (because HowItWorks remains a React island).

## Acceptance criteria

- [ ] `Hero.astro` renders the variant selected by `tweak-defaults`
- [ ] All three Hero mockup variants render correctly as `.astro` (visual diff vs. current)
- [ ] Hero copy variant (`agent` / `autopilot`) renders correct text per `tweak-defaults`
- [ ] Hero CTA opens conversion modal with `source: 'hero'`
- [ ] Changing `heroVariant` in `tweak-defaults.ts` and reloading switches the rendered variant (HMR or full reload — both acceptable)
- [ ] Per-page React island no longer renders Hero or its mockups
- [ ] The four old `.tsx` files deleted (`hero.tsx`, `hero-pr.tsx`, `hero-minimal.tsx`, `hero-split.tsx`)
- [ ] Bundle analysis: no React Hero or Hero-mockup code present on landing
- [ ] Manual visual diff: identical rendering across all three variants
- [ ] `tsc --noEmit` clean

## Blocked by

- [0002](./0002-extract-tweak-defaults.md)
