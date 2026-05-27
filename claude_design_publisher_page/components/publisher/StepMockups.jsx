/* StepMockups.jsx (publisher) — six visual mockups for the six-step
   pipeline. Pattern follows the maintainer: dark chrome cards, mono
   labels, restrained color, provider logos for grounding. */

/* ------------------------------------------------------------- 01 INSTRUMENT */
const InstrumentMockup = () => (
  <div className="mockup-chrome sdk-mockup">
    <div className="mockup-header">
      <div className="traffic-lights"><span/><span/><span/></div>
      <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
        diff · <span style={{ color: "var(--ink)" }}>app/lib/analytics.ts</span>
      </span>
      <span style={{ flex: 1 }} />
      <span className="pill pill-accent"><SparklesIcon size={9}/> AGENT EDIT</span>
    </div>
    <div className="code">
      <span className="diff-ctx">  import {`{`} initFirebase {`}`} from './firebase';</span>
      <span className="diff-add">+ import {`{`} initAmplitude, identify {`}`} from './amplitude';</span>
      <span className="diff-add">+ import {`{`} initRevenueCat {`}`} from './revenuecat';</span>
      <span className="diff-ctx">  </span>
      <span className="diff-ctx">  export async function bootstrap(userId: string) {`{`}</span>
      <span className="diff-add">+ &nbsp; const rc = await initRevenueCat(userId);</span>
      <span className="diff-add">+ &nbsp; await initFirebase({`{`} userId, rcId: rc.appUserID {`}`});</span>
      <span className="diff-add">+ &nbsp; await initAmplitude({`{`} userId, rcId: rc.appUserID {`}`});</span>
      <span className="diff-add">+ &nbsp; identify('signup_complete');</span>
      <span className="diff-ctx">  {`}`}</span>
    </div>
    <div style={{ padding: "10px 18px", borderTop: "1px solid var(--hairline-soft)", display: "flex", alignItems: "center", gap: 10 }}>
      <span className="mono" style={{ fontSize: 10.5, color: "var(--muted)" }}>IDs synced across</span>
      <FirebaseLogo size={14}/>
      <AmplitudeLogo size={14}/>
      <RevenueCatLogo size={14}/>
      <span style={{ flex: 1 }}/>
      <span className="pill pill-success"><CheckIcon size={9}/> 18 EVENTS</span>
    </div>
  </div>
);

/* ------------------------------------------------------------- 02 ATTRIBUTE */
const AttributeMockup = () => {
  const stages = [
    { Icon: MegaphoneIcon,  num: "01", lbl: "Ad shown" },
    { Icon: ArrowRight,     num: "02", lbl: "Click" },
    { Icon: PlayCircleIcon, num: "03", lbl: "Install" },
    { Icon: BarChartIcon,   num: "04", lbl: "Event" },
    { Icon: InfinityIcon,   num: "05", lbl: "Retargeted" },
  ];
  return (
    <div className="mockup-chrome">
      <div className="mockup-header">
        <div className="traffic-lights"><span/><span/><span/></div>
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          attribution loop · <span style={{ color: "var(--ink)" }}>iOS · SKAdNetwork</span>
        </span>
        <span style={{ flex: 1 }} />
        <AppsFlyerLogo size={14}/>
      </div>
      <div className="loop-mockup">
        <svg className="loop-svg" viewBox="0 0 600 200" preserveAspectRatio="none">
          {/* connector arcs between stages */}
          <defs>
            <marker id="loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 Z" fill="var(--accent)" />
            </marker>
          </defs>
          {[80, 200, 320, 440].map((x) => (
            <line key={x} x1={x} x2={x+40} y1="80" y2="80"
              stroke="var(--accent)" strokeWidth="1.2"
              strokeDasharray="3 3" markerEnd="url(#loop-arrow)" opacity="0.6" />
          ))}
          {/* return arc — from rightmost back to leftmost */}
          <path d="M540 110 Q540 180 300 180 Q60 180 60 110" fill="none"
            stroke="var(--accent)" strokeWidth="1.2"
            strokeDasharray="4 4" markerEnd="url(#loop-arrow)" opacity="0.45" />
        </svg>
        <div className="stage-row">
          {stages.map((s, i) => (
            <div key={s.num} className="loop-stage" style={{ position: "relative", zIndex: 2 }}>
              <span className="icon"><s.Icon size={16} /></span>
              <span className="num">{s.num}</span>
              <span className="lbl">{s.lbl}</span>
            </div>
          ))}
        </div>
        <div style={{
          position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)",
          letterSpacing: 0.6, textTransform: "uppercase",
          background: "var(--canvas)", padding: "4px 10px",
          border: "1px solid var(--hairline)", borderRadius: 999,
          zIndex: 3,
        }}>
          loop closes · network gets feedback
        </div>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- 03 MEASURE */
const MeasureMockup = () => {
  const kpis = [
    { l: "DAU",    v: "8,412", d: "+ 12 %", up: true },
    { l: "D7",     v: "32 %",  d: "+ 2 %",  up: true },
    { l: "CAC",    v: "$1.42", d: "− 8 %",  up: true },  // lower CAC is good
    { l: "LTV/30", v: "$3.18", d: "+ 4 %",  up: true },
  ];
  // a simple two-line sparkline as the "chart"
  return (
    <div className="mockup-chrome">
      <div className="mockup-header">
        <div className="traffic-lights"><span/><span/><span/></div>
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          dashboard · <span style={{ color: "var(--ink)" }}>top-line · last 30 d</span>
        </span>
        <span style={{ flex: 1 }} />
        <AmplitudeLogo size={14}/>
      </div>
      <div className="dash-mockup">
        <div className="dash-kpi-row">
          {kpis.map((k) => (
            <div key={k.l} className="dash-kpi">
              <div className="l">{k.l}</div>
              <div className="v">{k.v}</div>
              <div className={`d ${k.up ? "up" : "down"}`}>{k.d}</div>
            </div>
          ))}
        </div>
        <div className="dash-chart">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
            <span className="mono" style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.6 }}>D7 retention by cohort</span>
            <span style={{ flex: 1 }}/>
            <span className="mono" style={{ fontSize: 10, color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 2, background: "var(--accent)" }}/> control
            </span>
            <span className="mono" style={{ fontSize: 10, color: "var(--success)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 2, background: "var(--success)" }}/> variant B
            </span>
          </div>
          <svg viewBox="0 0 540 130" width="100%" height="130">
            {/* grid lines */}
            {[30, 60, 90, 120].map((y) => (
              <line key={y} x1="0" y1={y} x2="540" y2={y} stroke="var(--hairline)" strokeWidth="0.5" />
            ))}
            {/* control line */}
            <path d="M10 100 L80 90 L150 84 L220 78 L290 76 L360 72 L430 71 L510 70"
              fill="none" stroke="var(--accent)" strokeWidth="1.5"
              strokeLinecap="round" />
            {/* variant line */}
            <path d="M10 100 L80 84 L150 70 L220 60 L290 50 L360 42 L430 36 L510 30"
              fill="none" stroke="var(--success)" strokeWidth="1.5"
              strokeLinecap="round" />
            {/* dots */}
            {[
              [510, 70, "var(--accent)"],
              [510, 30, "var(--success)"],
            ].map(([x, y, c], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill={c}/>
            ))}
            {/* x labels */}
            {["D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7"].map((d, i) => (
              <text key={d} x={10 + i * 71} y="125" fill="var(--muted)" fontSize="9" fontFamily="var(--font-mono)">{d}</text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- 04 ACQUIRE */
const AcquireMockup = () => {
  const rows = [
    { thumb: "v1", name: "playable · word puzzle", net: "Meta",   spend: "$48",  cac: "$1.42", roas: "38 %", winner: true },
    { thumb: "v2", name: "video · jump-cut hook",  net: "TikTok", spend: "$36",  cac: "$1.71", roas: "29 %" },
    { thumb: "v3", name: "static · daily challenge", net: "Google", spend: "$22", cac: "$2.04", roas: "21 %" },
    { thumb: "v4", name: "ugc · founder reel",     net: "Meta",   spend: "$18",  cac: "$2.88", roas: "14 %" },
  ];
  return (
    <div className="camp-mockup">
      <div className="mockup-chrome">
        <div className="mockup-header">
          <div className="traffic-lights"><span/><span/><span/></div>
          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
            campaigns · <span style={{ color: "var(--ink)" }}>iOS install</span>
          </span>
          <span style={{ flex: 1 }} />
          <span className="pill pill-success">$124 / DAY</span>
        </div>
        <div className="camp-rows">
          <span className="head">Creative</span>
          <span className="head">Spend</span>
          <span className="head">CAC</span>
          <span className="head">D7 ROAS</span>
          {rows.map((r) => (
            <React.Fragment key={r.name}>
              <span className="cell" style={{ color: r.winner ? "var(--ink)" : "var(--body)" }}>
                <span className={`creative-thumb ${r.thumb}`} aria-hidden>{r.thumb.toUpperCase()}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                <span className="camp-network">{r.net}</span>
              </span>
              <span className="cell num" style={{ color: "var(--body)" }}>{r.spend}</span>
              <span className="cell num" style={{ color: r.winner ? "var(--success)" : "var(--ink)" }}>{r.cac}</span>
              <span className="cell num" style={{ color: r.winner ? "var(--success)" : "var(--body)" }}>{r.roas}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------- 05 RETAIN */
const RetainMockup = () => {
  const funnel = [
    { step: "App open",       w: 100, pct: "100 %", delta: "" },
    { step: "Sign up start",  w: 78,  pct: "78 %",  delta: "− 22 %", down: false },
    { step: "Sign up done",   w: 41,  pct: "41 %",  delta: "− 37 %", flag: true },
    { step: "Onboarding",     w: 36,  pct: "36 %",  delta: "− 5 %" },
    { step: "First action",   w: 31,  pct: "31 %",  delta: "− 5 %" },
  ];
  return (
    <div className="mockup-chrome">
      <div className="mockup-header">
        <div className="traffic-lights"><span/><span/><span/></div>
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          Retention · <span className="ink">Onboarding Funnel</span>
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-error">37 % DROP</span>
      </div>
      <div className="funnel-mockup">
        {funnel.map((f, i) => (
          <div key={f.step} className={`funnel-row ${f.flag ? "flagged" : ""}`}>
            <span className="step">{f.step}</span>
            <span className="bar"><span className="fill" style={{ width: `${f.w}%` }}/></span>
            <span className="pct">{f.pct}</span>
            <span className={`delta ${f.flag ? "down" : ""}`}>{f.delta}</span>
          </div>
        ))}

        <div className="ab-mockup" style={{ padding: "10px 0 0", marginTop: 14, borderTop: "1px solid var(--hairline)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
            <span className="eyebrow" style={{ fontSize: 10, color: "var(--accent-2)" }}>A/B TEST · OPTIONAL SIGN-UP</span>
            <span style={{ flex: 1 }}/>
            <span className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>n=4,218 · 95 % conf</span>
          </div>
          <div className="ab-grid">
            <div className="ab-variant">
              <span className="lbl">A · control</span>
              <span className="name">required signup</span>
              <div className="pct">41 %</div>
              <span className="sub">complete signup</span>
            </div>
            <div className="ab-variant winner">
              <span className="winner-pill">WINNER · +14 %</span>
              <span className="lbl">B · variant</span>
              <span className="name">signup optional</span>
              <div className="pct">55 %</div>
              <span className="sub">complete signup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- 06 MONETIZE */
const MonetizeMockup = () => (
  <div className="mockup-chrome">
    <div className="mockup-header">
      <div className="traffic-lights"><span/><span/><span/></div>
      <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
        paywall · <span style={{ color: "var(--ink)" }}>pricing A/B</span>
      </span>
      <span style={{ flex: 1 }} />
      <RevenueCatLogo size={14}/>
    </div>
    <div className="paywall-mockup">
      <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.6 }}>
        Test 12 · Day 9 of 14
      </div>
      <div className="paywall-grid">
        <div className="paywall-variant">
          <span className="lbl">A · control</span>
          <div className="paywall-frame">
            <span className="h">Unlock Pro</span>
            <span className="price">$9.99 / mo</span>
            <span className="btn-fake">Start</span>
          </div>
          <div className="paywall-stats">
            <div className="stat"><div className="l">Trial start</div><div className="v">6.1 %</div></div>
            <div className="stat"><div className="l">ARPU</div><div className="v">$0.61</div></div>
          </div>
        </div>
        <div className="paywall-variant winner">
          <span className="lbl">B · variant</span>
          <div className="paywall-frame" style={{ borderColor: "color-mix(in oklab, var(--accent) 40%, var(--hairline))" }}>
            <span className="h">Try Pro free</span>
            <span className="price">
              <span className="strike">$9.99</span>
              $4.99 / mo · 3 d free
            </span>
            <span className="btn-fake">Start free trial</span>
          </div>
          <div className="paywall-stats">
            <div className="stat win"><div className="l">Trial start</div><div className="v">11.4 %</div></div>
            <div className="stat win"><div className="l">ARPU</div><div className="v">$0.94</div></div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 14, padding: "10px 12px", border: "1px solid var(--hairline)", background: "var(--canvas)", borderRadius: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--body)", display: "flex", alignItems: "center", gap: 8 }}>
        <SparklesIcon size={12}/>
        <span style={{ color: "var(--accent)" }}>Ube suggests:</span>
        <span>roll variant B to 100 % · expected lift +54 % ARPU</span>
      </div>
    </div>
  </div>
);

Object.assign(window, {
  InstrumentMockup, AttributeMockup, MeasureMockup,
  AcquireMockup, RetainMockup, MonetizeMockup,
});
