// Landing page island — Nav + sections + Footer rendered as a single
// React tree. This is the "one big island" pattern from spec 0001;
// slices 0003–0008 will split it into per-section Astro components.
import React from "react"

import { TWEAK_DEFAULTS } from "../../data/tweak-defaults"
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
import { Benefits } from "../sections/benefits"
import { FAQ } from "../sections/faq"
import { FinalCTA } from "../sections/final-cta"
import { Footer } from "../sections/footer"
import { Hero } from "../sections/hero"
import { HowItWorks } from "../sections/how-it-works"
import { TopNav } from "../sections/nav"
import { Problems } from "../sections/problems"
import { TrustedBy } from "../sections/trusted-by"

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

  return (
    <>
      <TopNav wordmarkAccent={tweaks.wordmarkAccent} isLandingPage />
      <main>
        <Hero heroVariant={tweaks.heroVariant} heroCopy={tweaks.heroCopy} />
        <TrustedBy />
        <Problems />
        <HowItWorks />
        <Benefits />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer wordmarkAccent={tweaks.wordmarkAccent} />

      {isDev && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Brand">
            <TweakRadio
              label="Accent strategy — A/B"
              value={tweaks.accentStrategy}
              onChange={(v) => setTweak("accentStrategy", v)}
              options={[
                { value: "single", label: "Purple only" },
                { value: "split", label: "Purple + coconut" },
              ]}
            />
            <UbeHuePicker
              value={tweaks.accent}
              onChange={(v) => setTweak("accent", v)}
            />
            <TweakRadio
              label="Wordmark accent"
              value={tweaks.wordmarkAccent}
              onChange={(v) => setTweak("wordmarkAccent", v)}
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
              onChange={(v) => setTweak("heroVariant", v)}
              options={[
                { value: "pr", label: "PR + crash" },
                { value: "minimal", label: "Minimal" },
                { value: "split", label: "Split" },
              ]}
            />
            <TweakSelect
              label="Headline"
              value={tweaks.heroCopy}
              onChange={(v) => setTweak("heroCopy", v)}
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
              onChange={(v) => setTweak("cardTone", v)}
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
      )}
    </>
  )
}
