# 0002 — Extract tweak defaults to `src/data/tweak-defaults.ts`

**Type**: AFK

## What to build

After slice 0001, `TWEAK_DEFAULTS` likely still lives as a literal in `App.tsx` (or wherever the per-page island root was extracted to). This slice creates the single typed module that all section conversions in slices 0003–0007 will import from.

In scope:

- Create `src/data/tweak-defaults.ts` exporting `TWEAK_DEFAULTS` as a typed constant. Type each field (`accent`, `wordmarkAccent`, `heroVariant`, `heroCopy`, `cardTone`, `accentStrategy`) as a union of its valid string values, not just `string`.
- Preserve the `EDITMODE-BEGIN` / `EDITMODE-END` markers around the defaults literal — they're how the tweaks panel writeback (slice 0009) will locate the file region to rewrite.
- Update every current consumer to import from `src/data/tweak-defaults.ts`. No literal `TWEAK_DEFAULTS` definitions should remain anywhere else.
- Tweaks panel reads from this file in dev. Writeback may be disabled at this point (slice 0009 restores it) — that's acceptable; the user can edit the file by hand temporarily.
- No behavior change is in scope. This is pure refactoring.

Foundation note: per ADR 0003, **production components must not import from `src/dev/`**. The defaults module in `src/data/` is the only seam between the tweaks system and the rest of the codebase. After this slice, that invariant is mechanically easier to enforce because there's a single typed module everything references.

## Acceptance criteria

- [ ] `src/data/tweak-defaults.ts` exports `TWEAK_DEFAULTS` with typed union fields
- [ ] `EDITMODE-BEGIN` / `EDITMODE-END` markers wrap the defaults literal in the new file
- [ ] No `TWEAK_DEFAULTS` literal remains in `App.tsx` or any other source file
- [ ] Tweaks panel reads current defaults from the new file (writeback may be temporarily disabled)
- [ ] Site renders identically — no visual or behavioral change
- [ ] `tsc --noEmit` clean

## Blocked by

- [0001](./0001-astro-shell.md)
