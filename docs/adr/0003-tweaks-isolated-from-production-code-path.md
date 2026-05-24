---
status: accepted
---

# Tweaks system isolated from the production code path

The tweaks panel is a dev-only design tool — six knobs (accent color, wordmark accent, hero variant, hero copy, card tone, accent strategy) that let us iterate on the look without round-tripping through code. Production components have **zero awareness** of the tweaks system: no `useTweaks` hook, no import from `src/dev/`, no `if (DEV)` branches. Components take their values as normal props or read from a single typed defaults module (`src/data/tweak-defaults.ts`) that the panel writes to. In dev, the panel manipulates the DOM directly for color tweaks (live preview) and writes to the defaults file for structural tweaks (HMR reload picks up the change). In prod, the panel is excluded from the bundle entirely via `import.meta.env.DEV` guards, and the defaults file is just a normal config import.

## Considered Options

- **Keep the `useTweaks` hook with prod no-op fallback** (the previous pattern). Rejected: it leaks the tweaks concept into every component that wants a variant. A future reader sees `useTweaks` calls everywhere and reasonably assumes tweaks are part of the production model.
- **Kill the panel entirely**, dev iteration via direct source edits. Rejected: the color picker UI genuinely beats editing source (you need to see colors next to each other), and non-coding stakeholders use the panel.

## Consequences

- Live preview for structural tweaks (hero variant, etc.) now requires an HMR reload — slower than the previous in-place re-render, but acceptable given how rarely structural tweaks change during a session.
- The defaults file (`src/data/tweak-defaults.ts`) is the only seam between the tweaks system and the rest of the codebase. Anything that needs to consume a tweak value imports from there.
- If panel maintenance ever exceeds the value it provides, it can be deleted in a single PR without touching production components.
