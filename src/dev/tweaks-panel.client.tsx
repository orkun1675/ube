// Self-mounting entrypoint for the dev tweaks panel (spec 0008).
//
// Loaded from BaseLayout via a conditional `<script type="module"
// src="./tweaks-panel.client.tsx">` that only renders when
// `import.meta.env.DEV` — so neither this file nor anything else in
// `src/dev/` ships to production. Keeping the mount inside `src/dev/`
// preserves ADR 0003's invariant that production code paths contain no
// JS `import` statements from `src/dev/*`.
//
// The script body itself is gated by `import.meta.env.DEV` as belt-and-
// braces: if a curious dev ever requests this file directly in a prod
// build, it would still no-op.
import { createRoot } from "react-dom/client"

import { TweaksPanelMount } from "./TweaksPanelMount"

if (import.meta.env.DEV) {
  const mount = () => {
    let host = document.getElementById("ube-tweaks-panel-root")
    if (!host) {
      host = document.createElement("div")
      host.id = "ube-tweaks-panel-root"
      document.body.appendChild(host)
    }
    createRoot(host).render(<TweaksPanelMount />)
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true })
  } else {
    mount()
  }
}
