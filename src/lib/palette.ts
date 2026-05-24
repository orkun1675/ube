// Ube — Brand palette: OKLCH swatches sampled from the ube flesh photo, plus
// the card-tone presets. Both ship to production: app.tsx applies the chosen
// swatch as CSS variables on initial mount, so prod needs the conversion data
// even though the tweaks UI is excluded.
//
// The image is entirely ube interior, so hue barely moves (319°–331°) but
// lightness spans rim-light highlights down to shadow cores. Each swatch
// carries its own L/C/H so the picker reflects the real range of the tuber.

export type UbeHue = {
  value: string
  H: number
  L: number
  C: number
  name: string
  note: string
}

export const UBE_HUES: UbeHue[] = [
  {
    value: "lift",
    H: 319,
    L: 0.62,
    C: 0.2,
    name: "Lifted Flesh",
    note: "rim-lit highlight",
  },
  {
    value: "flesh",
    H: 321,
    L: 0.56,
    C: 0.21,
    name: "Ube Flesh",
    note: "the iconic vivid violet",
  },
  {
    value: "heart",
    H: 322,
    L: 0.48,
    C: 0.2,
    name: "Tuber Heart",
    note: "rich saturated mid",
  },
  {
    value: "deep",
    H: 324,
    L: 0.4,
    C: 0.17,
    name: "Deep Ube",
    note: "flesh in shade",
  },
  {
    value: "core",
    H: 325,
    L: 0.33,
    C: 0.14,
    name: "Plum Core",
    note: "shadow plum",
  },
  {
    value: "wine",
    H: 327,
    L: 0.24,
    C: 0.1,
    name: "Wine Edge",
    note: "darkest cavity",
  },
]
const UBE_DEFAULT_KEY = "lift"
export const getUbe = (key: string): UbeHue => {
  const found =
    UBE_HUES.find((u) => u.value === key) ||
    UBE_HUES.find((u) => u.value === UBE_DEFAULT_KEY)
  // UBE_HUES is non-empty and includes the default — found is always defined.
  // biome-ignore lint/style/noNonNullAssertion: see comment above
  return found!
}

export type CardTone = { bg: string; border: string }
export const CARD_TONES: Record<string, CardTone> = {
  warm: { bg: "#1D1B15", border: "#2A2720" }, // Cursor-style warm brown
  neutral: { bg: "#161617", border: "#23232A" }, // pure charcoal, no hue
  slate: { bg: "#13151B", border: "#21242E" }, // cool blue-slate
  plum: { bg: "#181320", border: "#251E33" }, // violet, ties to accent
  forest: { bg: "#121814", border: "#1F2A23" }, // deep green
}
