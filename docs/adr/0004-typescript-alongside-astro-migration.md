---
status: accepted
---

# TypeScript adoption alongside the Astro migration

The project was JavaScript-only before this migration: `.jsx` source files, Biome configured for JS, no `tsconfig.json`. Astro supports `.jsx` natively via `@astrojs/react`, so the migration *could* have stayed on JS. We chose to adopt TypeScript in the same migration instead. The reasoning: every component is being touched anyway (rewriting `Object.assign(window, …)` to imports, splitting React components into `.astro` vs. island, retyping the nano store contract), so the marginal cost of adding type annotations during that pass is small. Doing TypeScript as a separate follow-up migration would mean touching every file twice.

## Consequences

- `tsconfig.json` is added; Biome config updated to lint `.ts`/`.tsx`.
- The nano store contract (`isRequestAccessOpen: WritableAtom<boolean>`, `openRequestAccess(source: ModalSource)`) is typed from day one, which catches the "forgot to pass source" class of bug at compile time.
- Component props are typed (today they're untyped function arguments).
- The migration PRs are larger than a pure framework swap. Acceptable trade-off given the alternative is doing the same work twice.
