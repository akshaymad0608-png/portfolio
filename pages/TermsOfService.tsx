import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const TermsOfService: React.FC = () => (
  <PageTransition>
    <SEO
      title="Terms of Service for akshay.website | Akshay Mahajan"
      description="Terms of use for akshay.website, the portfolio and freelance services site of Akshay Mahajan. Browse and use this site only as described here."
      canonical="https://akshay.website/terms"
    />

    <main className="pt-32 md:pt-40 pb-24">
      <div className="container mx-auto max-w-3xl px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">Legal</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text mb-3">Terms of Service</h1>
        <p className="text-muted mb-12 text-[15px]">Last updated: 27 September 2026.</p>

        <div className="space-y-10 text-[15px] leading-relaxed text-textSecondary">
          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Acceptance</h2>
            <p>
              By visiting <strong className="text-text">akshay.website</strong> you agree to these
              terms. If you don't agree, please don't use the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Use of the site</h2>
            <p>
              This site is a personal portfolio and professional services website. You may browse
              it for informational purposes. You may not scrape, reproduce or redistribute its
              content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Content and intellectual property</h2>
            <p>
              All text, images, code samples and other content on this site are the property of
              Akshay Mahajan unless otherwise stated. Blog posts and articles may be shared with
              attribution and a link back to the original URL.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Freelance services</h2>
            <p>
              Enquiries submitted through the contact form or Calendly booking link are not binding
              contracts. Any freelance engagement is governed by a separate written agreement signed
              by both parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Third-party links</h2>
            <p>
              This site links to external services (GitHub, LinkedIn, Calendly, etc.). These links
              are provided for convenience; Akshay Mahajan is not responsible for the content or
              privacy practices of those sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Disclaimer</h2>
            <p>
              The information on this site is provided "as is" without warranty of any kind. Blog
              posts reflect the author's opinion at the time of writing and may become outdated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Governing law</h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of the courts of Surat, Gujarat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text mb-3">Contact</h2>
            <p>
              Questions?{' '}
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

export default TermsOfService;
