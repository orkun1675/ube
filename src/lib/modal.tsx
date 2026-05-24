// Ube — Shared Modal shell
// Handles Escape-key close, body-scroll lock, backdrop click-to-close,
// and the inner panel with the ✕ close button.
import React from "react"

type ModalProps = {
  open: boolean
  onClose: () => void
  className?: string
  panelClassName?: string
  labelledBy?: string
  children?: React.ReactNode
}

export const Modal = ({
  open,
  onClose,
  className,
  panelClassName,
  labelledBy,
  children,
}: ModalProps) => {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const panelProps: Record<string, unknown> = {
    className: panelClassName,
    role: "dialog",
    "aria-modal": "true",
  }
  if (labelledBy) panelProps["aria-labelledby"] = labelledBy

  return (
    // biome-ignore lint/a11y/useSemanticElements: backdrop wraps and centers the modal panel; cannot be a <button> which forbids nested interactive content
    <div
      className={className}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose()
      }}
      role="button"
      tabIndex={-1}
      aria-label="Close modal"
    >
      <div {...panelProps}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
