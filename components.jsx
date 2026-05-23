// Ube — Section components

// Global constants
const CONTACT_EMAIL = "hello@chunkytofustudios.com";
const GITHUB_URL = "https://github.com/orkun1675/ube";

// =====================================================================
//  Wordmark
// =====================================================================
const Wordmark = ({ accent = "cursor", size = 22 }) => {
  const style = { fontSize: size };
  if (accent === "umlaut") {
    return (
      <span className="wordmark wordmark-umlaut" style={style}>
        <span className="wm-u-wrap">
          u
          <span className="wm-umlaut" aria-hidden="true"><i></i><i></i></span>
        </span>be
      </span>);

  }
  if (accent === "cursor") {
    return (
      <span className="wordmark wordmark-cursor" style={style}>
        <span className="wm-word">ube</span>
        <span className="wm-cursor" aria-hidden="true"></span>
      </span>);

  }
  if (accent === "bracket") {
    return (
      <span className="wordmark wordmark-bracket" style={style}>
        <span className="wm-bracket wm-bracket-l" aria-hidden="true"></span>
        <span className="wm-word">ube</span>
        <span className="wm-bracket wm-bracket-r" aria-hidden="true"></span>
      </span>);

  }
  // legacy fallthrough — preserved so old saved values still render
  return (
    <span className={`wordmark wordmark-${accent}`} style={style}>
      {accent === "fill" ? <><span className="wm-u">u</span>be</> : <>ube</>}
    </span>);

};


// =====================================================================
//  Top Nav
// =====================================================================
const TopNav = ({ onRequestAccess, wordmarkAccent }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open + close on Esc.
  React.useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {if (e.key === "Escape") setMenuOpen(false);};
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
    <nav className={`topnav ${scrolled ? "scrolled" : ""}`}>
      <div className="container topnav-inner" style={{ position: "relative" }}>
        <a href="#top" style={{ textDecoration: "none" }}>
          <Wordmark accent={wordmarkAccent} size={30} />
        </a>

        <div className="nav-center">
          <span className="nav-link coming-soon">
            Publisher
            <span className="tooltip">Coming soon</span>
          </span>
          <a href="/maintainer" className="nav-link active">Maintainer</a>
          <span className="nav-link coming-soon">
            Pricing
            <span className="tooltip">Coming soon</span>
          </span>
        </div>

        <div className="nav-right-actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={onRequestAccess}>
            Request access
          </button>
        </div>

        <button type="button" className="menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </nav>

    {menuOpen && ReactDOM.createPortal(
        <div className="mobile-menu" role="dialog" aria-modal="true">
        <div className="mobile-menu-header">
          <Wordmark accent={wordmarkAccent} size={28} />
          <button type="button" className="menu-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <span style={{ display: "inline-flex", transform: "rotate(45deg)" }}>
              <PlusIcon size={18} />
            </span>
          </button>
        </div>
        <div className="mobile-menu-links">
          <span className="mobile-menu-link coming-soon">Publisher <span className="mobile-menu-tag">soon</span></span>
          <a href="/maintainer" onClick={() => setMenuOpen(false)} className="mobile-menu-link active">Maintainer</a>
          <span className="mobile-menu-link coming-soon">Pricing <span className="mobile-menu-tag">soon</span></span>
        </div>
        <button type="button" className="btn btn-primary mobile-menu-cta" onClick={() => {setMenuOpen(false);onRequestAccess();}}>
          Request access
          <ArrowRight size={14} />
        </button>
      </div>,
        document.body
      )}
    </>);

};

// =====================================================================
//  Hero
// =====================================================================
const Hero = ({ onRequestAccess, heroVariant = "pr", heroCopy = "autopilot" }) => {
  const visual =
  heroVariant === "minimal" ? <HeroMinimal /> :
  heroVariant === "split" ? <HeroSplit /> :
  <HeroPRComposite />;

  const headline = heroCopy === "autopilot" ? (
    <h1 className="t-display-mega" style={{ margin: 0, color: "var(--ink)" }}>
      App maintenance, <br />
      <span style={{ color: "var(--muted)" }}>on autopilot.</span>
    </h1>
  ) : (
    <h1 className="t-display-mega" style={{ margin: 0, color: "var(--ink)" }}>
      An agent that <br />maintains your app <br />
      <span style={{ color: "var(--muted)" }}>while you continue to build.</span>
    </h1>
  );

  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div className="fade-in">
            <div className="eyebrow" style={{ marginBottom: 28 }}>Ube Maintainer</div>
            {headline}
            <p className="t-body-md body" style={{ marginTop: 28, maxWidth: 480, lineHeight: 1.6 }}>Ube listens to your crash reports, user feedback, and dependency upgrades — then triages, reproduces, and opens verified PRs. You ship features. It handles the rest.



            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <button type="button" className="btn btn-primary" onClick={onRequestAccess}>
                Request access
                <ArrowRight size={14} />
              </button>
              <a className="btn btn-secondary" href="#how">
                See how it works
              </a>
            </div>
            <div className="hero-builtfor" style={{ marginTop: 36, color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase" }}>
              <span className="hero-builtfor__label">Built for</span>
              <span className="hero-builtfor__chip"><FlutterLogo size={14} /> Flutter</span>
              <span className="hero-builtfor__chip"><ReactLogo size={14} /> React Native</span>
              <span className="hero-builtfor__chip"><ExpoLogo size={14} /> Expo</span>
              <span className="hero-builtfor__chip"><AppleLogo size={14} /> iOS</span>
              <span className="hero-builtfor__chip"><AndroidLogo size={14} /> Android</span>
            </div>
          </div>
          <div className="fade-in" style={{ animationDelay: "120ms" }}>
            {visual}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
      `}</style>
    </section>);

};

// =====================================================================
//  Trusted In Production By (expo.dev-style logo marquee)
// =====================================================================
const TRUSTED_APPS = [
{ src: "assets/customers/beehive.webp", name: "Beehive — Word Puzzle Challenge" },
{ src: "assets/customers/dozy.webp", name: "Dozy — Commute Companion" },
{ src: "assets/customers/pixel-buddy.webp", name: "Pixel Buddy — Coloring Book" }];


const TrustedBy = () => {
  // Repeat the 3-app set, then double the whole strip so translateX(-50%) loops seamlessly.
  const sequence = React.useMemo(() => {
    const halfRepeats = 6;
    const half = [];
    for (let i = 0; i < halfRepeats; i++) half.push(...TRUSTED_APPS);
    return [...half, ...half];
  }, []);

  return (
    <section className="trusted-band" aria-label="Apps using Ube in production">
      <div className="trusted-band-grid" aria-hidden="true" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <span className="trusted-label">Trusted in production by:</span>
      </div>
      <div className="trusted-marquee" style={{ position: "relative", zIndex: 1 }}>
        <div className="trusted-track">
          {sequence.map((app, i) =>
          <div key={i} className="trusted-icon" title={app.name}>
              <img src={app.src} alt={app.name} loading="lazy" draggable="false" />
            </div>
          )}
        </div>
      </div>
    </section>);

};

// =====================================================================
//  Problems
// =====================================================================
const Problems = () => {
  const cards = [
  {
    icon: <FlaskIcon size={26} />,
    title: "Tests get skipped.",
    body: "Engineers read the stacktrace or eyeball the migration doc. They ship \"simple fixes\" without proper QA. The bug survives the release and results in customer churn."
  },
  {
    icon: <StackIcon size={26} />,
    title: "Unfixable bugs pile up.",
    body: "Dependency issues, hardware specific edge cases, intermittent crashes — all require hours of debugging. And when the root cause is upstream, filing a proper bug report is rarely worth the effort."
  },
  {
    icon: <ClockIcon size={26} />,
    title: "Maintenance delays releases.",
    body: "Internal testers find a missing null check moments before release. Engineering gets pulled back in. The exciting feature you actually shipped this sprint slips to next."
  }];


  return (
    <section className="section" style={{ background: "var(--canvas)" }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>THE PROBLEM</div>
        <h2 className="t-display-lg" style={{ margin: 0, maxWidth: 760 }}>
          App maintenance is <span style={{ color: "var(--accent-2)" }}>cumbersome.</span>
        </h2>
        <div className="grid-3 problems-grid" style={{ marginTop: 56 }}>
          {cards.map((c) =>
          <div key={c.title} className="card card-hover" style={{ padding: 28 }}>
              <div style={{
              width: 50, height: 50, borderRadius: 10,
              background: "var(--mark-tint)",
              color: "var(--mark)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: 22,
              border: "1px solid color-mix(in oklab, var(--mark) 25%, transparent)"
            }}>{c.icon}</div>
              <div className="t-title-md ink" style={{ marginBottom: 10 }}>{c.title}</div>
              <p className="t-body-sm body" style={{ margin: 0, lineHeight: 1.6 }}>{c.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

};

// =====================================================================
//  How It Works
// =====================================================================
const Step = ({ num, label, title, body, learnMore, onLearnMore, disabled, visual, reversed }) =>
<div className="card-band" style={{
  display: "grid",
  gridTemplateColumns: reversed ? "1fr 1.4fr" : "1.4fr 1fr",
  gap: 48,
  alignItems: "center",
  marginBottom: 24
}}>
    {/* Visual (always first DOM-wise so it appears first on mobile when stacked? — actually we want copy first on mobile typically). Let's order DOM by reversed flag */}
    {!reversed &&
  <div className="step-visual" style={{ minWidth: 0 }}>{visual}</div>
  }

    <div className="step-copy" style={{ minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <span className="step-num">{num}</span>
        <span className="eyebrow" style={{ margin: 0 }}>{label}</span>
      </div>
      <div className="t-display-md ink" style={{ marginBottom: 16, lineHeight: 1.2 }}>{title}</div>
      <p className="t-body-md body" style={{ margin: 0, marginBottom: 18, lineHeight: 1.65 }}>{body}</p>
      {learnMore && (
    disabled ?
    <span className="inline-link coming-soon" aria-disabled="true" style={{ opacity: 0.4 }}>
          {learnMore} <ArrowRight size={12} />
          <span className="tooltip">Coming soon</span>
        </span> :
    <button type="button" className="inline-link" onClick={onLearnMore}>
          {learnMore} <ArrowRight size={12} />
        </button>)
    }
    </div>

    {reversed &&
  <div className="step-visual" style={{ minWidth: 0 }}>{visual}</div>
  }

    <style>{`
      @media (max-width: 1024px) {
        .card-band { grid-template-columns: 1fr !important; gap: 32px !important; }
        .step-visual { order: 2; }
        .step-copy { order: 1; }
      }
    `}</style>
  </div>;


// Abstract glyph for the "Codemagic" build/symbols source.
// Original mark: stacked code-bracket halves over a stylized key shape,
// suggesting symbol/mapping resolution. Not a reproduction of any brand logo.
const _SymbolGlyph = () =>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M8.5 5.5 L4.5 12 L8.5 18.5" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5 5.5 L19.5 12 L15.5 18.5" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="1.6" fill="var(--accent)" />
  </svg>;


const SourcesModal = ({ open, onClose }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const groups = [
  {
    label: "Crash & errors",
    sources: [
    { logo: "assets/integrations/firebase.svg", name: "Firebase Crashlytics", desc: "Native crashes, ANRs, custom events" },
    { logo: "assets/integrations/sentry.svg", logoInvert: true, name: "Sentry", desc: "JS / native errors with stack traces & releases" }]

  },
  {
    label: "Store signals",
    sources: [
    { logo: "assets/integrations/google-play.png", name: "Play Console", desc: "ANRs, vitals, store reviews" },
    { logo: "assets/integrations/apple.svg", logoInvert: true, name: "App Store Connect", desc: "iOS reviews, crash reports" }]

  },
  {
    label: "Customer voice",
    sources: [
    { icon: "mail", name: "Support inboxes", desc: "Zendesk, plain email" }]

  },
  {
    label: "Dependency feeds",
    sources: [
    { logo: "assets/integrations/npm.svg", name: "npm", desc: "JS / TS package releases & security advisories" },
    { logo: "assets/integrations/bun.svg", name: "Bun", desc: "Bun runtime + registry release feed" },
    { logo: "assets/integrations/dart.svg", name: "pub.dev", desc: "Dart & Flutter package releases" }]

  },
  {
    label: "Build & symbols",
    sources: [
    { logo: "assets/integrations/codemagic.svg", name: "Codemagic", desc: "Pulls dSYMs & ProGuard mappings for de-obfuscated stack traces" }]

  }];


  const _total = groups.reduce((n, g) => n + g.sources.length, 0);
  let flatIdx = 0;

  return (
    // biome-ignore lint/a11y/useSemanticElements: backdrop wraps and centers the modal panel; cannot be a <button> which forbids nested interactive content
    <div
      className="modal-backdrop sources-modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
      role="button"
      tabIndex={-1}
      aria-label="Close modal">
      <div className="modal-panel sources-panel" role="dialog" aria-modal="true" aria-labelledby="sources-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="sources-header">
          <div className="sources-scanner" aria-hidden="true">
            <span className="scanner-grid"></span>
            <span className="scanner-ring r1"></span>
            <span className="scanner-ring r2"></span>
            <span className="scanner-sweep"></span>
            <span className="scanner-dot"></span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              SIGNAL SOURCES
            </div>
            <h3 id="sources-title" className="t-display-md" style={{ margin: 0, marginBottom: 8, lineHeight: 1.15 }}>
              Every channel your bugs hide in.
            </h3>
            <p className="t-body-md body" style={{ margin: 0 }}>Need additional integrations? <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>Reach out →</a>

            </p>
          </div>
        </div>

        <div className="sources-groups">
          {groups.map((g, gi) =>
          <div key={g.label} className="sources-group" style={{ animationDelay: `${120 + gi * 90}ms` }}>
              <div className="sources-group-label">
                <span className="sources-tick"></span>
                {g.label}
                <span className="sources-group-rule"></span>
                <span className="mono muted" style={{ fontSize: 10 }}>{g.sources.length.toString().padStart(2, "0")}</span>
              </div>
              <div className="sources-grid">
                {g.sources.map((s) => {
                const delay = 220 + flatIdx * 65;
                flatIdx++;
                return (
                  <div key={s.name} className="source-card" style={{ animationDelay: `${delay}ms` }}>
                      <div className={`source-mono ${s.logo ? "source-mono-logo" : ""} ${s.icon ? "source-mono-icon" : ""}`}>
                        {s.logo ?
                      <img src={s.logo} alt="" className={s.logoInvert ? "logo-invert" : ""} /> :
                      s.icon === "mail" ?
                      <MailIconFilled size={28} color="var(--accent)" /> :
                      s.mono}
                      </div>
                      <div className="source-meta">
                        <div className="source-name">{s.name}</div>
                        <div className="source-desc">{s.desc}</div>
                      </div>
                      <div className="source-status" title="Listening">
                        <span className="status-dot"></span>
                      </div>
                    </div>);

              })}
              </div>
            </div>
          )}
        </div>

        <div className="sources-foot" style={{ display: "none" }}>
          <span className="mono muted" style={{ fontSize: 11 }}>
            Need a custom feed? <button type="button" className="inline-link" style={{ fontSize: 11 }} onClick={onClose}>Tell us about your stack →</button>
          </span>
        </div>
      </div>
    </div>);

};

// =====================================================================
//  Dedupe Modal — flow diagram for "How issues are deduplicated"
// =====================================================================
const DedupeModal = ({ open, onClose }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    // biome-ignore lint/a11y/useSemanticElements: backdrop wraps and centers the modal panel; cannot be a <button> which forbids nested interactive content
    <div
      className="modal-backdrop dedupe-modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
      role="button"
      tabIndex={-1}
      aria-label="Close modal">
      <div className="modal-panel dedupe-panel" role="dialog" aria-modal="true" aria-labelledby="dedupe-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="dedupe-header">
          <div className="eyebrow" style={{ marginBottom: 10 }}>DEDUPLICATION</div>
          <h3 id="dedupe-title" className="t-display-md" style={{ margin: 0, marginBottom: 8, lineHeight: 1.15 }}>
            From raw crash to one tracked issue.
          </h3>
          <p className="t-body-md body" style={{ margin: 0 }}>Four steps with human-in-the-loop when needed.

          </p>
        </div>

        {/* ───── Flow diagram ───── */}
        <div className="dedupe-flow" aria-hidden="true">
          {/* Connector lines (under the cards) */}
          <svg className="dedupe-connectors" viewBox="0 0 1000 140" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="ddpipe" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.0" />
                <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* horizontal spine */}
            <line x1="125" y1="70" x2="875" y2="70" stroke="var(--hairline-strong)" strokeWidth="1" strokeDasharray="3 4" />
            {/* moving glow */}
            <rect className="dd-spine-glow" x="125" y="69" width="180" height="2" fill="url(#ddpipe)" />
          </svg>

          <div className="dd-stage" style={{ animationDelay: "60ms" }}>
            <div className="dd-num mono">01</div>
            <div className="dd-card dd-card-crash">
              <div className="dd-card-label mono">CRASH</div>
              <div className="dd-code mono">
                <span className="dd-frame-obf">_Z9a0x1f23</span>
                <span className="dd-frame-obf">sub_4f2a1c</span>
                <span className="dd-frame-obf">__pthread_kill</span>
              </div>
              <span className="dd-tag dd-tag-err">unsymbolicated</span>
            </div>
            <div className="dd-caption mono">raw frames in</div>
          </div>

          <div className="dd-stage" style={{ animationDelay: "260ms" }}>
            <div className="dd-num mono">02</div>
            <div className="dd-card dd-card-sym">
              {/* Codemagic feed pulling dSYMs / mapping */}
              <div className="dd-feed">
                <span className="dd-feed-src mono">
                  <img src="assets/integrations/codemagic.svg" alt="" className="dd-feed-src-logo" />
                  codemagic
                </span>
                <span className="dd-feed-arrow" />
                <span className="dd-feed-pkg mono">app-1.4.2.dSYM</span>
              </div>
              <div className="dd-code mono">
                <span className="dd-frame-sym"><b>OrderRepo</b>.fetch()</span>
                <span className="dd-frame-sym"><b>Net</b>.request()</span>
                <span className="dd-frame-sym"><b>main</b></span>
              </div>
              <span className="dd-tag dd-tag-ok">symbolicated</span>
            </div>
            <div className="dd-caption mono">dSYMs & Debug Symbols from Codemagic</div>
          </div>

          <div className="dd-stage" style={{ animationDelay: "460ms" }}>
            <div className="dd-num mono">03</div>
            <div className="dd-card dd-card-sig">
              <div className="dd-sig-hash mono">
                <span>9a</span><span>f3</span><span>b7</span><span>0c</span>
                <span>e1</span><span>4d</span><span>22</span><span>88</span>
              </div>
              <div className="dd-sig-inputs">
                <span className="dd-chip mono">top&nbsp;frames</span>
                <span className="dd-chip mono">iOS&nbsp;17.4</span>
                <span className="dd-chip mono">iPhone&nbsp;14</span>
                <span className="dd-chip mono">v1.4.2</span>
              </div>
            </div>
            <div className="dd-caption mono">LLM derives a signature from frames + device + version</div>
          </div>

          <div className="dd-stage" style={{ animationDelay: "660ms" }}>
            <div className="dd-num mono">04</div>
            <div className="dd-card dd-card-bucket">
              <div className="dd-bucket-id mono">ISSUE #1247</div>
              <div className="dd-bucket-row">
                <span className="dd-bucket-pip" />
                <span className="dd-bucket-pip" />
                <span className="dd-bucket-pip" />
                <span className="dd-bucket-pip dd-bucket-pip-new" />
              </div>
              <div className="dd-bucket-count">
                <span className="dd-count-num">128</span>
                <span className="mono muted" style={{ fontSize: 10 }}>occurrences</span>
              </div>
            </div>
            <div className="dd-caption mono">matched into existing bucket</div>
          </div>
        </div>

        {/* ───── Human-in-the-loop merge ───── */}
        <div className="dd-hitl">
          <div className="dd-hitl-head">
            <span className="dd-hitl-eyebrow mono">
              <span className="dd-hitl-dot" /> HUMAN&nbsp;IN&nbsp;THE&nbsp;LOOP
            </span>
            <span className="dd-hitl-sub mono">when two signatures are <em>almost</em> the same</span>
          </div>

          <div className="dd-hitl-stage">
            <div className="dd-sig-card dd-sig-a">
              <div className="dd-sig-card-id mono">9af3 b70c · e14d 2288</div>
              <div className="dd-sig-card-meta mono">iOS 17.4 · v1.4.2</div>
              <div className="dd-sig-card-count mono">128×</div>
            </div>

            <div className="dd-merge-btn mono" aria-hidden="true">merge →</div>

            <div className="dd-sig-card dd-sig-b">
              <div className="dd-sig-card-id mono">9af3 b70c · e14d <s>22</s><b>11</b></div>
              <div className="dd-sig-card-meta mono">iOS 17.5 · v1.4.2</div>
              <div className="dd-sig-card-count mono">7×</div>
            </div>

            {/* Curved connector between the two signature cards */}
            <svg className="dd-merge-arc" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
              <path className="dd-merge-arc-path" d="M 30 55 C 200 5, 400 5, 570 55" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 5" />
            </svg>
          </div>

          <p className="dd-hitl-note mono">
            Engineers can mark two signatures as identical. The bucket merges, history reconciles, <span className="accent">issue count rolls up</span>.
          </p>
        </div>
      </div>
    </div>);

};


// =====================================================================
//  Fix Loop Modal — sealed sandbox where two agents review each other
// =====================================================================
const FixLoopModal = ({ open, onClose }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    // biome-ignore lint/a11y/useSemanticElements: backdrop wraps and centers the modal panel; cannot be a <button> which forbids nested interactive content
    <div
      className="modal-backdrop fl-modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
      role="button"
      tabIndex={-1}
      aria-label="Close modal">
      <div className="modal-panel fl-panel" role="dialog" aria-modal="true" aria-labelledby="fl-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="fl-header">
          <div className="eyebrow" style={{ marginBottom: 10 }}>INSIDE THE FIX LOOP</div>
          <h3 id="fl-title" className="t-display-md" style={{ margin: 0, marginBottom: 8, lineHeight: 1.15 }}>
            A sealed box. Two adversaries.
          </h3>
          <p className="t-body-md body" style={{ margin: 0 }}>Ube agent runs and debugs the app just like a human would.
</p>
        </div>

        {/* ───── Sandbox container ───── */}
        <div className="fl-sandbox">
          <div className="fl-sandbox-chrome">
            <span className="fl-chrome-tag mono"><img src="assets/integrations/docker.svg" alt="" className="fl-chrome-logo" /> DOCKER SANDBOX</span>
            <span className="fl-chrome-image mono">ube/fix-loop:1.4.2</span>
          </div>

          <div className="fl-arena" aria-hidden="true">
            {/* Generator */}
            <div className="fl-agent fl-agent-gen">
              <img src="assets/integrations/claude-code.svg" alt="" className="fl-agent-logo" />
              <div className="fl-agent-role mono">GENERATOR</div>
              <div className="fl-agent-name">Claude Code</div>
              <div className="fl-agent-act mono">writes the patch<span className="fl-cursor">▍</span></div>
            </div>

            {/* Duel pipe */}
            <div className="fl-duel">
              <div className="fl-duel-rail" />
              <div className="fl-tok fl-tok-patch mono">+patch</div>
              <div className="fl-tok fl-tok-nit mono">nit ✕</div>
            </div>

            {/* Reviewer */}
            <div className="fl-agent fl-agent-rev">
              <img src="assets/integrations/codex.svg" alt="" className="fl-agent-logo" />
              <div className="fl-agent-role mono">REVIEWER</div>
              <div className="fl-agent-name">Codex</div>
              <div className="fl-agent-act mono">reviews it<span className="fl-cursor">▍</span></div>
            </div>
          </div>

          <div className="fl-sandbox-foot mono">
            <span>adversarial · agents loop until they agree</span>
          </div>
        </div>

        {/* ───── Curated I/O ───── */}
        <div className="fl-rails">
          <div className="fl-rail" style={{ animationDelay: "60ms" }}>
            <div className="fl-rail-head">
              <span className="fl-rail-name">ADB</span>
            </div>
            <div className="fl-phone">
              <div className="fl-phone-screen">
                <div className="fl-phone-pixels" />
                <div className="fl-phone-bug" />
              </div>
              <div className="fl-phone-tree">
                <span className="mono">View</span>
                <span className="mono">  ├ Header</span>
                <span className="mono">  ├ List<i>·tap</i></span>
                <span className="mono">  └ CTA</span>
              </div>
            </div>
            <div className="fl-rail-cap mono"><em>eyes</em> and <em>hands</em></div>
          </div>

          <div className="fl-rail" style={{ animationDelay: "180ms" }}>
            <div className="fl-rail-head">
              <span className="fl-rail-name">Mock backend</span>
            </div>
            <div className="fl-mock">
              <svg className="fl-mock-db" viewBox="0 0 64 64" width="60" height="60" aria-hidden="true">
                <defs>
                  <linearGradient id="flMockFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-soft)" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="var(--accent-soft)" stopOpacity="0.55" />
                  </linearGradient>
                </defs>
                {/* body fill */}
                <path d="M 8 12 A 24 6 0 0 1 56 12 L 56 52 A 24 6 0 0 1 8 52 Z" fill="url(#flMockFill)" />
                {/* top rim */}
                <ellipse cx="32" cy="12" rx="24" ry="6" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
                {/* sides */}
                <line x1="8" y1="12" x2="8" y2="52" stroke="var(--accent)" strokeWidth="1.4" />
                <line x1="56" y1="12" x2="56" y2="52" stroke="var(--accent)" strokeWidth="1.4" />
                {/* bottom curve (visible front) */}
                <path d="M 8 52 A 24 6 0 0 0 56 52" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
                {/* band dividers — only the visible front arc, classic DB look */}
                <path className="fl-mock-band" d="M 8 25.3 A 24 6 0 0 0 56 25.3" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.7" />
                <path className="fl-mock-band" d="M 8 38.7 A 24 6 0 0 0 56 38.7" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0.7" />
                {/* write pulse — dot that drops into the top */}
                <circle className="fl-mock-write" cx="32" cy="6" r="2.2" fill="var(--accent)" />
              </svg>
              <div className="fl-mock-flow">
                <span className="fl-mock-pkt mono">GET /orders</span>
                <span className="fl-mock-pkt mono">→ 200</span>
              </div>
            </div>
            <div className="fl-rail-cap mono">stand up local DB</div>
          </div>

          <div className="fl-rail" style={{ animationDelay: "300ms" }}>
            <div className="fl-rail-head">
              <span className="fl-rail-name">OneCLI Agent Vault</span>
            </div>
            <div className="fl-vault">
              <div className="fl-vault-key">
                <span className="fl-vault-label mono">STRIPE_SK</span>
                <span className="fl-vault-mask mono">●●●●●●●●●●●●</span>
              </div>
              <div className="fl-vault-key">
                <span className="fl-vault-label mono">OPENAI_KEY</span>
                <span className="fl-vault-mask mono">●●●●●●●●●●●●</span>
              </div>
              <div className="fl-vault-shield" aria-hidden="true" />
            </div>
            <div className="fl-rail-cap mono">agent cannot see private keys</div>
          </div>
        </div>
      </div>
    </div>);};


const HowItWorks = () => {
  const [sourcesOpen, setSourcesOpen] = React.useState(false);
  const [dedupeOpen, setDedupeOpen] = React.useState(false);
  const [fixLoopOpen, setFixLoopOpen] = React.useState(false);
  const steps = [
  {
    num: "01", label: "Intake", reversed: true,
    title: "Monitors all platforms.",
    body: "Firebase Crashlytics, Sentry, Play Console ANRs, App Store reviews, support inboxes, dependency releases — all funneled into one timeline. Nothing slips through.",
    learnMore: "Supported sources",
    onLearnMore: () => setSourcesOpen(true),
    visual: <IntakeMockup />
  },
  {
    num: "02", label: "Triage", reversed: false,
    title: "Tracks bugs across binaries.",
    body: "Stack traces are symbolized on intake, then deduplicated by signature across versions, OSes, and dependency upgrades. Per-issue state lives on a single dashboard — the source of truth your maintenance agent reads from.",
    learnMore: "How issues are deduplicated",
    onLearnMore: () => setDedupeOpen(true),
    visual: <TriageMockup />
  },
  {
    num: "03", label: "Fix", reversed: true,
    title: "Reproduce, patch, verify — then open the PR.",
    body: "Ube reproduces the bug on an emulator, writes the patch, and runs your test suite — then QAs the app by hand, clicking through like a real user. Once the issue is verified fixed and nothing else broke, it opens a PR. Watch the GIFs, read the diff, merge.",
    learnMore: "Inside the fix loop",
    onLearnMore: () => setFixLoopOpen(true),
    visual: <FixMockup />
  },
  {
    num: "04", label: "Release", reversed: false,
    title: "Close the loop with the customer who reported it.",
    body: "Once the fix ships, Ube tracks which release it landed in, when it rolled out to production, and writes back to the original reporter. Angry one-star reviews turn into thank-yous, and your rating climbs week over week.",
    learnMore: "Customer reply policies",
    disabled: true,
    visual: <ReportSuccessMockup />
  },
  {
    num: "05", label: "Escalate", reversed: true,
    title: "Reports bugs upstream when needed.",
    body: "When facing an upstream bug, Ube opens a detailed issue on their repo — with repro steps, logs, and a minimal reproduction. When it can't reproduce or resolve a bug itself, it hands the thread back with everything it learned.",
    learnMore: "View sample bug report",
    disabled: true,
    visual: <ReportFailureMockup />
  }];


  return (
    <section className="section" id="how" style={{ background: "var(--canvas-soft)" }} data-screen-label="How It Works">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>THE SOLUTION</div>
        <h2 className="t-display-lg" style={{ margin: 0, marginBottom: 14, maxWidth: 760 }}>
          Ube runs on your repo<br />around the clock.
        </h2>
        <p className="t-body-md body" style={{ margin: 0, marginBottom: 48, maxWidth: 640 }}>Set up in 10 minutes. Automated from then on.</p>

        <div>
          {steps.map((s) =>
          <Step key={s.num} {...s} />
          )}
        </div>
      </div>
      <SourcesModal open={sourcesOpen} onClose={() => setSourcesOpen(false)} />
      <DedupeModal open={dedupeOpen} onClose={() => setDedupeOpen(false)} />
      <FixLoopModal open={fixLoopOpen} onClose={() => setFixLoopOpen(false)} />
    </section>);

};

// =====================================================================
//  Benefits
// =====================================================================
const Benefits = () => {
  const cards = [
  { icon: <SparkIcon />, title: "Reclaim engineering time.", body: "Stop spending a third of every sprint debugging race conditions you didn't write. Hand the boring triage to Ube and continue shipping delightful features." },
  { icon: <ChatIcon />, title: "Your backlog stays lean.", body: "Every incoming bug report is triaged, fixed, or followed up on — automatically. Nothing rots in the queue, so your task list stays short." },
  { icon: <ShieldIcon />, title: "Catch bugs early.", body: "Ube becomes your manual QA agent, clicks around the app like a human would. You no longer need to wait for a beta or alpha release to discover bugs." },
  { icon: <TrendIcon />, title: "Stay under Play's bad-behavior threshold.", body: "Apps crashing on more than 1.09% of sessions or hitting ANRs above 0.47% get demoted in Play discoverability." },
  { icon: <StarIcon />, title: "Higher app-store ratings.", body: "Faster fixes plus a personal follow-up nudges users back into the review flow. Updated reviews compound into a better average rating for your app." },
  { icon: <RocketIcon />, title: "Keep tech debt in check.", body: "Agentic coding ships features faster than ever — and quietly piles up bugs and shortcuts. Ube does the unglamorous cleanup in the background so velocity doesn't come to a halt." }];


  return (
    <section className="section" style={{ background: "var(--canvas)" }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>Outcomes</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "end" }} className="benefits-head">
          <h2 className="t-display-lg" style={{ margin: 0, maxWidth: 520 }}>
            Less time maintaining.<br />More time building.
          </h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
            <div className="t-display-mega benefits-stat" style={{ color: "var(--accent)", fontSize: "clamp(40px, 7vw, 70.4px)", lineHeight: 1, letterSpacing: "-3px", whiteSpace: "nowrap" }}>
              10-30%
            </div>
            <div className="t-body-md body benefits-stat-caption" style={{ maxWidth: 230, textWrap: "balance" }}>
              of your team's engineering time reclaimed, based on early teams running Ube.
            </div>
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: 64 }}>
          {cards.map((c) =>
          <div key={c.title} className="card card-hover" style={{ padding: 24 }}>
              <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: "var(--mark-tint)",
              color: "var(--mark)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: 20,
              border: "1px solid color-mix(in oklab, var(--mark) 25%, transparent)"
            }}>{c.icon}</div>
              <div className="t-title-md ink" style={{ marginBottom: 10 }}>{c.title}</div>
              <p className="t-body-sm body" style={{ margin: 0, lineHeight: 1.6 }}>{c.body}</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .benefits-head { grid-template-columns: 1fr !important; gap: 32px !important; align-items: start !important; }
          .benefits-head > *:last-child { justify-self: end !important; justify-content: flex-end !important; text-align: right; }
          .benefits-head .benefits-stat { letter-spacing: -2px !important; }
        }
        @media (max-width: 640px) {
          .benefits-head .benefits-stat { font-size: clamp(27px, 10.2vw, 41px) !important; letter-spacing: -1.5px !important; max-width: 50vw; }
          .benefits-head .benefits-stat-caption {
            font-size: clamp(11px, 3.1vw, 14px) !important;
            line-height: 1.35 !important;
            max-width: 44vw !important;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-wrap: balance;
          }
        }
      `}</style>
    </section>);

};

// =====================================================================
//  FAQ
// =====================================================================
const FAQItem = ({ q, a, defaultOpen }) => {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button type="button" className="faq-question" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-icon"><PlusIcon size={12} /></span>
      </button>
      <div className="faq-answer"><div className="faq-answer-inner">{a}</div></div>
    </div>);

};

const FAQ = () => {
  const items = [
  {
    q: "Does Ube auto-merge, or does it only open PRs for review?",
    a: "Ube always opens PRs — you stay in control of what ships. Auto-merge is opt-in per repository, and even then it's gated behind your existing branch protections and required checks."
  },
  {
    q: "Where does my code go?",
    a: "Your code runs in ephemeral, per-repo sandboxes that are destroyed after each job. We don't train on your code, and we don't keep it after the run. Self-hosting is offered for enterprise customers with strict privacy requirements."
  },
  {
    q: "Which frameworks and platforms does Ube support?",
    a: "React Native, Expo, Flutter, native iOS (Swift / Obj-C), native Android (Kotlin / Java), and Capacitor / Ionic out of the box. Other stacks can be onboarded on request — get in touch."
  },
  {
    q: "What if Ube makes a bad fix?",
    a: "Every PR runs your tests plus a generated regression suite before opening, and the diff is yours to review. Marking a fix rejected teaches Ube to avoid that approach for the same signature — it gets better at your codebase over time."
  }];

  return (
    <section className="section" style={{ background: "var(--canvas-soft)" }}>
      <div className="container">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>FAQ</div>
          <h2 className="t-display-lg" style={{ margin: 0, marginBottom: 40 }}>The details.

          </h2>
          <div>
            {items.map((it, i) =>
            <FAQItem key={i} {...it} />
            )}
          </div>
        </div>
      </div>
    </section>);

};

// =====================================================================
//  Final CTA Band
// =====================================================================
const FinalCTA = ({ onRequestAccess }) =>
<section className="cta-band">
    <div className="cta-band-bg" />
    <div className="cta-band-grid" />
    <div className="container" style={{ position: "relative", textAlign: "center" }}>
      <h2 className="t-display-lg" style={{ margin: 0, marginBottom: 18, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
        Stop shipping fixes.<br />Start shipping features.
      </h2>
      <p className="t-body-md muted" style={{ margin: 0, marginBottom: 32, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
        Ube handles the maintenance loop so you can spend your sprint on what
        users actually asked for.
      </p>
      <button type="button" className="btn btn-primary" onClick={onRequestAccess}>
        Request access
        <ArrowRight size={14} />
      </button>
    </div>
  </section>;


// =====================================================================
//  Footer
// =====================================================================
const Footer = ({ wordmarkAccent }) =>
<footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <Wordmark accent={wordmarkAccent} size={24} />
          <p className="t-body-sm muted" style={{ marginTop: 18, maxWidth: 320, lineHeight: 1.6 }}>Your app's agentic watchdog that keeps dependencies up to date and users happy.</p>
          <p className="t-caption muted" style={{ marginTop: 24 }}>© 2026 Ube · Chunky Tofu Studios, LLC</p>
        </div>
        <div className="footer-col">
          <h4>PRODUCTS</h4>
          <ul>
            <li><a href="#how">Ube Maintainer</a></li>
            <li><span className="disabled">Ube Publisher · soon</span></li>
            <li><span className="disabled">Pricing · soon</span></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${CONTACT_EMAIL}`} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><MailIcon size={14} /> {CONTACT_EMAIL}</a></li>
            <li><a href="https://www.linkedin.com/in/orkun-duman/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><LinkedInLogo size={13} /> Orkun Duman</a></li>
            <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><GitHubLogo size={13} /> github.com/orkun1675/ube</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>;


// =====================================================================
//  Request Access Modal
// =====================================================================
const RequestAccessModal = ({ open, onClose }) => {
  const [step, setStep] = React.useState("form"); // form | submitting | success
  const [email, setEmail] = React.useState("");
  const [stack, setStack] = React.useState("");
  const [stackOther, setStackOther] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [teamSize, setTeamSize] = React.useState("");
  const [productError, setProductError] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Reset to form when re-opened after success
  React.useEffect(() => {
    if (open && step === "success") {
      // keep showing success until user closes; that's the brief
    }if (!open) {// small delay to avoid flash mid-close
      setTimeout(() => {setStep("form");setEmail("");setStack("");setStackOther("");setProduct("");setTeamSize("");}, 280);}}, [open, step]);if (!open) return null;const onSubmit = (e) => {e.preventDefault();if (!product) {setProductError(true);return;}setProductError(false);setStep("submitting"); // Per user: submitting does nothing real. Simulate success after a moment.
    setTimeout(() => setStep("success"), 900);};const stacks = ["React Native", "Expo", "Flutter", "iOS (Swift / Obj-C)", "Android (Kotlin / Java)", "Capacitor / Ionic", "Other"];return (
      // biome-ignore lint/a11y/useSemanticElements: backdrop wraps and centers the modal panel; cannot be a <button> which forbids nested interactive content
      <div
      className="modal-backdrop"
      onClick={(e) => {if (e.target.classList.contains("modal-backdrop")) onClose();}}
      onKeyDown={(e) => {if (e.key === "Escape") onClose();}}
      role="button"
      tabIndex={-1}
      aria-label="Close modal">
      <div className="modal-panel">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {step !== "success" ? <>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Request access</div>
            <h3 className="t-display-sm ink" style={{ margin: 0, marginBottom: 6 }}>Join the first cohort.</h3>
            <p className="t-body-sm muted" style={{ margin: 0, marginBottom: 24, lineHeight: 1.55 }}>
              Tell us what you're shipping. We'll be in touch as we open access.
            </p>

            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="field-label" htmlFor="ra-email">Email <span className="req-dot" /></label>
                <input id="ra-email" type="email" required placeholder="you@company.com" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="field">
                <label className="field-label" htmlFor="ra-stack">What are you building with? <span className="req-dot" /></label>
                <select id="ra-stack" className="input" required value={stack} onChange={(e) => setStack(e.target.value)}>
                  <option value="">Select a stack…</option>
                  {stacks.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {stack === "Other" && <input style={{ marginTop: 10 }} className="input" placeholder="Which stack?" value={stackOther} onChange={(e) => setStackOther(e.target.value)} aria-label="Other stack" />}
              </div>

              <div className="field">
                <span id="ra-product-label" className="field-label">Which product matters more to you? <span className="req-dot" /></span>
                <div className="radio-group" role="radiogroup" aria-labelledby="ra-product-label" style={productError ? { borderRadius: 12, outline: "1px solid #c0392b", outlineOffset: 4 } : undefined}>
                  {[
              { id: "maintainer", label: "Ube Maintainer", sub: "Automated triage, fixes, and PRs for production issues." },
              { id: "publisher", label: "Ube Publisher", sub: "Ship faster and reach more users." }].
              map((opt) =>
              <button type="button" key={opt.id} className={`radio-item ${product === opt.id ? "selected" : ""}`} aria-pressed={product === opt.id} onClick={() => {setProduct(opt.id);setProductError(false);}}>
                      <span className="radio-dot" />
                      <div>
                        <div style={{ color: "var(--ink)", fontWeight: 500 }}>{opt.label}</div>
                        {opt.sub && <div className="t-caption muted" style={{ marginTop: 2 }}>{opt.sub}</div>}
                      </div>
                    </button>
              )}
                </div>
                {productError && <div className="t-caption" style={{ marginTop: 8, color: "#c0392b" }}>Please pick one.</div>}
              </div>

              <div className="field">
                <label className="field-label" htmlFor="ra-team-size">Team size <span className="muted" style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400, fontFamily: "var(--font-sans)" }}>(optional)</span></label>
                <select id="ra-team-size" className="input" value={teamSize} onChange={(e) => setTeamSize(e.target.value)}>
                  <option value="">Select…</option>
                  {["Just me", "2–5", "6–20", "21–100", "100+"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} disabled={step === "submitting"}>
                {step === "submitting" ? <span className="spinner" /> : <>Request access <ArrowRight size={14} /></>}
              </button>
              <p className="t-caption muted" style={{ marginTop: 14, textAlign: "center" }}>
                We'll only use this to contact you about Ube access.
              </p>
            </form>
          </> :

      <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "var(--accent-tint)",
          border: "1px solid rgba(107, 63, 160, 0.4)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          marginBottom: 18
        }}>
              <CheckIcon size={22} color="var(--accent)" />
            </div>
            <h3 className="t-display-sm ink" style={{ margin: 0, marginBottom: 8 }}>You're on the list.</h3>
            <p className="t-body-md body" style={{ margin: 0, marginBottom: 24, maxWidth: 360, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>We'll be in touch as we open up access. You can follow us on <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>GitHub</a> for updates.

        </p>
            <button type="button" onClick={onClose} className="inline-link">Close</button>
          </div>
      }
      </div>
    </div>);

};

Object.assign(window, {
  Wordmark, TopNav, Hero, TrustedBy, Problems, HowItWorks, Benefits, FAQ, FinalCTA, Footer, RequestAccessModal
});