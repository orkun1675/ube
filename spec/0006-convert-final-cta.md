# 0006 — FinalCta → `.astro` with vanilla button

**Type**: AFK

## What to build

Convert the FinalCta section (the closing call-to-action on the landing page) to static `.astro`. Like the Nav buttons, the only real behavior is a single click handler that opens the conversion modal.

In scope:

- `src/components/sections/FinalCta.astro` renders the section markup statically
- CTA button is a plain `<button>` with vanilla `onclick` calling `openRequestAccess('final_cta')` from the nano store
- Section placed directly in `src/pages/index.astro` outside the page React island
- Delete `src/components/sections/final-cta.tsx`

## Acceptance criteria

- [ ] `FinalCta.astro` renders correctly on landing
- [ ] CTA button opens the conversion modal
- [ ] Click fires `request_access_modal_opened` with `source: 'final_cta'`
- [ ] Per-page React island no longer renders FinalCta
- [ ] No remaining `final-cta.tsx` file
- [ ] Bundle analysis: no React FinalCta code present
- [ ] Manual visual diff: section identical
- [ ] `tsc --noEmit` clean

## Blocked by

- [0002](./0002-extract-tweak-defaults.md)
