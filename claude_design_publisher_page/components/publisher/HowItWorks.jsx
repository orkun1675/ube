/* HowItWorks.jsx (publisher) — v2 copy. Step bodies trimmed to one
   punchy sentence + one supporting sentence. Easier to scan,
   leaves more room for the visuals to breathe. */

const PubStep = ({ num, label, title, body, learnMore, disabled, visual, reversed }) => (
  <div className={`card-band step-band ${reversed ? "reversed" : "normal"}`}>
    {!reversed && <div className="step-visual">{visual}</div>}
    <div className="step-copy">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <span className="step-num">{num}</span>
        <span className="eyebrow" style={{ margin: 0 }}>{label}</span>
      </div>
      <h3 className="t-display-md ink" style={{ marginBottom: 20, lineHeight: 1.15 }}>{title}</h3>
      <p className="body" style={{ margin: 0, marginBottom: 22 }}>{body}</p>
      {learnMore && (
        disabled ? (
          <span className="inline-link coming-soon" aria-disabled style={{ opacity: 0.4 }}>
            {learnMore} <ArrowRight size={12} /><span className="tooltip">Coming soon</span>
          </span>
        ) : (
          <button className="inline-link" type="button">
            {learnMore} <ArrowRight size={12} />
          </button>
        )
      )}
    </div>
    {reversed && <div className="step-visual">{visual}</div>}
  </div>
);

const PublisherHowItWorks = () => {
  const steps = [
    {
      num: "01", label: "INSTRUMENT", reversed: true,
      title: "Analytics, wired up right.",
      body: "SDKs installed, user IDs aligned across platforms, events annotated in plain language. No data soup — a clean taxonomy you can reason about later.",
      learnMore: "Why annotation order matters",
      visual: <InstrumentMockup />,
    },
    {
      num: "02", label: "ATTRIBUTE", reversed: false,
      title: "Closes the loop.",
      body: "MMP set up, SKAdNetwork configured, revenue forwarded to your ad networks. The full ad → click → install → in-app event chain, working end to end.",
      learnMore: "How attribution works",
      visual: <AttributeMockup />,
    },
    {
      num: "03", label: "MEASURE", reversed: true,
      title: "Dashboards that mean something.",
      body: "D7, CAC, LTV, funnel drop-offs — readable in plain language. Internal users filtered out by default. The numbers you see are the numbers you can act on.",
      learnMore: "Picking metrics that matter",
      visual: <MeasureMockup />,
    },
    {
      num: "04", label: "ACQUIRE", reversed: false,
      title: "Runs your ads. Tunes them.",
      body: "Generates creatives, launches campaigns on Meta, Google, and TikTok, and shifts budget toward whatever earns installs at your target CAC. You set the cap.",
      learnMore: "How creatives get made",
      disabled: true,
      visual: <AcquireMockup />,
    },
    {
      num: "05", label: "RETAIN", reversed: true,
      title: "Spots drop-offs. Tests fixes.",
      body: "Reads your funnel, proposes an A/B test, ships it through Firebase Remote Config, calls the winner once it's statistically conclusive.",
      learnMore: "A/B test policies",
      disabled: true,
      visual: <RetainMockup />,
    },
    {
      num: "06", label: "MONETIZE", reversed: false,
      title: "Finds what people will pay.",
      body: "Trial length, price points, plan order — tested through RevenueCat once retention is sticky. You never have to guess what to charge.",
      learnMore: "When monetization unlocks",
      disabled: true,
      visual: <MonetizeMockup />,
    },
  ];

  return (
    <section className="section how-section" id="how" data-screen-label="How It Works">
      <div className="container">
        <div className="eyebrow">THE SOLUTION</div>
        <h2 className="t-display-lg" style={{ maxWidth: 880 }}>
          One agent.<br />The full growth loop.
        </h2>
        <p className="t-body-md body">
          Six steps from "I shipped an app" to "people are paying for it." Same
          tools a senior growth team would pick — set up for you, then run.
        </p>
        <div>
          {steps.map((s) => <PubStep key={s.num} {...s} />)}
        </div>
      </div>
    </section>
  );
};

window.PublisherHowItWorks = PublisherHowItWorks;
