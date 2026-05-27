// =====================================================================
//  STEP 2: Triage — Kanban board grouped by state
// =====================================================================
import { LinkIcon, ListDashesIcon } from "@phosphor-icons/react"
import styles from "./triage-mockup.module.css"

type TriageCard = {
  sig: string
  versions: string
  dep: string
  linked?: boolean
  muted?: boolean
}

type TriageColumn = {
  name: string
  count: number
  color: string
  cards: TriageCard[]
}

export const TriageMockup = () => {
  const cols: TriageColumn[] = [
    {
      name: "NEW",
      count: 7,
      color: "var(--error)",
      cards: [
        {
          sig: "NPE in WidgetUnmount",
          versions: "v2.4.1 · v2.4.2",
          dep: "expo-camera@13.x",
          linked: true,
        },
        {
          sig: "ANR · onTouchEvent",
          versions: "v2.4.2",
          dep: "react-native@0.76",
        },
      ],
    },
    {
      name: "TRIAGED",
      count: 12,
      color: "var(--accent)",
      cards: [
        {
          sig: "Auth refresh race",
          versions: "v2.3.9–v2.4.2",
          dep: "expo-auth-session",
          linked: true,
        },
        {
          sig: "Image cache miss",
          versions: "v2.4.0+",
          dep: "react-native-fast-image",
        },
      ],
    },
    {
      name: "OBSOLETE",
      count: 4,
      color: "var(--muted)",
      cards: [
        {
          sig: "Splash flicker (fixed in 2.4.0)",
          versions: "v2.3.x",
          dep: "—",
          muted: true,
        },
      ],
    },
    {
      name: "MUTED",
      count: 2,
      color: "var(--muted-soft)",
      cards: [
        { sig: "Sentry quota noise", versions: "all", dep: "—", muted: true },
      ],
    },
  ]

  return (
    <div className="mockup-chrome" style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          borderBottom: "1px solid var(--hairline)",
          background: "var(--surface-elevated)",
        }}
      >
        <ListDashesIcon size={14} aria-hidden="true" />
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--ink)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
          }}
        >
          Issues
        </span>
        <span style={{ flex: 1 }} />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          25 tracked · 4 binaries live
        </span>
      </div>
      <div
        className={styles["triage-cols"]}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "var(--hairline)",
        }}
      >
        {cols.map((c) => (
          <div
            key={c.name}
            style={{
              background: "var(--surface-card)",
              padding: 14,
              minHeight: 240,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: c.color,
                }}
              />
              <span
                className="mono"
                style={{
                  fontSize: 10,
                  color: "var(--ink)",
                  letterSpacing: 0.7,
                }}
              >
                {c.name}
              </span>
              <span
                className="mono"
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  marginLeft: "auto",
                }}
              >
                {c.count}
              </span>
            </div>
            {c.cards.map((card, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--hairline)",
                  borderRadius: 8,
                  padding: "10px 12px",
                  marginBottom: 8,
                  opacity: card.muted ? 0.6 : 1,
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--ink)",
                    lineHeight: 1.35,
                  }}
                >
                  {card.sig}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 9.5, color: "var(--muted)", marginTop: 6 }}
                >
                  {card.versions}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 8,
                  }}
                >
                  <span
                    className="mono"
                    style={{ fontSize: 9.5, color: "var(--body)" }}
                  >
                    {card.dep}
                  </span>
                  {card.linked && (
                    <span
                      style={{ marginLeft: "auto" }}
                      className="pill pill-accent"
                    >
                      <LinkIcon size={7} aria-hidden="true" />
                      up
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
