// =====================================================================
//  HERO: GitHub PR + linked Crashlytics card
// =====================================================================
import {
  ActionsLogo,
  CheckIcon,
  CrashlyticsLogo,
  GitHubLogo,
  LinkIcon,
} from "../../lib/assets"

export const HeroPRComposite = () => (
  <div
    className="hero-pr-composite"
    style={{
      position: "relative",
      width: "100%",
      maxWidth: 560,
      marginLeft: "auto",
    }}
  >
    {/* The PR view */}
    <div className="mockup-chrome" style={{ width: "100%" }}>
      {/* GitHub-style header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          borderBottom: "1px solid var(--hairline)",
          background: "var(--surface-elevated)",
        }}
      >
        <GitHubLogo size={18} />
        <span className="mono" style={{ fontSize: 12, color: "var(--body)" }}>
          chunkytofu / cookcam{" "}
          <span style={{ color: "var(--muted)" }}>/ pull / </span>
          <span style={{ color: "var(--ink)" }}>#1847</span>
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-success">
          <CheckIcon size={9} />
          OPEN
        </span>
      </div>

      {/* PR title + author */}
      <div style={{ padding: "20px 22px 16px" }}>
        <div
          className="mono"
          style={{
            fontSize: 15,
            color: "var(--ink)",
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          Fix: NullPointerException in{" "}
          <span style={{ color: "var(--accent)" }}>WidgetUnmount</span>
        </div>
        <div
          className="mono"
          style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}
        >
          Crashlytics #4821 · affects v2.4.0–v2.4.2
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 14,
          }}
        >
          <span
            className="avatar"
            style={{ background: "var(--accent)", width: 24, height: 24 }}
          >
            u
          </span>
          <span style={{ fontSize: 13 }}>
            <span style={{ color: "var(--ink)", fontWeight: 500 }}>
              ube[bot]
            </span>
            <span style={{ color: "var(--muted)" }}> wants to merge </span>
            <span className="mono" style={{ color: "var(--ink)" }}>
              2 commits
            </span>
            <span style={{ color: "var(--muted)" }}> into </span>
            <span className="mono" style={{ color: "var(--ink)" }}>
              main
            </span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--hairline)",
          padding: "0 22px",
        }}
      >
        {[
          { name: "Conversation", count: "3" },
          { name: "Commits", count: "2" },
          { name: "Checks", count: "12", active: true, success: true },
          { name: "Files", count: "4" },
        ].map((t) => (
          <div
            key={t.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 12px",
              fontSize: 12,
              color: t.active ? "var(--ink)" : "var(--body)",
              borderBottom: t.active
                ? "2px solid var(--accent)"
                : "2px solid transparent",
              fontWeight: t.active ? 500 : 400,
            }}
          >
            {t.success && <CheckIcon size={10} color="var(--success)" />}
            {t.name}
            <span
              className="mono"
              style={{
                fontSize: 10,
                padding: "1px 6px",
                borderRadius: 8,
                background: "var(--surface-elevated)",
                color: "var(--muted)",
                border: "1px solid var(--hairline)",
              }}
            >
              {t.count}
            </span>
          </div>
        ))}
      </div>

      {/* Checks list */}
      <div style={{ padding: "18px 22px 22px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "rgba(59, 182, 122, 0.15)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(59, 182, 122, 0.4)",
            }}
          >
            <CheckIcon size={10} color="var(--success)" />
          </span>
          <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>
            All checks have passed
          </span>
          <span
            className="mono"
            style={{ fontSize: 11, color: "var(--muted)" }}
          >
            12/12
          </span>
        </div>

        {[
          { name: "reproduce-in-emulator", time: "1m 12s" },
          { name: "verify-fix-in-emulator", time: "1m 38s", emphasis: true },
          { name: "replay-user-session", time: "0m 47s" },
          { name: "regression-suite (247)", time: "4m 02s" },
        ].map((c) => (
          <div
            key={c.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 0",
              borderTop: "1px solid var(--hairline-soft)",
            }}
          >
            <ActionsLogo size={14} />
            <span
              className="mono"
              style={{
                fontSize: 11.5,
                color: c.emphasis ? "var(--ink)" : "var(--body)",
              }}
            >
              {c.name}
            </span>
            <span style={{ flex: 1 }} />
            <span
              className="mono"
              style={{ fontSize: 10.5, color: "var(--muted)" }}
            >
              {c.time}
            </span>
            <CheckIcon size={11} color="var(--success)" />
          </div>
        ))}
      </div>
    </div>

    {/* Floating Crashlytics card */}
    <div
      className="hero-pr-float"
      style={{
        position: "absolute",
        right: -28,
        bottom: -36,
        width: 270,
        background: "var(--surface-elevated)",
        border: "1px solid var(--hairline-strong)",
        borderRadius: "var(--r-lg)",
        padding: "14px 16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <CrashlyticsLogo size={16} />
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
          }}
        >
          Crashlytics
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-accent">
          <LinkIcon size={8} />
          Linked
        </span>
      </div>

      <div
        className="mono"
        style={{
          fontSize: 12,
          color: "var(--ink)",
          lineHeight: 1.4,
          marginBottom: 8,
        }}
      >
        java.lang.NullPointerException
      </div>
      <div
        className="mono"
        style={{
          fontSize: 10.5,
          color: "var(--body)",
          lineHeight: 1.55,
          background: "var(--canvas)",
          padding: "8px 10px",
          borderRadius: 6,
          border: "1px solid var(--hairline)",
        }}
      >
        <div style={{ color: "var(--muted)" }}>at com.cookcam.widget</div>
        <div style={{ color: "var(--error)" }}>
          {" "}
          WidgetUnmount.dispose(L:42)
        </div>
        <div style={{ color: "var(--muted)" }}>at android.view.View.detach</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            Users
          </div>
          <div
            className="mono"
            style={{ fontSize: 13, color: "var(--ink)", marginTop: 2 }}
          >
            2,184
          </div>
        </div>
        <div>
          <div
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            Sessions
          </div>
          <div
            className="mono"
            style={{ fontSize: 13, color: "var(--error)", marginTop: 2 }}
          >
            0.42%
          </div>
        </div>
        <div>
          <div
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            Versions
          </div>
          <div
            className="mono"
            style={{ fontSize: 13, color: "var(--ink)", marginTop: 2 }}
          >
            3
          </div>
        </div>
      </div>
    </div>
  </div>
)
