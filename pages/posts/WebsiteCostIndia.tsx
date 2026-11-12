import React from 'react';
import PageTransition from '../../components/PageTransition';
import SEO from '../../components/SEO';
import Reveal from '../../components/ui/Reveal';
import { A, Callout, Faq, H2, LI, P, PostShell, UL } from '../../components/ui/PostKit';

const PUBLISHED = '2026-11-12';

/* Read by scripts/prerender.mjs and emitted as static JSON-LD (see readPostSchema); not passed to <SEO>, so there is one copy. */
const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Much Does a Website Cost in India? (2026 Guide)',
  description:
    'What a small business website costs in India in 2026: what drives the price, my own starting prices, the costs after launch and how to compare quotes.',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: 'en-IN',
  mainEntityOfPage: 'https://akshay.website/blog/website-cost-india-small-business',
  author: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
  publisher: { '@type': 'Person', name: 'Akshay Mahajan' },
  about: ['website cost India', 'small business website', 'web development pricing', 'website quote'],
};

const FAQS = [
  {
    q: 'Can I get a website for under ₹10,000?',
    a: "You can, with a template or website-builder plan if you do the writing, photos and setup yourself. What you save in money you spend in time, and the result tends to look like every other site built on the same template. If you hire someone at that price, ask exactly what is included, who owns the domain and hosting, and what happens when something breaks.",
  },
  {
    q: 'Do I pay for the website once, or every year?',
    a: 'Usually both. The build is a one-off cost. The domain name is renewed every year, hosting is billed monthly or yearly (it can be free or very cheap for a simple site), and you may want a maintenance plan for updates. Ask for all three to be listed separately in the quote.',
  },
  {
    q: 'Who should own the domain and hosting account?',
    a: 'You. Register the domain and the hosting under your own name and email and give the developer access. If the developer holds them, you can lose your site, your email and your search history if you ever part ways.',
  },
];

const WebsiteCostIndia: React.FC = () => (
  <PageTransition>
    {/* FAQPage markup is emitted at build time from FAQS above by scripts/prerender.mjs. */}
    <SEO
      title="How Much Does a Website Cost in India? (2026 Guide)"
      description="What a small business website costs in India in 2026: what drives the price, my own starting prices, the costs after launch and how to compare quotes."
      canonical="https://akshay.website/blog/website-cost-india-small-business"
    />

    <PostShell
      path="/blog/website-cost-india-small-business"
      eyebrow="Pricing"
      title="How much does a website cost in India? A plain price guide"
      meta="12 Nov 2026 · ~7 min · a price guide"
      lead="Quotes for the same website can differ by ten times, and both can be honest. The difference is almost always in what is included. This guide explains what drives the price, what I charge as one example, and how to compare quotes without getting lost."
    >
      <Reveal>
        <P>
          I build websites in Surat, and the first question almost every business asks is how much it
          costs. I cannot give you a market-wide price list I could defend, because there is not one.
          What I can do is show you what changes the number, put my own starting prices on the table as
          a worked example, and give you a way to check any quote you receive.
        </P>
        <H2>The short answer</H2>
        <P>
          A simple business website (a handful of pages, a contact form, built to be found on Google)
          is a small project. A site with bookings, payments, logins or an AI chatbot is a bigger one,
          and a custom product is bigger still. The price follows the amount of work and the amount of
          risk, not the number of pages alone.
        </P>
        <H2>My own starting prices, as one example</H2>
        <P>
          These are the starting points on my <A to="/pricing">pricing page</A>. Every project gets a
          fixed written quote after a short call, so the real number depends on your scope.
        </P>
        <UL>
          <LI title="Website development, from about ₹25,000 ($275).">
            Up to six pages, designed and built, readable on a phone, with SEO basics and a contact
            form. Usually one to two weeks.
          </LI>
          <LI title="AI agent or chatbot, from about ₹80,000 ($900).">
            For work that needs judgement, such as answering questions from your own documents. Usually
            three to four weeks. Model usage is billed to your own account, so you see every cost.
          </LI>
          <LI title="Full product build, from about ₹1,60,000 ($1,800).">
            When the thing you need does not exist yet: a custom front end, back end, database and
            login. Usually four to eight weeks.
          </LI>
        </UL>
        <P>
          Copywriting, photography, and the domain and hosting bills are not part of the website tier;
          they are yours. That is normal, and it is the first place a cheap-looking quote hides extra
          cost.
        </P>
        <H2>What actually changes the price</H2>
        <UL>
          <LI title="Number and type of pages.">
            Six clear pages are cheaper than sixty, and a page with a calculator or a booking form takes
            longer than a text page.
          </LI>
          <LI title="Design: template or custom.">
            Adapting a template is faster. Designing around your brand and your customers takes more
            hours.
          </LI>
          <LI title="Features.">
            Online payments, user accounts, booking, a WhatsApp or CRM connection and an AI assistant
            each add work, testing and ongoing responsibility.
          </LI>
          <LI title="Content.">
            Who writes the words and takes the photos? If the developer does, it costs more. If you do,
            it costs time and often delays the project.
          </LI>
          <LI title="Search visibility.">
            Clean page structure and metadata come with a good build. Ongoing SEO work is a separate,
            continuing service.
          </LI>
          <LI title="Deadline and revisions.">
            A short deadline or many rounds of changes raises the cost, so agree the number of revision
            rounds up front.
          </LI>
        </UL>
        <H2>The costs after launch</H2>
        <P>
          A website is not a one-time purchase. Plan for these, and ask for each to be listed in the
          quote:
        </P>
        <UL>
          <LI title="Domain name.">Renewed every year; check the registrar's current price.</LI>
          <LI title="Hosting.">
            A simple site can be hosted free or for very little. A larger site or one with a database
            costs more.
          </LI>
          <LI title="Business email.">An address at your own domain is billed per mailbox.</LI>
          <LI title="Updates and fixes.">
            I include 30 days of bug fixes with every project; after that, ongoing changes are either
            paid per job or covered by a monthly plan.
          </LI>
        </UL>
        <Callout title="Ask for three separate lines">
          Build, yearly running costs (domain and hosting) and monthly care. A quote that shows only
          one number is hiding at least two of them.
        </Callout>
        <H2>How to compare quotes</H2>
        <UL>
          <LI>Is the scope written down: the pages, the features, what is not included?</LI>
          <LI>Do you own the domain, the hosting account and the final files?</LI>
          <LI>How many revision rounds are included, and what does an extra one cost?</LI>
          <LI>What is the delivery time, and what happens if it slips?</LI>
          <LI>What is covered after launch, and for how long?</LI>
          <LI>Will you work with the person who builds it, or with an account manager?</LI>
        </UL>
        <H2>Warning signs</H2>
        <UL>
          <LI>A price far below everyone else's with no written scope.</LI>
          <LI>A promise of a guaranteed number one ranking on Google. Nobody can honestly give one.</LI>
          <LI>The developer registering your domain and hosting in their own name.</LI>
          <LI>A monthly fee for "maintenance" with no list of what it covers.</LI>
          <LI>Refusing to say what the site is built with.</LI>
        </UL>
        <P>
          If you are unsure what you need, run <A to="/free-website-audit">the free website audit</A>{' '}
          on your current site, read about <A to="/website-developer-surat">my Surat website service</A>,
          or <A to="/contact">tell me about the project</A> and I will send a fixed quote.
        </P>
      </Reveal>
      <Reveal>
        <Faq items={FAQS} />
      </Reveal>
    </PostShell>
  </PageTransition>
);

export default WebsiteCostIndia;
