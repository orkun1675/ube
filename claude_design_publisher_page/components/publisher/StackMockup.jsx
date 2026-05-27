/* StackMockup.jsx — hero visual showing the orchestrated distribution
   stack. Echoes the maintainer hero's "PR + floating Crashlytics" pattern:
   a primary chrome card + a floating metrics card overlapping the corner. */

const StackMockup = () => {
  const cats = [
    {
      label: "Analytics",
      tiles: [
        { Logo: FirebaseLogo,   name: "Firebase",   status: "live"    },
        { Logo: AmplitudeLogo,  name: "Amplitude",  status: "live"    },
        { Logo: ClarityLogo,    name: "Clarity",    status: "live"    },
      ],
    },
    {
      label: "Attribution + Monetization",
      tiles: [
        { Logo: AppsFlyerLogo,  name: "AppsFlyer",  status: "live"    },
        { Logo: RevenueCatLogo, name: "RevenueCat", status: "live"    },
        { Logo: AdMobLogo,      name: "AdMob",      status: "config"  },
      ],
    },
    {
      label: "Ad networks",
      tiles: [
        { Logo: MetaLogo,       name: "Meta",       status: "live"    },
        { Logo: GoogleAdsLogo,  name: "Google Ads", status: "live"    },
        { Logo: TikTokLogo,     name: "TikTok",     status: "pending" },
      ],
    },
  ];

  return (
    <div className="stack-mockup">
      <div className="mockup-chrome" style={{ width: "100%" }}>
        <div className="mockup-header">
          <div className="traffic-lights"><span/><span/><span/></div>
          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
            distribution stack · <span style={{ color: "var(--ink)" }}>cookcam</span>
          </span>
          <span style={{ flex: 1 }} />
          <span className="pill pill-success"><CheckIcon size={9}/> ORCHESTRATED</span>
        </div>

        <div style={{ padding: "16px 4px 18px" }}>
          {cats.map((cat) => {
            const liveCount = cat.tiles.filter((t) => t.status === "live").length;
            return (
              <div key={cat.label} style={{ marginBottom: 4 }}>
                <div className="stack-cat-label">
                  {cat.label}
                  <span className="count">{liveCount}/{cat.tiles.length} live</span>
                </div>
                <div className="stack-grid" style={{ gridTemplateColumns: `repeat(${cat.tiles.length}, 1fr)`, padding: "0 18px 6px" }}>
                  {cat.tiles.map(({ Logo, name, status }) => (
                    <div key={name} className="stack-tile">
                      <div className="stack-tile-head">
                        <Logo size={18} />
                        <span className="stack-tile-name">{name}</span>
                      </div>
                      <span className={`stack-tile-status ${status}`}>
                        {status === "live" ? "Live" : status === "config" ? "Configured" : "Setup"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating campaign metrics card — overlaps bottom-right */}
      <div className="stack-float">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <MetaLogo size={14} />
          <span className="mono" style={{ fontSize: 10.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.6 }}>
            Meta · iOS install
          </span>
          <span style={{ flex: 1 }} />
          <span className="pill pill-success">LIVE</span>
        </div>

        <div className="stack-float-rows">
          <span className="stack-float-lbl">CAC</span>
          <span className="stack-float-val good">$1.42</span>
          <span className="stack-float-lbl">D7 ROAS</span>
          <span className="stack-float-val">38 %</span>
          <span className="stack-float-lbl">Installs / day</span>
          <span className="stack-float-val">112</span>
          <div className="stack-float-spark">
            <svg viewBox="0 0 220 40" width="100%" height="36">
              <path d="M0 32 L20 28 L40 30 L60 22 L80 24 L100 18 L120 20 L140 12 L160 14 L180 8 L200 10 L220 4"
                fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0 32 L20 28 L40 30 L60 22 L80 24 L100 18 L120 20 L140 12 L160 14 L180 8 L200 10 L220 4 L220 40 L0 40 Z"
                fill="url(#sparkfill)" opacity="0.18" />
              <defs>
                <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--accent)" />
                  <stop offset="1" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

window.StackMockup = StackMockup;
