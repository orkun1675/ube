// =====================================================================
//  FAQ
// =====================================================================
// Lifted to module scope so build.mjs can read it via globalThis.FAQ_ITEMS
// during SSR and generate the FAQPage JSON-LD from the same source as the
// rendered FAQ.
const FAQ_ITEMS = [
  {
    q: "Does Ube auto-merge, or does it only open PRs for review?",
    a: "Ube always opens PRs — you stay in control of what ships. Auto-merge is opt-in per repository, and even then it's gated behind your existing branch protections and required checks.",
  },
  {
    q: "Where does my code go?",
    a: "Your code runs in ephemeral, per-repo sandboxes that are destroyed after each job. We don't train on your code, and we don't keep it after the run. Self-hosting is offered for enterprise customers with strict privacy requirements.",
  },
  {
    q: "Which frameworks and platforms does Ube support?",
    a: "React Native, Expo, Flutter, native iOS (Swift / Obj-C), native Android (Kotlin / Java), and Capacitor / Ionic out of the box. Other stacks can be onboarded on request — get in touch.",
  },
  {
    q: "What if Ube makes a bad fix?",
    a: "Every PR runs your tests plus a generated regression suite before opening, and the diff is yours to review. Marking a fix rejected teaches Ube to avoid that approach for the same signature — it gets better at your codebase over time.",
  },
]

const FAQItem = ({ q, a, defaultOpen }) => {
  const [open, setOpen] = React.useState(!!defaultOpen)
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button
        type="button"
        className="faq-question"
        onClick={() =>
          setOpen((o) => {
            if (!o) track("faq_opened", { question: q })
            return !o
          })
        }
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className="faq-icon">
          <PlusIcon size={12} />
        </span>
      </button>
      <div className="faq-answer">
        <div className="faq-answer-inner">{a}</div>
      </div>
    </div>
  )
}

const FAQ = () => {
  return (
    <section className="section" style={{ background: "var(--canvas-soft)" }}>
      <div className="container">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            FAQ
          </div>
          <h2 className="t-display-lg" style={{ margin: 0, marginBottom: 40 }}>
            The details.
          </h2>
          <div>
            {FAQ_ITEMS.map((it, i) => (
              <FAQItem key={i} {...it} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

Object.assign(window, { FAQ, FAQ_ITEMS })
