/* Problems.jsx — THE PROBLEM section with 3 content cards. */

const PROBLEMS = [
  {
    Icon: FlaskIcon, title: "Tests get skipped.",
    body: "Engineers read the stacktrace or eyeball the migration doc. They ship \"simple fixes\" without proper QA. The bug survives the release and results in customer churn.",
  },
  {
    Icon: StackIcon, title: "Unfixable bugs pile up.",
    body: "Dependency issues, hardware specific edge cases, intermittent crashes — all require hours of debugging. And when the root cause is upstream, filing a proper bug report is rarely worth the effort.",
  },
  {
    Icon: ClockIcon, title: "Maintenance delays releases.",
    body: "Internal testers find a missing null check moments before release. Engineering gets pulled back in. The exciting feature you actually shipped this sprint slips to next.",
  },
];

const Problems = () => (
  <section className="section problems-section" data-screen-label="Problems">
    <div className="container">
      <div className="eyebrow" style={{ marginBottom: 18 }}>THE PROBLEM</div>
      <h2 className="t-display-lg" style={{ maxWidth: 760 }}>
        App maintenance is{" "}
        <span className="problems-headline-accent">cumbersome.</span>
      </h2>
      <div className="grid-3 problems-grid">
        {PROBLEMS.map(({ Icon, title, body }) => (
          <div key={title} className="card card-hover problems-card">
            <div className="problems-card-icon"><Icon size={26} /></div>
            <h3 className="t-title-md ink" style={{ marginBottom: 10 }}>{title}</h3>
            <p className="t-body-sm body" style={{ margin: 0, lineHeight: 1.6 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

window.Problems = Problems;
