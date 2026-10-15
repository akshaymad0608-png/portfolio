import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import { A, Callout, Faq, H2, LandingShell, LI, P, UL } from '../components/ui/PostKit';
import { PACKAGES } from '../lib/pricing';

const SITE = PACKAGES[0];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Website development in Surat',
  serviceType: 'Website design and development',
  description:
    'Fast, mobile-first business websites for Surat companies, with SEO structure, a WhatsApp button and Google Business Profile guidance.',
  provider: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
  areaServed: [
    { '@type': 'City', name: 'Surat' },
    { '@type': 'AdministrativeArea', name: 'Gujarat' },
  ],
  url: 'https://akshay.website/website-developer-surat',
};

const FAQS = [
  {
    q: 'Do you work only with businesses in Surat?',
    a: 'No. I am based in Surat and meet local clients in person when it helps, but I also work with businesses elsewhere in India and abroad over video calls and WhatsApp. Everything is quoted in writing before work starts.',
  },
  {
    q: 'Can the website be in Gujarati or Hindi as well as English?',
    a: 'Yes. I work in English, Hindi and Gujarati. For translated pages I recommend having a native speaker from your team read the final text, so it sounds like your business and not like a machine translation.',
  },
  {
    q: 'Will my website show up on Google Maps and local searches?',
    a: 'A website helps, but map visibility mostly comes from a complete Google Business Profile, consistent business details, reviews and a fast site. I set up the website side and walk you through the profile side. Nobody can honestly promise a ranking.',
  },
  {
    q: 'Who owns the website and the domain after it is finished?',
    a: 'You own the finished website and its content. The domain and hosting are bought on your own accounts, so you pay those providers directly, and I hand over the logins at the end.',
  },
];

const WebsiteDeveloperSurat: React.FC = () => (
  <PageTransition>
    {/* FAQPage markup is emitted at build time from FAQS above by scripts/prerender.mjs. */}
    <SEO
      title="Website Developer in Surat: Fast, Search-Ready Sites"
      description="I'm a Surat-based web developer building fast, mobile-first business websites with SEO, a WhatsApp button and Google Business guidance. Fixed written quote."
      canonical="https://akshay.website/website-developer-surat"
      schema={schema}
    />

    <LandingShell
      eyebrow="Surat · Gujarat"
      title="A website developer in Surat who answers on WhatsApp."
      lead="Fast, mobile-first business websites built to be found on Google and to turn a visit into a call. One person from first call to launch, on Indian time, in English, Hindi or Gujarati."
      whatsappText="Hi Akshay, I'm in Surat and I'd like a website for my business"
    >
      <Reveal>
        <H2>Who I build for</H2>
        <P>
          Local businesses that need a website that works, not a brochure that sits there. Shops and
          showrooms, clinics and coaching classes, manufacturers and traders, restaurants, and service
          businesses of every kind. Surat has a lot of them, and most are competing on Google Maps and
          WhatsApp long before they compete on a homepage.
        </P>

        <H2>What your website includes</H2>
        <UL>
          {SITE.features.map((f) => (
            <LI key={f}>{f}</LI>
          ))}
          <LI>A WhatsApp button and tap-to-call on every page, so a visitor can reach you in one touch.</LI>
          <LI>Guidance on setting up your Google Business Profile so the site and the listing agree.</LI>
          <LI>Gujarati or Hindi versions of the key pages if your customers search in those languages.</LI>
        </UL>
        <P>
          {SITE.excludes} Typical delivery is {SITE.delivery.toLowerCase()} from a confirmed brief, and the
          price starts {SITE.priceINR}. The full list of options is on <A to="/pricing">the pricing page</A>.
        </P>

        <Callout title="Honest about the examples">
          The five live products on <A to="/work">my case studies page</A> are things I built and run
          myself, not Surat client sites. If you want to see how I work, open them and try them. If you
          want a local reference, ask and I will tell you what I can share.
        </Callout>
      </Reveal>

      <Reveal>
        <H2>How a project runs</H2>
        <UL>
          <LI title="1. A 20-minute call.">You tell me what the business does, who the customers are and what a good enquiry looks like.</LI>
          <LI title="2. A fixed written quote.">The scope, the price and the timeline, before anything is built. If the scope changes, I quote the change separately.</LI>
          <LI title="3. Build, review and launch.">You see a working version early, tell me what to change, and the site goes live on your own domain.</LI>
          <LI title="4. Handover.">Logins, a short walkthrough and a note on how to update the text yourself.</LI>
        </UL>

        <H2>Why a developer in the same city helps</H2>
        <P>
          Same time zone, same language, and the option to sit down together when a decision is easier in
          person. I know how local customers actually find and contact a business here: Google Maps,
          WhatsApp, a phone call, a recommendation. The site is built around that, not around a template
          designed for another market. For a practical list of what matters for local search, read{' '}
          <A to="/blog/website-for-surat-business-local-seo">the Surat local SEO checklist</A>.
        </P>

        <H2>Not sure what your current site is missing?</H2>
        <P>
          Run <A to="/free-website-audit">the free website audit</A> on your address and you get a plain
          report on speed, search basics and whether visitors can easily contact you. It costs nothing,
          and you can use the findings with me or with anyone else.
        </P>
      </Reveal>

      <Reveal>
        <Faq items={FAQS} />
      </Reveal>
    </LandingShell>
  </PageTransition>
);

export default WebsiteDeveloperSurat;
