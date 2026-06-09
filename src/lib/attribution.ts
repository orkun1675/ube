// Ube — Attribution capture.
//
// Ad platforms stamp each ad click with an ID in the landing URL (Google
// `gclid`, Reddit `rdt_cid`, …); UTM params tag the campaign. We capture them
// on page load and persist them in localStorage so they survive the multi-page
// hops between landing and the Request-access form, then surface them as hidden
// fields on that form — so every Basin submission carries the IDs we need to
// retarget and to run offline conversion import later (which lead came from
// which ad click), all without a backend.
//
// Scope note — why this only feeds Basin:
//   - Amplitude's Browser SDK already auto-captures *every* param below as
//     marketing attribution (the UTMs and all of these click IDs), so we
//     deliberately do NOT re-send any of it to Amplitude — that's duplicate
//     noise. See the marketing-attribution docs.
//   - The ad pixels self-capture their own click ID for *online* attribution,
//     so GTM doesn't need these either.
//   Basin, by contrast, records nothing on its own — this module exists to get
//   the IDs into the form submission.

const STORAGE_PREFIX = "ube_attr_"

// Click IDs (deterministic ad-click attribution) + UTM campaign tags. Add a
// new platform's click-ID param here as we onboard it — the hidden-field
// plumbing picks it up automatically, no other change needed.
const ATTRIBUTION_PARAMS = [
  // Click IDs
  "gclid", // Google Ads
  "gbraid", // Google Ads (iOS, app→web)
  "wbraid", // Google Ads (iOS, web)
  "rdt_cid", // Reddit Ads
  "fbclid", // Meta
  "msclkid", // Microsoft Ads
  "li_fat_id", // LinkedIn
  "ttclid", // TikTok
  // UTM campaign tags
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

// localStorage throws in some privacy modes / when storage is disabled. Guard
// both sides so a blocked store can never break page-load tracking or the form.
const safeSet = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

const safeGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

// Persist any attribution params present in the current URL. Last-touch: only
// overwrites a stored value when the param is actually in this URL, so a later
// direct/organic visit never wipes a prior ad click. Call once per page load.
export const captureAttribution = (): void => {
  const params = new URLSearchParams(window.location.search)
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key)
    if (value) safeSet(STORAGE_PREFIX + key, value)
  }
}

// Everything we've stored, keyed by param name — ready to drop onto the form
// as hidden fields. Empty object if the visitor arrived with no tags.
export const getAttribution = (): Record<string, string> => {
  const result: Record<string, string> = {}
  for (const key of ATTRIBUTION_PARAMS) {
    const value = safeGet(STORAGE_PREFIX + key)
    if (value) result[key] = value
  }
  return result
}
