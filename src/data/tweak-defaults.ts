// Tweak defaults — the in-page dev panel mutates the EDITMODE-marked block
// below; the host rewrites it on disk via the `__edit_mode_set_keys` message
// (slice 0009 wires the writeback for the Astro build; until then the panel
// edits are in-memory only).
export type TweakDefaults = {
  accent: string
  wordmarkAccent: string
  heroVariant: string
  heroCopy: string
  cardTone: string
  accentStrategy: string
}

export const TWEAK_DEFAULTS: TweakDefaults = /*EDITMODE-BEGIN*/ {
  accent: "lift",
  wordmarkAccent: "bracket",
  heroVariant: "pr",
  heroCopy: "autopilot",
  cardTone: "neutral",
  accentStrategy: "split",
} /*EDITMODE-END*/
