# Ube landing

The marketing site at [ube.dev](https://ube.dev). Its sole job is to measure interest in Ube (a software product not yet released). The Request Access modal's "Which product matters more to you?" radio (Maintainer vs Publisher) is the central signal the site is designed to collect.

## Language

**Conversion modal**:
The Request Access modal. Reachable from every route via the Nav, Hero, and Final CTAs. Captures the Maintainer-vs-Publisher product interest signal the entire site is designed around.
_Avoid_: "the modal" (ambiguous — see Detail modal)

**Detail modal**:
A modal scoped to a single section. Today: Sources, Dedupe, and Fix Loop modals inside HowItWorks, opened from a step's "Learn more" link. Lifetime is local to its owning section.
_Avoid_: "the modal" (ambiguous — see Conversion modal)

**Tweak**:
A dev-only design knob — either a **color tweak** (live-previewed via DOM manipulation) or a **structural tweak** (live-previewed via HMR reload). Each tweak has a baked default that ships in production; production code does not reference the tweaks system.

**Tweaks panel**:
The in-page UI for adjusting tweaks during development. Excluded from production builds entirely.

**Section**:
A top-level page region (Hero, Problems, HowItWorks, Benefits, FAQ, FinalCTA, etc.). Sections compose into pages. Some sections contain mockups.

**Mockup**:
An in-page visual representation of the Ube product (IntakeMockup, TriageMockup, FixMockup, ReportSuccessMockup, ReportFailureMockup, and the Hero mockup variants). Mockups are visual, not functional product surfaces.

**Ube Publisher**:
The Ube product for mobile app distribution. It sets up the distribution stack, keeps the paid-acquisition-to-product-learning loop running, and asks for approval at expensive or risky points such as account creation, ad spend, campaign launches, monetization changes, and larger budget increases. Paid ads are treated as a measurement engine first: they create a steady stream of users so Ube can find working creatives, identify drop-off points, recommend A/B tests, improve retention and monetization, and only then help scale the app by investing dollars more efficiently.

**Source** (analytics):
A coarse label identifying which CTA fired an analytics event — `"nav"`, `"hero"`, `"final_cta"`. Page-level breakdown comes from Amplitude's auto-captured URL, not from the source label.

## Example dialogue

> **Dev**: "If I add a publisher page, does the conversion modal need to be re-wired?"
>
> **Designer**: "No — the conversion modal is in the shared layout, so every route gets it. You only need to add the CTA buttons on the page and wire them to `openRequestAccess('publisher_hero')` or whatever source label."
>
> **Dev**: "And what about the detail modals?"
>
> **Designer**: "Those only matter inside HowItWorks. If publisher has its own 'how it works' section, it gets its own detail modals scoped to that section. They don't share state with the HowItWorks detail modals."
