// FAQ source of truth. Imported by both the FAQ React component and the
// landing page's Astro frontmatter (which builds the FAQPage JSON-LD from
// these same items). Keeps the visible answers and the structured-data
// answers in sync — AI answer engines (Perplexity, ChatGPT search, etc.)
// quote the JSON-LD verbatim.

export type FaqItem = {
  q: string
  a: string
}

export const FAQ_ITEMS: FaqItem[] = [
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
