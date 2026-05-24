// =====================================================================
//  Benefits
// =====================================================================
const Benefits = () => {
  const cards = [
    {
      icon: <SparkIcon />,
      title: "Reclaim engineering time.",
      body: "Stop spending a third of every sprint debugging race conditions you didn't write. Hand the boring triage to Ube and continue shipping delightful features.",
    },
    {
      icon: <ChatIcon />,
      title: "Your backlog stays lean.",
      body: "Every incoming bug report is triaged, fixed, or followed up on — automatically. Nothing rots in the queue, so your task list stays short.",
    },
    {
      icon: <ShieldIcon />,
      title: "Catch bugs early.",
      body: "Ube becomes your manual QA agent, clicks around the app like a human would. You no longer need to wait for a beta or alpha release to discover bugs.",
    },
    {
      icon: <TrendIcon />,
      title: "Stay under Play's bad-behavior threshold.",
      body: "Apps crashing on more than 1.09% of sessions or hitting ANRs above 0.47% get demoted in Play discoverability.",
    },
    {
      icon: <StarIcon />,
      title: "Higher app-store ratings.",
      body: "Faster fixes plus a personal follow-up nudges users back into the review flow. Updated reviews compound into a better average rating for your app.",
    },
    {
      icon: <RocketIcon />,
      title: "Keep tech debt in check.",
      body: "Agentic coding ships features faster than ever — and quietly piles up bugs and shortcuts. Ube does the unglamorous cleanup in the background so velocity doesn't come to a halt.",
    },
  ]

  return (
    <section className="section" style={{ background: "var(--canvas)" }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>
          Outcomes
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 60,
            alignItems: "end",
          }}
          className="benefits-head"
        >
          <h2 className="t-display-lg" style={{ margin: 0, maxWidth: 520 }}>
            Less time maintaining.
            <br />
            More time building.
          </h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
            <div
              className="t-display-mega benefits-stat"
              style={{
                color: "var(--accent)",
                fontSize: "clamp(40px, 7vw, 70.4px)",
                lineHeight: 1,
                letterSpacing: "-3px",
                whiteSpace: "nowrap",
              }}
            >
              10-30%
            </div>
            <div
              className="t-body-md body benefits-stat-caption"
              style={{ maxWidth: 230, textWrap: "balance" }}
            >
              of your team's engineering time reclaimed, based on early teams
              running Ube.
            </div>
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: 64 }}>
          {cards.map((c) => (
            <div
              key={c.title}
              className="card card-hover"
              style={{ padding: 24 }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: "var(--mark-tint)",
                  color: "var(--mark)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
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
    </section>
  )
}

Object.assign(window, { Benefits })
