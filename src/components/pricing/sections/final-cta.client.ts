import { openRequestAccess } from "@/stores/request-access"

const ctaButtons = document.querySelectorAll<HTMLButtonElement>(
  "[data-pricing-final-cta]",
)

for (const btn of ctaButtons) {
  btn.addEventListener("click", () => {
    openRequestAccess("pricing_final_cta")
  })
}
