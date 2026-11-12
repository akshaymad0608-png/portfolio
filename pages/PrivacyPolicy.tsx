import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => (
  <PageTransition>
    <SEO
      title="Privacy Policy for akshay.website | Akshay Mahajan"
      description="How akshay.website handles your data: Google Analytics, the contact form, the AI chat, the free website audit and the Instagram bot. Plain language."
      canonical="https://akshay.website/privacy"
    />

    <div className="pt-32 md:pt-40 pb-24">
      <div className="container mx-auto max-w-3xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">Legal</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text mb-3">Privacy Policy</h1>
        <p className="text-muted mb-12 text-[15px]">Last updated: 12 November 2026.</p>

        <div className="space-y-10 text-[15px] leading-relaxed text-textSecondary">
          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Overview</h2>
            <p>
              This is the personal and professional website of Akshay Mahajan, a full-stack developer
              based in Surat, Gujarat, India. This policy explains what information is collected when
              you use <strong className="text-text">akshay.website</strong>, who processes it, and
              what you can ask me to do about it. I am the person responsible for the site
              and for this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">What is collected, and why</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong className="text-text">Visit statistics.</strong> The site uses Google Analytics
                (GA4). It records page views, approximate location derived from your IP address, device
                and browser type and the page you came from, to show which pages are useful. It does not
                record the text you type into a form or into the chat.
              </li>
              <li>
                <strong className="text-text">Contact form and newsletter.</strong> If you send the
                contact form, the details you enter (name, email, optional WhatsApp number, budget range
                and your message) are sent through Formspree, a form-handling service, which forwards
                them to my email inbox. The newsletter box sends your email address the same way. I use
                these details only to reply to you or, for the newsletter, to send the updates you asked for.
              </li>
              <li>
                <strong className="text-text">AI chat assistant.</strong> Messages you type into the chat
                widget are sent to this site&apos;s server function and on to Google&apos;s Gemini API, which
                generates the reply. This site does not keep a database of chats. Google handles the
                text under its own terms, so please do not put passwords, payment details or other
                sensitive information into the chat.
              </li>
              <li>
                <strong className="text-text">Free website audit.</strong> The web address you enter is
                sent to a server function that fetches that public page (plus its robots.txt and
                sitemap) and resolves the address using public DNS services (Cloudflare and Google). The
                address and the result are not stored.
              </li>
              <li>
                <strong className="text-text">Instagram assistant.</strong> If you comment on or send a
                direct message to the akshay.website Instagram account, Instagram (Meta) passes that text
                to a server function, which can use Gemini to draft an automatic reply. Meta&apos;s and
                Google&apos;s policies apply to that text. This site does not keep a copy.
              </li>
              <li>
                <strong className="text-text">Hosting records.</strong> The site is hosted on Vercel, which
                keeps standard server logs (IP address, browser and the page requested) for security and
                reliability.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Cookies and browser storage</h2>
            <p>
              Google Analytics sets cookies to tell visits apart and count them. The site itself sets no
              cookies of its own; it uses one short-lived browser storage entry (session storage) to
              remember that you dismissed the chat tip during a visit. There is no advertising on this
              site and no data is sold.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Other services you may reach from the site</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Google Analytics and Google Gemini: usage statistics and chat replies.</li>
              <li>Formspree: delivers contact-form and newsletter submissions to me.</li>
              <li>Vercel: hosting and server functions.</li>
              <li>GitHub: the Work page asks GitHub and a public contribution-graph service for activity numbers, so your browser connects to them directly when that section loads.</li>
              <li>Calendly, WhatsApp, LinkedIn, Instagram and YouTube: reached through links; their own privacy policies apply once you leave this site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">How long I keep things</h2>
            <p>
              Emails from the contact form and newsletter box are kept in my inbox for as long as I need
              them to answer you and keep a record of our conversation, and I delete them on request.
              Analytics data is kept for the period set in my Google Analytics account. The chat, audit
              and Instagram functions do not store your messages on this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Your choices and rights</h2>
            <p>
              You can ask me what personal data I hold about you, ask me to correct or delete it, or
              withdraw consent (for example, to unsubscribe from the newsletter) by emailing the address
              below; I will respond within a reasonable time. I handle personal data in line with
              applicable law, including India&apos;s Digital Personal Data Protection Act, 2023, and if you
              are in the EU or UK you have the rights set out in the GDPR. You can also block analytics
              with a browser setting or extension, or use Google&apos;s{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wire underline underline-offset-4"
              >
                Analytics opt-out add-on
              </a>
              . For data handled by Google services, see{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wire underline underline-offset-4"
              >
                Google&apos;s privacy policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Children</h2>
            <p>
              This site is for businesses and professionals and is not directed at children under 18.
              Please do not send me personal data about a child.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Changes to this policy</h2>
            <p>
              If the site starts collecting something new, I will update this page and its date at the top.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Contact</h2>
            <p>
              Questions about this policy or a request about your data?{' '}
              <a href="/contact" className="text-wire underline underline-offset-4">Use the contact form</a> or
              email{' '}
              <a href="mailto:akshaymad0608@gmail.com" className="text-wire underline underline-offset-4">
                akshaymad0608@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default PrivacyPolicy;
