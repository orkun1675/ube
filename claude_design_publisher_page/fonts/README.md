# Fonts

Ube ships with two type families, both **variable** WOFF2s — the
same files the production site self-hosts via
`@fontsource-variable/inter` and `@fontsource-variable/jetbrains-mono`.

| Family | Role | Source | License |
|---|---|---|---|
| **Inter Variable** | UI + body + display | https://rsms.me/inter/ | OFL 1.1 |
| **JetBrains Mono Variable** | Code, eyebrows, monospace UI | https://www.jetbrains.com/lp/mono/ | OFL 1.1 |

## Inventory

Seven subsets per family, served with `unicode-range` so only the
glyphs the page actually needs are downloaded:

```
inter-latin-wght-normal.Dx4kXJAl.woff2
inter-latin-ext-wght-normal.DO1Apj_S.woff2
inter-cyrillic-wght-normal.DqGufNeO.woff2
inter-cyrillic-ext-wght-normal.BOeWTOD4.woff2
inter-greek-wght-normal.CkhJZR-_.woff2
inter-greek-ext-wght-normal.DlzME5K_.woff2
inter-vietnamese-wght-normal.CBcvBZtf.woff2

jetbrains-mono-latin-wght-normal.B9CIFXIH.woff2
jetbrains-mono-latin-ext-wght-normal.DBQx-q_a.woff2
jetbrains-mono-cyrillic-wght-normal.D73BlboJ.woff2
jetbrains-mono-greek-wght-normal.Bw9x6K1M.woff2
jetbrains-mono-vietnamese-wght-normal.Bt-aOZkq.woff2
```

Each file is the full variable axis (`wght 100 → 900` for Inter,
`100 → 800` for JetBrains Mono). One file per family covers every
weight + style the system uses.

## Loading

You don't need to do anything — `colors_and_type.css` declares
`@font-face` for every file above at the top of the sheet. Just link
to the stylesheet and use `var(--font-sans)` / `var(--font-mono)`.

URLs inside `@font-face` are resolved relative to the **stylesheet**,
not the HTML, so a card under `preview/` that links to
`../colors_and_type.css` still resolves the font URL to `/fonts/X.woff2`
correctly.
