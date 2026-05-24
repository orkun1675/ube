// Ube — App entry

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  accent: "lift",
  wordmarkAccent: "bracket",
  heroVariant: "pr",
  heroCopy: "autopilot",
  cardTone: "neutral",
  accentStrategy: "split",
} /*EDITMODE-END*/

// Dev pulls these from tweaks-panel.jsx + tweaks-config.jsx (both loaded as
// separate <script> tags). Prod excludes those files via build.mjs, so install
// no-ops on the global object — JSX references below then resolve to the dev
// implementation or the noop, whichever is present. TWEAK_DEFAULTS still ships.
globalThis.useTweaks ??= (defaults) => [defaults, () => {}]
globalThis.TweaksPanel ??= () => null
globalThis.TweakSection ??= () => null
globalThis.TweakRadio ??= () => null
globalThis.TweakSelect ??= () => null
globalThis.UbeHuePicker ??= () => null

// Path-based "router". Each route is its own static HTML file in dist/ that
// loads the same bundle; this function picks which page body to render.
// Defensive against SSR (window.location is undefined in Node) — defaults
// to "landing", which matches what build.mjs SSR's into dist/index.html.
const ROUTES = {
  "/terms-of-service": "terms",
  "/privacy-policy": "privacy",
}
const currentRoute = () => {
  const p = window.location?.pathname?.replace(/\/+$/, "") || "/"
  return ROUTES[p] || "landing"
}

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [route, setRoute] = React.useState(currentRoute)

  React.useEffect(() => {
    const onPop = () => setRoute(currentRoute())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

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

  // Apply card tone — only affects .card / .card-band, mock UIs stay neutral.
  React.useEffect(() => {
    const t = CARD_TONES[tweaks.cardTone] || CARD_TONES.warm
    const r = document.documentElement.style
    r.setProperty("--card-bg", t.bg)
    r.setProperty("--card-border", t.border)
  }, [tweaks.cardTone])

  // A/B: "single" = purple does everything (legacy); "split" = purple kept
  // for interactive (CTAs, links, focus, "cumbersome", impact stat) and
  // coconut cream takes the structural marks (eyebrows, step numbers, icon
  // chips, wordmark, active nav dot).
  React.useEffect(() => {
    document.body.dataset.accentMode = tweaks.accentStrategy || "split"
  }, [tweaks.accentStrategy])

  const openFrom = React.useCallback((source) => {
    track("request_access_modal_opened", { source })
    setModalOpen(true)
  }, [])
  const openFromNav = React.useCallback(() => openFrom("nav"), [openFrom])
  const openFromHero = React.useCallback(() => openFrom("hero"), [openFrom])
  const openFromFinalCta = React.useCallback(
    () => openFrom("final_cta"),
    [openFrom],
  )
  const close = React.useCallback(() => setModalOpen(false), [])

  useEngagementTracking()
  useScrollDepthTracking()

  const page =
    route === "terms" ? (
      <TermsPage />
    ) : route === "privacy" ? (
      <PrivacyPage />
    ) : (
      <LandingPage
        onRequestAccess={openFromHero}
        onRequestAccessFromFinalCta={openFromFinalCta}
        heroVariant={tweaks.heroVariant}
        heroCopy={tweaks.heroCopy}
      />
    )

  return (
    <>
      <TopNav
        onRequestAccess={openFromNav}
        wordmarkAccent={tweaks.wordmarkAccent}
        isLandingPage={route === "landing"}
      />
      {page}
      <Footer wordmarkAccent={tweaks.wordmarkAccent} />
      <RequestAccessModal open={modalOpen} onClose={close} />

      {route === "landing" && (
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

// Expose App so the SSR step in build.mjs can renderToString it. (Same
// pattern as every other Object.assign(window, …) in this codebase.)
Object.assign(window, { App })

// Mount on the browser. Guarded so the same bundle can run in Node during
// the SSR pre-render step (where `document` doesn't exist). In production
// the root already contains pre-rendered markup → hydrateRoot reuses it; in
// dev the root is empty → createRoot does a fresh client render. This avoids
// hydration-mismatch warnings when opening index.html directly.
if (typeof document !== "undefined") {
  const container = document.getElementById("root")
  if (container.firstChild) {
    ReactDOM.hydrateRoot(container, <App />)
  } else {
    ReactDOM.createRoot(container).render(<App />)
  }
}
