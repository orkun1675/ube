/* TrustedBy.jsx — expo.dev-style marquee of customer app icons.
   The track is duplicated and translated -50 % for a seamless loop. */

const TRUSTED = [
  { src: "beehive.webp", name: "Beehive — Word Puzzle Challenge" },
  { src: "dozy.webp", name: "Dozy — Commute Companion" },
  { src: "pixel-buddy.webp", name: "Pixel Buddy — Coloring Book" },
];

const TrustedBy = () => {
  const base = `${window.UBE_ASSETS || "../../assets"}/customers/`;
  const half = [];
  for (let i = 0; i < 6; i++) half.push(...TRUSTED);
  const sequence = [...half, ...half];
  return (
    <section className="trusted-band" aria-label="Apps using Ube in production" data-screen-label="Trusted By">
      <div className="trusted-band-grid" aria-hidden="true" />
      <div className="container trusted-label-row">
        <span className="trusted-label">Trusted in production by:</span>
      </div>
      <div className="trusted-marquee">
        <div className="trusted-track">
          {sequence.map((app, i) => (
            <div className="trusted-icon" key={i} title={app.name}>
              <img src={base + app.src} alt={app.name}
                   width="88" height="88" loading="lazy" draggable={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.TrustedBy = TrustedBy;
