// Ube — Tweaks-only UI: the UbeHuePicker swatch grid and its CSS. Dev-only.
// Mounted only when `import.meta.env.DEV` is true (see PageApp).
import { getUbe, UBE_HUES } from "../lib/palette"
import { TweakRow } from "./tweaks-panel"

const UBE_HUE_CSS = `
  .ube-hues{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:2px}
  .ube-hue{position:relative;appearance:none;border:0;padding:0;cursor:pointer;
    height:54px;border-radius:7px;overflow:hidden;
    box-shadow:0 0 0 .5px rgba(0,0,0,.14),0 1px 2px rgba(0,0,0,.08);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .14s}
  .ube-hue:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.22),0 5px 12px rgba(0,0,0,.14)}
  .ube-hue[data-on="1"]{box-shadow:0 0 0 1.6px rgba(0,0,0,.85),
    0 3px 8px rgba(0,0,0,.18)}
  .ube-hue-grad{position:absolute;inset:0;
    background:linear-gradient(135deg,
      oklch(calc(var(--l) + 0.12) var(--c) var(--h)) 0%,
      oklch(var(--l) var(--c) var(--h)) 55%,
      oklch(calc(var(--l) - 0.14) calc(var(--c) - 0.04) var(--h)) 100%)}
  .ube-hue-name{position:absolute;left:7px;right:7px;bottom:5px;
    font:600 10px/1.1 Inter,system-ui,sans-serif;letter-spacing:.01em;
    color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.45);
    text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ube-hue-check{position:absolute;top:6px;right:6px;width:14px;height:14px;
    border-radius:50%;background:rgba(255,255,255,.96);
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 1px 2px rgba(0,0,0,.25)}
  .ube-hue-check svg{width:9px;height:9px}
  .ube-hue-meta{display:flex;justify-content:space-between;align-items:baseline;
    margin-top:8px;font:500 10px/1.2 Inter,system-ui,sans-serif;
    color:rgba(41,38,27,.62);letter-spacing:.02em}
  .ube-hue-meta b{font-weight:600;color:rgba(41,38,27,.86)}
`

export function UbeHuePicker({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const current = getUbe(value)
  return (
    <TweakRow label="Accent — Ube palette">
      <style>{UBE_HUE_CSS}</style>
      <div className="ube-hues" role="radiogroup" aria-label="Accent hue">
        {UBE_HUES.map((u) => {
          const on = u.value === value
          return (
            // biome-ignore lint/a11y/useSemanticElements: dev-only color picker uses styled <button>s in a radiogroup
            <button
              key={u.value}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={`${u.name} (${u.H}°, L ${u.L})`}
              title={`${u.name} · ${u.note} · ${u.H}°`}
              data-on={on ? "1" : "0"}
              className="ube-hue"
              onClick={() => onChange(u.value)}
            >
              <span
                className="ube-hue-grad"
                style={
                  {
                    "--h": u.H,
                    "--l": u.L,
                    "--c": u.C,
                  } as React.CSSProperties
                }
              />
              <span className="ube-hue-name">{u.name}</span>
              {on && (
                <span className="ube-hue-check">
                  <svg viewBox="0 0 14 14" aria-hidden="true">
                    <path
                      d="M3 7.2 5.8 10 11 4.2"
                      fill="none"
                      stroke="#111"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>
      <div className="ube-hue-meta">
        <span>
          <b>{current.name}</b> · {current.note}
        </span>
        <span>{current.H}°</span>
      </div>
    </TweakRow>
  )
}
