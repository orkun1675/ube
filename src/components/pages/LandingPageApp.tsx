// Landing page side-effects + dev tweaks panel island.
//
// Pre-spec-0003 this island also rendered the entire visible tree (Nav +
// every section + Footer). Spec 0003 moved the four pure-static sections
// (TrustedBy, Problems, Benefits, Footer) to .astro components rendered
// outside the React tree, and subsequent slices (0005 Nav, 0006 FinalCta,
// 0007 Hero) converted further sections to static .astro. The remaining
// React sections (HowItWorks, FAQ) are each mounted directly in
// `src/pages/index.astro` as their own island.
//
// What stays in this island: global side effects (CSS variable mutations
// from tweaks, engagement + scroll-depth tracking) and the dev-only tweaks
// panel. It renders no visible content of its own.
//
// Caveat: in dev, panel mutations to `wordmarkAccent` / `heroVariant` /
// `heroCopy` no longer hot-update Nav and Hero (those are static .astro
// reading TWEAK_DEFAULTS at build time). A full reload picks up the new
// defaults. CSS-variable tweaks (accent, cardTone, accentStrategy) still
// propagate everywhere via the document root.
// Spec 0008 reworks the tweaks panel mount; spec 0009 wires writeback so
// changes persist to source. Production is unaffected — the panel only
// exists when `import.meta.env.DEV`.
import React from "react"

import {
  type AccentStrategy,
  type AccentValue,
  type CardTone,
  type HeroCopy,
  type HeroVariant,
  TWEAK_DEFAULTS,
  type WordmarkAccent,
} from "../../data/tweak-defaults"
import { UbeHuePicker } from "../../dev/tweaks-config"
import {
  TweakRadio,
  TweakSection,
  TweakSelect,
  TweaksPanel,
  useTweaks,
} from "../../dev/tweaks-panel"
import {
  useEngagementTracking,
  useScrollDepthTracking,
} from "../../lib/analytics"
import { CARD_TONES, getUbe } from "../../lib/palette"

const isDev = import.meta.env.DEV

export const LandingPageApp = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS)

  // Apply accent from the chosen ube swatch — use its sampled L/C/H so the
  // picker actually changes the brand color, not just its hue angle.
  React.useEffect(() => {
    const u = getUbe(tweaks.accent)
    const accent = `oklch(${u.L} ${u.C} ${u.H})`
    const accentHover = `oklch(${Math.min(0.72, u.L + 0.1)} ${u.C} ${u.H})`
    const accentSoft = `oklch(${Math.max(0.18, u.L - 0.26)} ${Math.max(0.06, u.C - 0.08)} ${u.H})`
    const accentTint = `oklch(${u.L} ${u.C} ${u.H} / 0.14)`
    const r = document.documentElement.style
    r.setProperty("--accent", accent)
    r.setProperty("--accent-hover", accentHover)
    r.setProperty("--accent-soft", accentSoft)
    r.setProperty("--accent-tint", accentTint)
  }, [tweaks.accent])

  React.useEffect(() => {
    // biome-ignore lint/complexity/useLiteralKeys: tsconfig `noPropertyAccessFromIndexSignature` requires bracket access for Record<string, …>
    const t = CARD_TONES[tweaks.cardTone] || CARD_TONES["warm"]
    if (!t) return
    const r = document.documentElement.style
    r.setProperty("--card-bg", t.bg)
    r.setProperty("--card-border", t.border)
  }, [tweaks.cardTone])

  // A/B: "single" = purple does everything (legacy); "split" = purple kept
  // for interactive (CTAs, links, focus, "cumbersome", impact stat) and
  // coconut cream takes the structural marks.
  React.useEffect(() => {
    // biome-ignore lint/complexity/useLiteralKeys: tsconfig `noPropertyAccessFromIndexSignature` requires bracket access for DOMStringMap
    document.body.dataset["accentMode"] = tweaks.accentStrategy || "split"
  }, [tweaks.accentStrategy])

  useEngagementTracking()
  useScrollDepthTracking()

  if (!isDev) return null

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Brand">
        <TweakRadio
          label="Accent strategy — A/B"
          value={tweaks.accentStrategy}
          onChange={(v) => setTweak("accentStrategy", v as AccentStrategy)}
          options={[
            { value: "single", label: "Purple only" },
            { value: "split", label: "Purple + coconut" },
          ]}
        />
        <UbeHuePicker
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v as AccentValue)}
        />
        <TweakRadio
          label="Wordmark accent"
          value={tweaks.wordmarkAccent}
          onChange={(v) => setTweak("wordmarkAccent", v as WordmarkAccent)}
          options={[
            { value: "umlaut", label: "Umlaut" },
            { value: "cursor", label: "Cursor" },
            { value: "bracket", label: "Brackets" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Hero">
        <TweakRadio
          label="Hero visual"
          value={tweaks.heroVariant}
          onChange={(v) => setTweak("heroVariant", v as HeroVariant)}
          options={[
            { value: "pr", label: "PR + crash" },
            { value: "minimal", label: "Minimal" },
            { value: "split", label: "Split" },
          ]}
        />
        <TweakSelect
          label="Headline"
          value={tweaks.heroCopy}
          onChange={(v) => setTweak("heroCopy", v as HeroCopy)}
          options={[
            { value: "agent", label: "An agent that maintains your app…" },
            { value: "autopilot", label: "App maintenance, on autopilot." },
          ]}
        />
      </TweakSection>
      <TweakSection title="Cards">
        <TweakSelect
          label="Card tone"
          value={tweaks.cardTone}
          onChange={(v) => setTweak("cardTone", v as CardTone)}
          options={[
            { value: "warm", label: "Warm — brown (Cursor)" },
            { value: "neutral", label: "Neutral — charcoal" },
            { value: "slate", label: "Slate — cool blue" },
            { value: "plum", label: "Plum — violet (matches accent)" },
            { value: "forest", label: "Forest — deep green" },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  )
}
