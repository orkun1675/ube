// Ube — App entry

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "lift",
  "wordmarkAccent": "bracket",
  "heroVariant": "pr",
  "heroCopy": "autopilot",
  "cardTone": "neutral",
  "accentStrategy": "split"
}/*EDITMODE-END*/;

// OKLCH values sampled directly from the ube flesh photo. The image is
// entirely ube interior, so hue barely moves (319°–331°) but lightness
// spans rim-light highlights down to shadow cores. Each swatch carries its
// own L/C/H so the picker reflects the real range of the tuber.
const UBE_HUES = [
  { value: "lift",   H: 319, L: 0.62, C: 0.20, name: "Lifted Flesh", note: "rim-lit highlight" },
  { value: "flesh",  H: 321, L: 0.56, C: 0.21, name: "Ube Flesh",    note: "the iconic vivid violet" },
  { value: "heart",  H: 322, L: 0.48, C: 0.20, name: "Tuber Heart",  note: "rich saturated mid" },
  { value: "deep",   H: 324, L: 0.40, C: 0.17, name: "Deep Ube",     note: "flesh in shade" },
  { value: "core",   H: 325, L: 0.33, C: 0.14, name: "Plum Core",    note: "shadow plum" },
  { value: "wine",   H: 327, L: 0.24, C: 0.10, name: "Wine Edge",    note: "darkest cavity" },
];
const UBE_DEFAULT_KEY = "lift";
const getUbe = (key) => UBE_HUES.find((u) => u.value === key) || UBE_HUES.find((u) => u.value === UBE_DEFAULT_KEY);

const CARD_TONES = {
  warm:    { bg: "#1D1B15", border: "#2A2720" }, // Cursor-style warm brown
  neutral: { bg: "#161617", border: "#23232A" }, // pure charcoal, no hue
  slate:   { bg: "#13151B", border: "#21242E" }, // cool blue-slate
  plum:    { bg: "#181320", border: "#251E33" }, // violet, ties to accent
  forest:  { bg: "#121814", border: "#1F2A23" }, // deep green
};

// Inject the picker's CSS once. Lives outside React so it survives re-renders
// and we don't carry a style tag in component output.
(function injectUbeHueCss(){
  if (document.getElementById("ube-hue-css")) return;
  const css = `
    .ube-hues{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:2px}
    .ube-hue{position:relative;appearance:none;border:0;padding:0;cursor:pointer;
      height:54px;border-radius:7px;overflow:hidden;
      box-shadow:0 0 0 .5px rgba(0,0,0,.14),0 1px 2px rgba(0,0,0,.08);
      transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .14s}
    .ube-hue:hover{transform:translateY(-1px);
      box-shadow:0 0 0 .5px rgba(0,0,0,.22),0 5px 12px rgba(0,0,0,.14)}
    .ube-hue[data-on="1"]{box-shadow:0 0 0 1.6px rgba(0,0,0,.85),
      0 3px 8px rgba(0,0,0,.18)}
    .ube-hue-fill{position:absolute;inset:0}
    .ube-hue-grad{position:absolute;inset:0;
      background:linear-gradient(135deg,
        oklch(calc(var(--l) + 0.12) var(--c) var(--h)) 0%,
        oklch(var(--l) var(--c) var(--h)) 55%,
        oklch(calc(var(--l) - 0.14) calc(var(--c) - 0.04) var(--h)) 100%)}
    .ube-hue-name{position:absolute;left:7px;right:7px;bottom:5px;
      font:600 10px/1.1 Inter,system-ui,sans-serif;letter-spacing:.01em;
      color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.45);
      text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .ube-hue-check{position:absolute;top:6px;right:6px;width:14px;height:14px;
      border-radius:50%;background:rgba(255,255,255,.96);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 1px 2px rgba(0,0,0,.25)}
    .ube-hue-check svg{width:9px;height:9px}
    .ube-hue-meta{display:flex;justify-content:space-between;align-items:baseline;
      margin-top:8px;font:500 10px/1.2 Inter,system-ui,sans-serif;
      color:rgba(41,38,27,.62);letter-spacing:.02em}
    .ube-hue-meta b{font-weight:600;color:rgba(41,38,27,.86)}
  `;
  const el = document.createElement("style");
  el.id = "ube-hue-css";
  el.textContent = css;
  document.head.appendChild(el);
})();

function UbeHuePicker({ value, onChange }) {
  const current = getUbe(value);
  return (
    <TweakRow label="Accent — Ube palette">
      <div className="ube-hues" role="radiogroup" aria-label="Accent hue">
        {UBE_HUES.map((u) => {
          const on = u.value === value;
          return (
            // biome-ignore lint/a11y/useSemanticElements: dev-only color picker uses styled <button>s in a radiogroup; converting to <input type="radio"> would require restyling the visual swatches
            <button
              key={u.value}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={`${u.name} (${u.H}°, L ${u.L})`}
              title={`${u.name} · ${u.note} · ${u.H}°`}
              data-on={on ? "1" : "0"}
              className="ube-hue"
              onClick={() => onChange(u.value)}
            >
              <span
                className="ube-hue-grad"
                style={{ "--h": u.H, "--l": u.L, "--c": u.C }}
              />
              <span className="ube-hue-name">{u.name}</span>
              {on && (
                <span className="ube-hue-check">
                  <svg viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M3 7.2 5.8 10 11 4.2" fill="none"
                          stroke="#111" strokeWidth="2.4"
                          strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="ube-hue-meta">
        <span><b>{current.name}</b> · {current.note}</span>
        <span>{current.H}°</span>
      </div>
    </TweakRow>
  );
}

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [modalOpen, setModalOpen] = React.useState(false);

  // Apply accent from the chosen ube swatch — use its sampled L/C/H so the
  // picker actually changes the brand color, not just its hue angle.
  React.useEffect(() => {
    const u = getUbe(tweaks.accent);
    const accent      = `oklch(${u.L} ${u.C} ${u.H})`;
    const accentHover = `oklch(${Math.min(0.72, u.L + 0.10)} ${u.C} ${u.H})`;
    const accentSoft  = `oklch(${Math.max(0.18, u.L - 0.26)} ${Math.max(0.06, u.C - 0.08)} ${u.H})`;
    const accentTint  = `oklch(${u.L} ${u.C} ${u.H} / 0.14)`;
    const r = document.documentElement.style;
    r.setProperty("--accent", accent);
    r.setProperty("--accent-hover", accentHover);
    r.setProperty("--accent-soft", accentSoft);
    r.setProperty("--accent-tint", accentTint);
  }, [tweaks.accent]);

  // Apply card tone — only affects .card / .card-band, mock UIs stay neutral.
  React.useEffect(() => {
    const t = CARD_TONES[tweaks.cardTone] || CARD_TONES.warm;
    const r = document.documentElement.style;
    r.setProperty("--card-bg", t.bg);
    r.setProperty("--card-border", t.border);
  }, [tweaks.cardTone]);

  // A/B: "single" = purple does everything (legacy); "split" = purple kept
  // for interactive (CTAs, links, focus, "cumbersome", impact stat) and
  // coconut cream takes the structural marks (eyebrows, step numbers, icon
  // chips, wordmark, active nav dot).
  React.useEffect(() => {
    document.body.dataset.accentMode = tweaks.accentStrategy || "split";
  }, [tweaks.accentStrategy]);

  const open = React.useCallback(() => setModalOpen(true), []);
  const close = React.useCallback(() => setModalOpen(false), []);

  return (
    <>
      <TopNav onRequestAccess={open} wordmarkAccent={tweaks.wordmarkAccent}/>
      <main>
        <Hero onRequestAccess={open} heroVariant={tweaks.heroVariant} heroCopy={tweaks.heroCopy}/>
        <TrustedBy/>
        <Problems/>
        <HowItWorks/>
        <Benefits/>
        <FAQ/>
        <FinalCTA onRequestAccess={open}/>
      </main>
      <Footer wordmarkAccent={tweaks.wordmarkAccent}/>
      <RequestAccessModal open={modalOpen} onClose={close}/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Brand">
          <TweakRadio
            label="Accent strategy — A/B"
            value={tweaks.accentStrategy}
            onChange={(v) => setTweak("accentStrategy", v)}
            options={[
              { value: "single", label: "Purple only" },
              { value: "split",  label: "Purple + coconut" },
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
              { value: "agent",     label: "An agent that maintains your app…" },
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
              { value: "warm",    label: "Warm — brown (Cursor)" },
              { value: "neutral", label: "Neutral — charcoal" },
              { value: "slate",   label: "Slate — cool blue" },
              { value: "plum",    label: "Plum — violet (matches accent)" },
              { value: "forest",  label: "Forest — deep green" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
