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

export type ModalSource =
  | "nav"
  | "maintainer_hero"
  | "publisher_hero"
  | "maintainer_final_cta"
  | "publisher_final_cta"
  | "pricing_maintainer"
  | "pricing_full"
  | "pricing_enterprise"
  | "pricing_final_cta"

export type ModalVariant = "default" | "enterprise"

export const isRequestAccessOpen = atom<boolean>(false)
export const requestAccessVariant = atom<ModalVariant>("default")

export const openRequestAccess = (
  source: ModalSource,
  variant: ModalVariant = "default",
): void => {
  requestAccessVariant.set(variant)
  track("request_access_modal_opened", { source, variant })
  isRequestAccessOpen.set(true)
}

export const closeRequestAccess = (): void => {
  isRequestAccessOpen.set(false)
}
