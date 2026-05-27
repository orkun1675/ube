/* Hero.jsx — landing hero (autopilot variant).
   Built-for chip row uses provider logos from assets/integrations. */

const Hero = ({ onRequestAccess }) => (
  <section className="hero" id="top" data-screen-label="Hero">
    <div className="dotgrid" />
    <div className="container" style={{ position: "relative", zIndex: 1 }}>
      <div className="hero-grid">
        <div className="fade-in">
          <div className="eyebrow hero-eyebrow">Ube Maintainer</div>
          <h1 className="t-display-mega hero-headline">
            App maintenance,<br />
            <span className="hero-headline-muted">on autopilot.</span>
          </h1>
          <p className="t-body-md hero-body">
            Ube listens to your crash reports, user feedback, and dependency
            upgrades — then triages, reproduces, and opens verified PRs. You
            ship features. It handles the rest.
          </p>
          <div className="hero-cta-row">
            <button
              className="btn btn-primary"
              onClick={() => onRequestAccess?.("hero")}
            >
              Request access<ArrowRight size={14} />
            </button>
            <a className="btn btn-secondary" href="#how">See how it works</a>
          </div>
          <div className="hero-builtfor">
            <span className="label">Built for</span>
            <span className="chip"><FlutterLogo size={14} /> Flutter</span>
            <span className="chip"><ReactLogo size={14} /> React Native</span>
            <span className="chip"><ExpoLogo size={14} /> Expo</span>
            <span className="chip"><AppleLogo size={14} /> iOS</span>
            <span className="chip"><AndroidLogo size={14} /> Android</span>
          </div>
        </div>
        <div className="fade-in" style={{ animationDelay: "120ms" }}>
          <HeroPrMockup />
        </div>
      </div>
    </div>
  </section>
);

window.Hero = Hero;
