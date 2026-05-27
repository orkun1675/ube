/* RequestAccessModal.jsx (publisher) — same as maintainer modal, but
   defaults the interest radio to "publisher". */

const RequestAccessModal = ({ open, source, onClose }) => {
  const [interest, setInterest] = React.useState("publisher");
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const onSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true"
         onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div className="modal-panel" role="document">
        <button className="modal-close" type="button" aria-label="Close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        {!submitted ? (
          <React.Fragment>
            <div className="eyebrow" style={{ marginBottom: 12 }}>REQUEST ACCESS</div>
            <h2 className="t-display-md ink" style={{ marginBottom: 8 }}>
              Get on the early-access list.
            </h2>
            <p className="t-body-sm body" style={{ margin: 0, marginBottom: 22 }}>
              We'll be in touch as soon as Publisher is ready for your app. <span className="mono" style={{ color: "var(--muted)" }}>source: {source || "—"}</span>
            </p>
            <form onSubmit={onSubmit}>
              <div className="field">
                <label className="field-label">
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }} />
                  Work email
                </label>
                <input className="input" type="email" placeholder="you@company.com" required />
              </div>
              <div className="field">
                <label className="field-label">
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }} />
                  Which product matters more to you?
                </label>
                <div className="radio-group">
                  {[
                    { v: "publisher",  t: "Ube Publisher — handle ads + creatives + analytics" },
                    { v: "maintainer", t: "Ube Maintainer — keep my live apps healthy" },
                    { v: "both",       t: "Both equally" },
                  ].map(({ v, t }) => (
                    <button key={v} type="button"
                            className={`radio-item ${interest === v ? "selected" : ""}`}
                            onClick={() => setInterest(v)}>
                      <span className="radio-dot" />
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: "100%", justifyContent: "center", height: 48 }}>
                Request access<ArrowRight size={14} />
              </button>
              <p className="t-caption muted" style={{ marginTop: 12, textAlign: "center" }}>
                Protected by reCAPTCHA — no spam.
              </p>
            </form>
          </React.Fragment>
        ) : (
          <div style={{ textAlign: "center", padding: "24px 8px" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "rgba(59, 182, 122, 0.15)",
              border: "1px solid rgba(59, 182, 122, 0.4)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: 16, color: "var(--success)",
            }}>
              <CheckIcon size={22} color="var(--success)" />
            </div>
            <h2 className="t-display-sm ink" style={{ marginBottom: 8 }}>You're on the list.</h2>
            <p className="t-body-sm body" style={{ margin: 0 }}>
              We'll reach out the moment Publisher is ready for your app.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

window.RequestAccessModal = RequestAccessModal;
