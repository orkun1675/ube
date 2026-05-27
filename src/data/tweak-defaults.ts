// Tweak defaults — the in-page dev panel mutates the EDITMODE-marked block
// below. The Vite dev middleware at `POST /__tweaks` (see
// `src/dev/tweaks-writeback-plugin.ts` and ADR 0005) rewrites this region on
// disk; Vite HMR then re-renders the page with the new defaults. The
// middleware's parser expects each line in the block to be `key: "value",`,
// so don't reformat it by hand.
export type AccentValue = "lift" | "flesh" | "heart" | "deep" | "core" | "wine"
export type HeroVariant = "pr" | "minimal" | "split"
export type HeroCopy = "agent" | "autopilot"
export type CardTone = "warm" | "neutral" | "slate" | "plum" | "forest"
export type AccentStrategy = "single" | "split"

export type TweakDefaults = {
  accent: AccentValue
  heroVariant: HeroVariant
  heroCopy: HeroCopy
  cardTone: CardTone
  accentStrategy: AccentStrategy
}

export const TWEAK_DEFAULTS: TweakDefaults = /*EDITMODE-BEGIN*/ {
  accent: "lift",
  heroVariant: "pr",
  heroCopy: "autopilot",
  cardTone: "neutral",
  accentStrategy: "split",
} /*EDITMODE-END*/
