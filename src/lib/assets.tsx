// Brand marks — third-party product identities, either wrapping a bundled
// asset from the typed `integrationLogos` registry via `ImgLogo` or hand-rolled
// as the vendor's own glyph (GitHub Actions badge, Android bot, Expo arrow,
// etc.). Kept inline so the exact brand color/shape is preserved.
//
// Concept / UI icons (checks, arrows, mail, trends, etc.) are imported
// directly from `@phosphor-icons/react` at each callsite — no wrappers here.

import type React from "react"
import { integrationLogos } from "@/lib/integration-logos"

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
  <ImgLogo src={integrationLogos.github.src} size={size} />
)

// Sentry — official glyph (dark mark inverted on dark backgrounds)
export const SentryLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src={integrationLogos.sentry.src} size={size} invert />
)

// Firebase Crashlytics — official flame mark
export const CrashlyticsLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src={integrationLogos.firebase.src} size={size} />
)

// Google Play Console — official mark
export const PlayLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src={integrationLogos.googlePlay.src} size={size} />
)

// App Store / Apple — official Apple mark (inverted on dark)
export const AppStoreLogo = ({ size = 20 }: { size?: number }) => (
  <ImgLogo src={integrationLogos.apple.src} size={size} invert />
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
  <ImgLogo src={integrationLogos.apple.src} size={size} invert />
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

// LinkedIn — official mark; kept inline as a third-party brand identity.
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
