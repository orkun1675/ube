// Nav client behaviors (spec 0005). Replaces the React state in the old
// `TopNav` island: scroll-class toggle, mobile-menu open/close (body-scroll
// lock + Esc dismissal), and "Request access" button click handlers that
// route into the shared nano store via `openRequestAccess('nav')`.
//
// Same `source: 'nav'` label fires whether the click originated on the
// desktop CTA or the mobile-menu CTA — matches the pre-spec analytics
// contract.
import { track } from "@/lib/analytics"
import { openRequestAccess } from "@/stores/request-access"

const nav = document.querySelector<HTMLElement>("[data-nav]")
const menu = document.querySelector<HTMLElement>("[data-nav-menu]")
const openButtons = document.querySelectorAll<HTMLButtonElement>(
  "[data-nav-menu-open]",
)
const closeButtons = document.querySelectorAll<HTMLButtonElement>(
  "[data-nav-menu-close]",
)
const ctaButtons =
  document.querySelectorAll<HTMLButtonElement>("[data-nav-cta]")
const menuLinks = document.querySelectorAll<HTMLAnchorElement>(
  "[data-nav-menu-link]",
)

// --- Scroll-class -----------------------------------------------------------
if (nav) {
  const onScroll = (): void => {
    nav.classList.toggle("scrolled", window.scrollY > 8)
  }
  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })
}

// --- Mobile menu ------------------------------------------------------------
if (menu) {
  let previousOverflow = ""

  const setOpenState = (open: boolean): void => {
    menu.hidden = !open
    for (const btn of openButtons) {
      btn.setAttribute("aria-expanded", open ? "true" : "false")
    }
  }

  const open = (): void => {
    track("mobile_menu_opened")
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    setOpenState(true)
  }

  const close = (): void => {
    document.body.style.overflow = previousOverflow
    setOpenState(false)
  }

  for (const btn of openButtons) {
    btn.addEventListener("click", open)
  }
  for (const btn of closeButtons) {
    btn.addEventListener("click", close)
  }
  // Tapping a menu link should dismiss the overlay so the navigation
  // actually feels like it happened (matches the React onClick behavior).
  for (const link of menuLinks) {
    link.addEventListener("click", close)
  }

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && !menu.hidden) close()
  })

  // If the menu CTA is clicked, close the overlay alongside opening the
  // modal (the CTA handler below opens the modal independently).
  const menuCta = document.querySelector<HTMLButtonElement>(
    "[data-nav-menu-cta]",
  )
  menuCta?.addEventListener("click", close)
}

// --- Request access ---------------------------------------------------------
for (const btn of ctaButtons) {
  btn.addEventListener("click", () => {
    openRequestAccess("nav")
  })
}
