// Provider logos & icons — simplified, recognizable SVGs of common dev tools
// All sized to 20×20 by default; override via size prop.
import type React from "react"

// File-based logo wrapper — keeps a consistent square footprint for img-based marks.
type ImgLogoProps = {
  src: string
  size?: number
  invert?: boolean
  style?: React.CSSProperties
}

export const ImgLogo = ({
  src,
  size = 20,
  invert = false,
  style = {},
}: ImgLogoProps) => (
  <img
    src={src}
    alt=""
    style={{
      width: size,
      height: size,
      objectFit: "contain",
      filter: invert ? "invert(1)" : "none",
      display: "inline-block",
      verticalAlign: "middle",
      ...style,
    }}
    aria-hidden="true"
  />
)

// GitHub octocat
export const GitHubLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src="/assets/integrations/github.svg" size={size} />
)

// Sentry — official glyph (dark mark inverted on dark backgrounds)
export const SentryLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src="/assets/integrations/sentry.svg" size={size} invert />
)

// Firebase Crashlytics — official flame mark
export const CrashlyticsLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src="/assets/integrations/firebase.svg" size={size} />
)

// Google Play Console — official mark
export const PlayLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src="/assets/integrations/google-play.png" size={size} />
)

// App Store / Apple — official Apple mark (inverted on dark)
export const AppStoreLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src="/assets/integrations/apple.svg" size={size} invert />
)

// GitHub Actions — green play badge
export const ActionsLogo = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="#2DA44E" />
    <path d="M10 8.5l5 3.5-5 3.5V8.5Z" fill="white" />
  </svg>
)

// Apple — official mark, inverted on dark
export const AppleLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src="/assets/integrations/apple.svg" size={size} invert />
)

// Android — green bot
export const AndroidLogo = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M17.5 11h-11A2.5 2.5 0 0 0 4 13.5V20a1 1 0 0 0 1 1h1v2.5a1 1 0 0 0 2 0V21h2v2.5a1 1 0 0 0 2 0V21h2v2.5a1 1 0 0 0 2 0V21h1a1 1 0 0 0 1-1v-6.5A2.5 2.5 0 0 0 17.5 11ZM3 11a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1Zm18 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1ZM16.4 4.6l1-1.6a.3.3 0 0 0-.5-.3l-1 1.6A6.7 6.7 0 0 0 12 3.5c-1.4 0-2.7.3-3.9.8l-1-1.6a.3.3 0 0 0-.5.3l1 1.6A4.5 4.5 0 0 0 4 9v1h16V9c0-1.8-1.4-3.3-3.6-4.4ZM9 7.5a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Zm6 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z"
      fill="#3DDC84"
    />
  </svg>
)

// Expo — black with white "A" arrow
export const ExpoLogo = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#000" />
    <path
      d="M5.5 17.5L11.4 7.2a.7.7 0 0 1 1.2 0l5.9 10.3c.3.5-.1 1-.6 1-.3 0-.5-.1-.7-.4l-5.2-9.1-5.2 9.1c-.2.3-.4.4-.7.4-.5 0-.9-.5-.6-1Z"
      fill="#fff"
    />
  </svg>
)

type IconProps = {
  size?: number
  color?: string
}

// React Native — atom
export const ReactLogo = ({ size = 20, color = "#61DAFB" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="1.8" fill={color} />
    <g stroke={color} strokeWidth="1.1" fill="none">
      <ellipse cx="12" cy="12" rx="9" ry="3.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)" />
    </g>
  </svg>
)

// Flutter — overlapping blue triangles
export const FlutterLogo = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14.3 2L4 12.3 7.2 15.5l13.5-13.5h-6.4Z" fill="#54C5F8" />
    <path
      d="M14.3 13.5L10 17.8l4.3 4.2h6.4L16.5 17.8l-2.2-4.3Z"
      fill="#01579B"
    />
    <path d="M10 17.8l4.3-4.3 2.2 2.2-4.3 4.3-2.2-2.2Z" fill="#29B6F6" />
  </svg>
)

// Support / mail icon — outline
export const MailIcon = ({ size = 16, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

// Support / mail icon — filled
export const MailIconFilled = ({
  size = 16,
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size * 0.75}
    viewBox="0 0 24 18"
    fill={color}
    aria-hidden="true"
  >
    <path d="M2 3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.4l-10 6L2 3.4V3Z" />
    <path d="M2 5.7V15a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5.7l-9.47 5.6a1 1 0 0 1-1.06 0L2 5.7Z" />
  </svg>
)

// LinkedIn
export const LinkedInLogo = ({
  size = 18,
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
)

// Plus / close
export const PlusIcon = ({ size = 14, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
)

// Arrow right
export const ArrowRight = ({
  size = 14,
  color = "currentColor",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

// Check
export const CheckIcon = ({ size = 14, color = "currentColor" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12l5 5L20 7" />
  </svg>
)

// Generic glyphs for problem & benefit cards (purple monoline)
type GlyphProps = {
  paths: React.ReactNode
  size?: number
  color?: string
}
export const Glyph = ({
  paths,
  size = 20,
  color = "currentColor",
}: GlyphProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
)

// Publisher problem + hero-chip icons
export const GearIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
      </>
    }
  />
)
export const MegaphoneIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M3 11l18-6v14L3 13v-2Z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </>
    }
  />
)
export const LoopIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M20 12a8 8 0 1 1-2.34-5.66" />
        <path d="M20 4v4h-4" />
      </>
    }
  />
)
export const SparklesIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
        <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />
      </>
    }
  />
)
export const BarChartIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph size={size} paths={<path d="M5 20V10M11 20V4M17 20v-7M3 20h18" />} />
)
export const SeedlingIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M12 22V10" />
        <path d="M12 10C12 6 9 4 6 4c0 4 3 6 6 6Z" />
        <path d="M12 10c0-4 3-6 6-6 0 4-3 6-6 6Z" />
      </>
    }
  />
)

// Specific problem icons
export const FlaskIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M9 3h6M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 19L14 9V3" />
        <path d="M7 14h10" />
      </>
    }
  />
)
export const StackIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <rect x="3" y="4" width="18" height="5" rx="1.5" />
        <rect x="3" y="11" width="18" height="5" rx="1.5" />
        <path d="M7 17v3M12 17v3M17 17v3" />
      </>
    }
  />
)
export const ClockIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    }
  />
)

// Benefit icons
export const SparkIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    }
  />
)
export const ChatIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M21 12a8 8 0 1 1-3-6.2L21 4l-1 4.2A8 8 0 0 1 21 12Z" />
        <circle cx="9" cy="12" r="0.8" fill="currentColor" />
        <circle cx="13" cy="12" r="0.8" fill="currentColor" />
        <circle cx="17" cy="12" r="0.8" fill="currentColor" />
      </>
    }
  />
)
export const ShieldIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z" />
        <path d="M9 12l2 2 4-4" />
      </>
    }
  />
)
export const TrendIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M3 17l5-5 4 4 9-9" />
        <path d="M14 7h7v7" />
      </>
    }
  />
)
export const StarIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <path d="M12 3l2.7 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17.3 6.5 20.2l1.1-6.2L3 9.6l6.3-.9L12 3Z" />
    }
  />
)
export const RocketIcon = ({ size = 20 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M14 4c4 0 6 2 6 6-1 4-5 8-9 9-2-1-3-2-4-4 1-4 5-8 9-9-1 2-2 3-2 5Z" />
        <circle cx="14" cy="10" r="1.2" fill="currentColor" />
        <path d="M7 17c-2 1-2 2-3 4 2-1 3-1 4-3" />
      </>
    }
  />
)

// Lightning / inbox / list / fix / report icons used in step indicator pills
export const InboxIcon = ({ size = 16 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M3 13l3-9h12l3 9" />
        <path d="M3 13v6a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-6h-6a3 3 0 0 1-6 0H3Z" />
      </>
    }
  />
)
export const ListIcon = ({ size = 16 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M8 5h13M8 12h13M8 19h13" />
        <circle cx="4" cy="5" r="1" />
        <circle cx="4" cy="12" r="1" />
        <circle cx="4" cy="19" r="1" />
      </>
    }
  />
)
export const BellIcon = ({ size = 16 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4l2-2Z" />
        <path d="M10 19a2 2 0 0 0 4 0" />
      </>
    }
  />
)
export const LinkIcon = ({ size = 16 }: { size?: number }) => (
  <Glyph
    size={size}
    paths={
      <>
        <path d="M10 14a4 4 0 0 0 5.5 0l3-3a4 4 0 1 0-5.5-5.5L11 7" />
        <path d="M14 10a4 4 0 0 0-5.5 0l-3 3a4 4 0 1 0 5.5 5.5L13 17" />
      </>
    }
  />
)
