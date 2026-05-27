/* FinalCta.jsx (publisher) — closing band. */

const PublisherFinalCta = ({ onRequestAccess }) => (
  <section className="cta-band" data-screen-label="Final CTA">
    <div className="cta-band-bg" />
    <div className="cta-band-grid" />
    <div className="container">
      <h2 className="t-display-lg cta-band-headline">
        Let's grow your<br />app together.
      </h2>
      <p className="t-body-md cta-band-subhead">
        Hand the distribution loop to Ube. Get back to building.
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

window.PublisherFinalCta = PublisherFinalCta;
