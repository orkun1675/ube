import type { FaqItem } from "@/data/faq-items"

export const PRICING_FAQ_ITEMS: FaqItem[] = [
  {
    q: "What counts as one app?",
    a: "One repo = one app. Cross-platform projects (React Native, Flutter, Capacitor, etc.) ship to both stores under a single subscription.",
  },
  {
    q: "What counts as one pull request (PR)?",
    a: "Anything Ube opens against your repo: bug fixes, dependency upgrades, regression patches. Customer follow-ups and upstream issue filings on dependencies are free side-effects of resolving an issue and don't count.",
  },
  {
    q: "What happens if I exceed my monthly PR cap?",
    a: "Extra PRs are optional and billed at $10 each. Ube only keeps working past your monthly cap if you approve the overage; you can also upgrade your plan to get a higher cap.",
  },
  {
    q: "Are ad platform fees included in Maintainer + Publisher?",
    a: "No. Ad spend (Meta, Google, TikTok, etc.) is paid directly to those platforms with your own credit card. Same for optional creative-generation AI fees (Ube doesn't mark these up).",
  },
  {
    q: "What does scholarship access mean?",
    a: "We help eligible startups apply to programs like Amplitude for Startups and the AppsFlyer Startup Program. We're not a partner and don't get a referral fee. We just know the application playbook and can shepherd you through it.",
  },
]
