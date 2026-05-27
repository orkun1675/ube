/* Icons.jsx — the in-house Glyph set, ported from src/lib/assets.tsx.
   Strokes are currentColor, 1.7 width, round caps, 24 viewBox.
   ImgLogo is the production-style <img> wrapper for provider logos. */

const Glyph = ({ size = 20, children, stroke = 1.7 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
  >
    {children}
  </svg>
);

const ImgLogo = ({ src, size = 20, invert = false, style = {} }) => (
  <img
    src={src} alt=""
    style={{
      width: size, height: size, objectFit: "contain",
      filter: invert ? "invert(1)" : "none",
      display: "inline-block", verticalAlign: "middle",
      ...style,
    }}
    aria-hidden="true"
  />
);

const ArrowRight = ({ size = 14 }) => (
  <Glyph size={size}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </Glyph>
);
const CheckIcon = ({ size = 14, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke={color || "currentColor"} strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l5 5L20 7" />
  </svg>
);
const PlusIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const MailIcon = ({ size = 16 }) => (
  <Glyph size={size}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Glyph>
);
const LinkIcon = ({ size = 16 }) => (
  <Glyph size={size}>
    <path d="M10 14a4 4 0 0 0 5.5 0l3-3a4 4 0 1 0-5.5-5.5L11 7" />
    <path d="M14 10a4 4 0 0 0-5.5 0l-3 3a4 4 0 1 0 5.5 5.5L13 17" />
  </Glyph>
);

// Problem icons
const FlaskIcon = ({ size = 26 }) => (
  <Glyph size={size}>
    <path d="M9 3h6M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 19L14 9V3" />
    <path d="M7 14h10" />
  </Glyph>
);
const StackIcon = ({ size = 26 }) => (
  <Glyph size={size}>
    <rect x="3" y="4" width="18" height="5" rx="1.5" />
    <rect x="3" y="11" width="18" height="5" rx="1.5" />
    <path d="M7 17v3M12 17v3M17 17v3" />
  </Glyph>
);
const ClockIcon = ({ size = 26 }) => (
  <Glyph size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Glyph>
);

// Benefit icons
const SparkIcon = ({ size = 20 }) => (
  <Glyph size={size}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" /></Glyph>
);
const ChatIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M21 12a8 8 0 1 1-3-6.2L21 4l-1 4.2A8 8 0 0 1 21 12Z" />
    <circle cx="9" cy="12" r="0.8" fill="currentColor" />
    <circle cx="13" cy="12" r="0.8" fill="currentColor" />
    <circle cx="17" cy="12" r="0.8" fill="currentColor" />
  </Glyph>
);
const ShieldIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z" />
    <path d="M9 12l2 2 4-4" />
  </Glyph>
);
const TrendIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M3 17l5-5 4 4 9-9" />
    <path d="M14 7h7v7" />
  </Glyph>
);
const StarIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M12 3l2.7 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17.3 6.5 20.2l1.1-6.2L3 9.6l6.3-.9L12 3Z" />
  </Glyph>
);
const RocketIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M14 4c4 0 6 2 6 6-1 4-5 8-9 9-2-1-3-2-4-4 1-4 5-8 9-9-1 2-2 3-2 5Z" />
    <circle cx="14" cy="10" r="1.2" fill="currentColor" />
    <path d="M7 17c-2 1-2 2-3 4 2-1 3-1 4-3" />
  </Glyph>
);

// Filled icons used in chrome
const ActionsLogo = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="#2DA44E" />
    <path d="M10 8.5l5 3.5-5 3.5V8.5Z" fill="white" />
  </svg>
);

// Provider logo shortcuts (use ASSETS path prefix from window.UBE_ASSETS)
const A = (p) => `${window.UBE_ASSETS || '../../assets'}/integrations/${p}`;
const GitHubLogo      = ({ size = 18 }) => <ImgLogo src={A('github.svg')}    size={size} />;
const CrashlyticsLogo = ({ size = 16 }) => <ImgLogo src={A('firebase.svg')}  size={size} />;
const SentryLogo      = ({ size = 16 }) => <ImgLogo src={A('sentry.svg')}    size={size} invert />;
const AppleLogo       = ({ size = 14 }) => <ImgLogo src={A('apple.svg')}     size={size} invert />;
const PlayLogo        = ({ size = 16 }) => <ImgLogo src={A('google-play.png')} size={size} />;
const FlutterLogo = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14.3 2L4 12.3 7.2 15.5l13.5-13.5h-6.4Z" fill="#54C5F8" />
    <path d="M14.3 13.5L10 17.8l4.3 4.2h6.4L16.5 17.8l-2.2-4.3Z" fill="#01579B" />
    <path d="M10 17.8l4.3-4.3 2.2 2.2-4.3 4.3-2.2-2.2Z" fill="#29B6F6" />
  </svg>
);
const ReactLogo = ({ size = 14, color = "#61DAFB" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="1.8" fill={color} />
    <g stroke={color} strokeWidth="1.1" fill="none">
      <ellipse cx="12" cy="12" rx="9" ry="3.4" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)" />
    </g>
  </svg>
);
const ExpoLogo = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#000" />
    <path d="M5.5 17.5L11.4 7.2a.7.7 0 0 1 1.2 0l5.9 10.3c.3.5-.1 1-.6 1-.3 0-.5-.1-.7-.4l-5.2-9.1-5.2 9.1c-.2.3-.4.4-.7.4-.5 0-.9-.5-.6-1Z" fill="#fff" />
  </svg>
);
const AndroidLogo = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.5 11h-11A2.5 2.5 0 0 0 4 13.5V20a1 1 0 0 0 1 1h1v2.5a1 1 0 0 0 2 0V21h2v2.5a1 1 0 0 0 2 0V21h2v2.5a1 1 0 0 0 2 0V21h1a1 1 0 0 0 1-1v-6.5A2.5 2.5 0 0 0 17.5 11ZM3 11a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1Zm18 0a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0-1-1ZM16.4 4.6l1-1.6a.3.3 0 0 0-.5-.3l-1 1.6A6.7 6.7 0 0 0 12 3.5c-1.4 0-2.7.3-3.9.8l-1-1.6a.3.3 0 0 0-.5.3l1 1.6A4.5 4.5 0 0 0 4 9v1h16V9c0-1.8-1.4-3.3-3.6-4.4ZM9 7.5a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Zm6 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Z" fill="#3DDC84" />
  </svg>
);

Object.assign(window, {
  Glyph, ImgLogo,
  ArrowRight, CheckIcon, PlusIcon, MailIcon, LinkIcon,
  FlaskIcon, StackIcon, ClockIcon,
  SparkIcon, ChatIcon, ShieldIcon, TrendIcon, StarIcon, RocketIcon,
  ActionsLogo,
  GitHubLogo, CrashlyticsLogo, SentryLogo, AppleLogo, PlayLogo,
  FlutterLogo, ReactLogo, ExpoLogo, AndroidLogo,
});
