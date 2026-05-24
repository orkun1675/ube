// =====================================================================
//  Footer
// =====================================================================
import { CONTACT_EMAIL, GITHUB_URL } from "../../constants"
import { GitHubLogo, LinkedInLogo, MailIcon } from "../../lib/assets"
import { Wordmark } from "./wordmark"

type FooterProps = {
  wordmarkAccent?: string
}

export const Footer = ({ wordmarkAccent }: FooterProps) => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <Wordmark accent={wordmarkAccent} size={24} />
          <p
            className="t-body-sm muted"
            style={{ marginTop: 18, maxWidth: 320, lineHeight: 1.6 }}
          >
            Your app's agentic watchdog that keeps dependencies up to date and
            users happy.
          </p>
          <p className="t-caption muted" style={{ marginTop: 24 }}>
            © 2026 Ube · Chunky Tofu Studios, LLC
          </p>
          <p
            className="t-caption muted footer-legal-links"
            style={{ marginTop: 8 }}
          >
            <a href="/terms-of-service">Terms of Service</a>
            <span aria-hidden="true"> · </span>
            <a href="/privacy-policy">Privacy Policy</a>
          </p>
        </div>
        <div className="footer-col">
          <h4>PRODUCTS</h4>
          <ul>
            <li>
              <a href="#how">Ube Maintainer</a>
            </li>
            <li>
              <span className="coming-soon">
                Ube Publisher
                <span className="tooltip">Coming soon</span>
              </span>
            </li>
            <li>
              <span className="coming-soon">
                Pricing
                <span className="tooltip">Coming soon</span>
              </span>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <MailIcon size={14} /> {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/orkun-duman/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <LinkedInLogo size={13} /> Orkun Duman
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <GitHubLogo size={13} /> github.com/orkun1675/ube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
)
