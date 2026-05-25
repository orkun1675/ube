// =====================================================================
//  FAQ
// =====================================================================
import React from "react"

import { FAQ_ITEMS, type FaqItem } from "../../data/faq-items"
import { track } from "../../lib/analytics"
import { PlusIcon } from "../../lib/assets"

type FaqItemProps = FaqItem & { defaultOpen?: boolean }

const FAQItem = ({ q, a, defaultOpen }: FaqItemProps) => {
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
        <h3 className="faq-question-text">{q}</h3>
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

export const FAQ = () => {
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
