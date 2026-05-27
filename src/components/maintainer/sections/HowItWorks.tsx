// =====================================================================
//  How It Works
// =====================================================================

import { ArrowRightIcon } from "@phosphor-icons/react"
import React from "react"
import { FixMockup } from "@/components/maintainer/mockups/FixMockup"
import { IntakeMockup } from "@/components/maintainer/mockups/IntakeMockup"
import { ReportFailureMockup } from "@/components/maintainer/mockups/ReportFailureMockup"
import { ReportSuccessMockup } from "@/components/maintainer/mockups/ReportSuccessMockup"
import { TriageMockup } from "@/components/maintainer/mockups/TriageMockup"
import { DedupeModal } from "@/components/maintainer/modals/DedupeModal"
import { FixLoopModal } from "@/components/maintainer/modals/FixLoopModal"
import { SourcesModal } from "@/components/maintainer/modals/SourcesModal"
import { track } from "@/lib/analytics"

type StepProps = {
  num: string
  label: string
  title: string
  body: string
  learnMore?: string
  onLearnMore?: () => void
  disabled?: boolean
  visual: React.ReactNode
  reversed?: boolean
}

const Step = ({
  num,
  label,
  title,
  body,
  learnMore,
  onLearnMore,
  disabled,
  visual,
  reversed,
}: StepProps) => (
  <div
    className="card-band"
    style={{
      display: "grid",
      gridTemplateColumns: reversed ? "1fr 1.4fr" : "1.4fr 1fr",
      gap: 48,
      alignItems: "center",
      marginBottom: 24,
    }}
  >
    {/* Visual (always first DOM-wise so it appears first on mobile when stacked? — actually we want copy first on mobile typically). Let's order DOM by reversed flag */}
    {!reversed && (
      <div className="step-visual" style={{ minWidth: 0 }}>
        {visual}
      </div>
    )}

    <div className="step-copy" style={{ minWidth: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <span className="step-num">{num}</span>
        <span className="eyebrow" style={{ margin: 0 }}>
          {label}
        </span>
      </div>
      <h3
        className="t-display-md ink"
        style={{ marginBottom: 16, lineHeight: 1.2 }}
      >
        {title}
      </h3>
      <p
        className="t-body-md body"
        style={{ margin: 0, marginBottom: 18, lineHeight: 1.65 }}
      >
        {body}
      </p>
      {learnMore &&
        (disabled ? (
          <span
            className="inline-link coming-soon"
            aria-disabled="true"
            style={{ opacity: 0.4 }}
          >
            {learnMore} <ArrowRightIcon size={12} aria-hidden="true" />
            <span className="tooltip">Coming soon</span>
          </span>
        ) : (
          <button type="button" className="inline-link" onClick={onLearnMore}>
            {learnMore} <ArrowRightIcon size={12} aria-hidden="true" />
          </button>
        ))}
    </div>

    {reversed && (
      <div className="step-visual" style={{ minWidth: 0 }}>
        {visual}
      </div>
    )}
  </div>
)

export const HowItWorks = () => {
  const [sourcesOpen, setSourcesOpen] = React.useState(false)
  const [dedupeOpen, setDedupeOpen] = React.useState(false)
  const [fixLoopOpen, setFixLoopOpen] = React.useState(false)
  const openStep = (
    step: string,
    title: string,
    setter: (open: boolean) => void,
  ) => {
    track("how_it_works_step_opened", { page: "maintainer", step, title })
    setter(true)
  }
  const steps: StepProps[] = [
    {
      num: "01",
      label: "Intake",
      reversed: true,
      title: "Monitors all platforms.",
      body: "Firebase Crashlytics, Sentry, Play Console ANRs, App Store reviews, support inboxes, dependency releases — all funneled into one timeline. Nothing slips through.",
      learnMore: "Supported sources",
      onLearnMore: () => openStep("01-intake", "Intake", setSourcesOpen),
      visual: <IntakeMockup />,
    },
    {
      num: "02",
      label: "Triage",
      reversed: false,
      title: "Tracks bugs across binaries.",
      body: "Stack traces are symbolized on intake, then deduplicated by signature across versions, OSes, and dependency upgrades. Per-issue state lives on a single dashboard — the source of truth your maintenance agent reads from.",
      learnMore: "How issues are deduplicated",
      onLearnMore: () => openStep("02-triage", "Triage", setDedupeOpen),
      visual: <TriageMockup />,
    },
    {
      num: "03",
      label: "Fix",
      reversed: true,
      title: "Reproduce, patch, verify — then open the PR.",
      body: "Ube reproduces the bug on an emulator, writes the patch, and runs your test suite — then QAs the app by hand, clicking through like a real user. Once the issue is verified fixed and nothing else broke, it opens a PR. Watch the GIFs, read the diff, merge.",
      learnMore: "Inside the fix loop",
      onLearnMore: () => openStep("03-fix", "Fix", setFixLoopOpen),
      visual: <FixMockup />,
    },
    {
      num: "04",
      label: "Release",
      reversed: false,
      title: "Close the loop with the customer who reported it.",
      body: "Once the fix ships, Ube tracks which release it landed in, when it rolled out to production, and writes back to the original reporter. Angry one-star reviews turn into thank-yous, and your rating climbs week over week.",
      learnMore: "Customer reply policies",
      disabled: true,
      visual: <ReportSuccessMockup />,
    },
    {
      num: "05",
      label: "Escalate",
      reversed: true,
      title: "Reports bugs upstream when needed.",
      body: "When facing an upstream bug, Ube opens a detailed issue on their repo — with repro steps, logs, and a minimal reproduction. When it can't reproduce or resolve a bug itself, it hands the thread back with everything it learned.",
      learnMore: "View sample bug report",
      disabled: true,
      visual: <ReportFailureMockup />,
    },
  ]

  return (
    <section
      className="section"
      id="how"
      style={{ background: "var(--canvas-soft)" }}
      data-screen-label="How It Works"
    >
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 18 }}>
          THE SOLUTION
        </div>
        <h2
          className="t-display-lg"
          style={{ margin: 0, marginBottom: 14, maxWidth: 760 }}
        >
          Ube runs on your repo
          <br />
          around the clock.
        </h2>
        <p
          className="t-body-md body"
          style={{ margin: 0, marginBottom: 48, maxWidth: 640 }}
        >
          Set up in 10 minutes. Automated from then on.
        </p>

        <div>
          {steps.map((s) => (
            <Step key={s.num} {...s} />
          ))}
        </div>
      </div>
      <SourcesModal open={sourcesOpen} onClose={() => setSourcesOpen(false)} />
      <DedupeModal open={dedupeOpen} onClose={() => setDedupeOpen(false)} />
      <FixLoopModal open={fixLoopOpen} onClose={() => setFixLoopOpen(false)} />
    </section>
  )
}
