// =====================================================================
//  FAQ
// =====================================================================

import { PlusIcon } from "@phosphor-icons/react"
import React from "react"
import type { FaqItem } from "@/data/faq-items"
import { FAQ_ITEMS } from "@/data/faq-items"
import { track } from "@/lib/analytics"
import styles from "./faq.module.css"

type FaqItemProps = FaqItem & { defaultOpen?: boolean }
type FAQProps = {
  eyebrow?: string
  headline?: string
  items?: FaqItem[]
}

const FAQItem = ({ q, a, defaultOpen }: FaqItemProps) => {
  const [open, setOpen] = React.useState(!!defaultOpen)
  return (
    <div className={`${styles["faq-item"]} ${open ? styles["is-open"] : ""}`}>
      <button
        type="button"
        className={styles["faq-question"]}
        onClick={() =>
          setOpen((o) => {
            if (!o) track("faq_opened", { question: q })
            return !o
          })
        }
        aria-expanded={open}
      >
        <h3 className={styles["faq-question-text"]}>{q}</h3>
        <span className={styles["faq-icon"]}>
          <PlusIcon size={12} aria-hidden="true" />
        </span>
      </button>
      <div className={styles["faq-answer"]}>
        <div className={styles["faq-answer-inner"]}>{a}</div>
      </div>
    </div>
  )
}

export const FAQ = ({
  eyebrow = "FAQ",
  headline = "The details.",
  items = FAQ_ITEMS,
}: FAQProps) => {
  return (
    <section className="section" style={{ background: "var(--canvas-soft)" }}>
      <div className="container">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>
            {eyebrow}
          </div>
          <h2 className="t-display-lg" style={{ margin: 0, marginBottom: 40 }}>
            {headline}
          </h2>
          <div>
            {items.map((it, i) => (
              <FAQItem key={i} {...it} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
