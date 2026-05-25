// Ube — Request Access modal state.
//
// The modal is mounted once globally in BaseLayout.astro (ADR 0002), but its
// open-triggers live across many React islands (Nav, Hero, FinalCta) that
// don't share React context. Nano Stores bridges those islands: every CTA
// island calls `openRequestAccess(source)` and the modal island subscribes
// via `useStore(isRequestAccessOpen)`.
//
// The wrapper fires the `request_access_modal_opened` analytics event so
// call sites can never forget to track it.
import { atom } from "nanostores"

import { track } from "@/lib/analytics"

export type ModalSource = "nav" | "hero" | "final_cta"

export const isRequestAccessOpen = atom<boolean>(false)

export const openRequestAccess = (source: ModalSource): void => {
  track("request_access_modal_opened", { source })
  isRequestAccessOpen.set(true)
}

export const closeRequestAccess = (): void => {
  isRequestAccessOpen.set(false)
}
