import React from 'react';
import PageTransition from '../../components/PageTransition';
import SEO from '../../components/SEO';
import Reveal from '../../components/ui/Reveal';
import { A, Callout, Faq, H2, H3, LI, P, PostShell, UL } from '../../components/ui/PostKit';

const PUBLISHED = '2026-10-15';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What Generative AI Is Actually Good At in Web Development',
  description:
    'Where generative AI saves real time in web development and where it quietly costs you a week: a practical split from building and shipping products with it.',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: 'en-IN',
  mainEntityOfPage: 'https://akshay.website/blog/generative-ai-in-web-development',
  author: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
  publisher: { '@type': 'Person', name: 'Akshay Mahajan' },
  about: ['generative AI', 'web development', 'AI coding assistants', 'developer workflow'],
};

const FAQS = [
  {
    q: 'Can generative AI build a whole website for me?',
    a: 'It can produce a convincing first version fast, especially for standard layouts. What it cannot do alone is decide what the site is for, check that it works on a slow phone, secure the forms or notice what is missing. A person has to own those decisions.',
  },
  {
    q: 'Does AI-assisted development make websites cheaper?',
    a: 'It shortens the repetitive parts: boilerplate, tests, conversions and first drafts. That time can go into design, content and testing, which is where results come from. Do not expect a good site to cost nothing; expect the same effort to buy more.',
  },
  {
    q: 'What should I check in AI-written code before I trust it?',
    a: 'Run it, read it and test it. Look especially at authentication, input handling, anything touching money or personal data, and every library call, since models sometimes invent functions that do not exist. Treat generated code like code from a fast new colleague: useful and needing review.',
  },
];

const GenAiWebDevelopment: React.FC = () => (
  <PageTransition>
    {/* FAQPage markup is emitted at build time from FAQS above by scripts/prerender.mjs. */}
    <SEO
      title="What Generative AI Is Actually Good At in Web Development"
      description="Where generative AI saves real time in web development and where it quietly costs you a week: a practical split for anyone building or buying a website."
      canonical="https://akshay.website/blog/generative-ai-in-web-development"
      schema={schema}
    />

    <PostShell
      eyebrow="Web development"
      title="The parts of web development generative AI is genuinely good at"
      meta="15 Oct 2026 · ~7 min · a working split"
      lead="Generative AI changed how I build websites, and it did not change which decisions matter. It is very good at some jobs, mediocre at others, and confidently wrong at a few. Knowing which is which is most of the skill."
    >
      <Reveal>
        <P>
          This is written from the side of someone who ships products this way, and for the side of
          someone commissioning a site, because the split explains what you are paying for. For the
          bigger picture of how I work, see <A to="/about">the about page</A>.
        </P>

        <H2>Where it saves real time</H2>
        <UL>
          <LI title="Boilerplate and scaffolding.">
            Forms, layouts, routing, CRUD screens and API clients are well-trodden. A model writes a
            sound first draft in seconds and a person shapes it.
          </LI>
          <LI title="Conversions and refactors.">
            Moving a component from one pattern to another, renaming across files, converting plain
            JavaScript to TypeScript. Tedious for people, easy to check afterwards.
          </LI>
          <LI title="Tests.">
            Generating cases for a function you have just written, including the awkward inputs you
            would have skipped on a Friday.
          </LI>
          <LI title="Glue scripts.">
            One-off build scripts, data clean-ups, sitemap and metadata generators. Low risk, high
            payoff, and easy to verify by running them.
          </LI>
          <LI title="Copy variants and structure.">
            Several versions of a headline or an FAQ to choose from, or a first outline for a page.
            The editing is still yours.
          </LI>
          <LI title="Explaining unfamiliar code.">
            Reading a library you have not used or a bug trace you do not recognise, and suggesting
            where to look.
          </LI>
        </UL>

        <H2>Where it quietly costs you a week</H2>
        <UL>
          <LI title="Architecture.">
            A model will happily build what you ask for, in a shape that is hard to change later. Deciding
            what the system is made of and where the data lives is still a human job, and the expensive
            one to get wrong.
          </LI>
          <LI title="Security and authentication.">
            Code that looks right and has a hole in it is the worst kind. Login, permissions, file
            uploads and anything handling personal data deserve a slow, careful read.
          </LI>
          <LI title="Subtle state and timing bugs.">
            The bug appears only after a particular sequence of clicks. Models patch symptoms; finding
            the cause takes a person with a debugger.
          </LI>
          <LI title="Accessibility and real devices.">
            A page can pass the eye test and fail a keyboard user or a three-year-old phone. Test on
            real hardware and with real input methods.
          </LI>
          <LI title="Invented APIs.">
            Models sometimes call a function that does not exist, with total confidence. If an unfamiliar
            call looks too convenient, check the documentation.
          </LI>
        </UL>

        <Callout title="The rule I work by">
          Use AI to go faster on work I can verify in a minute, and slow down on anything I cannot check
          by running it. Speed on the second kind is how the week disappears.
        </Callout>

        <H2>How it changes the way a project runs</H2>
        <H3>The first version arrives sooner</H3>
        <P>
          A clickable draft in days rather than weeks changes the conversation. You react to something
          real, so the feedback is better and the surprises come early. This is a large part of why a
          typical project here takes two to four weeks from idea to launch.
        </P>
        <H3>Time moves to the parts that decide results</H3>
        <P>
          The hours saved on boilerplate go into content, performance, search visibility and testing on
          slow connections, because those are what bring in visitors and enquiries. A site that loads
          fast and says something clear beats one that merely exists.
        </P>
        <H3>You still need a person who will say no</H3>
        <P>
          The model agrees with you. A good developer does not. Someone has to tell you the feature is
          not worth it, the page is too slow or the plan will not scale, and no tool does that on its
          own.
        </P>

        <H2>If you are hiring someone</H2>
        <UL>
          <LI>Ask which parts they use AI for and which they write and review by hand.</LI>
          <LI>Ask how they test, and on what devices.</LI>
          <LI>Ask who owns the code, the hosting and the logins at handover.</LI>
          <LI>Be wary of anyone who says AI makes the work free or instant.</LI>
        </UL>
        <P>
          Prices for different kinds of project are on <A to="/pricing">the pricing page</A>, and a quick
          way to see where a current site stands is <A to="/free-website-audit">the free website audit</A>.
        </P>
      </Reveal>

      <Reveal>
        <Faq items={FAQS} />
      </Reveal>
    </PostShell>
  </PageTransition>
);

export default GenAiWebDevelopment;
