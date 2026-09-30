import React from 'react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import AuditTool from '../components/AuditTool';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';
import manifest from '../site.routes.json';

const AREAS = [
  {
    title: 'Turning visitors into enquiries',
    body: 'Is there a form, a phone or WhatsApp link, a clear next step, a chat assistant, and any way to see what visitors do? Weighted highest, because this is where sites lose money.',
  },
  {
    title: 'Search visibility',
    body: 'Title, description, headings, canonical link, link previews, robots.txt and sitemap, and whether the page is allowed into Google at all.',
  },
  {
    title: 'Speed',
    body: 'How fast your server sent the page, and how heavy the page itself is.',
  },
  {
    title: 'Mobile and accessibility',
    body: 'Whether phones get a proper layout, and whether images have descriptions.',
  },
  {
    title: 'Security',
    body: 'HTTPS, HSTS and the basic security headers.',
  },
];

const FreeWebsiteAudit: React.FC = () => {
  const faq = manifest.routes.find((r) => r.path === '/free-website-audit')?.pageFaq ?? [];

  return (
    <PageTransition>
      <SEO />
      <PageHero
        eyebrow="Free tool"
        title="Is your website winning you clients?"
        lead="Paste your address. In about ten seconds you get a score out of 100 and the three fixes that matter most, each with the evidence behind it. No sign-up, and no vague opinions."
      />
      <AuditTool />

      <section className="border-y border-border bg-section py-24 md:py-32">
        <div className="container mx-auto max-w-shell px-6">
          <SectionHeading
            eyebrow="What it checks"
            title="A score you can add up yourself"
            lead="Every point comes from a visible check on your page. Nothing is guessed, and an AI never grades your site. If part of a page cannot be measured, it is left out of the score instead of counted against you."
            className="mb-14"
          />
          <ol className="grid gap-4 md:grid-cols-2">
            {AREAS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.04}>
                <li className="panel h-full p-7">
                  <span className="font-mono text-[12px] text-wire">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tightest text-text">{a.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-textSecondary">{a.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {faq.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="container mx-auto max-w-shell px-6">
            <SectionHeading eyebrow="Questions" title="About the audit" className="mb-12" />
            <dl className="grid max-w-3xl gap-8">
              {faq.map((item) => (
                <div key={item.q}>
                  <dt className="font-display text-lg font-bold text-text">{item.q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-textSecondary">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <FinalCTA />
    </PageTransition>
  );
};

export default FreeWebsiteAudit;
