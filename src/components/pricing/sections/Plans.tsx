import { CheckIcon } from "@phosphor-icons/react"
import React from "react"
import { track } from "@/lib/analytics"
import { openRequestAccess } from "@/stores/request-access"
import styles from "./plans.module.css"

type BillingPeriod = "monthly" | "yearly"

type Plan = {
  name: string
  monthlyPrice?: number
  yearlyMonthlyPrice?: number
  yearlySavings?: string
  unit?: string
  priceLabel?: string
  caption?: string
  includesLabel: string
  bullets: string[]
  footnote?: string
  buttonLabel: string
  buttonStyle: "primary" | "secondary"
  onClick: () => void
}

const PLANS: Plan[] = [
  {
    name: "Maintainer",
    monthlyPrice: 40,
    yearlyMonthlyPrice: 32,
    yearlySavings: "Save $96/yr",
    unit: "/app/mo",
    includesLabel: "Includes:",
    bullets: [
      "1 repo (cross-platform counts as one)",
      "8 PRs/mo — bug fixes, dependency upgrades, regression patches",
      "Crashlytics + Sentry + Play Console intake",
      "App-store review monitoring",
      "Verified PRs against your repo",
      "Upstream issue filing for unfixable bugs",
    ],
    buttonLabel: "Request access",
    buttonStyle: "secondary",
    onClick: () => openRequestAccess("pricing_maintainer"),
  },
  {
    name: "Maintainer + Publisher",
    monthlyPrice: 100,
    yearlyMonthlyPrice: 80,
    yearlySavings: "Save $240/yr",
    unit: "/app/mo",
    includesLabel: "Everything in Maintainer, plus:",
    bullets: [
      "12 PRs/mo",
      "Full analytics + attribution stack setup",
      "Amplitude / Firebase dashboards built and tuned",
      "Creative direction (image, video, playable)",
      "Ad campaign setup across Meta, Google, TikTok",
      "Weekly campaign refresh",
      "A/B test recommendations and deployment",
      "Scholarship access (Amplitude, AppsFlyer)",
    ],
    footnote:
      "Ad spend and optional creative-AI fees billed directly by those platforms.",
    buttonLabel: "Request access",
    buttonStyle: "primary",
    onClick: () => openRequestAccess("pricing_full"),
  },
  {
    name: "Enterprise",
    priceLabel: "Custom",
    includesLabel: "Everything in Maintainer + Publisher, plus:",
    bullets: [
      "Account manager (1:1 expert)",
      "SSO (SAML / OIDC)",
      "Audit logs",
      "BAA + DPA",
      "Self-hosted / VPC deployment",
      "Priority support",
      "Custom integrations",
    ],
    buttonLabel: "Contact sales",
    buttonStyle: "secondary",
    onClick: () => openRequestAccess("pricing_enterprise", "enterprise"),
  },
]

const PlanPrice = ({
  plan,
  billingPeriod,
}: {
  plan: Plan
  billingPeriod: BillingPeriod
}) => {
  if (plan.priceLabel) {
    return <div className={styles["price-custom"]}>{plan.priceLabel}</div>
  }

  const activePrice =
    billingPeriod === "yearly"
      ? (plan.yearlyMonthlyPrice ?? plan.monthlyPrice)
      : plan.monthlyPrice

  return (
    <div className={styles["price-block"]}>
      <div className={styles["price-row"]}>
        {billingPeriod === "yearly" && plan.monthlyPrice && (
          <span className={styles["price-original"]}>${plan.monthlyPrice}</span>
        )}
        <span className={styles["price-value"]}>${activePrice}</span>
        {plan.unit && <span className={styles["price-unit"]}>{plan.unit}</span>}
      </div>
      {billingPeriod === "yearly" && plan.yearlySavings && (
        <div className={styles["savings-note"]}>{plan.yearlySavings}</div>
      )}
    </div>
  )
}

export const Plans = () => {
  const [billingPeriod, setBillingPeriod] =
    React.useState<BillingPeriod>("monthly")

  const setPeriod = (period: BillingPeriod) => {
    setBillingPeriod(period)
    track("pricing_billing_period_changed", { period })
  }

  return (
    <section className={styles["plans-section"]} aria-label="Pricing plans">
      <div className="container">
        <fieldset className={styles["billing-toggle"]}>
          <legend className={styles["billing-legend"]}>Billing period</legend>
          <button
            type="button"
            className={`${styles["billing-option"]} ${
              billingPeriod === "monthly" ? styles["is-active"] : ""
            }`}
            aria-pressed={billingPeriod === "monthly"}
            onClick={() => setPeriod("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`${styles["billing-option"]} ${
              billingPeriod === "yearly" ? styles["is-active"] : ""
            }`}
            aria-pressed={billingPeriod === "yearly"}
            onClick={() => setPeriod("yearly")}
          >
            Yearly <span className={styles["save-text"]}>Save 20%</span>
          </button>
        </fieldset>

        <div className={styles["plans-grid"]}>
          {PLANS.map((plan) => (
            <article className={`card ${styles["plan-card"]}`} key={plan.name}>
              <div>
                <h2 className={styles["plan-name"]}>{plan.name}</h2>
                <PlanPrice plan={plan} billingPeriod={billingPeriod} />
                {plan.caption && (
                  <p className={styles["plan-caption"]}>{plan.caption}</p>
                )}
              </div>

              <div className={styles["features-block"]}>
                <h3 className={styles["includes-label"]}>
                  {plan.includesLabel}
                </h3>
                <ul className={styles["feature-list"]}>
                  {plan.bullets.map((bullet) => (
                    <li key={bullet}>
                      <CheckIcon size={14} weight="bold" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                {plan.footnote && (
                  <p className={styles["plan-footnote"]}>{plan.footnote}</p>
                )}
              </div>

              <button
                type="button"
                className={`btn btn-${plan.buttonStyle} ${styles["plan-button"]}`}
                onClick={plan.onClick}
              >
                {plan.buttonLabel}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
