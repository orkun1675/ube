// =====================================================================
//  Top Nav
// =====================================================================
import React from "react"
import ReactDOM from "react-dom"

import type { WordmarkAccent } from "../../data/tweak-defaults"
import { ArrowRight, PlusIcon } from "../../lib/assets"
import { openRequestAccess } from "../../stores/request-access"
import { Wordmark } from "../Wordmark"

type TopNavProps = {
  wordmarkAccent?: WordmarkAccent
  isLandingPage?: boolean
}

export const TopNav = ({
  wordmarkAccent = "cursor",
  isLandingPage = true,
}: TopNavProps) => {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while mobile menu is open + close on Esc.
  React.useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  return (
    <>
      <nav className={`topnav ${scrolled ? "scrolled" : ""}`}>
        <div
          className="container topnav-inner"
          style={{ position: "relative" }}
        >
          <a
            href={isLandingPage ? "#top" : "/"}
            style={{ textDecoration: "none" }}
          >
            <Wordmark accent={wordmarkAccent} size={30} />
          </a>

          <div className="nav-center">
            <span className="nav-link coming-soon">
              Publisher
              <span className="tooltip">Coming soon</span>
            </span>
            <a href="/maintainer" className="nav-link active">
              Maintainer
            </a>
            <span className="nav-link coming-soon">
              Pricing
              <span className="tooltip">Coming soon</span>
            </span>
          </div>

          <div className="nav-right-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => openRequestAccess("nav")}
            >
              Request access
            </button>
          </div>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen &&
        ReactDOM.createPortal(
          <div className="mobile-menu" role="dialog" aria-modal="true">
            <div className="mobile-menu-header">
              <Wordmark accent={wordmarkAccent} size={28} />
              <button
                type="button"
                className="menu-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <span
                  style={{ display: "inline-flex", transform: "rotate(45deg)" }}
                >
                  <PlusIcon size={18} />
                </span>
              </button>
            </div>
            <div className="mobile-menu-links">
              <span className="mobile-menu-link coming-soon">
                Publisher <span className="mobile-menu-tag">soon</span>
              </span>
              <a
                href="/maintainer"
                onClick={() => setMenuOpen(false)}
                className="mobile-menu-link active"
              >
                Maintainer
              </a>
              <span className="mobile-menu-link coming-soon">
                Pricing <span className="mobile-menu-tag">soon</span>
              </span>
            </div>
            <button
              type="button"
              className="btn btn-primary mobile-menu-cta"
              onClick={() => {
                setMenuOpen(false)
                openRequestAccess("nav")
              }}
            >
              Request access
              <ArrowRight size={14} />
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
