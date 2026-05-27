/* Benefits.jsx — OUTCOMES grid with the 10–30 % engineering-time stat. */

const BENEFITS = [
  { Icon: SparkIcon, title: "Reclaim engineering time.",
    body: "Stop spending a third of every sprint debugging race conditions you didn't write. Hand the boring triage to Ube and continue shipping delightful features." },
  { Icon: ChatIcon, title: "Your backlog stays lean.",
    body: "Every incoming bug report is triaged, fixed, or followed up on — automatically. Nothing rots in the queue, so your task list stays short." },
  { Icon: ShieldIcon, title: "Catch bugs early.",
    body: "Ube becomes your manual QA agent, clicks around the app like a human would. You no longer need to wait for a beta or alpha release to discover bugs." },
  { Icon: TrendIcon, title: "Stay under Play's bad-behavior threshold.",
    body: "Apps crashing on more than 1.09 % of sessions or hitting ANRs above 0.47 % get demoted in Play discoverability." },
  { Icon: StarIcon, title: "Higher app-store ratings.",
    body: "Faster fixes plus a personal follow-up nudges users back into the review flow. Updated reviews compound into a better average rating for your app." },
  { Icon: RocketIcon, title: "Keep tech debt in check.",
    body: "Agentic coding ships features faster than ever — and quietly piles up bugs and shortcuts. Ube does the unglamorous cleanup in the background so velocity doesn't come to a halt." },
];

const Benefits = () => (
  <section className="section benefits-section" data-screen-label="Benefits">
    <div className="container">
      <div className="eyebrow" style={{ marginBottom: 18 }}>OUTCOMES</div>
      <div className="benefits-head">
        <h2 className="t-display-lg benefits-headline">
          Less time maintaining.<br />More time building.
        </h2>
        <div className="benefits-stat-row">
          <div className="t-display-mega benefits-stat">10-30%</div>
          <div className="t-body-md body benefits-stat-caption">
            of your team's engineering time reclaimed, based on early teams running Ube.
          </div>
        </div>
      </div>
      <div className="grid-3 benefits-grid">
        {BENEFITS.map(({ Icon, title, body }) => (
          <div key={title} className="card card-hover benefits-card">
            <div className="benefits-icon"><Icon /></div>
            <h3 className="t-title-md ink" style={{ marginBottom: 10 }}>{title}</h3>
            <p className="t-body-sm body" style={{ margin: 0, lineHeight: 1.6 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

window.Benefits = Benefits;
