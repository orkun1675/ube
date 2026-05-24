// =====================================================================
//  Hero
// =====================================================================
import {
  AndroidLogo,
  AppleLogo,
  ArrowRight,
  ExpoLogo,
  FlutterLogo,
  ReactLogo,
} from "../../lib/assets"
import { openRequestAccess } from "../../stores/request-access"
import { HeroMinimal } from "../mockups/hero-minimal"
import { HeroPRComposite } from "../mockups/hero-pr"
import { HeroSplit } from "../mockups/hero-split"

type HeroProps = {
  heroVariant?: string
  heroCopy?: string
}

export const Hero = ({
  heroVariant = "pr",
  heroCopy = "autopilot",
}: HeroProps) => {
  const visual =
    heroVariant === "minimal" ? (
      <HeroMinimal />
    ) : heroVariant === "split" ? (
      <HeroSplit />
    ) : (
      <HeroPRComposite />
    )

  const headline =
    heroCopy === "autopilot" ? (
      <h1 className="t-display-mega" style={{ margin: 0, color: "var(--ink)" }}>
        App maintenance, <br />
        <span style={{ color: "var(--muted)" }}>on autopilot.</span>
      </h1>
    ) : (
      <h1 className="t-display-mega" style={{ margin: 0, color: "var(--ink)" }}>
        An agent that <br />
        maintains your app <br />
        <span style={{ color: "var(--muted)" }}>
          while you continue to build.
        </span>
      </h1>
    )

  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          <div className="fade-in">
            <div className="eyebrow" style={{ marginBottom: 28 }}>
              Ube Maintainer
            </div>
            {headline}
            <p
              className="t-body-md body"
              style={{ marginTop: 28, maxWidth: 480, lineHeight: 1.6 }}
            >
              Ube listens to your crash reports, user feedback, and dependency
              upgrades — then triages, reproduces, and opens verified PRs. You
              ship features. It handles the rest.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 36,
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openRequestAccess("hero")}
              >
                Request access
                <ArrowRight size={14} />
              </button>
              <a className="btn btn-secondary" href="#how">
                See how it works
              </a>
            </div>
            <div
              className="hero-builtfor"
              style={{
                marginTop: 36,
                color: "var(--muted)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: 0.6,
                textTransform: "uppercase",
              }}
            >
              <span className="hero-builtfor__label">Built for</span>
              <span className="hero-builtfor__chip">
                <FlutterLogo size={14} /> Flutter
              </span>
              <span className="hero-builtfor__chip">
                <ReactLogo size={14} /> React Native
              </span>
              <span className="hero-builtfor__chip">
                <ExpoLogo size={14} /> Expo
              </span>
              <span className="hero-builtfor__chip">
                <AppleLogo size={14} /> iOS
              </span>
              <span className="hero-builtfor__chip">
                <AndroidLogo size={14} /> Android
              </span>
            </div>
          </div>
          <div className="fade-in" style={{ animationDelay: "120ms" }}>
            {visual}
          </div>
        </div>
      </div>
      {/* `dangerouslySetInnerHTML` avoids React encoding `>` selectors and
          triggering an SSR/CSR hydration mismatch. */}
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: see comment above
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 1100px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
      `,
        }}
      />
    </section>
  )
}
