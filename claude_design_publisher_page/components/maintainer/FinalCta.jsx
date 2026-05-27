/* FinalCta.jsx — closing CTA band over a violet radial + dot grid. */

const FinalCta = ({ onRequestAccess }) => (
  <section className="cta-band" data-screen-label="Final CTA">
    <div className="cta-band-bg" />
    <div className="cta-band-grid" />
    <div className="container">
      <h2 className="t-display-lg cta-band-headline">
        Stop shipping fixes.<br />Start shipping features.
      </h2>
      <p className="t-body-md cta-band-subhead">
        Ube handles the maintenance loop so you can spend your sprint on what
        users actually asked for.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => onRequestAccess?.("final_cta")}
      >
        Request access<ArrowRight size={14} />
      </button>
    </div>
  </section>
);

window.FinalCta = FinalCta;
