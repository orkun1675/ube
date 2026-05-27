/* FAQ.jsx — four-item accordion. Copy is pulled verbatim from the
   live FAQ_ITEMS source of truth. */

const FAQ_ITEMS = [
  { q: "Does Ube auto-merge, or does it only open PRs for review?",
    a: "Ube always opens PRs — you stay in control of what ships. Auto-merge is opt-in per repository, and even then it's gated behind your existing branch protections and required checks." },
  { q: "Where does my code go?",
    a: "Your code runs in ephemeral, per-repo sandboxes that are destroyed after each job. We don't train on your code, and we don't keep it after the run. Self-hosting is offered for enterprise customers with strict privacy requirements." },
  { q: "Which frameworks and platforms does Ube support?",
    a: "React Native, Expo, Flutter, native iOS (Swift / Obj-C), native Android (Kotlin / Java), and Capacitor / Ionic out of the box. Other stacks can be onboarded on request — get in touch." },
  { q: "What if Ube makes a bad fix?",
    a: "Every PR runs your tests plus a generated regression suite before opening, and the diff is yours to review. Marking a fix rejected teaches Ube to avoid that approach for the same signature — it gets better at your codebase over time." },
];

const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section faq-section" id="faq" data-screen-label="FAQ">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>FAQ</div>
        <h2 className="t-display-lg" style={{ maxWidth: 760 }}>Questions, answered.</h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
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

window.FAQ = FAQ;
