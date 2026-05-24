// =====================================================================
//  Fix Loop Modal — sealed sandbox where two agents review each other
// =====================================================================
import { Modal } from "../../lib/modal"

type FixLoopModalProps = { open: boolean; onClose: () => void }

export const FixLoopModal = ({ open, onClose }: FixLoopModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="modal-backdrop fl-modal-backdrop"
      panelClassName="modal-panel fl-panel"
      labelledBy="fl-title"
    >
      <div className="fl-header">
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          INSIDE THE FIX LOOP
        </div>
        <h3
          id="fl-title"
          className="t-display-md"
          style={{ margin: 0, marginBottom: 8, lineHeight: 1.15 }}
        >
          A sealed box. Two adversaries.
        </h3>
        <p className="t-body-md body" style={{ margin: 0 }}>
          Ube agent runs and debugs the app just like a human would.
        </p>
      </div>

      {/* ───── Sandbox container ───── */}
      <div className="fl-sandbox">
        <div className="fl-sandbox-chrome">
          <span className="fl-chrome-tag mono">
            <img
              src="assets/integrations/docker.svg"
              alt=""
              className="fl-chrome-logo"
            />{" "}
            DOCKER SANDBOX
          </span>
          <span className="fl-chrome-image mono">ube/fix-loop:1.4.2</span>
        </div>

        <div className="fl-arena" aria-hidden="true">
          {/* Generator */}
          <div className="fl-agent fl-agent-gen">
            <img
              src="assets/integrations/claude-code.svg"
              alt=""
              className="fl-agent-logo"
            />
            <div className="fl-agent-role mono">GENERATOR</div>
            <div className="fl-agent-name">Claude Code</div>
            <div className="fl-agent-act mono">
              writes the patch<span className="fl-cursor">▍</span>
            </div>
          </div>

          {/* Duel pipe */}
          <div className="fl-duel">
            <div className="fl-duel-rail" />
            <div className="fl-tok fl-tok-patch mono">+patch</div>
            <div className="fl-tok fl-tok-nit mono">nit ✕</div>
          </div>

          {/* Reviewer */}
          <div className="fl-agent fl-agent-rev">
            <img
              src="assets/integrations/codex.svg"
              alt=""
              className="fl-agent-logo"
            />
            <div className="fl-agent-role mono">REVIEWER</div>
            <div className="fl-agent-name">Codex</div>
            <div className="fl-agent-act mono">
              reviews it<span className="fl-cursor">▍</span>
            </div>
          </div>
        </div>

        <div className="fl-sandbox-foot mono">
          <span>adversarial · agents loop until they agree</span>
        </div>
      </div>

      {/* ───── Curated I/O ───── */}
      <div className="fl-rails">
        <div className="fl-rail" style={{ animationDelay: "60ms" }}>
          <div className="fl-rail-head">
            <span className="fl-rail-name">ADB</span>
          </div>
          <div className="fl-phone">
            <div className="fl-phone-screen">
              <div className="fl-phone-pixels" />
              <div className="fl-phone-bug" />
            </div>
            <div className="fl-phone-tree">
              <span className="mono">View</span>
              <span className="mono"> ├ Header</span>
              <span className="mono">
                {" "}
                ├ List<i>·tap</i>
              </span>
              <span className="mono"> └ CTA</span>
            </div>
          </div>
          <div className="fl-rail-cap mono">
            <em>eyes</em> and <em>hands</em>
          </div>
        </div>

        <div className="fl-rail" style={{ animationDelay: "180ms" }}>
          <div className="fl-rail-head">
            <span className="fl-rail-name">Mock backend</span>
          </div>
          <div className="fl-mock">
            <svg
              className="fl-mock-db"
              viewBox="0 0 64 64"
              width="60"
              height="60"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="flMockFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--accent-soft)"
                    stopOpacity="0.95"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--accent-soft)"
                    stopOpacity="0.55"
                  />
                </linearGradient>
              </defs>
              {/* body fill */}
              <path
                d="M 8 12 A 24 6 0 0 1 56 12 L 56 52 A 24 6 0 0 1 8 52 Z"
                fill="url(#flMockFill)"
              />
              {/* top rim */}
              <ellipse
                cx="32"
                cy="12"
                rx="24"
                ry="6"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
              {/* sides */}
              <line
                x1="8"
                y1="12"
                x2="8"
                y2="52"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
              <line
                x1="56"
                y1="12"
                x2="56"
                y2="52"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
              {/* bottom curve (visible front) */}
              <path
                d="M 8 52 A 24 6 0 0 0 56 52"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
              {/* band dividers — only the visible front arc, classic DB look */}
              <path
                className="fl-mock-band"
                d="M 8 25.3 A 24 6 0 0 0 56 25.3"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.2"
                opacity="0.7"
              />
              <path
                className="fl-mock-band"
                d="M 8 38.7 A 24 6 0 0 0 56 38.7"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.2"
                opacity="0.7"
              />
              {/* write pulse — dot that drops into the top */}
              <circle
                className="fl-mock-write"
                cx="32"
                cy="6"
                r="2.2"
                fill="var(--accent)"
              />
            </svg>
            <div className="fl-mock-flow">
              <span className="fl-mock-pkt mono">GET /orders</span>
              <span className="fl-mock-pkt mono">→ 200</span>
            </div>
          </div>
          <div className="fl-rail-cap mono">stand up local DB</div>
        </div>

        <div className="fl-rail" style={{ animationDelay: "300ms" }}>
          <div className="fl-rail-head">
            <span className="fl-rail-name">OneCLI Agent Vault</span>
          </div>
          <div className="fl-vault">
            <div className="fl-vault-key">
              <span className="fl-vault-label mono">STRIPE_SK</span>
              <span className="fl-vault-mask mono">●●●●●●●●●●●●</span>
            </div>
            <div className="fl-vault-key">
              <span className="fl-vault-label mono">OPENAI_KEY</span>
              <span className="fl-vault-mask mono">●●●●●●●●●●●●</span>
            </div>
            <div className="fl-vault-shield" aria-hidden="true" />
          </div>
          <div className="fl-rail-cap mono">agent cannot see private keys</div>
        </div>
      </div>
    </Modal>
  )
}
