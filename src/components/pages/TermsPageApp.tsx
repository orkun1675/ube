// Terms of Service page island — TermsPage body + side-effects.
//
// Footer moved out of this island in spec 0003 (it's rendered by
// BaseLayout.astro on every route). Nav followed in spec 0005 (also in
// BaseLayout, as static `.astro` markup). Engagement + scroll-depth
// tracking still need a client hook so they live here.
import {
  useEngagementTracking,
  useScrollDepthTracking,
} from "../../lib/analytics"
import { TermsPage } from "./terms-page"

export const TermsPageApp = () => {
  useEngagementTracking()
  useScrollDepthTracking()
  return <TermsPage />
}
