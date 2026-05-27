/* MoatStrip.jsx — three quote-style cards that articulate the moat
   from the essay. New visual rhythm: full-width strip, centered intro,
   three quote cards. Sits between HowItWorks and Benefits as a breath
   moment — and explains why Ube and not "an agent inside Meta Ads." */

const MOAT = [
  {
    quote: "Cross-platform",
    body: <React.Fragment>Meta won't shift your budget to Google. Apple won't tune your Play listing. <span className="em">Cross-platform optimization can only live outside the platforms.</span></React.Fragment>,
  },
  {
    quote: "Lane-agnostic",
    body: <React.Fragment>RevenueCat ignores ads. AppLovin ignores subs. Ube doesn't pick. <span className="em">Hybrid apps run as one stack</span> — subscription, IAP, and ads, on one dashboard.</React.Fragment>,
  },
  {
    quote: "Tradecraft, democratized",
    body: <React.Fragment>UA tradecraft lives in a few hundred minds. <span className="em">Ube ships it as a handbook plus a hand running every step</span> — so a solo founder can run campaigns a senior UA lead would be proud of.</React.Fragment>,
  },
];

const MoatStrip = () => (
  <section className="moat-strip" data-screen-label="Moat">
    <div className="container">
      <div className="head">
        <div className="eyebrow" style={{ marginBottom: 18, justifyContent: "center", display: "inline-flex" }}>WHY UBE</div>
        <h2 className="t-display-lg">
          Why no one else<br />can build this.
        </h2>
      </div>
      <div className="moat-grid">
        {MOAT.map(({ quote, body }) => (
          <div key={quote} className="moat-card">
            <div className="quote">// {quote}</div>
            <p className="body" style={{ margin: 0 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

window.MoatStrip = MoatStrip;
