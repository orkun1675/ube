import { track } from "@/lib/analytics"

const buttons = document.querySelectorAll<HTMLButtonElement>("[data-loop-step]")

for (const btn of buttons) {
  btn.addEventListener("click", () => {
    const step = btn.dataset["loopStep"] ?? ""
    const title = btn.dataset["loopTitle"] ?? ""
    track("how_it_works_step_opened", { page: "publisher", step, title })
  })
}
