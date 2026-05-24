// =====================================================================
//  Final CTA Band
// =====================================================================
import { ArrowRight } from "../../lib/assets"
import { openRequestAccess } from "../../stores/request-access"

export const FinalCTA = () => (
  <section className="cta-band">
    <div className="cta-band-bg" />
    <div className="cta-band-grid" />
    <div
      className="container"
      style={{ position: "relative", textAlign: "center" }}
    >
      <h2
        className="t-display-lg"
        style={{
          margin: 0,
          marginBottom: 18,
          maxWidth: 720,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Stop shipping fixes.
        <br />
        Start shipping features.
      </h2>
      <p
        className="t-body-md muted"
        style={{
          margin: 0,
          marginBottom: 32,
          maxWidth: 560,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Ube handles the maintenance loop so you can spend your sprint on what
        users actually asked for.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => openRequestAccess("final_cta")}
      >
        Request access
        <ArrowRight size={14} />
      </button>
    </div>
  </section>
)
