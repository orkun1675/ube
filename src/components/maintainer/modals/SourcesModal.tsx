// =====================================================================
//  Sources Modal — signal sources Ube listens to
// =====================================================================
import { EnvelopeIcon } from "@phosphor-icons/react"
import type { ImageMetadata } from "astro"
import type { ReactNode } from "react"
import { Term } from "@/components/Term"
import { CONTACT_EMAIL } from "@/constants"
import { integrationLogos } from "@/lib/integration-logos"
import { Modal } from "@/lib/modal"
import styles from "./sources-modal.module.css"

type SourcesModalProps = { open: boolean; onClose: () => void }

type SourceEntry = {
  name: string
  desc: ReactNode
  logo?: ImageMetadata
  logoInvert?: boolean
  icon?: string
  mono?: string
}

type SourceGroup = {
  label: string
  sources: SourceEntry[]
}

export const SourcesModal = ({ open, onClose }: SourcesModalProps) => {
  const groups: SourceGroup[] = [
    {
      label: "Crash & errors",
      sources: [
        {
          logo: integrationLogos.firebase,
          name: "Firebase Crashlytics",
          desc: (
            <>
              Native crashes, <Term term="anr" label="ANRs" />, custom events
            </>
          ),
        },
        {
          logo: integrationLogos.sentry,
          logoInvert: true,
          name: "Sentry",
          desc: "JS / native errors with stack traces & releases",
        },
      ],
    },
    {
      label: "Store signals",
      sources: [
        {
          logo: integrationLogos.googlePlay,
          name: "Play Console",
          desc: (
            <>
              <Term term="anr" label="ANRs" />, vitals, store reviews
            </>
          ),
        },
        {
          logo: integrationLogos.apple,
          logoInvert: true,
          name: "App Store Connect",
          desc: "iOS reviews, crash reports",
        },
      ],
    },
    {
      label: "Customer voice",
      sources: [
        { icon: "mail", name: "Support inboxes", desc: "Zendesk, plain email" },
      ],
    },
    {
      label: "Dependency feeds",
      sources: [
        {
          logo: integrationLogos.npm,
          name: "npm",
          desc: "JS / TS package releases & security advisories",
        },
        {
          logo: integrationLogos.bun,
          name: "Bun",
          desc: "Bun runtime + registry release feed",
        },
        {
          logo: integrationLogos.dart,
          name: "pub.dev",
          desc: "Dart & Flutter package releases",
        },
      ],
    },
    {
      label: "Build & symbols",
      sources: [
        {
          logo: integrationLogos.codemagic,
          name: "Codemagic",
          desc: "Pulls dSYMs & ProGuard mappings for de-obfuscated stack traces",
        },
      ],
    },
  ]

  let flatIdx = 0

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="modal-backdrop"
      panelClassName={`modal-panel ${styles["sources-panel"]}`}
      labelledBy="sources-title"
    >
      <div className={styles["sources-header"]}>
        <div className={styles["sources-scanner"]} aria-hidden="true">
          <span className={styles["scanner-grid"]} />
          <span className={`${styles["scanner-ring"]} ${styles["ring-1"]}`} />
          <span className={`${styles["scanner-ring"]} ${styles["ring-2"]}`} />
          <span className={styles["scanner-sweep"]} />
          <span className={styles["scanner-dot"]} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            SIGNAL SOURCES
          </div>
          <h3
            id="sources-title"
            className="t-display-md"
            style={{ margin: 0, marginBottom: 8, lineHeight: 1.15 }}
          >
            Every channel your bugs hide in.
          </h3>
          <p className="t-body-md body" style={{ margin: 0 }}>
            Need additional integrations?{" "}
            <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>
              Reach out →
            </a>
          </p>
        </div>
      </div>

      <div className={styles["sources-groups"]}>
        {groups.map((g, gi) => (
          <div
            key={g.label}
            className={styles["sources-group"]}
            style={{ animationDelay: `${120 + gi * 90}ms` }}
          >
            <div className={styles["sources-group-label"]}>
              <span className={styles["sources-tick"]} />
              {g.label}
              <span className={styles["sources-group-rule"]} />
              <span className="mono muted" style={{ fontSize: 10 }}>
                {g.sources.length.toString().padStart(2, "0")}
              </span>
            </div>
            <div className={styles["sources-grid"]}>
              {g.sources.map((s) => {
                const delay = 220 + flatIdx * 65
                flatIdx++
                return (
                  <div
                    key={s.name}
                    className={styles["source-card"]}
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <div
                      className={`${styles["source-mono"]} ${s.logo ? styles["source-mono-logo"] : ""} ${s.icon ? styles["source-mono-icon"] : ""}`}
                    >
                      {s.logo ? (
                        <img
                          src={s.logo.src}
                          alt=""
                          className={s.logoInvert ? "logo-invert" : ""}
                        />
                      ) : s.icon === "mail" ? (
                        <EnvelopeIcon
                          size={28}
                          color="var(--accent)"
                          aria-hidden="true"
                        />
                      ) : (
                        s.mono
                      )}
                    </div>
                    <div className={styles["source-meta"]}>
                      <div className={styles["source-name"]}>{s.name}</div>
                      <div className={styles["source-desc"]}>{s.desc}</div>
                    </div>
                    <div className={styles["source-status"]} title="Listening">
                      <span className={styles["status-dot"]} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles["sources-foot"]} style={{ display: "none" }}>
        <span className="mono muted" style={{ fontSize: 11 }}>
          Need a custom feed?{" "}
          <button
            type="button"
            className="inline-link"
            style={{ fontSize: 11 }}
            onClick={onClose}
          >
            Tell us about your stack →
          </button>
        </span>
      </div>
    </Modal>
  )
}
