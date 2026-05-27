/* WeeklyMockup.jsx — third hero visual option.

   Frames Ube Publisher as a "weekly brief" the operator approves:
   - Top breadcrumb chrome with approval-needed status.
   - 3 KPI tiles surfacing the core features (budget control, install
     tracking, creative attribution).
   - A "Recommended Next Move" panel showing a funnel diagnosis and
     an A/B test prescription — the system's actual reasoning, not
     just numbers.
   - A row of customer app cards showing the benefits real apps have
     seen (D7 retention, CAC, LTV).

   Tone matches Ube's dark surface + ube-flesh accent system. All
   colors come from CSS variables. */

const WeeklyMockup = () => {
  const funnel = [
    { step: "Install",  value: 312, pct: 100 },
    { step: "Open",     value: 232, pct: 74 },
    { step: "Sign up",  value: 124, pct: 40 },
    { step: "Onboard",  value: 118, pct: 38 },
  ];

  const customers = [
    { Logo: BeehiveLogo,    name: "Beehive",     metric: "D7",  delta: "+14%" },
    { Logo: DozyLogo,       name: "Dozy",        metric: "CAC", delta: "-22%" },
    { Logo: PixelBuddyLogo, name: "Pixel Buddy", metric: "LTV", delta: "+31%" },
  ];

  return (
    <div className="weekly-mockup">
      <div className="mockup-chrome weekly-chrome">
        {/* KPI tiles — three core surfaces */}
        <div className="weekly-kpi-row">
          <div className="weekly-kpi">
            <div className="lbl mono">Learning budget</div>
            <div className="val">$20<span className="unit">/day</span></div>
          </div>
          <div className="weekly-kpi">
            <div className="lbl mono">Installs this week</div>
            <div className="val">312</div>
          </div>
          <div className="weekly-kpi">
            <div className="lbl mono">Best creative</div>
            <div className="val val-text">Finals week</div>
          </div>
        </div>

        {/* Recommended next move — the brain of the brief */}
        <div className="weekly-rec">
          <div className="weekly-rec-head">
            <span className="lbl">Recommended next move</span>
            <span className="weekly-rec-tag mono">A/B TEST</span>
          </div>
          <div className="weekly-rec-title">
            Make sign up optional for the first session.
          </div>

          <div className="weekly-funnel">
            {funnel.map((f) => (
              <div key={f.step} className="weekly-funnel-row" style={{ width: `${f.pct}%` }}>
                <span className="step mono">{f.step}</span>
                <span className="val mono">{f.value}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Approval row */}
        <div className="weekly-approve">
          <span className="approve-dot" />
          <span className="approve-text">Approve campaign launch on Google Ads + Meta?</span>
          <button className="approve-btn">Approve</button>
        </div>
      </div>

      {/* Customer benefits — three apps that ran the playbook */}
      <div className="weekly-customers">
        {customers.map((c) => (
          <div key={c.name} className="weekly-customer">
            <c.Logo size={36} />
            <div className="weekly-customer-body">
              <div className="weekly-customer-name">{c.name}</div>
              <div className="weekly-customer-metric mono">
                <span className="m-lbl">{c.metric}</span>
                <span className={`m-delta ${c.delta.startsWith("-") ? (c.metric === "CAC" ? "good" : "bad") : "good"}`}>
                  {c.delta}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Small inline customer logo loaders — reuse the existing
   /assets/customers/*.webp files (already shipped with the project). */
const CA = (p) => `${window.UBE_ASSETS || "assets"}/customers/${p}`;
const BeehiveLogo    = ({ size = 36 }) => <img src={CA("beehive.webp")}     alt="" width={size} height={size} style={{ borderRadius: 8, display: "block" }} />;
const DozyLogo       = ({ size = 36 }) => <img src={CA("dozy.webp")}        alt="" width={size} height={size} style={{ borderRadius: 8, display: "block" }} />;
const PixelBuddyLogo = ({ size = 36 }) => <img src={CA("pixel-buddy.webp")} alt="" width={size} height={size} style={{ borderRadius: 8, display: "block" }} />;

window.WeeklyMockup = WeeklyMockup;
