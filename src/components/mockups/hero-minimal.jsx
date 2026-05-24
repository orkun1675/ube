// Minimal hero variant — just a quiet code panel
const HeroMinimal = () => (
  <div style={{ width: "100%", maxWidth: 560, marginLeft: "auto" }}>
    <div className="mockup-chrome">
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          className="avatar avatar-sm"
          style={{ background: "var(--accent)" }}
        >
          u
        </span>
        <span className="mono" style={{ fontSize: 12, color: "var(--body)" }}>
          ube[bot] · opened a PR
        </span>
        <span style={{ flex: 1 }} />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          1m ago
        </span>
      </div>
      <div style={{ padding: "22px 22px 26px" }}>
        <div
          className="mono"
          style={{ fontSize: 14, color: "var(--ink)", marginBottom: 16 }}
        >
          Fix: NullPointerException in{" "}
          <span style={{ color: "var(--accent)" }}>WidgetUnmount</span>
        </div>
        <div className="code-block" style={{ padding: "12px 14px" }}>
          <span className="diff-rem">
            <span className="diff-marker">-</span> widget.dispose();
          </span>
          <span className="diff-add">
            <span className="diff-marker">+</span> if (widget != null)
            widget.dispose();
          </span>
          <span className="diff-ctx">
            <span className="diff-marker"> </span>
            {"}"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
          }}
        >
          <CheckIcon size={11} color="var(--success)" />
          <span
            className="mono"
            style={{ fontSize: 11.5, color: "var(--body)" }}
          >
            12/12 checks passing
          </span>
          <span style={{ flex: 1 }} />
          <span className="pill pill-accent">UBE</span>
        </div>
      </div>
    </div>
  </div>
)

Object.assign(window, { HeroMinimal })
