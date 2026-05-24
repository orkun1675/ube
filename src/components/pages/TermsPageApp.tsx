// Terms of Service page island — Nav + TermsPage.
//
// Footer moved out of this island in spec 0003 (it's rendered by
// BaseLayout.astro on every route).
import {
  useEngagementTracking,
  useScrollDepthTracking,
} from "../../lib/analytics"
import { TopNav } from "../sections/nav"
import { TermsPage } from "./terms-page"

export const TermsPageApp = () => {
  useEngagementTracking()
  useScrollDepthTracking()
  return (
    <>
      <TopNav isLandingPage={false} />
      <TermsPage />
    </>
  )
}
