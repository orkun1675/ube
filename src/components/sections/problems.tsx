// =====================================================================
//  Problems
// =====================================================================
import { ClockIcon, FlaskIcon, StackIcon } from "../../lib/assets"

export const Problems = () => {
  const cards = [
    {
      icon: <FlaskIcon size={26} />,
      title: "Tests get skipped.",
      body: 'Engineers read the stacktrace or eyeball the migration doc. They ship "simple fixes" without proper QA. The bug survives the release and results in customer churn.',
    },
    {
      icon: <StackIcon size={26} />,
      title: "Unfixable bugs pile up.",
      body: "Dependency issues, hardware specific edge cases, intermittent crashes — all require hours of debugging. And when the root cause is upstream, filing a proper bug report is rarely worth the effort.",
    },
    {
      icon: <ClockIcon size={26} />,
      title: "Maintenance delays releases.",
      body: "Internal testers find a missing null check moments before release. Engineering gets pulled back in. The exciting feature you actually shipped this sprint slips to next.",
    },
  ]

  return (
    <section className="section" style={{ background: "var(--canvas)" }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>
          THE PROBLEM
        </div>
        <h2 className="t-display-lg" style={{ margin: 0, maxWidth: 760 }}>
          App maintenance is{" "}
          <span style={{ color: "var(--accent-2)" }}>cumbersome.</span>
        </h2>
        <div className="grid-3 problems-grid" style={{ marginTop: 56 }}>
          {cards.map((c) => (
            <div
              key={c.title}
              className="card card-hover"
              style={{ padding: 28 }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  background: "var(--mark-tint)",
                  color: "var(--mark)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 22,
                  border:
                    "1px solid color-mix(in oklab, var(--mark) 25%, transparent)",
                }}
              >
                {c.icon}
              </div>
              <div className="t-title-md ink" style={{ marginBottom: 10 }}>
                {c.title}
              </div>
              <p
                className="t-body-sm body"
                style={{ margin: 0, lineHeight: 1.6 }}
              >
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
