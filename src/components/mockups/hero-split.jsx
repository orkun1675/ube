// Split hero variant — two stacked cards side by side
const HeroSplit = () => (
  <div
    className="hero-split-grid"
    style={{
      width: "100%",
      maxWidth: 560,
      marginLeft: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
    }}
  >
    <div className="mockup-chrome" style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <CrashlyticsLogo size={16} />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          Crashlytics
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-error">NEW</span>
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink)" }}>
        NullPointerException
      </div>
      <div
        className="mono"
        style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}
      >
        WidgetUnmount.dispose:42
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <div>
          <div className="mono" style={{ fontSize: 9, color: "var(--muted)" }}>
            USERS
          </div>
          <div className="mono" style={{ fontSize: 13 }}>
            2,184
          </div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 9, color: "var(--muted)" }}>
            RATE
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--error)" }}>
            0.42%
          </div>
        </div>
      </div>
    </div>
    <div className="mockup-chrome" style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <GitHubLogo size={16} />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          Pull request
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-success">OPEN</span>
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink)" }}>
        Fix: null check on unmount
      </div>
      <div
        className="mono"
        style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}
      >
        +1 −1 · ube[bot]
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <CheckIcon size={10} color="var(--success)" />
          <span className="mono" style={{ fontSize: 10, color: "var(--body)" }}>
            12/12 checks
          </span>
        </div>
      </div>
    </div>
  </div>
)

Object.assign(window, { HeroSplit })
