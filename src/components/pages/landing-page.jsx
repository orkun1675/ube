// =====================================================================
//  Landing page — the demand-probe homepage. Other routes (terms,
//  privacy) render a different page body but share TopNav + Footer
//  from app.jsx.
// =====================================================================
const LandingPage = ({
  onRequestAccess,
  onRequestAccessFromFinalCta,
  heroVariant,
  heroCopy,
}) => (
  <main>
    <Hero
      onRequestAccess={onRequestAccess}
      heroVariant={heroVariant}
      heroCopy={heroCopy}
    />
    <TrustedBy />
    <Problems />
    <HowItWorks />
    <Benefits />
    <FAQ />
    <FinalCTA onRequestAccess={onRequestAccessFromFinalCta} />
  </main>
)

Object.assign(window, { LandingPage })
