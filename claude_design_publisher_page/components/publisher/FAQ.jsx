/* FAQ.jsx (publisher) — accordion. Questions are real ones a vibecoder
   would actually ask before handing over their ad spend. */

const PUB_FAQ_ITEMS = [
  { q: "I've never run a campaign before. Is Publisher for me?",
    a: "Yes — Publisher is built for builders who shipped an app and now don't know what to do next. Ube handles the parts that take a marketing background (event taxonomies, SKAdNetwork, campaign structure) and explains its decisions in plain language. You don't need to know what an MMP is to use it." },
  { q: "How much should I expect to spend on ads?",
    a: "Ube starts conservatively — $10–$20 a day — and only scales spend once it's seeing positive ROAS on a creative. You set the cap; Ube never spends past it. Most early teams find the right CAC under $100 of total test spend." },
  { q: "Will Ube hand over the keys to my Facebook/Google/TikTok accounts?",
    a: "No — Ube only needs service-account access to the platforms you choose. You can revoke any integration at any time, see every action it took, and watch budget changes live. The tools it sets up are yours — if you outgrow Ube, you keep the stack." },
  { q: "What if my app is purely subscription / purely ad-supported / hybrid?",
    a: "All three are first-class. Ube doesn't pick a monetization lane upfront; RevenueCat handles subscriptions and IAP, AdMob handles ad revenue, and they share dashboards. A hybrid app — increasingly the default — runs on one stack with no extra wiring." },
  { q: "What if Ube spends my budget poorly?",
    a: "You set a hard daily cap, and you can pause any campaign with one click. Ube logs every decision (\"shifted $8 from Google to Meta because Meta CAC was 31% lower over 72 h\"). Marking a decision wrong teaches it for next time — like the Maintainer's bad-fix feedback loop." },
];

const PublisherFAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section faq-section" id="faq" data-screen-label="FAQ">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>FAQ</div>
        <h2 className="t-display-lg" style={{ maxWidth: 760 }}>Questions, answered.</h2>
        <div className="faq-list">
          {PUB_FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`faq-row ${open === i ? "open" : ""}`}>
              <button
                type="button"
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="ic"><PlusIcon size={14} /></span>
                <span style={{ flex: 1 }}>{item.q}</span>
              </button>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.PublisherFAQ = PublisherFAQ;
