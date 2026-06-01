// Single source of truth for the jargon / abbreviation glossary.
//
// The site speaks to two audiences at once — engineers and "vibecoders" —
// so abbreviations get one of two treatments at the call site:
//
//   1. Spell-out (where there's room): render `expansion (TERM)` as plain
//      text, e.g. "customer acquisition cost (CAC)". Spell out once per
//      section, then use the bare term. Pure copy — no component needed.
//
//   2. Tap-gloss (tight space — mockups, 2–3 line cards — or any term whose
//      spelled-out form is still jargon): render <Term term="…" />, which
//      shows the term with a dotted underline; tapping reveals `gloss` in an
//      anchored pop-over (a floating tooltip that doesn't reflow the page).
//
// `gloss` is deliberately NOT a dictionary expansion — it's a short, context-
// relevant phrase a non-technical reader can act on.
//
// `alwaysTap` marks terms whose `expansion` is itself opaque (ANR →
// "application not responding" helps no one), so they use treatment 2 even
// where there is space to spell them out.

export interface GlossaryEntry {
  /** The abbreviation exactly as displayed, e.g. "CAC", "SKAdNetwork". */
  term: string
  /** Spelled-out form for the inline "expansion (TERM)" treatment. */
  expansion: string
  /** Short, context-relevant phrase shown in the tap pop-over. */
  gloss: string
  /** When true, the expansion is still jargon — always prefer the tap pop-over. */
  alwaysTap?: boolean
}

export const glossary = {
  // --- Bucket A — growth / marketing metrics (Publisher side) ----------
  cac: {
    term: "CAC",
    expansion: "customer acquisition cost",
    gloss: "Cost in ads and marketing to win one new user.",
  },
  ltv: {
    term: "LTV",
    expansion: "lifetime value",
    gloss: "Total revenue an average user brings before they churn.",
  },
  arpu: {
    term: "ARPU",
    expansion: "average revenue per user",
    gloss: "Average revenue per user, usually monthly.",
  },
  dau: {
    term: "DAU",
    expansion: "daily active users",
    gloss: "Unique people who open the app each day.",
  },
  roas: {
    term: "ROAS",
    expansion: "return on ad spend",
    gloss: "Revenue per $1 of ad spend (above 1× = profitable).",
  },
  d1: {
    term: "D1",
    expansion: "day-1 retention",
    gloss: "Share of new users still active 1 day after install.",
  },
  d7: {
    term: "D7",
    expansion: "day-7 retention",
    gloss: "Share of new users still active 1 week after install.",
  },
  d30: {
    term: "D30",
    expansion: "day-30 retention",
    gloss: "Share of new users still active 1 month after install.",
  },
  mmp: {
    term: "MMP",
    expansion: "mobile measurement partner",
    gloss:
      "Service that tracks which ad each install came from. AppsFlyer, Adjust, etc.",
    alwaysTap: true,
  },
  skadnetwork: {
    term: "SKAdNetwork",
    expansion: "SKAdNetwork",
    gloss: "Apple's privacy-safe ad-attribution framework.",
    alwaysTap: true,
  },
  sdk: {
    term: "SDK",
    expansion: "software development kit",
    gloss: "Drop-in vendor code library you add to your app.",
  },

  // --- Bucket B — mobile / engineering jargon (Maintainer side) --------
  pr: {
    term: "PR",
    expansion: "pull request",
    gloss: "Proposed code change you review before it merges.",
  },
  anr: {
    term: "ANR",
    expansion: "application not responding",
    gloss: "Android freeze, main thread blocked, UI unresponsive.",
    alwaysTap: true,
  },
  npe: {
    term: "NPE",
    expansion: "null pointer exception",
    gloss: "Crash from using a value that isn't there (null).",
    alwaysTap: true,
  },
  adb: {
    term: "ADB",
    expansion: "Android Debug Bridge",
    gloss: "CLI that installs and controls apps on a device or emulator.",
    alwaysTap: true,
  },
  qa: {
    term: "QA",
    expansion: "quality assurance",
    gloss: "Testing the app by using it, to catch bugs pre-release.",
  },
} satisfies Record<string, GlossaryEntry>

export type GlossaryKey = keyof typeof glossary
