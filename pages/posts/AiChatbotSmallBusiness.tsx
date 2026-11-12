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
  headline: 'AI Chatbot for a Small Business Website: Cost and Limits',
  description:
    'What an AI chatbot can and cannot do for a small business website, what it costs to build and run, when not to build one, and how to launch it safely.',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: 'en-IN',
  mainEntityOfPage: 'https://akshay.website/blog/ai-chatbot-for-small-business-website',
  author: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
  publisher: { '@type': 'Person', name: 'Akshay Mahajan' },
  about: ['AI chatbot', 'small business website', 'chatbot cost', 'customer support automation', 'lead capture'],
};

const FAQS = [
  {
    q: 'How much does an AI chatbot for a website cost?',
    a: "There are two costs: building it and running it. My AI agent and chatbot tier starts at about ₹80,000 ($900) for the build, usually over three to four weeks. Running it costs whatever the AI model provider charges for usage, billed to your own account so you see every cost, plus your hosting. A chatbot that gets few questions costs very little to run.",
  },
  {
    q: 'Will a chatbot make things up?',
    a: "It can. Language models sometimes produce confident answers that are wrong. The way to reduce this is to give the bot only your own documents to answer from, tell it to say when it does not know, and hand the conversation to a person. You should still test it with real questions and read the conversations after launch.",
  },
  {
    q: 'Can it answer in Hindi and Gujarati?',
    a: "Often, yes, because modern models handle both. Quality varies by topic and by the way customers write, including mixed languages and Roman-script Hindi. Test with real messages from your customers before you rely on it.",
  },
];

const AiChatbotSmallBusiness: React.FC = () => (
  <PageTransition>
    {/* FAQPage markup is emitted at build time from FAQS above by scripts/prerender.mjs. */}
    <SEO
      title="AI Chatbot for a Small Business Website: Cost and Limits"
      description="What an AI chatbot can and cannot do for a small business website, what it costs to build and run, when not to build one, and how to launch it safely."
      canonical="https://akshay.website/blog/ai-chatbot-for-small-business-website"
    />

    <PostShell
      path="/blog/ai-chatbot-for-small-business-website"
      eyebrow="AI chatbots"
      title="An AI chatbot for a small business website: cost, limits and when to skip it"
      meta="12 Nov 2026 · ~7 min · a buyer's guide"
      lead="A chatbot can answer the same question at midnight that you answer ten times a day. It can also give a wrong answer with total confidence. Here is how to tell whether one is worth building for your business, what it costs, and how to launch it without embarrassing yourself."
    >
      <Reveal>
        <P>
          I build chatbots for clients and I run one on this site, so I have seen both sides of the
          decision. The honest first question is not which tool to use. It is whether your business
          has the kind of repeated questions that a chatbot is good at.
        </P>
        <H2>What a chatbot is good at</H2>
        <UL>
          <LI title="Repeated questions with stable answers.">
            Opening hours, prices, service areas, how to book, delivery times and return rules. If the
            answer is the same every time, a bot can give it instantly.
          </LI>
          <LI title="Answering from your own documents.">
            A bot that is given your price list, FAQ and policies, and told to answer only from them,
            is far safer than one answering from general knowledge.
          </LI>
          <LI title="Capturing a lead.">
            It can ask for a name and a number or WhatsApp contact before a visitor leaves, and pass
            the details to you.
          </LI>
          <LI title="Out-of-hours coverage.">It can reply at night and queue the harder questions for you.</LI>
        </UL>
        <H2>What it is bad at</H2>
        <UL>
          <LI>Anything that changes by the hour, such as stock levels, unless it is connected to live data.</LI>
          <LI>Advice with legal, medical or financial consequences.</LI>
          <LI>Angry customers and delicate situations, which need a person.</LI>
          <LI>Questions your documents do not answer, where it may guess unless you tell it not to.</LI>
        </UL>
        <H2>What it costs</H2>
        <P>
          There are two costs, and people usually see only the first.
        </P>
        <UL>
          <LI title="The build.">
            My AI agent and chatbot tier on the <A to="/pricing">pricing page</A> starts at about
            ₹80,000 ($900) and usually takes three to four weeks. It covers choosing the model,
            training the bot on your documents, setting up the chat widget and tuning it against real
            questions.
          </LI>
          <LI title="Running it.">
            The AI provider charges for usage, billed to your own account so every cost is visible,
            and you pay for hosting. A site with a few hundred conversations a month costs little to
            run; a busy one costs more, which is why limits matter.
          </LI>
          <LI title="Looking after it.">
            Your prices and policies change. Someone has to update the bot's documents and read how it
            is doing, either you or a monthly plan. I cover the typical monthly costs on the{' '}
            <A to="/ai-automation-pricing">automation pricing page</A>.
          </LI>
        </UL>
        <Callout title="When not to build one">
          If you get a handful of enquiries a week, a clear FAQ page and a WhatsApp button will do the
          same job for almost nothing. A chatbot earns its keep when the same questions arrive
          constantly, or when response time is costing you customers.
        </Callout>
        <H2>How to launch one safely</H2>
        <UL>
          <LI>
            <strong>Give it your documents, and only your documents,</strong> and tell it to say "I
            don't know" and offer a human when the answer is not there.
          </LI>
          <LI>
            <strong>Make the handover easy:</strong> a visible WhatsApp or phone option on every reply
            that is out of its depth.
          </LI>
          <LI>
            <strong>Test it before customers do.</strong> Write thirty to fifty real questions, including
            the awkward ones, and check each answer.
          </LI>
          <LI>
            <strong>Set limits:</strong> a cap on message length, on replies per visitor and on
            spending, so a script cannot run up your bill.
          </LI>
          <LI>
            <strong>Tell visitors it is an AI,</strong> and say in your privacy policy where their
            messages go.
          </LI>
          <LI>
            <strong>Read the conversations</strong> for the first few weeks and fix what it gets wrong.
          </LI>
        </UL>
        <P>
          I go deeper on these decisions in{' '}
          <A to="/blog/ai-agent-that-survives-real-users">how to build an AI agent that survives real users</A>.
          If you want help deciding whether a chatbot fits your business, look at my{' '}
          <A to="/services">services</A> or <A to="/contact">send me a message</A>; I will tell you if
          it is not the right tool.
        </P>
      </Reveal>
      <Reveal>
        <Faq items={FAQS} />
      </Reveal>
    </PostShell>
  </PageTransition>
);

export default AiChatbotSmallBusiness;
