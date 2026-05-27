/* HowItWorks.jsx — five-step pipeline, alternating left/right.
   Step 4 (Release) and Step 5 (Escalate) have learn-more links marked
   "coming soon" on the live site. */

const Step = ({ num, label, title, body, learnMore, disabled, visual, reversed }) => (
  <div className={`card-band step-band ${reversed ? "reversed" : "normal"}`}>
    {!reversed && <div className="step-visual">{visual}</div>}
    <div className="step-copy">
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <span className="step-num">{num}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <h3 className="t-display-md ink" style={{ marginBottom: 16, lineHeight: 1.2 }}>{title}</h3>
      <p className="t-body-md body" style={{ margin: 0, marginBottom: 18, lineHeight: 1.65 }}>{body}</p>
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

const HowItWorks = () => {
  const steps = [
    { num: "01", label: "INTAKE",   reversed: true,  title: "Monitors all platforms.",
      body: "Firebase Crashlytics, Sentry, Play Console ANRs, App Store reviews, support inboxes, dependency releases — all funneled into one timeline. Nothing slips through.",
      learnMore: "Supported sources", visual: <IntakeMockup /> },
    { num: "02", label: "TRIAGE",   reversed: false, title: "Tracks bugs across binaries.",
      body: "Stack traces are symbolized on intake, then deduplicated by signature across versions, OSes, and dependency upgrades. Per-issue state lives on a single dashboard — the source of truth your maintenance agent reads from.",
      learnMore: "How issues are deduplicated", visual: <TriageMockup /> },
    { num: "03", label: "FIX",      reversed: true,  title: "Reproduce, patch, verify — then open the PR.",
      body: "Ube reproduces the bug on an emulator, writes the patch, and runs your test suite — then QAs the app by hand, clicking through like a real user. Once the issue is verified fixed and nothing else broke, it opens a PR. Watch the GIFs, read the diff, merge.",
      learnMore: "Inside the fix loop", visual: <FixMockup /> },
    { num: "04", label: "RELEASE",  reversed: false, title: "Close the loop with the customer who reported it.",
      body: "Once the fix ships, Ube tracks which release it landed in, when it rolled out to production, and writes back to the original reporter. Angry one-star reviews turn into thank-yous, and your rating climbs week over week.",
      learnMore: "Customer reply policies", disabled: true, visual: <ReportSuccessMockup /> },
    { num: "05", label: "ESCALATE", reversed: true,  title: "Reports bugs upstream when needed.",
      body: "When facing an upstream bug, Ube opens a detailed issue on their repo — with repro steps, logs, and a minimal reproduction. When it can't reproduce or resolve a bug itself, it hands the thread back with everything it learned.",
      learnMore: "View sample bug report", disabled: true, visual: <ReportFailureMockup /> },
  ];
  return (
    <section className="section how-section" id="how" data-screen-label="How It Works">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>THE SOLUTION</div>
        <h2 className="t-display-lg" style={{ marginBottom: 14, maxWidth: 760 }}>
          Ube runs on your repo<br />around the clock.
        </h2>
        <p className="t-body-md body" style={{ margin: 0, marginBottom: 48, maxWidth: 640 }}>
          Set up in 10 minutes. Automated from then on.
        </p>
        <div>
          {steps.map((s) => <Step key={s.num} {...s} />)}
        </div>
      </div>
    </section>
  );
};

window.HowItWorks = HowItWorks;
