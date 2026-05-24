// =====================================================================
//  Dedupe Modal — flow diagram for "How issues are deduplicated"
// =====================================================================
import { Modal } from "../../lib/modal"

type DedupeModalProps = { open: boolean; onClose: () => void }

export const DedupeModal = ({ open, onClose }: DedupeModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="modal-backdrop dedupe-modal-backdrop"
      panelClassName="modal-panel dedupe-panel"
      labelledBy="dedupe-title"
    >
      <div className="dedupe-header">
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          DEDUPLICATION
        </div>
        <h3
          id="dedupe-title"
          className="t-display-md"
          style={{ margin: 0, marginBottom: 8, lineHeight: 1.15 }}
        >
          From raw crash to one tracked issue.
        </h3>
        <p className="t-body-md body" style={{ margin: 0 }}>
          Four steps with human-in-the-loop when needed.
        </p>
      </div>

      {/* ───── Flow diagram ───── */}
      <div className="dedupe-flow" aria-hidden="true">
        {/* Connector lines (under the cards) */}
        <svg
          className="dedupe-connectors"
          viewBox="0 0 1000 140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ddpipe" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.0" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* horizontal spine */}
          <line
            x1="125"
            y1="70"
            x2="875"
            y2="70"
            stroke="var(--hairline-strong)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          {/* moving glow */}
          <rect
            className="dd-spine-glow"
            x="125"
            y="69"
            width="180"
            height="2"
            fill="url(#ddpipe)"
          />
        </svg>

        <div className="dd-stage" style={{ animationDelay: "60ms" }}>
          <div className="dd-num mono">01</div>
          <div className="dd-card dd-card-crash">
            <div className="dd-card-label mono">CRASH</div>
            <div className="dd-code mono">
              <span className="dd-frame-obf">_Z9a0x1f23</span>
              <span className="dd-frame-obf">sub_4f2a1c</span>
              <span className="dd-frame-obf">__pthread_kill</span>
            </div>
            <span className="dd-tag dd-tag-err">unsymbolicated</span>
          </div>
          <div className="dd-caption mono">raw frames in</div>
        </div>

        <div className="dd-stage" style={{ animationDelay: "260ms" }}>
          <div className="dd-num mono">02</div>
          <div className="dd-card dd-card-sym">
            {/* Codemagic feed pulling dSYMs / mapping */}
            <div className="dd-feed">
              <span className="dd-feed-src mono">
                <img
                  src="assets/integrations/codemagic.svg"
                  alt=""
                  className="dd-feed-src-logo"
                />
                codemagic
              </span>
              <span className="dd-feed-arrow" />
              <span className="dd-feed-pkg mono">app-1.4.2.dSYM</span>
            </div>
            <div className="dd-code mono">
              <span className="dd-frame-sym">
                <b>OrderRepo</b>.fetch()
              </span>
              <span className="dd-frame-sym">
                <b>Net</b>.request()
              </span>
              <span className="dd-frame-sym">
                <b>main</b>
              </span>
            </div>
            <span className="dd-tag dd-tag-ok">symbolicated</span>
          </div>
          <div className="dd-caption mono">
            dSYMs & Debug Symbols from Codemagic
          </div>
        </div>

        <div className="dd-stage" style={{ animationDelay: "460ms" }}>
          <div className="dd-num mono">03</div>
          <div className="dd-card dd-card-sig">
            <div className="dd-sig-hash mono">
              <span>9a</span>
              <span>f3</span>
              <span>b7</span>
              <span>0c</span>
              <span>e1</span>
              <span>4d</span>
              <span>22</span>
              <span>88</span>
            </div>
            <div className="dd-sig-inputs">
              <span className="dd-chip mono">top&nbsp;frames</span>
              <span className="dd-chip mono">iOS&nbsp;17.4</span>
              <span className="dd-chip mono">iPhone&nbsp;14</span>
              <span className="dd-chip mono">v1.4.2</span>
            </div>
          </div>
          <div className="dd-caption mono">
            LLM derives a signature from frames + device + version
          </div>
        </div>

        <div className="dd-stage" style={{ animationDelay: "660ms" }}>
          <div className="dd-num mono">04</div>
          <div className="dd-card dd-card-bucket">
            <div className="dd-bucket-id mono">ISSUE #1247</div>
            <div className="dd-bucket-row">
              <span className="dd-bucket-pip" />
              <span className="dd-bucket-pip" />
              <span className="dd-bucket-pip" />
              <span className="dd-bucket-pip dd-bucket-pip-new" />
            </div>
            <div className="dd-bucket-count">
              <span className="dd-count-num">128</span>
              <span className="mono muted" style={{ fontSize: 10 }}>
                occurrences
              </span>
            </div>
          </div>
          <div className="dd-caption mono">matched into existing bucket</div>
        </div>
      </div>

      {/* ───── Human-in-the-loop merge ───── */}
      <div className="dd-hitl">
        <div className="dd-hitl-head">
          <span className="dd-hitl-eyebrow mono">
            <span className="dd-hitl-dot" /> HUMAN&nbsp;IN&nbsp;THE&nbsp;LOOP
          </span>
          <span className="dd-hitl-sub mono">
            when two signatures are <em>almost</em> the same
          </span>
        </div>

        <div className="dd-hitl-stage">
          <div className="dd-sig-card dd-sig-a">
            <div className="dd-sig-card-id mono">9af3 b70c · e14d 2288</div>
            <div className="dd-sig-card-meta mono">iOS 17.4 · v1.4.2</div>
            <div className="dd-sig-card-count mono">128×</div>
          </div>

          <div className="dd-merge-btn mono" aria-hidden="true">
            merge →
          </div>

          <div className="dd-sig-card dd-sig-b">
            <div className="dd-sig-card-id mono">
              9af3 b70c · e14d <s>22</s>
              <b>11</b>
            </div>
            <div className="dd-sig-card-meta mono">iOS 17.5 · v1.4.2</div>
            <div className="dd-sig-card-count mono">7×</div>
          </div>

          {/* Curved connector between the two signature cards */}
          <svg
            className="dd-merge-arc"
            viewBox="0 0 600 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="dd-merge-arc-path"
              d="M 30 55 C 200 5, 400 5, 570 55"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
          </svg>
        </div>

        <p className="dd-hitl-note mono">
          Engineers can mark two signatures as identical. The bucket merges,
          history reconciles,{" "}
          <span className="accent">issue count rolls up</span>.
        </p>
      </div>
    </Modal>
  )
}
