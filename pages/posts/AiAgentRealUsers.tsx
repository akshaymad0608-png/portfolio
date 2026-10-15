import React from 'react';
import PageTransition from '../../components/PageTransition';
import SEO from '../../components/SEO';
import Reveal from '../../components/ui/Reveal';
import { A, Callout, Faq, H2, LI, P, PostShell, UL } from '../../components/ui/PostKit';

const PUBLISHED = '2026-10-15';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Build an AI Agent That Survives Contact With Real Users',
  description:
    'Most agent demos work because nobody is trying to break them. A practical checklist for scope, tools, prompt injection, handoff, limits and testing.',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: 'en-IN',
  mainEntityOfPage: 'https://akshay.website/blog/ai-agent-that-survives-real-users',
  author: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
  publisher: { '@type': 'Person', name: 'Akshay Mahajan' },
  about: ['AI agents', 'prompt injection', 'guardrails', 'LLM evaluation', 'chatbot development'],
};

const FAQS = [
  {
    q: 'What is the difference between an AI chatbot and an AI agent?',
    a: 'A chatbot answers questions in a conversation. An agent can also take actions: look something up, create a record, send a message or call another system. The extra capability is what makes agents useful, and it is why they need tighter limits than a chatbot does.',
  },
  {
    q: 'What is prompt injection and should I worry about it?',
    a: 'Prompt injection is text, in a message, a web page or a document, that tries to make the model ignore its instructions. Yes, worry about it whenever the agent reads content you do not control or can take actions. The defence is design, not a clever prompt: untrusted text is treated as data, and tools are limited to what the job needs.',
  },
  {
    q: 'How do I know if my agent is good enough to launch?',
    a: 'Write down thirty to fifty real questions and the answer or behaviour you expect for each, including some you want it to refuse. Run them before every change. If the pass rate drops after an edit, you have caught a regression before a customer did.',
  },
];

const AiAgentRealUsers: React.FC = () => (
  <PageTransition>
    {/* FAQPage markup is emitted at build time from FAQS above by scripts/prerender.mjs. */}
    <SEO
      title="How to Build an AI Agent That Survives Real Customers"
      description="Most agent demos work because nobody is trying to break them. A practical checklist for scope, tools, prompt injection, handoff, cost limits and testing."
      canonical="https://akshay.website/blog/ai-agent-that-survives-real-users"
      schema={schema}
    />

    <PostShell
      path="/blog/ai-agent-that-survives-real-users"
      eyebrow="AI engineering"
      title="How to build an AI agent that survives contact with real users"
      meta="15 Oct 2026 · ~8 min · a launch checklist"
      lead="A demo agent works because the person demoing it knows what to type. A real agent meets people who paste a screenshot, write in two languages in one sentence, ask for a refund, or try to make it say something silly. These are the decisions that decide which one you ship."
    >
      <Reveal>
        <H2>1. Make the job one sentence long</H2>
        <P>
          Before anything else, write what the agent is for in one sentence, and what it must refuse.
          "Answers questions about our services and prices and collects a name and number for a call back"
          is a job. "Helps customers" is not. The sentence becomes the first lines of the system prompt,
          the first test case and the answer when someone asks for something outside it. Agents that try
          to do everything are the ones that say something wrong with great confidence.
        </P>

        <H2>2. Give it tools, not authority</H2>
        <P>
          Each tool you hand the agent is something a stranger can try to trigger. Start with read-only
          tools: search the knowledge base, check an order status. Put anything that writes, sends or
          spends behind a confirmation step, either from the user or from your team. Make every write safe
          to repeat, so a retry cannot create two orders. The rule of thumb is simple: the agent proposes,
          the system or a person disposes.
        </P>

        <H2>3. Treat everything it reads as untrusted</H2>
        <P>
          Prompt injection is text that tries to override the instructions, and it can arrive in a chat
          message, a web page the agent fetched or a PDF a customer uploaded. You cannot fully solve it
          with a stricter prompt. You reduce the damage by design:
        </P>
        <UL>
          <LI>Keep instructions and data separate, and tell the model that retrieved text is data.</LI>
          <LI>Limit tools to the minimum, so a successful injection has little to work with.</LI>
          <LI>Validate outputs before acting on them: allowed values only, correct format, sane amounts.</LI>
          <LI>Never put secrets, API keys or other customers' data in the prompt context.</LI>
        </UL>

        <H2>4. Let it say "I don't know"</H2>
        <P>
          Ground answers in a source you control, such as your own pages, price list and policies, and
          instruct the agent to say it does not know when the source is silent. Then test that behaviour
          directly. A polite "I can't confirm that, let me pass you to a person" costs you nothing. A
          made-up refund policy costs you the customer.
        </P>
        <Callout title="A small test worth running">
          Ask the agent for a discount that does not exist, a delivery date it cannot know and a legal
          opinion. The right answer to all three is a refusal or a handoff.
        </Callout>

        <H2>5. Plan the handoff to a human</H2>
        <P>
          Decide the triggers in advance: the user asks for a person, the same question fails twice, the
          message mentions money, legal trouble or a complaint, or the agent's confidence is low. On
          handoff, send the transcript and the user's contact details to a real inbox or WhatsApp number,
          and tell the user honestly what happens next and roughly when. A good handoff is a feature, not
          an admission of failure.
        </P>

        <H2>6. Put hard limits on everything</H2>
        <UL>
          <LI title="Rate limits.">Per visitor and per day, so one script cannot drain the budget.</LI>
          <LI title="Length limits.">Cap the input size and the output tokens.</LI>
          <LI title="Tool-call limits.">A maximum number of tool calls per turn, to stop loops.</LI>
          <LI title="Timeouts and a spending cap.">An agent that waits forever or loops quietly is the most expensive kind.</LI>
        </UL>
        <P>
          The chatbot on this site sits behind a server route with its own rate limiting rather than
          calling the model from the browser, for the same reason: the browser is the one place you cannot
          trust.
        </P>

        <H2>7. Log it, then test it like software</H2>
        <P>
          Keep a record of prompts, answers and tool calls, with the user's consent and without storing
          what you do not need. Read a sample every week; you will learn more from twenty real
          conversations than from any amount of imagining. Turn the failures into test cases, and run the
          whole set before each change to the prompt, the model or the tools. This is the single habit that
          separates agents that improve from agents that quietly get worse.
        </P>

        <H2>The short version</H2>
        <UL>
          <LI>One-sentence job, with a list of refusals.</LI>
          <LI>Read-only tools first; confirmation for anything that writes.</LI>
          <LI>Untrusted input treated as data, outputs validated.</LI>
          <LI>"I don't know" and handoff built in and tested.</LI>
          <LI>Rate, length, tool and spend limits.</LI>
          <LI>Logs, a test set and a weekly read.</LI>
        </UL>

        <P>
          Building an agent for a real business and want it done carefully? Read{' '}
          <A to="/ai-guide">the plain-English AI guide</A> first, or{' '}
          <A to="/contact">tell me what it should do</A>.
        </P>
      </Reveal>

      <Reveal>
        <Faq items={FAQS} />
      </Reveal>
    </PostShell>
  </PageTransition>
);

export default AiAgentRealUsers;
