/* StepMockups.jsx — small, simplified visuals for each HowItWorks step.
   The production site has full mockups under src/components/mockups/.
   We keep the visual spirit: dark cards, mono labels, provider logos,
   restrained color. */

const IntakeMockup = () => {
  const items = [
    { logo: <CrashlyticsLogo size={14}/>, label: "Crashlytics · NPE in WidgetUnmount",   meta: "1m ago",  pill: { type: "error",   text: "CRASH" } },
    { logo: <SentryLogo size={14}/>,       label: "Sentry · timeout · stripe payments",  meta: "4m ago",  pill: { type: "warning", text: "SLOW" } },
    { logo: <PlayLogo size={14}/>,         label: "Play Review · 1★ · 'crashes on Pixel'", meta: "12m ago", pill: { type: "muted",   text: "REVIEW" } },
    { logo: <AppleLogo size={12}/>,        label: "App Store · 2★ · 'lost my progress'", meta: "32m ago", pill: { type: "muted",   text: "REVIEW" } },
    { logo: <GitHubLogo size={14}/>,        label: "expo SDK · 51.0.14 released",         meta: "2h ago",  pill: { type: "accent",  text: "DEP" } },
  ];
  return (
    <div className="mockup-chrome">
      <div className="mockup-header">
        <div className="traffic-lights"><span/><span/><span/></div>
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>intake — last 24 h</span>
        <span style={{flex:1}} />
        <span className="pill pill-success">● LIVE</span>
      </div>
      <div style={{ padding: "8px 0" }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 18px",
            borderTop: i === 0 ? "none" : "1px solid var(--hairline-soft)",
          }}>
            {it.logo}
            <span className="mono" style={{ fontSize: 12, color: "var(--ink)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.label}</span>
            <span className={`pill pill-${it.pill.type}`}>{it.pill.text}</span>
            <span className="mono" style={{ fontSize: 10.5, color: "var(--muted)", minWidth: 50, textAlign: "right" }}>{it.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TriageMockup = () => {
  const rows = [
    { sig: "NullPointerException · WidgetUnmount", count: 41, ver: "2.4.0 → 2.4.2", trend: "▲ 12 %" },
    { sig: "TimeoutError · payments.checkout",     count: 18, ver: "2.4.2",          trend: "▲ 4 %"  },
    { sig: "ANR · NetworkMonitor.boot",            count:  9, ver: "2.4.1, 2.4.2",  trend: "—"      },
  ];
  return (
    <div className="mockup-chrome">
      <div className="mockup-header">
        <div className="traffic-lights"><span/><span/><span/></div>
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>triage — 23 open · 12 dup-merged</span>
      </div>
      <div style={{ padding: "14px 18px" }}>
        <div className="mono" style={{ fontSize: 9.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.6, display: "grid", gridTemplateColumns: "1.6fr 70px 1fr 70px", gap: 10, padding: "0 6px 8px", borderBottom: "1px solid var(--hairline)" }}>
          <span>Signature</span><span>Users</span><span>Versions</span><span>7-day</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="mono" style={{
            fontSize: 12, display: "grid", gridTemplateColumns: "1.6fr 70px 1fr 70px",
            gap: 10, padding: "10px 6px",
            borderTop: i === 0 ? "none" : "1px solid var(--hairline-soft)",
            alignItems: "center",
          }}>
            <span style={{ color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.sig}</span>
            <span style={{ color: "var(--body)" }}>{r.count}</span>
            <span style={{ color: "var(--muted)", fontSize: 11 }}>{r.ver}</span>
            <span style={{ color: r.trend.startsWith("▲") ? "var(--error)" : "var(--muted)", fontSize: 11 }}>{r.trend}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FixMockup = () => (
  <div className="mockup-chrome">
    <div className="mockup-header">
      <div className="traffic-lights"><span/><span/><span/></div>
      <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>fix · diff &nbsp; <span style={{ color: "var(--ink)" }}>WidgetUnmount.kt</span></span>
      <span style={{flex:1}} />
      <span className="pill pill-success"><CheckIcon size={9}/> 247 PASS</span>
    </div>
    <div style={{ padding: "14px 18px", fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.65, color: "var(--body)" }}>
      <span className="diff-ctx">  override fun onDetachedFromWindow() {`{`}</span>
      <span className="diff-rem">- &nbsp; widget.dispose()</span>
      <span className="diff-add">+ &nbsp; if (widget?.isAttached == true) {`{`}</span>
      <span className="diff-add">+ &nbsp; &nbsp; widget.dispose()</span>
      <span className="diff-add">+ &nbsp; {`}`}</span>
      <span className="diff-ctx">  &nbsp; super.onDetachedFromWindow()</span>
      <span className="diff-ctx">  {`}`}</span>
    </div>
  </div>
);

const ReportSuccessMockup = () => (
  <div className="mockup-chrome">
    <div className="mockup-header">
      <div className="traffic-lights"><span/><span/><span/></div>
      <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>release · v2.4.3 · ↗︎ reply to reporter</span>
    </div>
    <div style={{ padding: 18 }}>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.6 }}>★ 1 · ANDREA M. · v2.4.1</div>
      <div style={{ marginTop: 8, color: "var(--ink)", fontSize: 14, fontStyle: "italic", lineHeight: 1.55 }}>
        "Keeps crashing the moment I open my profile. Unusable."
      </div>
      <div style={{ height: 1, background: "var(--hairline)", margin: "16px 0" }} />
      <div className="mono" style={{ fontSize: 10.5, color: "var(--success)", textTransform: "uppercase", letterSpacing: 0.6 }}>↳ AUTO-REPLY · 4 days later</div>
      <div style={{ marginTop: 8, color: "var(--ink)", fontSize: 14, lineHeight: 1.6 }}>
        Hi Andrea — this one is fixed in <span className="mono" style={{ color: "var(--accent)" }}>v2.4.3</span>, rolling out now. Sorry for the trouble. Mind giving it another try?
      </div>
    </div>
  </div>
);

const ReportFailureMockup = () => (
  <div className="mockup-chrome">
    <div className="mockup-header">
      <div className="traffic-lights"><span/><span/><span/></div>
      <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>escalate · upstream issue</span>
      <span style={{flex:1}} />
      <GitHubLogo size={14} />
    </div>
    <div style={{ padding: 18 }}>
      <div className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>flutter/flutter#152984</div>
      <div className="t-title-md ink" style={{ marginTop: 6, fontSize: 15 }}>
        [iOS 17] platform_view_layer leaks GPU memory on rotation
      </div>
      <div style={{ marginTop: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--body)", background: "var(--canvas)", padding: "10px 12px", borderRadius: 6, border: "1px solid var(--hairline)" }}>
        <span style={{ color: "var(--muted)" }}># Repro</span><br/>
        1. flutter create --platforms=ios repro<br/>
        2. PlatformView with Map widget<br/>
        3. rotate device 30×<br/>
        <span style={{ color: "var(--muted)" }}># Observed</span><br/>
        <span style={{ color: "var(--error)" }}>+220 MB GPU after 30 rotations</span>
      </div>
    </div>
  </div>
);

Object.assign(window, { IntakeMockup, TriageMockup, FixMockup, ReportSuccessMockup, ReportFailureMockup });
