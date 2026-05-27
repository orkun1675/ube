/* Orchestrator.jsx — replaces the old IntegrationsBand. Shows Ube as the
   "company brain" at the center of an orbital cluster of pill-shaped
   integration chips. Two-column layout: left column carries the eyebrow,
   headline, and body; right column carries the orbit. Sits between
   Problems and HowItWorks. */

const ORCHESTRATOR_INTEGRATIONS = [
  // Each entry: top/left position as % of orbit-area, logo, name.
  // Positions arranged so chips never overlap the center [ube] disc.
  { name: "Firebase",   Logo: FirebaseLogo,   top: "16%", left: "26%" },
  { name: "TikTok",     Logo: TikTokLogo,     top: "6%",  left: "55%" },
  { name: "Amplitude",  Logo: AmplitudeLogo,  top: "18%", left: "82%" },
  { name: "Sett",       Logo: SettLogo,       top: "30%", left: "70%" },
  { name: "Clarity",    Logo: ClarityLogo,    top: "44%", left: "18%" },
  { name: "RevenueCat", Logo: RevenueCatLogo, top: "46%", left: "86%" },
  { name: "AppsFlyer",  Logo: AppsFlyerLogo,  top: "66%", left: "26%" },
  { name: "AdMob",      Logo: AdMobLogo,      top: "66%", left: "86%" },
  { name: "Google Ads", Logo: GoogleAdsLogo,  top: "84%", left: "30%" },
  { name: "Creatify",   Logo: CreatifyLogo,   top: "92%", left: "55%" },
  { name: "Meta",       Logo: MetaLogo,       top: "84%", left: "80%" },
];

const OrchestratorChip = ({ Logo, name, top, left, delay = 0 }) => (
  <div
    className="orch-chip"
    style={{ top, left, animationDelay: `${delay}ms` }}
  >
    <span className="orch-chip-logo"><Logo size={20} /></span>
    <span className="orch-chip-name">{name}</span>
  </div>
);

const Orchestrator = () => (
  <section className="orchestrator-section" data-screen-label="Orchestrator">
    <div className="orchestrator-dots" aria-hidden="true" />
    <div className="container orchestrator-grid">
      <div className="orchestrator-copy">
        <div className="eyebrow" style={{ marginBottom: 28 }}>THE STACK</div>
        <h2 className="t-display-lg">
          Ube is the orchestrator,<br />not one more dashboard.
        </h2>
        <p className="t-body-md body" style={{ marginTop: 28, maxWidth: 520 }}>
          It uses the tools you would eventually need anyway. The
          difference is that Ube knows how your app is instrumented,
          where the events go, which campaigns use them, and which
          product experiments they are supposed to answer.
        </p>
      </div>

      <div className="orchestrator-orbit" aria-label="Tools Ube orchestrates">
        <div className="orch-ring orch-ring-outer" aria-hidden="true" />
        <div className="orch-ring orch-ring-inner" aria-hidden="true" />
        <div className="orch-core">
          <div className="orch-core-mark mono">[<span>ube</span>]</div>
          <div className="orch-core-label">COMPANY BRAIN</div>
        </div>
        {ORCHESTRATOR_INTEGRATIONS.map((it, i) => (
          <OrchestratorChip key={it.name} {...it} delay={80 * i} />
        ))}
      </div>
    </div>
  </section>
);

window.Orchestrator = Orchestrator;
