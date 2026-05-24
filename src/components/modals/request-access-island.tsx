// Thin wrapper that subscribes the RequestAccessModal to the shared
// nano store. Mounted once globally by BaseLayout.astro (ADR 0002) so
// every page — landing, terms, privacy — can open the modal via any
// CTA island that imports `openRequestAccess`.
import { useStore } from "@nanostores/react"

import {
  closeRequestAccess,
  isRequestAccessOpen,
} from "../../stores/request-access"
import { RequestAccessModal } from "./request-access-modal"

export const RequestAccessIsland = () => {
  const open = useStore(isRequestAccessOpen)
  return <RequestAccessModal open={open} onClose={closeRequestAccess} />
}
