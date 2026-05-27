/* Icons.jsx (publisher) — additions for the publisher page. Extends
   the shared Icons.jsx without conflict. */

const FunnelIcon = ({ size = 26 }) => (
  <Glyph size={size}>
    <path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" />
  </Glyph>
);
const MegaphoneIcon = ({ size = 26 }) => (
  <Glyph size={size}>
    <path d="M3 11l18-6v14L3 13v-2Z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </Glyph>
);
const BarChartIcon = ({ size = 26 }) => (
  <Glyph size={size}>
    <path d="M5 20V10M11 20V4M17 20v-7M3 20h18" />
  </Glyph>
);
const TagIcon = ({ size = 26 }) => (
  <Glyph size={size}>
    <path d="M3 12V4h8l10 10-8 8-10-10Z" />
    <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
  </Glyph>
);
const CompassIcon = ({ size = 26 }) => (
  <Glyph size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M16 8l-2 6-6 2 2-6 6-2Z" />
  </Glyph>
);
const WalletIcon = ({ size = 26 }) => (
  <Glyph size={size}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18M16 14h2" />
  </Glyph>
);
const SparklesIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
    <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />
  </Glyph>
);
const GearIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
  </Glyph>
);
const SeedlingIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M12 22V10" />
    <path d="M12 10C12 6 9 4 6 4c0 4 3 6 6 6Z" />
    <path d="M12 10c0-4 3-6 6-6 0 4-3 6-6 6Z" />
  </Glyph>
);
const PlayCircleIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8l6 4-6 4V8Z" />
  </Glyph>
);
const InfinityIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M6 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4Z" />
    <path d="M14 12c0-2.2 1.8-4 4-4 2.2 0 4 1.8 4 4s-1.8 4-4 4c-2.2 0-4-1.8-4-4Z" transform="translate(-4 0)" />
  </Glyph>
);
const LoopIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M20 12a8 8 0 1 1-2.34-5.66" />
    <path d="M20 4v4h-4" />
  </Glyph>
);
const BriefcaseIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </Glyph>
);
const ClockIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Glyph>
);
const StackIcon = ({ size = 20 }) => (
  <Glyph size={size}>
    <path d="M12 3l9 4-9 4-9-4 9-4Z" />
    <path d="M3 12l9 4 9-4" />
    <path d="M3 17l9 4 9-4" />
  </Glyph>
);

// Integration logo shortcuts (publisher-specific stack)
const PA = (p) => `${window.UBE_ASSETS || 'assets'}/integrations/${p}`;
const FirebaseLogo   = ({ size = 24 }) => <ImgLogo src={PA('firebase.svg')}    size={size} />;
const AmplitudeLogo  = ({ size = 24 }) => <ImgLogo src={PA('amplitude.svg')}   size={size} />;
const AppsFlyerLogo  = ({ size = 24 }) => <ImgLogo src={PA('appsflyer.svg')}   size={size} />;
const RevenueCatLogo = ({ size = 24 }) => <ImgLogo src={PA('revenuecat.svg')}  size={size} />;
const ClarityLogo    = ({ size = 24 }) => <ImgLogo src={PA('clarity.png')}     size={size} />;
const AdMobLogo      = ({ size = 24 }) => <ImgLogo src={PA('admob.svg')}       size={size} />;
const MetaLogo       = ({ size = 24 }) => <ImgLogo src={PA('meta.svg')}        size={size} />;
const TikTokLogo     = ({ size = 24 }) => <ImgLogo src={PA('tiktok.svg')}      size={size} />;
const GoogleAdsLogo  = ({ size = 24 }) => <ImgLogo src={PA('google_ads.svg')}  size={size} />;
const CreatifyLogo   = ({ size = 24 }) => <ImgLogo src={PA('creatify.png')}    size={size} />;
const SettLogo       = ({ size = 24 }) => <ImgLogo src={PA('sett.svg')}        size={size} invert />;
const ClaudeLogo     = ({ size = 24 }) => <ImgLogo src={PA('claude-code.svg')} size={size} />;

Object.assign(window, {
  FunnelIcon, MegaphoneIcon, BarChartIcon, TagIcon, CompassIcon, WalletIcon,
  SparklesIcon, GearIcon, SeedlingIcon, PlayCircleIcon, InfinityIcon, LoopIcon,
  BriefcaseIcon, ClockIcon, StackIcon,
  FirebaseLogo, AmplitudeLogo, AppsFlyerLogo, RevenueCatLogo, ClarityLogo,
  AdMobLogo, MetaLogo, TikTokLogo, GoogleAdsLogo, CreatifyLogo, SettLogo, ClaudeLogo,
});
