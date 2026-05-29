// Cross-promo click tracking. The card is a plain `<a href="/">`, so
// navigation happens natively — this only fires the analytics event
// (synchronously, before the page unloads) so we can measure how many
// Maintainer visitors hop over to the Publisher product.
import { track } from "@/lib/analytics"

const cards = document.querySelectorAll<HTMLAnchorElement>("[data-xpromo]")

for (const card of cards) {
  card.addEventListener("click", () => {
    track("cross_promo_clicked", {
      from: "maintainer",
      to: "publisher",
      source: card.dataset["xpromo"],
    })
  })
}
