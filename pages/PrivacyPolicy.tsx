import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => (
  <PageTransition>
    <SEO
      title="Privacy Policy for akshay.website | Akshay Mahajan"
      description="Learn how akshay.website handles your data. Covers Google Analytics and contact form submissions. Plain language, no legalese."
      canonical="https://akshay.website/privacy"
    />

    <main className="pt-32 md:pt-40 pb-24">
      <div className="container mx-auto max-w-3xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">Legal</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text mb-3">Privacy Policy</h1>
        <p className="text-muted mb-12 text-[15px]">Last updated: 27 September 2026.</p>

        <div className="space-y-10 text-[15px] leading-relaxed text-textSecondary">
          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Overview</h2>
            <p>
              This is a personal portfolio website for Akshay Mahajan, a full-stack developer based
              in Surat, Gujarat, India. This policy explains what information is collected when you
              visit <strong className="text-text">akshay.website</strong> and how it is used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Information collected</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-text">Analytics data.</strong> This site uses Google
                Analytics to understand how visitors find and use the site. Analytics records page
                views, approximate location (from IP address), device type and referring source. It
                does not record your name, email or the content of any form you fill in.
              </li>
              <li>
                <strong className="text-text">Contact form.</strong> If you submit the contact
                form, the data you enter (name, email, message) is sent directly to
                akshaymad0608@gmail.com via your email client. This website does not store your
                message on a server.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Cookies</h2>
            <p>
              Google Analytics sets cookies. These are standard third-party
              cookies used for usage statistics. This site shows no advertising. No first-party cookies are set
              by this website itself.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Third-party services</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Google Analytics — usage statistics</li>
              <li>Calendly — booking calls (linked from the site; Calendly's own privacy policy applies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Your rights</h2>
            <p>
              You can block analytics and ads using any standard browser extension. If you have
              questions about data collected via Google services, see{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wire hover:underline"
              >
                Google's privacy policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Contact</h2>
            <p>
              Questions about this policy?{' '}
              <a href="/contact" className="text-wire hover:underline">Use the contact form</a> or
              email{' '}
              <a href="mailto:akshaymad0608@gmail.com" className="text-wire hover:underline">
                akshaymad0608@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  </PageTransition>
);

export default PrivacyPolicy;
