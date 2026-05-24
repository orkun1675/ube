# 0009 — Tweak panel writeback in Astro dev

**Type**: HITL (design pass + implementation)

## What to build

The tweaks panel needs to persist user changes back to `src/data/tweak-defaults.ts` during dev so that picking a hero variant or accent color in the panel actually updates the source file (which then triggers HMR for structural tweaks per ADR 0003). The previous mechanism relied on `dev-server.py`, which is deleted in slice 0001. This slice is the design pass on the replacement plus its implementation.

The user explicitly deferred this design from the grilling session and asked for it to be sequenced after all other migration work — by the time this lands, the panel may have been read-only or required manual edits to `tweak-defaults.ts` for an extended period. That's the trade-off they chose to focus the early slices on the core architecture migration.

## Design candidates (pick one in this slice)

- **Vite dev-middleware POST endpoint** — Astro/Vite supports custom dev middleware. Add a route like `POST /__tweaks` that accepts `{ key, value }` and rewrites the `EDITMODE-BEGIN`/`EDITMODE-END` region of `src/data/tweak-defaults.ts`. Vite's HMR picks up the file change automatically. Most "native" approach.
- **File System Access API** — modern browsers expose this for directory writes. Requires explicit user-grant gesture. No dev-server changes; the panel writes directly. Restricted to Chromium today.
- **"Copy snippet" UX pivot** — the panel stops trying to write at all. Clicking a tweak updates the in-page state but doesn't persist; a "Copy as TweakDefaults" button copies a snippet the user pastes into `tweak-defaults.ts` manually. Lowest implementation cost, worst UX.

## What to build (once design is chosen)

- Implement the chosen mechanism
- Mechanism is **dev-only** — must not ship in production bundle (no production reference to the writeback endpoint, no production code that calls it)
- Update `CLAUDE.md` with a brief note on how the panel persists changes (especially if any setup is required)
- If the mechanism is surprising enough that a future reader would wonder why it exists, file a short ADR (`0005-tweak-panel-writeback.md`) describing the choice and the alternatives considered

## Acceptance criteria

- [ ] Clicking a tweak in the panel persists the change to `src/data/tweak-defaults.ts`
- [ ] HMR picks up the change and re-renders the page with new defaults (for structural tweaks)
- [ ] Color tweaks still update live via DOM manipulation without requiring reload (per ADR 0003)
- [ ] Mechanism is excluded from production builds — no `__tweaks` endpoint, no writeback code in the prod bundle
- [ ] Mechanism documented in `CLAUDE.md` (and a small ADR if the choice is surprising)
- [ ] Manual roundtrip test: change every tweak via the panel, reload, verify each value persisted to `tweak-defaults.ts`

## Blocked by

- [0008](./0008-dissolve-app-islands.md)
