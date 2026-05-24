// =====================================================================
//  Trusted In Production By (expo.dev-style logo marquee)
// =====================================================================
const TRUSTED_APPS = [
  {
    src: "assets/customers/beehive.webp",
    name: "Beehive — Word Puzzle Challenge",
  },
  { src: "assets/customers/dozy.webp", name: "Dozy — Commute Companion" },
  {
    src: "assets/customers/pixel-buddy.webp",
    name: "Pixel Buddy — Coloring Book",
  },
]

const TrustedBy = () => {
  // Repeat the 3-app set, then double the whole strip so translateX(-50%) loops seamlessly.
  const sequence = React.useMemo(() => {
    const halfRepeats = 6
    const half = []
    for (let i = 0; i < halfRepeats; i++) half.push(...TRUSTED_APPS)
    return [...half, ...half]
  }, [])

  return (
    <section className="trusted-band" aria-label="Apps using Ube in production">
      <div className="trusted-band-grid" aria-hidden="true" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <span className="trusted-label">Trusted in production by:</span>
      </div>
      <div
        className="trusted-marquee"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="trusted-track">
          {sequence.map((app, i) => (
            <div key={i} className="trusted-icon" title={app.name}>
              <img
                src={app.src}
                alt={app.name}
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

Object.assign(window, { TrustedBy })
