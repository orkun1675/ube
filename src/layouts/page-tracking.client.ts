// Page-tracking client (spec 0008). Replaces the `useEngagementTracking` +
// `useScrollDepthTracking` React hooks that used to live inside the per-page
// app islands (LandingPageApp / TermsPageApp / PrivacyPageApp). With those
// wrappers dissolved, there's no top-level React on terms/privacy at all —
// so the trackers run as plain functions invoked from this vanilla
// `<script>` mounted by BaseLayout.astro.
//
// Same analytics contract as before: `engaged_30s` fires once per session
// after 30s of active time, `scroll_depth` fires at 25/50/75/100%.
import {
  initEngagementTracking,
  initScrollDepthTracking,
} from "@/lib/analytics"
import { captureAttribution } from "@/lib/attribution"

// Stash any ad click IDs / UTM tags from the landing URL before the user
// navigates deeper — the Request-access form reads them back as hidden fields.
captureAttribution()
initEngagementTracking()
initScrollDepthTracking()
