// Ube — GTM dataLayer bridge.
//
// `track()` in analytics.ts is the single dispatch point for every event in
// the app; it forwards each call here. We translate the handful of events
// that matter to ad platforms into the *generic*, vendor-neutral dataLayer
// events the GTM container triggers on — `cta_click`, `generate_lead`,
// `engaged` — so Reddit today (and Google Ads / Meta / LinkedIn later) can
// hang tags off the same triggers without any further code changes.
//
// Gating mirrors Amplitude (see GoogleTagManager.astro): the GTM snippet is
// only injected on ube.dev / *.ube.dev / ?gtm=1, and that snippet is the
// only thing that creates `window.dataLayer`. So on localhost `dataLayer` is
// undefined and every push below is a silent no-op — no tags, no network, no
// noise — the same contract as `window.amplitude?.track`.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

type DataLayerEvent = { event: string } & Record<string, unknown>

// Guarded push. No-op unless the gated GTM snippet has created `dataLayer`,
// so dev/local builds (where GTM never loads) stay silent.
const pushDataLayer = (payload: DataLayerEvent): void => {
  window.dataLayer?.push(payload)
}

// "Engaged" must reach the ad platforms exactly once per session, whether the
// 30s active-time threshold or the 50% scroll threshold trips first.
// `engaged_30s` and `scroll_depth` each dedupe their own Amplitude event, but
// they fire independently — this flag collapses both into a single ad signal.
const ENGAGED_FLAG = "ube_gtm_engaged"
const SCROLL_ENGAGED_THRESHOLD = 50

const engagedOnce = (): DataLayerEvent | null => {
  if (sessionStorage.getItem(ENGAGED_FLAG) === "1") return null
  sessionStorage.setItem(ENGAGED_FLAG, "1")
  return { event: "engaged" }
}

// Translate an internal analytics event into the generic ad dataLayer event,
// or null if it isn't part of the ad funnel (most events aren't).
const toDataLayerEvent = (
  name: string,
  props?: Record<string, unknown>,
): DataLayerEvent | null => {
  switch (name) {
    // Every "Request access" CTA routes through openRequestAccess(), which
    // fires this with a `source` (nav, publisher_hero, …) — our cta_id.
    case "request_access_modal_opened":
      return {
        event: "cta_click",
        cta_id: String(props?.["source"] ?? "unknown"),
      }
    // Fires in the form's onSubmit, after preventDefault and before the Basin
    // POST — the immediate, valid-submission lead signal. `generate_lead` is
    // GA4's canonical lead event (and Google Ads recognizes it as a
    // conversion); `form_id` scopes it to the one signup form we have today.
    case "request_access_submitted":
      return { event: "generate_lead", form_id: "signup" }
    // Engagement: whichever of 30s-active / 50%-scroll trips first, once.
    case "engaged_30s":
      return engagedOnce()
    case "scroll_depth": {
      const percent = props?.["percent"]
      return typeof percent === "number" && percent >= SCROLL_ENGAGED_THRESHOLD
        ? engagedOnce()
        : null
    }
    default:
      return null
  }
}

// Called by `track()` for every event. Forwards the ad-relevant ones to GTM.
export const pushConversion = (
  name: string,
  props?: Record<string, unknown>,
): void => {
  const payload = toDataLayerEvent(name, props)
  if (payload) pushDataLayer(payload)
}
