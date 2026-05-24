// Tweak defaults — the in-page dev panel mutates the EDITMODE-marked block
// below; the host rewrites it on disk via the `__edit_mode_set_keys` message
// (slice 0009 wires the writeback for the Astro build; until then the panel
// edits are in-memory only).
export type AccentValue = "lift" | "flesh" | "heart" | "deep" | "core" | "wine"
export type WordmarkAccent = "umlaut" | "cursor" | "bracket"
export type HeroVariant = "pr" | "minimal" | "split"
export type HeroCopy = "agent" | "autopilot"
export type CardTone = "warm" | "neutral" | "slate" | "plum" | "forest"
export type AccentStrategy = "single" | "split"

export type TweakDefaults = {
  accent: AccentValue
  wordmarkAccent: WordmarkAccent
  heroVariant: HeroVariant
  heroCopy: HeroCopy
  cardTone: CardTone
  accentStrategy: AccentStrategy
}

export const TWEAK_DEFAULTS: TweakDefaults = /*EDITMODE-BEGIN*/ {
  accent: "lift",
  wordmarkAccent: "bracket",
  heroVariant: "pr",
  heroCopy: "autopilot",
  cardTone: "neutral",
  accentStrategy: "split",
} /*EDITMODE-END*/
