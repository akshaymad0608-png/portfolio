import React from 'react';
import PageTransition from '../../components/PageTransition';
import SEO from '../../components/SEO';
import Reveal from '../../components/ui/Reveal';
import { A, Callout, Code, Faq, H2, LI, P, PostShell, UL } from '../../components/ui/PostKit';

const PUBLISHED = '2026-10-15';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'A Website for a Surat Business: A Local SEO Checklist',
  description:
    'A practical local SEO checklist for a Surat business website: Google Business Profile, consistent details, reviews, WhatsApp, mobile speed and Gujarati content.',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: 'en-IN',
  mainEntityOfPage: 'https://akshay.website/blog/website-for-surat-business-local-seo',
  author: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
  publisher: { '@type': 'Person', name: 'Akshay Mahajan' },
  about: ['local SEO', 'Surat', 'Google Business Profile', 'small business website', 'WhatsApp'],
};

const FAQS = [
  {
    q: 'Do I need a website if I already have a Google Business Profile?',
    a: 'A profile gets you into the map results, but it is a listing, not a place you control. A simple website gives you somewhere to explain your services, show work, answer questions and turn a visit into a call or WhatsApp message. The two work best together.',
  },
  {
    q: 'How long does local SEO take to show results?',
    a: 'Fixing a missing or inconsistent profile can change your map visibility within weeks. Competing for broader searches takes months, and nobody can honestly promise a ranking. Track calls, direction requests and WhatsApp enquiries rather than a single position.',
  },
  {
    q: 'Should my website be in Gujarati, Hindi or English?',
    a: 'Use the language your customers search in. Many Surat businesses do well with English for the main pages and a Gujarati or Hindi version of the key pages: what you do, where you are and how to contact you. Do not machine-translate the whole site without a native speaker reading it.',
  },
];

const SuratWebsiteChecklist: React.FC = () => (
  <PageTransition>
    {/* FAQPage markup is emitted at build time from FAQS above by scripts/prerender.mjs. */}
    <SEO
      title="Website for a Surat Business: A Local SEO Checklist"
      description="A local SEO checklist for a Surat business website: Google Business Profile, consistent details, reviews, a WhatsApp button, mobile speed and Gujarati pages."
      canonical="https://akshay.website/blog/website-for-surat-business-local-seo"
      schema={schema}
    />

    <PostShell
      eyebrow="Local SEO"
      title="A website for a Surat business: the local SEO checklist"
      meta="15 Oct 2026 · ~7 min · a checklist to copy"
      lead="When someone in Surat searches for what you sell, they are usually on a phone, close by and ready to call. Most of what decides whether they find you is a short list of unglamorous basics. Here is the list, in the order I would do it."
    >
      <Reveal>
        <P>
          I am based in Surat, and the businesses I talk to here share the same pattern: a good shop or
          service, a half-finished online presence and no idea which part is costing them enquiries. None
          of this needs a large budget. It needs the basics done properly and kept consistent.
        </P>

        <H2>1. Claim and complete your Google Business Profile</H2>
        <P>
          This is the highest-return item, and it is free. Claim your listing, pick the most accurate
          main category (and a few secondary ones), and fill in everything: opening hours, phone number,
          website, services, the areas you serve and a short, honest description. Add real photos of the
          premises, the team and the work. Keep the hours right, including holidays; a wrong closing time
          is the fastest way to lose a customer's trust.
        </P>

        <H2>2. Keep your name, address and phone identical everywhere</H2>
        <P>
          Write your business name, address and phone number exactly the same on your website, your
          profile and every directory you appear in, such as Justdial or IndiaMART if they apply to you.
          Inconsistent details confuse both people and search engines. Use the area people actually search
          by, such as Adajan, Vesu, Varachha or Piplod, in addition to the city.
        </P>

        <H2>3. Ask for reviews and answer all of them</H2>
        <P>
          After a job goes well, send the customer a direct link to your review page with a message of
          thanks. Reply to every review, the good ones briefly and the bad ones calmly, with what you will
          do about it. Never buy or fake reviews; they are against the rules and customers can tell.
        </P>

        <H2>4. Make the website fast on a phone</H2>
        <P>
          Test your site on a mid-range phone on mobile data, not on your laptop over office Wi-Fi.
          Compress images, avoid autoplay video and heavy sliders, and keep the first screen light. A page
          that takes too long to appear loses the visitor before your offer is read.
        </P>

        <H2>5. Put a WhatsApp button where the thumb is</H2>
        <P>
          In India, WhatsApp is often the preferred way to ask a question. Add a "Chat on WhatsApp" button
          that opens a message with your number and a prefilled line, and put a tap-to-call button next
          to it. A link in this form works on every phone:
        </P>
        <Code>{`https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20saw%20your%20website`}</Code>
        <P>
          Replace the number with yours, in international format without spaces or a plus sign. Reply fast
          and you convert more of the people who bother to write.
        </P>

        <H2>6. Give each service its own page</H2>
        <P>
          One page that tries to cover everything ranks for little. A separate page for each service,
          each with a clear heading, a plain explanation, the area you serve, a few photos of real work
          and a question or two answered, gives search engines and visitors something specific. Do not
          copy the same text across pages with only the area name changed; write each one for the reader.
        </P>

        <H2>7. Add local business markup</H2>
        <P>
          Structured data tells search engines your business details in a form they can read. A minimal
          LocalBusiness block on your contact page, matching what is on the page and on your profile,
          looks like this:
        </P>
        <Code>{`{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Business Name",
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your street, area",
    "addressLocality": "Surat",
    "addressRegion": "Gujarat",
    "postalCode": "395XXX",
    "addressCountry": "IN"
  },
  "url": "https://yourbusiness.example"
}`}</Code>

        <H2>8. Write for the people who search in Gujarati and Hindi</H2>
        <P>
          Many customers search in Gujarati or Hindi, or mix them with English. Have a native speaker
          write the key pages in the language your customers use: what you do, where you are, how to
          reach you. It is better to have three excellent translated pages than a whole site that reads
          like a machine wrote it.
        </P>

        <Callout title="What to measure">
          Track phone calls, WhatsApp messages and direction requests from your profile, and the number
          of enquiries that mention the website. Rankings move around; enquiries pay the bills.
        </Callout>

        <H2>A one-page checklist</H2>
        <UL>
          <LI>Google Business Profile claimed, complete, with real photos and correct hours.</LI>
          <LI>Name, address and phone identical on the site, the profile and every directory.</LI>
          <LI>A steady habit of asking for reviews and replying to all of them.</LI>
          <LI>A site that loads quickly on a mid-range phone.</LI>
          <LI>WhatsApp and tap-to-call buttons near the top of every page.</LI>
          <LI>One page per service, written for the reader.</LI>
          <LI>LocalBusiness markup that matches the visible details.</LI>
          <LI>Key pages in Gujarati or Hindi where your customers need them.</LI>
        </UL>
        <P>
          Want to know where your current site stands on this list? Run{' '}
          <A to="/free-website-audit">the free website audit</A>, look at{' '}
          <A to="/services">the services I offer</A>, or <A to="/contact">tell me about your business</A>.
        </P>
      </Reveal>

      <Reveal>
        <Faq items={FAQS} />
      </Reveal>
    </PostShell>
  </PageTransition>
);

export default SuratWebsiteChecklist;
