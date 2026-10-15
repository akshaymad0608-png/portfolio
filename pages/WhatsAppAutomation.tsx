import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import { A, Callout, Faq, H2, H3, LandingShell, LI, P, UL } from '../components/ui/PostKit';
import { AUTOMATION_PLANS } from '../lib/automationPricing';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'WhatsApp and n8n automation for small businesses',
  serviceType: 'Business process automation',
  description:
    'Automations that capture enquiries from WhatsApp, forms and email, log them to a sheet or CRM, answer common questions and alert you when a person is needed.',
  provider: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
  areaServed: [{ '@type': 'Country', name: 'India' }],
  url: 'https://akshay.website/whatsapp-automation-small-business',
};

const FAQS = [
  {
    q: 'Can an automation reply to my customers on WhatsApp?',
    a: 'Yes, through the official WhatsApp Business Platform. It can answer common questions, collect details and pass the chat to you when it is unsure. Messages the business starts usually need a template that Meta has approved first, and Meta charges for messages, so those costs belong in the plan.',
  },
  {
    q: 'Is it safe to use my normal WhatsApp number with unofficial tools?',
    a: 'I do not recommend it. Unofficial tools that automate an ordinary account break WhatsApp’s rules and can get the number restricted or banned. The official platform costs more effort to set up, and it is the one that lasts.',
  },
  {
    q: 'Do I have to move to a new tool or a new phone number?',
    a: 'Usually not. The automation connects to the tools you already use, such as Google Sheets, Gmail, a CRM or a booking page. For WhatsApp itself, the official platform needs a number registered with it, which we choose together.',
  },
  {
    q: 'What happens when the automation makes a mistake or stops?',
    a: 'Every workflow gets an error alert, so a failure reaches me and you instead of failing silently, and anything uncertain is routed to a person. The monthly plans include maintenance for exactly this reason.',
  },
];

const FLOWS = [
  ['A customer messages or fills a form', 'The enquiry is captured with name, number and what they asked for.'],
  ['The details go into your sheet or CRM', 'One row per enquiry, with the source and the time, no copy-pasting.'],
  ['Common questions get an instant answer', 'Prices, timings and location come from text you approved. Anything else waits for you.'],
  ['You are alerted when a person is needed', 'High-value or unclear enquiries ping you with the summary and a link to the chat.'],
  ['Follow-ups go out on time', 'A reminder after a quote, or a confirmation before an appointment.'],
];

const WhatsAppAutomation: React.FC = () => (
  <PageTransition>
    {/* FAQPage markup is emitted at build time from FAQS above by scripts/prerender.mjs. */}
    <SEO
      title="WhatsApp and n8n Automation for Small Business in India"
      description="Capture enquiries from WhatsApp, forms and email, log them to a sheet or CRM, answer common questions and get alerted only when it matters. Plans in rupees."
      canonical="https://akshay.website/whatsapp-automation-small-business"
      schema={schema}
    />

    <LandingShell
      eyebrow="Automation · India"
      title="Stop copying enquiries from WhatsApp into a spreadsheet."
      lead="n8n workflows that capture every enquiry, answer the routine questions, keep your sheet or CRM up to date and tell you when a real person is needed. Built, tested and maintained for small Indian businesses."
      whatsappText="Hi Akshay, I'd like to automate enquiries for my business"
    >
      <Reveal>
        <H2>What a typical setup does</H2>
        <ol className="mt-6 space-y-4">
          {FLOWS.map(([head, body], i) => (
            <li key={head} className="border-l border-border pl-5">
              <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-wire">Step {i + 1}</span>
              <p className="mt-1 text-[17px] font-semibold text-text">{head}</p>
              <p className="mt-1 text-[16.5px] leading-[1.7] text-textSecondary">{body}</p>
            </li>
          ))}
        </ol>
        <P>
          None of this replaces you talking to customers. It removes the typing, the forgetting and the
          late replies around the conversation. For a full node-by-node example, see{' '}
          <A to="/blog/n8n-crm-email-triage-workflow">the n8n email triage build</A>.
        </P>

        <H2>Where it helps most</H2>
        <UL>
          <LI title="Enquiry-heavy businesses:">coaching classes, clinics, real-estate, travel, repair and installation services.</LI>
          <LI title="Trading and wholesale:">order and price enquiries that arrive in a dozen chats a day.</LI>
          <LI title="Appointment-based work:">salons, consultants, trainers, anywhere a missed reminder costs a booking.</LI>
        </UL>

        <Callout title="Two things to know first">
          The official WhatsApp Business Platform needs a registered number, Meta-approved message
          templates for messages you start, and per-message charges from Meta. I set these out in the
          quote so there are no surprises. And an automation is only as good as the information you give
          it, so the first job is writing down your real answers.
        </Callout>
      </Reveal>

      <Reveal>
        <H2>Plans and prices</H2>
        <P>
          Three packaged plans, each a one-time setup plus a monthly fee for maintenance and support.
          Tool and message fees from third parties are separate and itemised.
        </P>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {AUTOMATION_PLANS.map((plan) => (
            <div key={plan.id} className="panel p-6">
              <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-wire">{plan.name}</p>
              <p className="mt-3 font-display text-2xl font-bold text-text">{plan.setup}</p>
              <p className="text-[14px] text-muted">{plan.setupLabel}</p>
              <p className="mt-3 text-[15px] font-semibold text-text">{plan.monthly}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-textSecondary">{plan.description}</p>
            </div>
          ))}
        </div>
        <P>
          The details, the hosting choices and a cost estimator are on{' '}
          <A to="/ai-automation-pricing">the automation plans page</A>. To see what drives the cost in
          general, read <A to="/blog/ai-workflow-automation-cost-small-business">the automation cost guide</A>.
        </P>

        <H3>Want an AI to answer instead of fixed replies?</H3>
        <P>
          A chatbot trained on your own documents can handle more of the routine questions, with a
          handoff to you when it is unsure. It is a bigger build, and it needs the safeguards in{' '}
          <A to="/blog/ai-agent-that-survives-real-users">the AI agent checklist</A>.
        </P>
      </Reveal>

      <Reveal>
        <Faq items={FAQS} />
      </Reveal>
    </LandingShell>
  </PageTransition>
);

export default WhatsAppAutomation;
