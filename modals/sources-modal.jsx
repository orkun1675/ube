// =====================================================================
//  Sources Modal — signal sources Ube listens to
// =====================================================================
const SourcesModal = ({ open, onClose }) => {
  const groups = [
    {
      label: "Crash & errors",
      sources: [
        {
          logo: "assets/integrations/firebase.svg",
          name: "Firebase Crashlytics",
          desc: "Native crashes, ANRs, custom events",
        },
        {
          logo: "assets/integrations/sentry.svg",
          logoInvert: true,
          name: "Sentry",
          desc: "JS / native errors with stack traces & releases",
        },
      ],
    },
    {
      label: "Store signals",
      sources: [
        {
          logo: "assets/integrations/google-play.png",
          name: "Play Console",
          desc: "ANRs, vitals, store reviews",
        },
        {
          logo: "assets/integrations/apple.svg",
          logoInvert: true,
          name: "App Store Connect",
          desc: "iOS reviews, crash reports",
        },
      ],
    },
    {
      label: "Customer voice",
      sources: [
        { icon: "mail", name: "Support inboxes", desc: "Zendesk, plain email" },
      ],
    },
    {
      label: "Dependency feeds",
      sources: [
        {
          logo: "assets/integrations/npm.svg",
          name: "npm",
          desc: "JS / TS package releases & security advisories",
        },
        {
          logo: "assets/integrations/bun.svg",
          name: "Bun",
          desc: "Bun runtime + registry release feed",
        },
        {
          logo: "assets/integrations/dart.svg",
          name: "pub.dev",
          desc: "Dart & Flutter package releases",
        },
      ],
    },
    {
      label: "Build & symbols",
      sources: [
        {
          logo: "assets/integrations/codemagic.svg",
          name: "Codemagic",
          desc: "Pulls dSYMs & ProGuard mappings for de-obfuscated stack traces",
        },
      ],
    },
  ]

  const _total = groups.reduce((n, g) => n + g.sources.length, 0)
  let flatIdx = 0

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="modal-backdrop sources-modal-backdrop"
      panelClassName="modal-panel sources-panel"
      labelledBy="sources-title"
    >
      <div className="sources-header">
        <div className="sources-scanner" aria-hidden="true">
          <span className="scanner-grid" />
          <span className="scanner-ring r1" />
          <span className="scanner-ring r2" />
          <span className="scanner-sweep" />
          <span className="scanner-dot" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            SIGNAL SOURCES
          </div>
          <h3
            id="sources-title"
            className="t-display-md"
            style={{ margin: 0, marginBottom: 8, lineHeight: 1.15 }}
          >
            Every channel your bugs hide in.
          </h3>
          <p className="t-body-md body" style={{ margin: 0 }}>
            Need additional integrations?{" "}
            <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>
              Reach out →
            </a>
          </p>
        </div>
      </div>

      <div className="sources-groups">
        {groups.map((g, gi) => (
          <div
            key={g.label}
            className="sources-group"
            style={{ animationDelay: `${120 + gi * 90}ms` }}
          >
            <div className="sources-group-label">
              <span className="sources-tick" />
              {g.label}
              <span className="sources-group-rule" />
              <span className="mono muted" style={{ fontSize: 10 }}>
                {g.sources.length.toString().padStart(2, "0")}
              </span>
            </div>
            <div className="sources-grid">
              {g.sources.map((s) => {
                const delay = 220 + flatIdx * 65
                flatIdx++
                return (
                  <div
                    key={s.name}
                    className="source-card"
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <div
                      className={`source-mono ${s.logo ? "source-mono-logo" : ""} ${s.icon ? "source-mono-icon" : ""}`}
                    >
                      {s.logo ? (
                        <img
                          src={s.logo}
                          alt=""
                          className={s.logoInvert ? "logo-invert" : ""}
                        />
                      ) : s.icon === "mail" ? (
                        <MailIconFilled size={28} color="var(--accent)" />
                      ) : (
                        s.mono
                      )}
                    </div>
                    <div className="source-meta">
                      <div className="source-name">{s.name}</div>
                      <div className="source-desc">{s.desc}</div>
                    </div>
                    <div className="source-status" title="Listening">
                      <span className="status-dot" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="sources-foot" style={{ display: "none" }}>
        <span className="mono muted" style={{ fontSize: 11 }}>
          Need a custom feed?{" "}
          <button
            type="button"
            className="inline-link"
            style={{ fontSize: 11 }}
            onClick={onClose}
          >
            Tell us about your stack →
          </button>
        </span>
      </div>
    </Modal>
  )
}

Object.assign(window, { SourcesModal })
