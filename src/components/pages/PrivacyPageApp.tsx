// Privacy Policy page island — Nav + PrivacyPage + Footer.
import {
  useEngagementTracking,
  useScrollDepthTracking,
} from "../../lib/analytics"
import { Footer } from "../sections/footer"
import { TopNav } from "../sections/nav"
import { PrivacyPage } from "./privacy-page"

export const PrivacyPageApp = () => {
  useEngagementTracking()
  useScrollDepthTracking()
  return (
    <>
      <TopNav isLandingPage={false} />
      <PrivacyPage />
      <Footer />
    </>
  )
}
