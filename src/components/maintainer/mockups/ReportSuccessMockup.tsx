// =====================================================================
//  STEP 4: Report (success) — timeline
// =====================================================================
import { BellIcon, CheckIcon, EnvelopeIcon } from "@phosphor-icons/react"
import { Term } from "@/components/Term"
import { Logo } from "@/lib/logo"

export const ReportSuccessMockup = () => {
  const events = [
    {
      icon: <Logo name="github" size={14} />,
      title: (
        <>
          <Term term="pr" />{" "}
          <span style={{ color: "var(--accent)" }}>#1847</span> merged into{" "}
          <span className="mono">main</span>
        </>
      ),
      meta: "by ube[bot] · squash · 2 commits",
      time: "May 20 · 14:22",
      pill: <span className="pill pill-success">MERGED</span>,
    },
    {
      icon: <Logo name="apple" size={14} />,
      title: (
        <>
          Released in <span className="mono">v2.4.3 · beta</span>
        </>
      ),
      meta: "TestFlight + Play Internal · 800 users",
      time: "May 21 · 09:10",
      pill: <span className="pill pill-accent">BETA</span>,
    },
    {
      icon: <Logo name="githubActions" size={14} />,
      title: (
        <>
          Rolled out <span className="mono">v2.4.3 · production</span>
        </>
      ),
      meta: "100% staged rollout · 412k users",
      time: "May 26 · 11:30",
      pill: <span className="pill pill-success">PRODUCTION</span>,
    },
    {
      icon: <EnvelopeIcon size={14} color="var(--body)" aria-hidden="true" />,
      title: "Closed the loop with reporter",
      meta: "tara@hey.com · sent by ube",
      time: "May 26 · 11:34",
      pill: <span className="pill pill-accent">CUSTOMER REPLY</span>,
      reply: true,
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
        <BellIcon size={14} aria-hidden="true" />
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--ink)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
          }}
        >
          ISSUE #4821
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-success">
          <CheckIcon size={9} aria-hidden="true" />
          CLOSED
        </span>
      </div>
      <div style={{ padding: "22px 26px", position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 41,
            top: 30,
            bottom: 30,
            width: 1,
            background: "var(--hairline)",
          }}
        />
        {events.map((e, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 18,
              marginBottom: i < events.length - 1 ? 22 : 0,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--surface-elevated)",
                border: "1px solid var(--hairline-strong)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              {e.icon}
            </div>
            <div style={{ flex: 1, paddingTop: 4 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 14, color: "var(--ink)" }}>
                  {e.title}
                </span>
                {e.pill}
              </div>
              <div
                className="mono"
                style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}
              >
                {e.meta} · {e.time}
              </div>
              {e.reply && (
                <div
                  style={{
                    marginTop: 12,
                    background: "var(--canvas)",
                    border: "1px solid var(--hairline)",
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      className="avatar avatar-sm"
                      style={{ background: "var(--accent)" }}
                    >
                      u
                    </span>
                    <span
                      className="mono"
                      style={{ fontSize: 11, color: "var(--ink)" }}
                    >
                      ube[bot]
                    </span>
                    <span
                      className="mono"
                      style={{ fontSize: 10, color: "var(--muted)" }}
                    >
                      → tara@hey.com
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--body)",
                      lineHeight: 1.55,
                      fontStyle: "italic",
                    }}
                  >
                    “Hi Tara, thank you for the report. The crash you hit when
                    opening saved recipes is fixed in v2.4.3, which rolled out
                    to your device this morning. Please, let us know if you see
                    it again.”
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
