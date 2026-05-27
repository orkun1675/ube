/* Benefits.jsx (publisher) — v2 copy. Outcome-first titles (a real
   number or a hard promise), one-sentence bodies. Same OUTCOMES grid
   pattern as Maintainer. The big stat is the marquee value prop. */

const PUB_BENEFITS = [
  { Icon: RocketIcon, title: "Launch in days.",
    body: "What a growth team spends a quarter wiring up, Ube does in days. SDKs, MMP, dashboards — instrumented before your next sprint." },
  { Icon: InfinityIcon, title: "One stack. One agent.",
    body: "Analytics, attribution, ads, A/B tests, and pricing — all on tools that talk to each other. No six-dashboard juggle." },
  { Icon: TrendIcon, title: "Spend where it works.",
    body: "Ube watches CAC and ROAS across networks and shifts budget on its own. You set the daily cap; it never spends past it." },
  { Icon: ShieldIcon, title: "No lock-in.",
    body: "Firebase, AppsFlyer, RevenueCat — the stack Ube sets up is yours. Outgrow the agent and hire a real team; nothing has to change." },
  { Icon: SparkIcon, title: "Hybrid by default.",
    body: "Subscription, IAP, and ads can all live in the same app and the same dashboard. No need to pick a monetization lane up front." },
  { Icon: StarIcon, title: "Tradecraft, baked in.",
    body: "Campaign structure, look-alikes, retargeting, seasonality — the playbook senior UA leads carry in their heads. Inside the agent." },
];

const PublisherBenefits = () => (
  <section className="section benefits-section" data-screen-label="Benefits">
    <div className="container">
      <div className="eyebrow">OUTCOMES</div>
      <div className="benefits-head">
        <h2 className="t-display-lg benefits-headline">
          You build product.<br />Ube runs growth.
        </h2>
        <div className="benefits-stat-row">
          <div className="t-display-mega benefits-stat">Days.</div>
          <div className="t-body-md body benefits-stat-caption">
            from "app shipped" to a live growth stack — without a single
            growth hire.
          </div>
        </div>
      </div>
      <div className="grid-3 benefits-grid">
        {PUB_BENEFITS.map(({ Icon, title, body }) => (
          <div key={title} className="card card-hover benefits-card">
            <div className="benefits-icon"><Icon /></div>
            <h3 className="t-title-md ink">{title}</h3>
            <p className="t-body-sm body" style={{ margin: 0 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

window.PublisherBenefits = PublisherBenefits;
