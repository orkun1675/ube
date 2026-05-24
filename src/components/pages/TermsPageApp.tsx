// Terms of Service page island — Nav + TermsPage + Footer.
import {
  useEngagementTracking,
  useScrollDepthTracking,
} from "../../lib/analytics"
import { Footer } from "../sections/footer"
import { TopNav } from "../sections/nav"
import { TermsPage } from "./terms-page"

export const TermsPageApp = () => {
  useEngagementTracking()
  useScrollDepthTracking()
  return (
    <>
      <TopNav isLandingPage={false} />
      <TermsPage />
      <Footer />
    </>
  )
}
