// Cross-promo click tracking. The card is a plain `<a href="/maintainer/">`,
// so navigation happens natively — this only fires the analytics event
// (synchronously, before the page unloads) so we can measure how many
// Publisher visitors hop over to the Maintainer product.
import { track } from "@/lib/analytics"

const cards = document.querySelectorAll<HTMLAnchorElement>("[data-xpromo]")

for (const card of cards) {
  card.addEventListener("click", () => {
    track("cross_promo_clicked", {
      from: "publisher",
      to: "maintainer",
      source: card.dataset["xpromo"],
    })
  })
}
