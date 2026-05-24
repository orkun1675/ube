// FinalCta client behavior (spec 0006). Replaces the React `onClick` in the
// old `FinalCTA` island: a single vanilla click handler that routes into the
// shared nano store via `openRequestAccess('final_cta')` — preserving the
// analytics source label fired by `request_access_modal_opened`.
import { openRequestAccess } from "../../stores/request-access"

const ctaButtons =
  document.querySelectorAll<HTMLButtonElement>("[data-final-cta]")

for (const btn of ctaButtons) {
  btn.addEventListener("click", () => {
    openRequestAccess("final_cta")
  })
}
