/* Hero.jsx (publisher) — punchier v2 copy. Same structural pattern as
   Maintainer (left copy column, right product mockup) but the headline
   is shorter and the subhead is outcome-first. */

const PublisherHero = ({ heroVisual = "stack", onRequestAccess }) => (
  <section className="hero" id="top" data-screen-label="Hero">
    <div className="dotgrid" />
    <div className="container" style={{ position: "relative", zIndex: 1 }}>
      <div className="hero-grid">
        <div className="fade-in">
          <div className="eyebrow hero-eyebrow">Ube Publisher</div>
          <h1 className="t-display-mega hero-headline">
            Everything you need<br />
            <span className="hero-headline-muted">to grow your app.</span>
          </h1>
          <p className="t-body-md hero-body">
            The growth playbook the top-grossing app studios run on,
            packaged for small teams. Ube instruments, acquires, and
            prices your app from your first user to your millionth.
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
          <div className="hero-builtfor-pub">
            <span className="label">Built for</span>
            <span className="chip"><span className="chip-mark" style={{ color: "var(--accent)" }}><SparklesIcon size={12} /></span> Vibecoders</span>
            <span className="chip"><span className="chip-mark" style={{ color: "var(--success)" }}><SeedlingIcon size={12} /></span> Solo founders</span>
            <span className="chip"><span className="chip-mark"><ReactLogo size={12} /></span> Indie studios</span>
          </div>
        </div>
        <div className="fade-in" style={{ animationDelay: "120ms" }}>
          {heroVisual === "campaign" ? <CampaignMockup />
            : heroVisual === "weekly" ? <WeeklyMockup />
            : <StackMockup />}
        </div>
      </div>
    </div>
  </section>
);

window.PublisherHero = PublisherHero;
