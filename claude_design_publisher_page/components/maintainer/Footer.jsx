/* Footer.jsx — four-column footer. Coming-soon items get a tooltip
   under the link. Wordmark variant follows the global tweak. */

const Footer = ({ wordmarkAccent = "bracket" }) => (
  <footer className="footer" data-screen-label="Footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-col">
          <Wordmark accent={wordmarkAccent} size={24} />
          <p className="t-body-sm muted footer-tagline">
            Your app's agentic watchdog that keeps dependencies up to date and users happy.
          </p>
          <p className="t-caption muted footer-copyright">
            © 2026 Ube · Chunky Tofu Studios, LLC
          </p>
        </div>
        <div className="footer-col">
          <h3>PRODUCTS</h3>
          <ul>
            <li><a href="#how">Ube Maintainer</a></li>
            <li><a href="Ube Publisher.html">Ube Publisher</a></li>
            <li><span className="coming-soon">Pricing<span className="tooltip">Coming soon</span></span></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contact</h3>
          <ul>
            <li><a href="mailto:hello@chunkytofustudios.com"><MailIcon size={14} /> hello@chunkytofustudios.com</a></li>
            <li><a href="#"><GitHubLogo size={13} /> github.com/orkun1675/ube</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
