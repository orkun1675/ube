// Glossary terms — anchored pop-over positioning for inline jargon
// definitions (DAU, CAC, MMP, ANR …).
//
// Open/close is entirely native: each <Term> renders a `popovertarget` button
// plus an `auto` `popover` (see src/components/Term.*), so the platform gives
// us tap-to-toggle, one-open-at-a-time, light-dismiss (tap elsewhere),
// Esc-to-close, and focus handling for free — on touch and keyboard alike,
// with no hover dependency.
//
// This module only does what the platform doesn't: anchor the floating
// pop-over to its term. A pop-over lives in the top layer and is positioned
// against the viewport, not its anchor — so we measure the term, place the
// pop-over below it (flipping above when there's no room), clamp it inside the
// viewport, and align the caret. One delegated listener covers every term
// regardless of framework (Astro or React) or hydration timing: the `toggle`
// event doesn't bubble, but a capture-phase listener still sees it.

const VIEWPORT_MARGIN = 8 // keep the pop-over this far from any viewport edge
const TERM_GAP = 8 // gap between the term and the pop-over
const CARET_INSET = 14 // keep the caret tip this far from the pop-over corners

function anchorOf(pop: Element): HTMLElement | null {
  return (
    pop.closest(".gloss")?.querySelector<HTMLElement>(".gloss-term") ?? null
  )
}

function place(pop: HTMLElement, term: HTMLElement): void {
  // Measure at the unconstrained position first: a top-layer pop-over sized
  // with `fit-content` would over-wrap if it were left near a viewport edge,
  // throwing off the centring math. Pinning to (0,0) frees the full width.
  pop.style.left = "0px"
  pop.style.top = "0px"
  const t = term.getBoundingClientRect()
  const { width: popW, height: popH } = pop.getBoundingClientRect()
  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight

  // Vertical: prefer below the term; flip above when below would overflow and
  // there's at least as much room above.
  const roomBelow = vh - t.bottom
  const placeBelow =
    roomBelow >= popH + TERM_GAP + VIEWPORT_MARGIN || roomBelow >= t.top
  let top = placeBelow ? t.bottom + TERM_GAP : t.top - TERM_GAP - popH
  top = Math.max(VIEWPORT_MARGIN, Math.min(top, vh - popH - VIEWPORT_MARGIN))

  // Horizontal: centre on the term, clamp inside the viewport.
  const center = t.left + t.width / 2
  const left = Math.max(
    VIEWPORT_MARGIN,
    Math.min(center - popW / 2, vw - popW - VIEWPORT_MARGIN),
  )

  pop.style.left = `${Math.round(left)}px`
  pop.style.top = `${Math.round(top)}px`
  pop.setAttribute("data-placement", placeBelow ? "bottom" : "top")

  const caret = pop.querySelector<HTMLElement>(".gloss-caret")
  if (caret) {
    const x = Math.max(CARET_INSET, Math.min(center - left, popW - CARET_INSET))
    caret.style.left = `${Math.round(x)}px`
  }
}

let openPop: HTMLElement | null = null

function reposition(): void {
  if (!openPop) return
  const term = anchorOf(openPop)
  if (term) place(openPop, term)
}

document.addEventListener(
  "toggle",
  (event) => {
    const pop = event.target
    if (!(pop instanceof HTMLElement) || !pop.classList.contains("gloss-pop")) {
      return
    }
    const term = anchorOf(pop)
    if ((event as ToggleEvent).newState === "open") {
      if (term) {
        place(pop, term)
        term.setAttribute("aria-expanded", "true")
      }
      openPop = pop
    } else {
      term?.setAttribute("aria-expanded", "false")
      if (openPop === pop) openPop = null
    }
  },
  true, // capture — the `toggle` event does not bubble
)

// Keep an open pop-over glued to its term as the layout shifts. Registered
// once; both handlers no-op when nothing is open.
window.addEventListener("scroll", reposition, { capture: true, passive: true })
window.addEventListener("resize", reposition)
