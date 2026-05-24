// =====================================================================
//  Privacy Policy page (/privacy-policy)
// =====================================================================
import { CONTACT_EMAIL } from "../../constants"

export const PrivacyPage = () => (
  <main className="legal-page">
    <div className="container legal-layout">
      <aside className="legal-sidebar">
        <nav className="legal-nav" aria-label="Legal pages">
          <a href="/terms-of-service">Terms of Service</a>
          <a href="/privacy-policy" className="active">
            Privacy Policy
          </a>
        </nav>
      </aside>

      <article className="legal-content">
        <h1>Privacy Policy</h1>
        <p className="legal-meta">Last updated May 24, 2026</p>

        <p>
          Chunky Tofu Studios, LLC (<strong>"Chunky Tofu Studios,"</strong>{" "}
          <strong>"we,"</strong> or <strong>"us"</strong>) is the maker of the
          Ube software platform. This Privacy Policy explains how personal data
          is collected, used, disclosed, and processed when you use our
          software, platform, APIs, documentation, and related tools, including
          the website <a href="https://ube.dev">ube.dev</a> and related software
          for maintaining, building, deploying, hosting, and managing software
          projects (the <strong>"Service"</strong>).
        </p>

        <p>
          This Privacy Policy does not apply where Chunky Tofu Studios acts as a
          data processor for commercial customers (for example,
          employer-provisioned accounts under a Master Services Agreement). In
          those cases, our use of personal data is governed by our customer
          agreements covering access to and use of those offerings.
        </p>

        <p>
          By using the Service, you acknowledge that you have read and
          understood this Privacy Policy. Capitalized terms not defined here
          have the meanings given in our{" "}
          <a href="/terms-of-service">Terms of Service</a>.
        </p>

        <h2 id="collect">1. Personal Data We Collect</h2>

        <h3>A. Personal Data You Provide Directly</h3>

        <p>
          <strong>Request Access and Waitlist Information.</strong> When you
          submit a request to access the Service through forms on{" "}
          <a href="https://ube.dev">ube.dev</a>, we collect the information you
          provide, which may include your name, email address, company or
          affiliation, role, and any product-preference signals you choose to
          share (for example, your interest in Ube Maintainer or Ube Publisher).
        </p>

        <p>
          <strong>Account Information.</strong> If and when accounts become
          available, we will collect information you provide during sign-up and
          setup, including your name, email address, and any authentication
          identifiers (for example, identifiers provided by a third-party login
          provider you choose to use).
        </p>

        <p>
          <strong>Payment Information.</strong> If you purchase a paid
          subscription, payment information will be collected and processed by
          our payment processors. We do not store complete payment-card numbers.
        </p>

        <p>
          <strong>Inputs and Suggestions.</strong> When you use the Service, we
          may process content you submit or that the Service collects on your
          behalf, including source code, repository contents, crash reports,
          user feedback, configuration data, and prompts (
          <strong>"Inputs"</strong>), and the resulting outputs such as proposed
          code changes and pull requests (<strong>"Suggestions"</strong>). If
          your Inputs include personal data — yours or someone else's — we will
          process that information as part of providing the Service.
        </p>

        <p>
          <strong>Communications.</strong> When you communicate with us (for
          example, via email or a contact form), we collect your name, contact
          information, and the content of your messages.
        </p>

        <p>
          <strong>Feedback.</strong> Ideas, suggestions for improvement,
          ratings, or bug reports you provide while using the Service may be
          stored.
        </p>

        <h3>B. Personal Data Collected Automatically</h3>

        <p>
          <strong>Device Information.</strong> Device type, browser, screen
          dimensions, operating system, language, time zone, and similar
          information automatically sent by your device when you interact with
          the Service.
        </p>

        <p>
          <strong>Log Information.</strong> IP address, browser type and
          settings, referrer, error logs, and information about your
          interactions with the Service.
        </p>

        <p>
          <strong>Usage Data.</strong> Dates and times of access, pages and
          features used, clicks, scroll depth, and similar information about how
          you interact with the Service.
        </p>

        <p>
          <strong>Cookies and Similar Technologies.</strong> We and our service
          providers use cookies, pixels, scripts, local storage, and similar
          technologies to operate the Service, remember your preferences,
          measure engagement, and analyze usage. You can generally control
          cookies through your browser settings, although some features of the
          Service may not function properly without them.
        </p>

        <p>
          <strong>Session Replay.</strong> We may record anonymized sessions of
          how visitors interact with <a href="https://ube.dev">ube.dev</a> —
          including mouse movements, clicks, and pages viewed — to understand
          which parts of the site are useful and where visitors get stuck. We do
          not record keystrokes inside form fields, and we mask personal data
          that would otherwise appear on screen.
        </p>

        <p>
          <strong>Approximate Location.</strong> We may derive approximate
          geographic location (such as country or region) from your IP address
          for security, fraud prevention, and analytics purposes.
        </p>

        <h3>C. Information We Do Not Knowingly Collect</h3>

        <p>
          We do not knowingly collect sensitive or special-category personal
          information, such as genetic data, biometric data used to uniquely
          identify a natural person, health information, precise geolocation, or
          information about a person's racial/ethnic origin, religious beliefs,
          political opinions, or sexual orientation. We do not knowingly collect
          information from or direct any of our Service to children under the
          age of 18.
        </p>

        <h2 id="use">2. How We Use Personal Data</h2>

        <p>We use personal data to:</p>

        <ul>
          <li>
            <strong>Provide the Service:</strong> operate, maintain, and improve
            the Service and its features.
          </li>
          <li>
            <strong>Measure demand:</strong> understand interest in Ube and in
            specific products (for example, Ube Maintainer vs. Ube Publisher),
            and decide what to build next.
          </li>
          <li>
            <strong>Manage accounts and access:</strong> create and administer
            accounts and access to Beta or production offerings, facilitate
            payments, and respond to inquiries.
          </li>
          <li>
            <strong>Improve and develop:</strong> debug, identify and repair
            issues, conduct internal research, and develop new features.
          </li>
          <li>
            <strong>Communicate:</strong> send transactional messages, respond
            to questions, and (with your consent where required) send updates,
            announcements, and other marketing communications.
          </li>
          <li>
            <strong>Secure the Service:</strong> prevent, detect, and
            investigate fraud, abuse, security incidents, and violations of our{" "}
            <a href="/terms-of-service">Terms of Service</a>.
          </li>
          <li>
            <strong>Comply with law:</strong> meet legal, regulatory, and
            contractual obligations, and exercise or defend legal claims.
          </li>
        </ul>

        <p>
          <strong>Model Training Limitations.</strong> We do not use Inputs or
          Suggestions to train our or any third party's machine learning models,
          unless: (1) they are flagged for security or abuse review (in which
          case we may analyze them to detect and enforce our{" "}
          <a href="/terms-of-service">Terms of Service</a>); (2) you explicitly
          report them to us (for example, as Feedback); or (3) you have
          explicitly agreed to such use.
        </p>

        <p>
          <strong>De-identification.</strong> We may aggregate or de-identify
          personal data for analytics, research, and improvement of the Service.
          Aggregated or de-identified data is not treated as personal data under
          this Privacy Policy.
        </p>

        <h2 id="share">3. How We Share Personal Data</h2>

        <p>
          <strong>Service Providers.</strong> We share personal data with
          third-party vendors and processors that support our business
          operations, including hosting and cloud infrastructure, analytics,
          session replay, email delivery, customer support, spam protection,
          payment processing, and security monitoring. These providers process
          personal data only as necessary to perform services on our behalf and
          under appropriate contractual protections.
        </p>

        <p>
          <strong>Specific Third-Party Services.</strong> The Service uses,
          among others:
        </p>

        <ul>
          <li>
            <strong>Amplitude</strong> (product analytics and session replay) —
            to measure usage of <a href="https://ube.dev">ube.dev</a> and
            understand how visitors interact with the site. See Amplitude's
            privacy disclosures at{" "}
            <a
              href="https://amplitude.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              amplitude.com/privacy
            </a>
            .
          </li>
          <li>
            <strong>Basin</strong> (form submissions) — to receive and store the
            contents of the request-access form. See Basin's privacy disclosures
            at{" "}
            <a
              href="https://usebasin.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              usebasin.com/privacy
            </a>
            .
          </li>
          <li>
            <strong>Google reCAPTCHA</strong> (spam protection) — to help
            distinguish humans from automated submissions when you submit forms.
            reCAPTCHA collects hardware and software information, such as device
            and application data, and sends it to Google for analysis. Use of
            reCAPTCHA is subject to Google's{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            .
          </li>
        </ul>

        <p>
          <strong>Business Transfers.</strong> If we are involved in a merger,
          acquisition, financing, reorganization, bankruptcy, or sale of assets,
          personal data may be transferred to the counterparty or its advisers
          as part of due diligence or as an asset of the transaction.
        </p>

        <p>
          <strong>Legal and Safety.</strong> We may disclose personal data to
          government authorities or other third parties when we believe in good
          faith that disclosure is necessary to (a) comply with applicable law,
          legal process, or government requests; (b) protect the rights,
          property, or safety of Chunky Tofu Studios, our users, or the public;
          (c) detect, prevent, or address fraud, security, or technical issues;
          or (d) enforce our agreements.
        </p>

        <p>
          <strong>Affiliates.</strong> We may share personal data with entities
          that control, are controlled by, or are under common control with us,
          for purposes consistent with this Privacy Policy.
        </p>

        <p>
          <strong>With Your Consent.</strong> We may share personal data with
          other third parties when you direct us to do so.
        </p>

        <p>
          We do not sell personal data, and we do not share personal data for
          cross-context behavioral advertising or targeted advertising purposes.
        </p>

        <h2 id="retention">4. Retention</h2>

        <p>
          We retain personal data only for as long as necessary to operate the
          Service and to support legitimate business needs such as legal
          compliance, security, dispute resolution, and enforcement of our
          agreements. Retention periods vary based on the purpose of collection,
          the sensitivity of the data, associated risks, and applicable legal
          requirements. When personal data is no longer needed, we will delete,
          erase, de-identify, or anonymize it in accordance with applicable law.
        </p>

        <h2 id="security">5. Security</h2>

        <p>
          We implement commercially reasonable technical and organizational
          measures designed to protect personal data from loss, misuse, and
          unauthorized access, disclosure, alteration, or destruction. However,
          no method of transmission over the internet or storage is completely
          secure. You are responsible for protecting your credentials and using
          the Service in a secure environment. We are not responsible for any
          circumvention of privacy settings or security features on the Service
          or on third-party services linked through the Service.
        </p>

        <h2 id="rights">6. Your Rights and Choices</h2>

        <p>
          Depending on your jurisdiction and applicable law, you may have the
          right to:
        </p>

        <ul>
          <li>
            <strong>Access</strong> the personal data we hold about you and
            receive a copy in a portable format where applicable.
          </li>
          <li>
            <strong>Correct</strong> personal data that is inaccurate or
            incomplete.
          </li>
          <li>
            <strong>Delete</strong> personal data we hold about you, subject to
            exceptions provided by law.
          </li>
          <li>
            <strong>Object to or restrict</strong> certain processing of your
            personal data, including processing based on legitimate interests.
          </li>
          <li>
            <strong>Withdraw consent</strong> where processing is based on
            consent (withdrawal does not affect prior processing).
          </li>
          <li>
            <strong>Lodge a complaint</strong> with a data protection authority
            in your jurisdiction.
          </li>
          <li>
            <strong>Not be subject</strong> to decisions based solely on
            automated processing that have legal or similarly significant
            effects on you. We do not make such decisions in connection with the
            Service.
          </li>
        </ul>

        <p>
          To exercise these rights, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may ask
          you to verify your identity before responding. We will not
          discriminate against you for exercising any privacy right available to
          you under applicable law.
        </p>

        <p>
          <strong>Marketing Choices.</strong> You can opt out of marketing
          communications by following the unsubscribe instructions in those
          messages. Opting out does not affect transactional messages.
        </p>

        <p>
          <strong>Cookies.</strong> Most browsers let you refuse or delete
          cookies. Some parts of the Service may not function properly if you
          disable cookies.
        </p>

        <h2 id="children">7. Children</h2>

        <p>
          The Service is not directed to children under 18, and we do not
          knowingly collect personal data from anyone under 18. If you believe a
          child has provided us with personal data, please contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will
          take appropriate steps to delete it.
        </p>

        <h2 id="transfers">8. International Data Transfers</h2>

        <p>
          We are based in the United States, and personal data we collect may be
          processed in the United States or in other countries where we or our
          service providers operate. These countries may have different
          data-protection laws than your country of residence. Where required by
          applicable law, we will implement appropriate safeguards (such as
          standard contractual clauses) to protect personal data transferred
          internationally.
        </p>

        <h2 id="changes">9. Changes to This Privacy Policy</h2>

        <p>
          We may update this Privacy Policy from time to time. When we make
          material changes, we will publish the updated Privacy Policy on the
          Service and update the "Last updated" date at the top of this page.
          Your continued use of the Service after a change becomes effective
          constitutes acceptance of the updated Privacy Policy.
        </p>

        <h2 id="contact">10. Contacting Us</h2>

        <p>
          If you have questions about this Privacy Policy or our privacy
          practices, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. You can also
          reach us by mail at:
        </p>

        <p>
          Chunky Tofu Studios, LLC
          <br />
          Attn: Privacy
          <br />
          New Jersey, USA
        </p>
      </article>
    </div>
  </main>
)
