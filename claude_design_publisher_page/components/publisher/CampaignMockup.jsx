/* CampaignMockup.jsx — alternative hero visual (toggled via Tweak).
   Looks like a Facebook Ads Manager table — creatives + CAC + ROAS. */

const CampaignMockup = () => {
  const rows = [
    { thumb: "v1", name: "playable · word puzzle", net: "Meta",   spend: "$48",  cac: "$1.42", roas: "38 %", winner: true },
    { thumb: "v2", name: "video · jump-cut hook",  net: "TikTok", spend: "$36",  cac: "$1.71", roas: "29 %" },
    { thumb: "v3", name: "static · daily challenge", net: "Google", spend: "$22", cac: "$2.04", roas: "21 %" },
    { thumb: "v4", name: "ugc · founder reel",     net: "Meta",   spend: "$18",  cac: "$2.88", roas: "14 %" },
  ];

  return (
    <div className="camp-mockup">
      <div className="mockup-chrome">
        <div className="mockup-header">
          <div className="traffic-lights"><span/><span/><span/></div>
          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
            campaigns · iOS install · <span style={{ color: "var(--ink)" }}>last 7 d</span>
          </span>
          <span style={{ flex: 1 }} />
          <span className="pill pill-success">+12 % VS LAST WK</span>
        </div>
        <div className="camp-rows">
          <span className="head">Creative</span>
          <span className="head">Spend</span>
          <span className="head">CAC</span>
          <span className="head">D7 ROAS</span>
          {rows.map((r) => (
            <React.Fragment key={r.name}>
              <span className="cell" style={{ color: r.winner ? "var(--ink)" : "var(--body)" }}>
                <span className={`creative-thumb ${r.thumb}`} aria-hidden>{r.thumb.toUpperCase()}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                <span className="camp-network">{r.net}</span>
              </span>
              <span className="cell num" style={{ color: "var(--body)" }}>{r.spend}</span>
              <span className="cell num" style={{ color: r.winner ? "var(--success)" : "var(--ink)" }}>{r.cac}</span>
              <span className="cell num" style={{ color: r.winner ? "var(--success)" : "var(--body)" }}>{r.roas}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

window.CampaignMockup = CampaignMockup;
