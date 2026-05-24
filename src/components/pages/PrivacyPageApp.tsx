// Privacy Policy page island — Nav + PrivacyPage.
//
// Footer moved out of this island in spec 0003 (it's rendered by
// BaseLayout.astro on every route). HowItWorks / FAQ-style heavy islands
// don't appear here, so this island still hosts the whole visible tree.
import {
  useEngagementTracking,
  useScrollDepthTracking,
} from "../../lib/analytics"
import { TopNav } from "../sections/nav"
import { PrivacyPage } from "./privacy-page"

export const PrivacyPageApp = () => {
  useEngagementTracking()
  useScrollDepthTracking()
  return (
    <>
      <TopNav isLandingPage={false} />
      <PrivacyPage />
    </>
  )
}
