// Tweaks panel mount (spec 0008). Pre-slice, the panel was rendered from
// inside LandingPageApp; spec 0008 hoists the mount up to BaseLayout so the
// per-page app islands can be deleted. BaseLayout gates this with
// `import.meta.env.DEV && <TweaksPanelMount client:only="react" />`, so the
// entire module is excluded from production bundles (Vite tree-shakes
// dev-only imports under `import.meta.env.DEV` branches).
//
// What lives here: the `useTweaks` hook + the CSS-variable side effects
// that translate tweak values into `:root` custom properties and the
// `data-accent-mode` body attribute. These side effects are what give the
// in-page panel its live preview.
//
// Production note: the production code path never instantiates this
// component, so production reads its initial accent / cardTone /
// accentStrategy from the inline `<style>` block in
// `src/pages/index.astro` (also derived from `TWEAK_DEFAULTS`). Spec 0009
// will wire the EDITMODE writeback so panel mutations persist to source.
import React from "react"

import {
  type AccentStrategy,
  type AccentValue,
  type CardTone,
  type HeroCopy,
  type HeroVariant,
  TWEAK_DEFAULTS,
  type WordmarkAccent,
} from "@/data/tweak-defaults"
import { CARD_TONES, getUbe } from "@/lib/palette"
import { UbeHuePicker } from "./tweaks-config"
import {
  TweakRadio,
  TweakSection,
  TweakSelect,
  TweaksPanel,
  useTweaks,
} from "./tweaks-panel"

export const TweaksPanelMount = () => {
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
