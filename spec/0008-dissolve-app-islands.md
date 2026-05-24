# 0008 — Dissolve per-page App islands; finalize tweaks isolation

**Type**: AFK

## What to build

After slices 0003–0007, the per-page React islands (`LandingPage`, `TermsPage`, `PrivacyPage`, and the `App` wrapper introduced in 0001) only contain HowItWorks and FAQ — everything else has moved to `.astro`. This slice finishes the migration by mounting those two remaining React components as standalone islands directly in their pages and deleting the now-empty page-app wrappers.

In scope:

- `src/components/sections/HowItWorks.tsx` and `src/components/sections/Faq.tsx` are mounted directly in `src/pages/index.astro` as `<HowItWorks client:visible />` and `<Faq client:visible />` (`client:visible` so they hydrate only when scrolled into view — they're below the fold).
- Delete `App.tsx`, `LandingPage.tsx`, `TermsPage.tsx`, `PrivacyPage.tsx`, and any helper wrappers introduced in slice 0001 to host the per-page React tree.
- The `TweaksPanel` mount moves from "inside the per-page island" to `BaseLayout.astro`, guarded by `{import.meta.env.DEV && <TweaksPanel client:only="react" />}`.
- Verify the **ADR 0003 invariant** mechanically: grep production source for any import from `src/dev/` (should return zero hits in non-dev paths) and for any reference to a `useTweaks` hook (should be zero outside `src/dev/`).
- Run bundle analysis on terms-of-service and privacy-policy: each should ship only the conversion modal island + nano store + Astro client runtime. No React HowItWorks, no React FAQ, no Nav, no Footer, no Hero.

This is the slice where the migration's headline benefit lands: terms/privacy go from "SPA-rendered React tree" to "near-zero-JS static HTML with one small conversion-modal island."

## Acceptance criteria

- [ ] HowItWorks and FAQ mount as standalone islands in `src/pages/index.astro`
- [ ] Both islands hydrate on visibility (`client:visible`), not immediately
- [ ] `App.tsx`, `LandingPage.tsx`, `TermsPage.tsx`, `PrivacyPage.tsx`, and any other per-page wrappers deleted
- [ ] `TweaksPanel` renders in dev only, mounted from `BaseLayout`
- [ ] `TweaksPanel` is fully excluded from production bundles (verified via build output)
- [ ] Grep: zero `import` statements from `src/dev/` anywhere outside `src/dev/`
- [ ] Grep: zero `useTweaks` references outside `src/dev/`
- [ ] Bundle analysis: `/terms-of-service/` and `/privacy-policy/` ship only the modal island, nano store, and Astro client runtime (no React HowItWorks, FAQ, Nav, etc.)
- [ ] Manual visual diff against pre-slice state: no regression on any route
- [ ] `tsc --noEmit` clean

## Blocked by

- [0003](./0003-convert-static-sections.md)
- [0005](./0005-convert-nav.md)
- [0006](./0006-convert-final-cta.md)
- [0007](./0007-convert-hero.md)
