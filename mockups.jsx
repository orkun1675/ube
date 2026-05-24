// Ube — Product Mockups
// Hero PR/crash composite + 5 How-It-Works step visuals.
// Designed to feel like recognizable real-tool chrome at a glance.

// =====================================================================
//  HERO: GitHub PR + linked Crashlytics card
// =====================================================================

const HeroPRComposite = () => (
  <div
    className="hero-pr-composite"
    style={{
      position: "relative",
      width: "100%",
      maxWidth: 560,
      marginLeft: "auto",
    }}
  >
    {/* The PR view */}
    <div className="mockup-chrome" style={{ width: "100%" }}>
      {/* GitHub-style header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          borderBottom: "1px solid var(--hairline)",
          background: "var(--surface-elevated)",
        }}
      >
        <GitHubLogo size={18} />
        <span className="mono" style={{ fontSize: 12, color: "var(--body)" }}>
          chunkytofu / cookcam{" "}
          <span style={{ color: "var(--muted)" }}>/ pull / </span>
          <span style={{ color: "var(--ink)" }}>#1847</span>
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-success">
          <CheckIcon size={9} />
          OPEN
        </span>
      </div>

      {/* PR title + author */}
      <div style={{ padding: "20px 22px 16px" }}>
        <div
          className="mono"
          style={{
            fontSize: 15,
            color: "var(--ink)",
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          Fix: NullPointerException in{" "}
          <span style={{ color: "var(--accent)" }}>WidgetUnmount</span>
        </div>
        <div
          className="mono"
          style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}
        >
          Crashlytics #4821 · affects v2.4.0–v2.4.2
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 14,
          }}
        >
          <span
            className="avatar"
            style={{ background: "var(--accent)", width: 24, height: 24 }}
          >
            u
          </span>
          <span style={{ fontSize: 13 }}>
            <span style={{ color: "var(--ink)", fontWeight: 500 }}>
              ube[bot]
            </span>
            <span style={{ color: "var(--muted)" }}> wants to merge </span>
            <span className="mono" style={{ color: "var(--ink)" }}>
              2 commits
            </span>
            <span style={{ color: "var(--muted)" }}> into </span>
            <span className="mono" style={{ color: "var(--ink)" }}>
              main
            </span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--hairline)",
          padding: "0 22px",
        }}
      >
        {[
          { name: "Conversation", count: "3" },
          { name: "Commits", count: "2" },
          { name: "Checks", count: "12", active: true, success: true },
          { name: "Files", count: "4" },
        ].map((t) => (
          <div
            key={t.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 12px",
              fontSize: 12,
              color: t.active ? "var(--ink)" : "var(--body)",
              borderBottom: t.active
                ? "2px solid var(--accent)"
                : "2px solid transparent",
              fontWeight: t.active ? 500 : 400,
            }}
          >
            {t.success && <CheckIcon size={10} color="var(--success)" />}
            {t.name}
            <span
              className="mono"
              style={{
                fontSize: 10,
                padding: "1px 6px",
                borderRadius: 8,
                background: "var(--surface-elevated)",
                color: "var(--muted)",
                border: "1px solid var(--hairline)",
              }}
            >
              {t.count}
            </span>
          </div>
        ))}
      </div>

      {/* Checks list */}
      <div style={{ padding: "18px 22px 22px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "rgba(59, 182, 122, 0.15)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(59, 182, 122, 0.4)",
            }}
          >
            <CheckIcon size={10} color="var(--success)" />
          </span>
          <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>
            All checks have passed
          </span>
          <span
            className="mono"
            style={{ fontSize: 11, color: "var(--muted)" }}
          >
            12/12
          </span>
        </div>

        {[
          { name: "reproduce-in-emulator", time: "1m 12s" },
          { name: "verify-fix-in-emulator", time: "1m 38s", emphasis: true },
          { name: "replay-user-session", time: "0m 47s" },
          { name: "regression-suite (247)", time: "4m 02s" },
        ].map((c) => (
          <div
            key={c.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 0",
              borderTop: "1px solid var(--hairline-soft)",
            }}
          >
            <ActionsLogo size={14} />
            <span
              className="mono"
              style={{
                fontSize: 11.5,
                color: c.emphasis ? "var(--ink)" : "var(--body)",
              }}
            >
              {c.name}
            </span>
            <span style={{ flex: 1 }} />
            <span
              className="mono"
              style={{ fontSize: 10.5, color: "var(--muted)" }}
            >
              {c.time}
            </span>
            <CheckIcon size={11} color="var(--success)" />
          </div>
        ))}
      </div>
    </div>

    {/* Floating Crashlytics card */}
    <div
      className="hero-pr-float"
      style={{
        position: "absolute",
        right: -28,
        bottom: -36,
        width: 270,
        background: "var(--surface-elevated)",
        border: "1px solid var(--hairline-strong)",
        borderRadius: "var(--r-lg)",
        padding: "14px 16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
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
        <CrashlyticsLogo size={16} />
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: 0.6,
          }}
        >
          Crashlytics
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-accent">
          <LinkIcon size={8} />
          Linked
        </span>
      </div>

      <div
        className="mono"
        style={{
          fontSize: 12,
          color: "var(--ink)",
          lineHeight: 1.4,
          marginBottom: 8,
        }}
      >
        java.lang.NullPointerException
      </div>
      <div
        className="mono"
        style={{
          fontSize: 10.5,
          color: "var(--body)",
          lineHeight: 1.55,
          background: "var(--canvas)",
          padding: "8px 10px",
          borderRadius: 6,
          border: "1px solid var(--hairline)",
        }}
      >
        <div style={{ color: "var(--muted)" }}>at com.cookcam.widget</div>
        <div style={{ color: "var(--error)" }}>
          {" "}
          WidgetUnmount.dispose(L:42)
        </div>
        <div style={{ color: "var(--muted)" }}>at android.view.View.detach</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            Users
          </div>
          <div
            className="mono"
            style={{ fontSize: 13, color: "var(--ink)", marginTop: 2 }}
          >
            2,184
          </div>
        </div>
        <div>
          <div
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            Sessions
          </div>
          <div
            className="mono"
            style={{ fontSize: 13, color: "var(--error)", marginTop: 2 }}
          >
            0.42%
          </div>
        </div>
        <div>
          <div
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            Versions
          </div>
          <div
            className="mono"
            style={{ fontSize: 13, color: "var(--ink)", marginTop: 2 }}
          >
            3
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Minimal hero variant — just a quiet code panel
const HeroMinimal = () => (
  <div style={{ width: "100%", maxWidth: 560, marginLeft: "auto" }}>
    <div className="mockup-chrome">
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          className="avatar avatar-sm"
          style={{ background: "var(--accent)" }}
        >
          u
        </span>
        <span className="mono" style={{ fontSize: 12, color: "var(--body)" }}>
          ube[bot] · opened a PR
        </span>
        <span style={{ flex: 1 }} />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          1m ago
        </span>
      </div>
      <div style={{ padding: "22px 22px 26px" }}>
        <div
          className="mono"
          style={{ fontSize: 14, color: "var(--ink)", marginBottom: 16 }}
        >
          Fix: NullPointerException in{" "}
          <span style={{ color: "var(--accent)" }}>WidgetUnmount</span>
        </div>
        <div className="code-block" style={{ padding: "12px 14px" }}>
          <span className="diff-rem">
            <span className="diff-marker">-</span> widget.dispose();
          </span>
          <span className="diff-add">
            <span className="diff-marker">+</span> if (widget != null)
            widget.dispose();
          </span>
          <span className="diff-ctx">
            <span className="diff-marker"> </span>
            {"}"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
          }}
        >
          <CheckIcon size={11} color="var(--success)" />
          <span
            className="mono"
            style={{ fontSize: 11.5, color: "var(--body)" }}
          >
            12/12 checks passing
          </span>
          <span style={{ flex: 1 }} />
          <span className="pill pill-accent">UBE</span>
        </div>
      </div>
    </div>
  </div>
)

// Split hero variant — two stacked cards side by side
const HeroSplit = () => (
  <div
    className="hero-split-grid"
    style={{
      width: "100%",
      maxWidth: 560,
      marginLeft: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
    }}
  >
    <div className="mockup-chrome" style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <CrashlyticsLogo size={16} />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          Crashlytics
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-error">NEW</span>
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink)" }}>
        NullPointerException
      </div>
      <div
        className="mono"
        style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}
      >
        WidgetUnmount.dispose:42
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <div>
          <div className="mono" style={{ fontSize: 9, color: "var(--muted)" }}>
            USERS
          </div>
          <div className="mono" style={{ fontSize: 13 }}>
            2,184
          </div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 9, color: "var(--muted)" }}>
            RATE
          </div>
          <div className="mono" style={{ fontSize: 13, color: "var(--error)" }}>
            0.42%
          </div>
        </div>
      </div>
    </div>
    <div className="mockup-chrome" style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <GitHubLogo size={16} />
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
          Pull request
        </span>
        <span style={{ flex: 1 }} />
        <span className="pill pill-success">OPEN</span>
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink)" }}>
        Fix: null check on unmount
      </div>
      <div
        className="mono"
        style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}
      >
        +1 −1 · ube[bot]
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <CheckIcon size={10} color="var(--success)" />
          <span className="mono" style={{ fontSize: 10, color: "var(--body)" }}>
            12/12 checks
          </span>
        </div>
      </div>
    </div>
  </div>
)

// =====================================================================
//  STEP 1: Intake — multi-source inbox
// =====================================================================

const IntakeMockup = () => {
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
            className="intake-row"
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

// =====================================================================
//  STEP 2: Triage — Kanban board grouped by state
// =====================================================================

const TriageMockup = () => {
  const cols = [
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
        <ListIcon size={14} />
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
        className="triage-cols"
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
                      <LinkIcon size={7} />
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

// =====================================================================
//  STEP 3: Fix — emulator + verified Actions checks (clean two-pane)
// =====================================================================

const FixMockup = () => (
  <div className="mockup-chrome" style={{ width: "100%" }}>
    {/* Header */}
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
      <GitHubLogo size={14} />
      <span
        className="mono"
        style={{
          fontSize: 11,
          color: "var(--ink)",
          textTransform: "uppercase",
          letterSpacing: 0.6,
        }}
      >
        PR #1847
      </span>
      <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
        waiting for review
      </span>
    </div>

    {/* Two panes with a slight diagonal seam between them */}
    <div
      className="fix-stage"
      style={{ position: "relative", height: 360, overflow: "hidden" }}
    >
      {/* Pane 1: Emulator */}
      <div
        className="fix-pane fix-pane-1"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "42%",
          clipPath: "polygon(0 0, 100% 0, calc(100% - 28px) 100%, 0 100%)",
          background:
            "radial-gradient(120% 100% at 30% 0%, #1f1f28 0%, #0f0f14 70%)",
          padding: "20px 18px 22px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            alignSelf: "stretch",
          }}
        >
          <AndroidLogo size={11} />
          <span
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            Pixel 10 · Emulator
          </span>
          <span style={{ flex: 1 }} />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 9.5,
              color: "var(--error)",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--error)",
                boxShadow: "0 0 0 3px rgba(225, 95, 107, 0.18)",
              }}
            />
            REC
          </span>
        </div>
        <div
          style={{
            background: "#0a0a0e",
            border: "1px solid #2a2a32",
            borderRadius: 22,
            width: 156,
            height: 300,
            padding: 4,
            position: "relative",
            boxShadow:
              "0 18px 40px -12px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        >
          {/* Screen */}
          <div
            style={{
              position: "absolute",
              inset: 4,
              borderRadius: 20,
              background: "#111116",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Punch-hole camera */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 7,
                left: "50%",
                transform: "translateX(-50%)",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#000",
                border: "1px solid #1a1a20",
                zIndex: 2,
              }}
            />
            {/* Status bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 14px 6px",
              }}
            >
              <span
                className="mono"
                style={{
                  fontSize: 8.5,
                  color: "var(--ink)",
                  letterSpacing: 0.3,
                }}
              >
                9:41
              </span>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 3 }}
                aria-hidden="true"
              >
                <span
                  style={{
                    width: 8,
                    height: 6,
                    background: "var(--ink)",
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    width: 8,
                    height: 6,
                    background: "var(--ink)",
                    borderRadius: 1,
                    opacity: 0.7,
                  }}
                />
                <span
                  style={{
                    width: 12,
                    height: 6,
                    background: "var(--ink)",
                    borderRadius: 1,
                    opacity: 0.85,
                  }}
                />
              </span>
            </div>
            {/* App content */}
            <div
              style={{
                padding: "4px 12px 12px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 7,
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 9,
                  color: "var(--ink)",
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                My Recipes
              </div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 7px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: 7,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      background:
                        "linear-gradient(135deg, var(--accent) 0%, var(--accent-soft) 100%)",
                      opacity: 0.75,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <span
                      style={{
                        height: 4,
                        background: "rgba(255,255,255,0.18)",
                        borderRadius: 2,
                        width: i === 2 ? "85%" : "60%",
                      }}
                    />
                    <span
                      style={{
                        height: 3,
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 2,
                        width: "40%",
                      }}
                    />
                  </div>
                </div>
              ))}
              <span style={{ flex: 1 }} />
              {/* Repro banner */}
              <div
                style={{
                  background: "rgba(225, 95, 107, 0.15)",
                  border: "1px solid rgba(225, 95, 107, 0.35)",
                  borderRadius: 6,
                  padding: "6px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--error)",
                    boxShadow: "0 0 0 3px rgba(225, 95, 107, 0.18)",
                  }}
                />
                <span
                  className="mono"
                  style={{ fontSize: 8, color: "var(--error)" }}
                >
                  reproducing crash…
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pane 2: Actions / verified checks — mirrors the hero check list */}
      <div
        className="fix-pane fix-pane-2"
        style={{
          position: "absolute",
          left: "calc(42% - 28px)",
          right: 0,
          top: 0,
          bottom: 0,
          clipPath: "polygon(28px 0, 100% 0, 100% 100%, 0 100%)",
          background: "var(--surface-card)",
          padding: "20px 22px 22px 44px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <ActionsLogo size={13} />
          <span
            className="mono"
            style={{
              fontSize: 10.5,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: 0.6,
            }}
          >
            GitHub Actions
          </span>
          <span style={{ flex: 1 }} />
          <span className="pill pill-success">
            <CheckIcon size={9} />
            VERIFIED
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "rgba(59, 182, 122, 0.15)",
              border: "1px solid rgba(59, 182, 122, 0.4)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon size={11} color="var(--success)" />
          </span>
          <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>
            All checks have passed
          </span>
          <span
            className="mono"
            style={{ fontSize: 11, color: "var(--muted)", marginLeft: "auto" }}
          >
            12/12
          </span>
        </div>

        <div
          style={{ marginTop: 16, display: "flex", flexDirection: "column" }}
        >
          {[
            { name: "reproduce-in-emulator", time: "1m 12s" },
            { name: "verify-fix-in-emulator", time: "1m 38s", emphasis: true },
            { name: "replay-user-session", time: "0m 47s" },
            { name: "regression-suite (247)", time: "4m 02s" },
          ].map((c, i) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
                borderTop:
                  i > 0
                    ? "1px solid var(--hairline-soft)"
                    : "1px solid var(--hairline-soft)",
              }}
            >
              <ActionsLogo size={13} />
              <span
                className="mono"
                style={{
                  fontSize: 11.5,
                  color: c.emphasis ? "var(--ink)" : "var(--body)",
                }}
              >
                {c.name}
              </span>
              <span style={{ flex: 1 }} />
              <span
                className="mono"
                style={{ fontSize: 10.5, color: "var(--muted)" }}
              >
                {c.time}
              </span>
              <CheckIcon size={11} color="var(--success)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

// =====================================================================
//  STEP 4: Report (success) — timeline
// =====================================================================

const ReportSuccessMockup = () => {
  const events = [
    {
      icon: <GitHubLogo size={14} />,
      title: (
        <>
          PR <span style={{ color: "var(--accent)" }}>#1847</span> merged into{" "}
          <span className="mono">main</span>
        </>
      ),
      meta: "by ube[bot] · squash · 2 commits",
      time: "May 20 · 14:22",
      pill: <span className="pill pill-success">MERGED</span>,
    },
    {
      icon: (
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "var(--accent-2)",
          }}
        />
      ),
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
      icon: <ActionsLogo size={14} />,
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
      icon: <MailIcon size={14} color="var(--body)" />,
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
        <BellIcon size={14} />
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
          <CheckIcon size={9} />
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
                    “Hi Tara — thank you for the report. The crash you hit when
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

// =====================================================================
//  STEP 5: Report (failure) — internal issue + upstream link
// =====================================================================

// Mimics a GitHub "Open" state dot + label
const GhOpenBadge = ({ color = "var(--warning)", label = "Open" }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "2px 9px 2px 8px",
      borderRadius: 9999,
      background: `color-mix(in oklab, ${color} 14%, transparent)`,
      border: `1px solid color-mix(in oklab, ${color} 35%, transparent)`,
      color: color,
      fontSize: 10.5,
      fontWeight: 600,
      fontFamily: "var(--font-mono)",
      letterSpacing: 0.2,
    }}
  >
    <span
      style={{ width: 6, height: 6, borderRadius: "50%", background: color }}
    />
    {label}
  </span>
)

const ReportFailureMockup = () => (
  <div className="mockup-chrome" style={{ width: "100%" }}>
    {/* Header — GitHub-like repo + issue number */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 16px",
        borderBottom: "1px solid var(--hairline)",
        background: "var(--surface-elevated)",
      }}
    >
      <GitHubLogo size={14} />
      <span className="mono" style={{ fontSize: 11.5, color: "var(--ink)" }}>
        chunkytofu/cookcam
      </span>
      <span className="mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>
        #312
      </span>
      <span style={{ flex: 1 }} />
      <GhOpenBadge color="var(--warning)" label="Blocked" />
    </div>

    <div style={{ padding: "22px 26px" }}>
      {/* Issue title */}
      <div
        className="t-title-sm ink"
        style={{ margin: 0, marginBottom: 6, lineHeight: 1.35 }}
      >
        Race in{" "}
        <span className="mono" style={{ color: "var(--accent)" }}>
          expo-av
        </span>{" "}
        session unmount
      </div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)" }}>
        opened by <span style={{ color: "var(--body)" }}>ube[bot]</span> · 3
        days ago
      </div>

      {/* Body preview — wireframe placeholder bars hinting at repro steps */}
      <div
        style={{
          marginTop: 16,
          padding: "14px 14px",
          background: "var(--canvas-soft)",
          border: "1px solid var(--hairline)",
          borderRadius: 8,
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: 9.5,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: 0.7,
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Reproduction steps
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              height: 6,
              width: "88%",
              borderRadius: 3,
              background: "var(--hairline-strong)",
            }}
          />
          <div
            style={{
              height: 6,
              width: "72%",
              borderRadius: 3,
              background: "var(--hairline-strong)",
            }}
          />
          <div
            style={{
              height: 6,
              width: "94%",
              borderRadius: 3,
              background: "var(--hairline-strong)",
            }}
          />
          <div
            style={{
              height: 6,
              width: "46%",
              borderRadius: 3,
              background: "var(--hairline-strong)",
            }}
          />
        </div>
      </div>

      {/* Linked-issue section */}
      <div style={{ marginTop: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <LinkIcon size={12} />
          <span
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: 0.8,
              fontWeight: 600,
            }}
          >
            Blocked by
          </span>
        </div>

        {/* Nested upstream issue card (decorative — non-interactive in mockup) */}
        <div
          className="rf-link-card"
          style={{
            display: "block",
            background: "var(--canvas-soft)",
            border: "1px solid var(--hairline)",
            borderLeft: "3px solid var(--accent)",
            borderRadius: 8,
            padding: "12px 14px",
            transition: "background .15s ease, border-color .15s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ExpoLogo size={13} />
            <span
              className="mono"
              style={{ fontSize: 11, color: "var(--ink)" }}
            >
              expo/expo
            </span>
            <span
              className="mono"
              style={{ fontSize: 11, color: "var(--muted)" }}
            >
              #29104
            </span>
            <span style={{ flex: 1 }} />
            <GhOpenBadge color="var(--muted)" label="Open" />
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 12.5,
              color: "var(--ink)",
              lineHeight: 1.45,
            }}
          >
            Race in{" "}
            <span className="mono" style={{ color: "var(--accent)" }}>
              expo-av
            </span>{" "}
            when backgrounded mid-record
          </div>
          <div
            className="mono"
            style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 6 }}
          >
            filed by ube[bot] · 3 days ago · awaiting response
          </div>
        </div>
      </div>
    </div>

    <style>{`
      .rf-link-card:hover {
        background: var(--canvas) !important;
        border-color: var(--hairline-strong) !important;
      }
    `}</style>
  </div>
)

Object.assign(window, {
  HeroPRComposite,
  HeroMinimal,
  HeroSplit,
  IntakeMockup,
  TriageMockup,
  FixMockup,
  ReportSuccessMockup,
  ReportFailureMockup,
})
