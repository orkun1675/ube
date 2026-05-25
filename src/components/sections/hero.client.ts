// Hero client behavior (spec 0007). Replaces the React `onClick` in the old
// `Hero` island: a single vanilla click handler that routes into the shared
// nano store via `openRequestAccess('hero')` — preserving the analytics
// source label fired by `request_access_modal_opened`.
import { openRequestAccess } from "@/stores/request-access"

const ctaButtons =
  document.querySelectorAll<HTMLButtonElement>("[data-hero-cta]")

for (const btn of ctaButtons) {
  btn.addEventListener("click", () => {
    openRequestAccess("hero")
  })
}
