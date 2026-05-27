/* Problems.jsx (publisher) — v2 copy. Each card is one tight
   consequence + a one-sentence punchline. Voice stays plainspoken
   developer-to-developer. */

const PUB_PROBLEMS_ROW1 = [
  {
    Icon: GearIcon, title: "Setup takes months.",
    body: "Three analytics SDKs. An MMP. An SKAdNetwork schema. Months of setup and debugging before your first ad goes live.",
  },
  {
    Icon: MegaphoneIcon, title: "Advertising is a full-time job.",
    body: "Meta, Google, TikTok, Reddit — each with its own dialect, billing, pixels, and quirks. Learning each one is a full-time job.",
  },
  {
    Icon: LoopIcon, title: "Growth is a feedback loop.",
    body: "Tune onboarding. Tune difficulty. Tune paywalls. All repetitive work, with a lot of waiting in between steps.",
  },
];

const PUB_PROBLEMS_ROW2 = [
  {
    Icon: SparklesIcon, title: "Ad creatives are relentless.",
    body: "Images, videos, playables, seasonal hooks. You need fresh creatives every month to keep customer acquisition costs low.",
  },
  {
    Icon: BarChartIcon, title: "Dashboards need code context.",
    body: "Twenty-character event names don't explain themselves. Without the engineer who wrote them in the room, everyone is guessing.",
  },
];

const ProblemCard = ({ Icon, title, body }) => (
  <div className="card card-hover problems-card">
    <div className="problems-card-icon"><Icon size={26} /></div>
    <h3 className="t-title-md ink">{title}</h3>
    <p className="t-body-sm body" style={{ margin: 0 }}>{body}</p>
  </div>
);

const PublisherProblems = () => (
  <section className="section problems-section" data-screen-label="Problems">
    <div className="container">
      <div className="eyebrow">THE PROBLEM</div>
      <h2 className="t-display-lg" style={{ maxWidth: 880 }}>
        You shipped the app.{" "}
        <span className="problems-headline-accent">Now the hard part starts.</span>
      </h2>
      <p className="t-body-md body">
        Building isn't the moat anymore. Distribution is. The gap
        between "it works" and "people use it" is where companies
        are won and lost.
      </p>
      <div className="grid-3 problems-grid">
        {PUB_PROBLEMS_ROW1.map((c) => <ProblemCard key={c.title} {...c} />)}
      </div>
      <div className="problems-grid-secondary">
        {PUB_PROBLEMS_ROW2.map((c) => <ProblemCard key={c.title} {...c} />)}
      </div>
    </div>
  </section>
);

window.PublisherProblems = PublisherProblems;
