// tweaks-panel.tsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it.
//
// NOTE: dev-only — kept out of production via `import.meta.env.DEV` gating at
// the call site (see PageApp.tsx). Slice 0009 will rewire the EDITMODE
// writeback to play nicely with Vite/Astro HMR; for now the panel mutates
// values in-memory and posts to `window.parent` as before, but the source
// file is not regenerated on disk.
import React from "react"

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}
`

// ── useTweaks ───────────────────────────────────────────────────────────────
export function useTweaks<T extends Record<string, unknown>>(
  defaults: T,
): [T, (key: keyof T, val: T[keyof T]) => void] {
  const [values, setValues] = React.useState<T>(defaults)
  const setTweak = React.useCallback((key: keyof T, val: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    window.parent.postMessage(
      { type: "__edit_mode_set_keys", edits: { [key]: val } },
      "*",
    )
    window.dispatchEvent(
      new CustomEvent("tweakchange", { detail: { [key]: val } }),
    )
  }, [])
  return [values, setTweak]
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
export function TweaksPanel({
  title = "Tweaks",
  children,
}: {
  title?: string
  children?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const dragRef = React.useRef<HTMLDivElement | null>(null)
  const offsetRef = React.useRef({ x: 16, y: 16 })
  const PAD = 16

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current
    if (!panel) return
    const w = panel.offsetWidth
    const h = panel.offsetHeight
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD)
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD)
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    }
    panel.style.right = `${offsetRef.current.x}px`
    panel.style.bottom = `${offsetRef.current.y}px`
  }, [])

  React.useEffect(() => {
    if (!open) return
    clampToViewport()
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", clampToViewport)
      return () => window.removeEventListener("resize", clampToViewport)
    }
    const ro = new ResizeObserver(clampToViewport)
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [open, clampToViewport])

  React.useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const t = (e.data as { type?: string } | null)?.type
      if (t === "__activate_edit_mode") setOpen(true)
      else if (t === "__deactivate_edit_mode") setOpen(false)
    }
    window.addEventListener("message", onMsg)
    window.parent.postMessage({ type: "__edit_mode_available" }, "*")
    return () => window.removeEventListener("message", onMsg)
  }, [])

  const dismiss = () => {
    setOpen(false)
    window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*")
  }

  const onDragStart = (e: React.MouseEvent) => {
    const panel = dragRef.current
    if (!panel) return
    const r = panel.getBoundingClientRect()
    const sx = e.clientX
    const sy = e.clientY
    const startRight = window.innerWidth - r.right
    const startBottom = window.innerHeight - r.bottom
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      }
      clampToViewport()
    }
    const up = () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
  }

  if (!open) return null
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div
        ref={dragRef}
        className="twk-panel"
        data-omelette-chrome=""
        style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}
      >
        {/* biome-ignore lint/a11y/noStaticElementInteractions: drag handle for a dev-only tweaks panel; mouse-only by design */}
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button
            type="button"
            className="twk-x"
            aria-label="Close tweaks"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={dismiss}
          >
            ✕
          </button>
        </div>
        <div className="twk-body">{children}</div>
      </div>
    </>
  )
}

export function TweakSection({
  title,
  children,
}: {
  title?: string
  children?: React.ReactNode
}) {
  return (
    <>
      {title && <div className="twk-sect">{title}</div>}
      {children}
    </>
  )
}

export function TweakRow({
  label,
  value,
  children,
  inline = false,
}: {
  label?: string
  value?: React.ReactNode
  children?: React.ReactNode
  inline?: boolean
}) {
  return (
    <div className={inline ? "twk-row twk-row-h" : "twk-row"}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  )
}

type Option = { value: string; label: string }
type OptionInput = string | Option

const normOption = (o: OptionInput): Option =>
  typeof o === "object" ? o : { value: o, label: o }

export function TweakRadio({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: OptionInput[]
  onChange: (v: string) => void
}) {
  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const [dragging, setDragging] = React.useState(false)
  const valueRef = React.useRef(value)
  valueRef.current = value

  const labelLen = (o: OptionInput) =>
    String(typeof o === "object" ? o.label : o).length
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0)
  const segMax: Record<number, number> = { 2: 16, 3: 10 }
  const fitsAsSegments = maxLen <= (segMax[options.length] ?? 0)

  if (!fitsAsSegments) {
    return (
      <TweakSelect
        label={label}
        value={value}
        options={options}
        onChange={onChange}
      />
    )
  }

  const opts = options.map(normOption)
  const idx = Math.max(
    0,
    opts.findIndex((o) => o.value === value),
  )
  const n = opts.length

  const segAt = (clientX: number): string => {
    const fallback = opts[0]?.value ?? value
    const track = trackRef.current
    if (!track) return fallback
    const r = track.getBoundingClientRect()
    const inner = r.width - 4
    const i = Math.floor(((clientX - r.left - 2) / inner) * n)
    return opts[Math.max(0, Math.min(n - 1, i))]?.value ?? fallback
  }

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    const v0 = segAt(e.clientX)
    if (v0 !== valueRef.current) onChange(v0)
    const move = (ev: PointerEvent) => {
      if (!trackRef.current) return
      const v = segAt(ev.clientX)
      if (v !== valueRef.current) onChange(v)
    }
    const up = () => {
      setDragging(false)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  return (
    <TweakRow label={label}>
      <div
        ref={trackRef}
        role="radiogroup"
        onPointerDown={onPointerDown}
        className={dragging ? "twk-seg dragging" : "twk-seg"}
      >
        <div
          className="twk-seg-thumb"
          style={{
            left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
            width: `calc((100% - 4px) / ${n})`,
          }}
        />
        {opts.map((o) => (
          // biome-ignore lint/a11y/useSemanticElements: dev-only tweaks panel uses styled <button>s in a radiogroup
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={o.value === value}
          >
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  )
}

export function TweakSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: OptionInput[]
  onChange: (v: string) => void
}) {
  return (
    <TweakRow label={label}>
      <select
        className="twk-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => {
          const v = typeof o === "object" ? o.value : o
          const l = typeof o === "object" ? o.label : o
          return (
            <option key={v} value={v}>
              {l}
            </option>
          )
        })}
      </select>
    </TweakRow>
  )
}
