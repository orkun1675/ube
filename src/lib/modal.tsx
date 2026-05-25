// Ube — Shared Modal shell
// Native <dialog> with showModal() handles ESC and aria-modal automatically;
// we still lock body scroll (showModal() doesn't do this consistently) and
// route backdrop clicks to onClose by sizing the dialog to fill the viewport
// and detecting clicks on the dialog element itself (not the inner panel).
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
  const dialogRef = React.useRef<HTMLDialogElement>(null)

  // Show / hide the native dialog when `open` flips. On unmount while open,
  // close the dialog so the browser releases focus / top-layer state.
  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
      return () => {
        if (dialog.open) dialog.close()
      }
    }
    if (dialog.open) dialog.close()
    return
  }, [open])

  // Lock body scroll while open — <dialog>.showModal() doesn't do this
  // consistently across browsers, and we don't want background scrolling.
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Native ESC fires a `cancel` event that closes the dialog; intercept it
  // so our parent state stays in sync.
  const onCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault()
    onClose()
  }

  // Click on the dialog itself (the backdrop area) closes; clicks inside
  // the inner panel bubble up with `e.target` set to the panel or a child.
  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard close is handled natively by <dialog> via the cancel event (Escape key); onClick exists only for backdrop click-to-close
    <dialog
      ref={dialogRef}
      className={className}
      onCancel={onCancel}
      onClick={onClick}
      aria-labelledby={labelledBy}
    >
      <div className={panelClassName}>
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
    </dialog>
  )
}
