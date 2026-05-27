/* HeroPrMockup.jsx — the GitHub PR card + floating Crashlytics card.
   Ported from src/components/mockups/HeroPr.astro. */

const HeroPrMockup = () => {
  const tabs = [
    { name: "Conversation", count: "3" },
    { name: "Commits", count: "2" },
    { name: "Checks", count: "12", active: true, success: true },
    { name: "Files", count: "4" },
  ];
  const checks = [
    { name: "reproduce-in-emulator", time: "1m 12s" },
    { name: "verify-fix-in-emulator", time: "1m 38s", emphasis: true },
    { name: "replay-user-session", time: "0m 47s" },
    { name: "regression-suite (247)", time: "4m 02s" },
  ];

  return (
    <div className="hero-pr-composite">
      <div className="mockup-chrome" style={{ width: "100%" }}>
        {/* GitHub-style header */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          padding: "14px 18px",
          borderBottom: "1px solid var(--hairline)",
          background: "var(--surface-elevated)",
        }}>
          <GitHubLogo size={18} />
          <span className="mono" style={{ fontSize: "12px", color: "var(--body)" }}>
            chunkytofu / cookcam{" "}
            <span style={{ color: "var(--muted)" }}>/ pull /</span>{" "}
            <span style={{ color: "var(--ink)" }}>#1847</span>
          </span>
          <span style={{ flex: 1 }} />
          <span className="pill pill-success">
            <CheckIcon size={9} />OPEN
          </span>
        </div>

        {/* Title + author */}
        <div style={{ padding: "20px 22px 16px" }}>
          <div className="mono" style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.4, fontWeight: 500 }}>
            Fix: NullPointerException in{" "}
            <span style={{ color: "var(--accent)" }}>WidgetUnmount</span>
          </div>
          <div className="mono" style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}>
            Crashlytics #4821 · affects v2.4.0–v2.4.2
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px" }}>
            <span style={{
              width: 24, height: 24, borderRadius: "50%",
              background: "var(--accent)", color: "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 600, fontFamily: "var(--font-mono)",
            }}>u</span>
            <span style={{ fontSize: 13 }}>
              <span style={{ color: "var(--ink)", fontWeight: 500 }}>ube[bot]</span>
              <span style={{ color: "var(--muted)" }}> wants to merge </span>
              <span className="mono" style={{ color: "var(--ink)" }}>2 commits</span>
              <span style={{ color: "var(--muted)" }}> into </span>
              <span className="mono" style={{ color: "var(--ink)" }}>main</span>
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="pr-tabs">
          {tabs.map((t) => (
            <div key={t.name} className={`pr-tab ${t.active ? "active" : ""}`}>
              {t.success && <CheckIcon size={10} color="var(--success)" />}
              {t.name}
              <span className="pr-count">{t.count}</span>
            </div>
          ))}
        </div>

        {/* Checks list */}
        <div style={{ padding: "18px 22px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <span style={{
              width: 18, height: 18, borderRadius: "50%",
              background: "rgba(59, 182, 122, 0.15)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(59, 182, 122, 0.4)",
            }}>
              <CheckIcon size={10} color="var(--success)" />
            </span>
            <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>
              All checks have passed
            </span>
            <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>12/12</span>
          </div>
          {checks.map((c) => (
            <div key={c.name} className={`pr-check-row ${c.emphasis ? "emp" : ""}`}>
              <ActionsLogo size={14} />
              <span className="name">{c.name}</span>
              <span className="time">{c.time}</span>
              <CheckIcon size={11} color="var(--success)" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Crashlytics card */}
      <div className="hero-pr-float">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <CrashlyticsLogo size={16} />
          <span className="mono" style={{
            fontSize: 10.5, color: "var(--muted)",
            textTransform: "uppercase", letterSpacing: "0.6px",
          }}>Crashlytics</span>
          <span style={{ flex: 1 }} />
          <span className="pill pill-accent">
            <LinkIcon size={8} />Linked
          </span>
        </div>

        <div className="mono" style={{
          fontSize: 12, color: "var(--ink)", lineHeight: 1.4, marginBottom: 8,
        }}>java.lang.NullPointerException</div>
        <div className="mono" style={{
          fontSize: 10.5, color: "var(--body)", lineHeight: 1.55,
          background: "var(--canvas)", padding: "8px 10px",
          borderRadius: 6, border: "1px solid var(--hairline)",
        }}>
          <div style={{ color: "var(--muted)" }}>at com.cookcam.widget</div>
          <div style={{ color: "var(--error)" }}>  WidgetUnmount.dispose(L:42)</div>
          <div style={{ color: "var(--muted)" }}>at android.view.View.detach</div>
        </div>

        <div className="float-stat-row">
          <div><div className="lbl">Users</div><div className="val">2,184</div></div>
          <div><div className="lbl">Sessions</div><div className="val" style={{ color: "var(--error)" }}>0.42%</div></div>
          <div><div className="lbl">Versions</div><div className="val">3</div></div>
        </div>
      </div>
    </div>
  );
};

window.HeroPrMockup = HeroPrMockup;
