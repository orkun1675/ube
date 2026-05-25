// =====================================================================
//  STEP 1: Intake — multi-source inbox
// =====================================================================
import {
  AppStoreLogo,
  CrashlyticsLogo,
  InboxIcon,
  MailIcon,
  PlayLogo,
  ReactLogo,
  SentryLogo,
} from "@/lib/assets"
import styles from "./intake.module.css"

export const IntakeMockup = () => {
  const items = [
    {
      src: "crashlytics",
      logo: <CrashlyticsLogo size={16} />,
      label: "Crashlytics",
      title: "java.lang.NullPointerException",
      meta: "WidgetUnmount.dispose:42 · 2,184 users",
      time: "3m",
      badge: <span className="pill pill-error">CRASH</span>,
      tag: "REGRESSION",
    },
    {
      src: "sentry",
      logo: <SentryLogo size={16} />,
      label: "Sentry",
      title: "TypeError: cannot read 'items' of undefined",
      meta: "RecipeList.tsx · 14 events · 8 users",
      time: "12m",
      badge: <span className="pill pill-error">ERROR</span>,
      tag: "NEW",
    },
    {
      src: "play",
      logo: <PlayLogo size={16} />,
      label: "Play Console",
      title: "ANR: Input dispatching timed out",
      meta: "0.4% of sessions · Pixel 7, Galaxy S22",
      time: "1h",
      badge: <span className="pill pill-warning">ANR</span>,
      tag: "SPIKE",
    },
    {
      src: "appstore",
      logo: <AppStoreLogo size={16} />,
      label: "App Store",
      title: "“It crashes when I open my saved recipes”",
      meta: "★ · @marisol_22 · v2.4.1",
      time: "2h",
      badge: <span className="pill pill-warning">★ 1</span>,
      tag: "NEW",
    },
    {
      src: "support",
      logo: <MailIcon size={16} color="var(--body)" />,
      label: "Support",
      title: "Camera freezes on iPhone 15",
      meta: "tara@hey.com · 2 replies",
      time: "4h",
      badge: <span className="pill pill-muted">EMAIL</span>,
      tag: "REGRESSION",
    },
    {
      src: "deps",
      logo: <ReactLogo size={16} />,
      label: "react-native",
      title: "0.76.3 → 0.77.0 available",
      meta: "minor · 3 breaking notes",
      time: "1d",
      badge: <span className="pill pill-muted">DEP</span>,
      tag: "UPGRADE",
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
        <InboxIcon size={14} />
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--ink)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
          }}
        >
          Intake
        </span>
        <span style={{ flex: 1 }} />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          6 new · last sync 12s ago
        </span>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 0 4px rgba(107, 63, 160, 0.18)",
          }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((it, i) => (
          <div
            key={i}
            className={styles["intake-row"]}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 20px",
              borderTop: i > 0 ? "1px solid var(--hairline-soft)" : "none",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--surface-elevated)",
                border: "1px solid var(--hairline)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {it.logo}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                className="mono"
                style={{
                  fontSize: 12.5,
                  color: "var(--ink)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {it.title}
              </div>
              <div
                className="mono"
                style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 3 }}
              >
                <span style={{ color: "var(--body)" }}>{it.label}</span> ·{" "}
                {it.meta}
              </div>
            </div>
            {it.badge}
            <span
              className="mono"
              style={{
                fontSize: 10,
                color: "var(--muted)",
                width: 26,
                textAlign: "right",
              }}
            >
              {it.time}
            </span>
            <span className="pill pill-accent" style={{ padding: "2px 7px" }}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              {it.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
