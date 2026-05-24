// =====================================================================
//  Request Access Modal
// =====================================================================
const RequestAccessModal = ({ open, onClose }) => {
  const [step, setStep] = React.useState("form") // form | submitting | success
  const [email, setEmail] = React.useState("")
  const [stack, setStack] = React.useState("")
  const [stackOther, setStackOther] = React.useState("")
  const [product, setProduct] = React.useState("")
  const [teamSize, setTeamSize] = React.useState("")
  const [productError, setProductError] = React.useState(false)
  const [submitError, setSubmitError] = React.useState("")

  // Reset to form when re-opened after success
  React.useEffect(() => {
    if (open && step === "success") {
      // keep showing success until user closes; that's the brief
    }
    if (!open) {
      // small delay to avoid flash mid-close
      setTimeout(() => {
        setStep("form")
        setEmail("")
        setStack("")
        setStackOther("")
        setProduct("")
        setTeamSize("")
        setSubmitError("")
      }, 280)
    }
  }, [open, step])
  const onSubmit = async (e) => {
    e.preventDefault()
    if (!product) {
      setProductError(true)
      return
    }
    setProductError(false)
    setSubmitError("")
    track("request_access_submitted", {
      email,
      product_interest: product,
      stack,
      stack_other: stackOther,
      team_size: teamSize,
    })
    const formEl = e.currentTarget
    setStep("submitting")
    try {
      const token = await new Promise((resolve, reject) => {
        if (!window.grecaptcha?.ready) {
          reject(new Error("reCAPTCHA not loaded"))
          return
        }
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: "submit" })
            .then(resolve, reject)
        })
      })
      const formData = new FormData(formEl)
      formData.append("g-recaptcha-response", token)
      formData.append("g-recaptcha-version", "v3")
      const response = await fetch(BASIN_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStep("success")
    } catch (_err) {
      setStep("form")
      setSubmitError(
        "Something went wrong submitting your request. Please try again.",
      )
    }
  }
  const stacks = [
    "React Native",
    "Expo",
    "Flutter",
    "iOS (Swift / Obj-C)",
    "Android (Kotlin / Java)",
    "Capacitor / Ionic",
    "Other",
  ]
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="modal-backdrop"
      panelClassName="modal-panel"
    >
      {step !== "success" ? (
        <>
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Request access
          </div>
          <h3
            className="t-display-sm ink"
            style={{ margin: 0, marginBottom: 6 }}
          >
            Join the first cohort.
          </h3>
          <p
            className="t-body-sm muted"
            style={{ margin: 0, marginBottom: 24, lineHeight: 1.55 }}
          >
            Tell us what you're shipping. We'll be in touch as we open access.
          </p>

          <form onSubmit={onSubmit} action={BASIN_ENDPOINT} method="POST">
            <div className="field">
              <label className="field-label" htmlFor="ra-email">
                Email <span className="req-dot" />
              </label>
              <input
                id="ra-email"
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label" htmlFor="ra-stack">
                What are you building with? <span className="req-dot" />
              </label>
              <select
                id="ra-stack"
                name="stack"
                className="input"
                required
                value={stack}
                onChange={(e) => setStack(e.target.value)}
              >
                <option value="">Select a stack…</option>
                {stacks.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {stack === "Other" && (
                <input
                  style={{ marginTop: 10 }}
                  className="input"
                  name="stack_other"
                  placeholder="Which stack?"
                  value={stackOther}
                  onChange={(e) => setStackOther(e.target.value)}
                  aria-label="Other stack"
                  required
                />
              )}
            </div>

            <div className="field">
              <span id="ra-product-label" className="field-label">
                Which product matters more to you? <span className="req-dot" />
              </span>
              <div
                className="radio-group"
                role="radiogroup"
                aria-labelledby="ra-product-label"
                style={
                  productError
                    ? {
                        borderRadius: 12,
                        outline: "1px solid #c0392b",
                        outlineOffset: 4,
                      }
                    : undefined
                }
              >
                {[
                  {
                    id: "maintainer",
                    label: "Ube Maintainer",
                    sub: "Automated triage, fixes, and PRs for production issues.",
                  },
                  {
                    id: "publisher",
                    label: "Ube Publisher",
                    sub: "Ship faster and reach more users.",
                  },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    className={`radio-item ${product === opt.id ? "selected" : ""}`}
                    aria-pressed={product === opt.id}
                    onClick={() => {
                      setProduct(opt.id)
                      setProductError(false)
                    }}
                  >
                    <span className="radio-dot" />
                    <div>
                      <div style={{ color: "var(--ink)", fontWeight: 500 }}>
                        {opt.label}
                      </div>
                      {opt.sub && (
                        <div
                          className="t-caption muted"
                          style={{ marginTop: 2 }}
                        >
                          {opt.sub}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <input type="hidden" name="product_interest" value={product} />
              {productError && (
                <div
                  className="t-caption"
                  style={{ marginTop: 8, color: "#c0392b" }}
                >
                  Please pick one.
                </div>
              )}
            </div>

            <div className="field">
              <label className="field-label" htmlFor="ra-team-size">
                Team size{" "}
                <span
                  className="muted"
                  style={{
                    textTransform: "none",
                    letterSpacing: 0,
                    fontWeight: 400,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  (optional)
                </span>
              </label>
              <select
                id="ra-team-size"
                name="team_size"
                className="input"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
              >
                <option value="">Select…</option>
                {["Just me", "2–5", "6–20", "21–100", "100+"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {submitError && (
              <div
                className="t-caption"
                role="alert"
                style={{
                  marginTop: 4,
                  marginBottom: 12,
                  color: "var(--error)",
                }}
              >
                {submitError}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: 8,
              }}
              disabled={step === "submitting"}
            >
              {step === "submitting" ? (
                <span className="spinner" />
              ) : (
                <>
                  Request access <ArrowRight size={14} />
                </>
              )}
            </button>
            <p
              className="t-caption muted"
              style={{ marginTop: 14, textAlign: "center" }}
            >
              We'll only use this to contact you about Ube access.
            </p>
            <p
              className="muted"
              style={{
                marginTop: 10,
                marginBottom: 0,
                textAlign: "center",
                fontSize: 11,
                lineHeight: 1.45,
              }}
            >
              This site is protected by reCAPTCHA.
            </p>
          </form>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "var(--accent-tint)",
              border: "1px solid rgba(107, 63, 160, 0.4)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <CheckIcon size={22} color="var(--accent)" />
          </div>
          <h3
            className="t-display-sm ink"
            style={{ margin: 0, marginBottom: 8 }}
          >
            You're on the list.
          </h3>
          <p
            className="t-body-md body"
            style={{
              margin: 0,
              marginBottom: 24,
              maxWidth: 360,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            We'll be in touch as we open up access. You can follow us on{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              GitHub
            </a>{" "}
            for updates.
          </p>
          <button type="button" onClick={onClose} className="inline-link">
            Close
          </button>
        </div>
      )}
    </Modal>
  )
}

Object.assign(window, { RequestAccessModal })
