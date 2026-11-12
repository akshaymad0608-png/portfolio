import React from 'react';
import PageTransition from '../../components/PageTransition';
import SEO from '../../components/SEO';
import Reveal from '../../components/ui/Reveal';
import { A, Callout, Code, Faq, H2, LI, P, PostShell, UL } from '../../components/ui/PostKit';

const PUBLISHED = '2026-11-12';

/* Read by scripts/prerender.mjs and emitted as static JSON-LD (see readPostSchema); not passed to <SEO>, so there is one copy. */
const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'WhatsApp Enquiries to Google Sheets with n8n, Step by Step',
  description:
    'How to log every WhatsApp enquiry into a Google Sheet automatically with n8n: what you need, the steps, the columns to keep, and the mistakes to avoid.',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: 'en-IN',
  mainEntityOfPage: 'https://akshay.website/blog/whatsapp-enquiries-to-google-sheets-n8n',
  author: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
  publisher: { '@type': 'Person', name: 'Akshay Mahajan' },
  about: ['WhatsApp automation', 'n8n', 'Google Sheets', 'small business automation', 'enquiry tracking'],
};

const FAQS = [
  {
    q: 'Can I do this with the normal WhatsApp Business app?',
    a: "Not directly. The free WhatsApp Business app does not send incoming messages to other tools. For automation you need the WhatsApp Business Platform (the Cloud API) from Meta, usually through a verified business account. Check Meta's current rules before moving a number you already use in the app, because a number is normally tied to one or the other.",
  },
  {
    q: 'Is this free?',
    a: 'The pieces are cheap but not all free. Google Sheets is free, and n8n can be self-hosted at the cost of a small server, or used as a paid cloud service. Meta charges for some WhatsApp conversations and messages, and its pricing changes, so read the current pricing page for your country before you commit.',
  },
  {
    q: 'Do I need to know how to code?',
    a: "Not for the basic flow in this guide: a trigger, a few field mappings and a spreadsheet. You do need to be comfortable with Meta's developer dashboard and a spreadsheet. If you would rather not set it up yourself, I build and maintain these as part of my automation plans.",
  },
];

const WhatsappEnquiriesToSheets: React.FC = () => (
  <PageTransition>
    {/* FAQPage markup is emitted at build time from FAQS above by scripts/prerender.mjs. */}
    <SEO
      title="WhatsApp Enquiries to Google Sheets with n8n, Step by Step"
      description="How to log every WhatsApp enquiry into a Google Sheet automatically with n8n: what you need, the steps, the columns to keep, and the mistakes to avoid."
      canonical="https://akshay.website/blog/whatsapp-enquiries-to-google-sheets-n8n"
    />

    <PostShell
      path="/blog/whatsapp-enquiries-to-google-sheets-n8n"
      eyebrow="Automation"
      title="WhatsApp enquiries to Google Sheets with n8n, step by step"
      meta="12 Nov 2026 · ~8 min · a how-to"
      lead="If your leads arrive on WhatsApp and live in your phone, some of them will be lost. This is the smallest useful automation I know for fixing that: every new message becomes a row in a spreadsheet, without anyone copying and pasting."
    >
      <Reveal>
        <P>
          Many small businesses in India take most enquiries on WhatsApp. It works until three people
          answer the same customer, a message gets buried, or you cannot say how many enquiries came in
          this week. A shared sheet with one row per message fixes all three. This guide shows the flow
          I use as a starting point, and the mistakes to avoid. The screens in Meta's dashboard and in
          n8n change from time to time, so treat the names below as a map and check each tool's current
          documentation.
        </P>
        <H2>What you need</H2>
        <UL>
          <LI title="A WhatsApp Business Platform (Cloud API) number.">
            This is Meta's official API, set up through a Meta developer app and a business account.
            The ordinary WhatsApp Business app cannot pass messages to n8n.
          </LI>
          <LI title="An n8n instance with a public HTTPS address.">
            Meta has to reach your n8n over the internet to deliver messages. That is either n8n's
            cloud service or one you host yourself behind HTTPS.
          </LI>
          <LI title="A Google account and a spreadsheet.">One sheet, with a header row you control.</LI>
        </UL>
        <H2>Step 1: design the sheet first</H2>
        <P>
          Decide the columns before you build anything, because the automation just fills them. A good
          starting set:
        </P>
        <Code>{`Received at | Message ID | Name | Phone | Message | Type | Status | Owner | Notes`}</Code>
        <P>
          The last three are for people, not the automation: mark each enquiry as new, replied or
          closed, say who owns it, and write notes. Keep the Message ID column. It is how you avoid
          duplicates later.
        </P>
        <H2>Step 2: connect WhatsApp to n8n</H2>
        <P>
          In n8n, start a workflow with a WhatsApp trigger and connect it to your Meta app using the
          credentials n8n asks for. Subscribe it to incoming messages. Meta verifies the address you
          give it, then starts sending each new message to your workflow. Send yourself a test message
          and open the trigger's output so you can see the real data you will map next.
        </P>
        <H2>Step 3: pick out the fields</H2>
        <P>
          Incoming data is nested, so look at the output for the message text, the sender's number,
          the sender's profile name, the message ID and the time. Map each into a clearly named field in
          a small step so the rest of the flow reads easily. The fields you need usually sit inside the
          lists called messages and contacts; copy the exact paths from the test output rather than
          guessing.
        </P>
        <Code>{`Received at  <- the message timestamp
Message ID   <- the unique id of the message
Name         <- the sender's profile name
Phone        <- the sender's WhatsApp number
Message      <- the text (empty for photos, voice notes and documents)
Type         <- text, image, audio, document...`}</Code>
        <H2>Step 4: add the row</H2>
        <P>
          Add a Google Sheets step, connect your Google account and choose to append a row. Select the
          sheet and match each column to the field you prepared. Run the test: one message in, one row
          out.
        </P>
        <H2>Step 5: stop duplicates</H2>
        <P>
          Webhook systems can deliver the same event more than once. Before the append step, check
          whether the Message ID is already in the sheet, and skip it if so. This one check saves you
          from a sheet full of double entries.
        </P>
        <H2>Step 6: know when it breaks</H2>
        <P>
          An automation that fails quietly is worse than none, because you believe it is working. Add
          an error workflow that sends you a message (for example on Telegram or email) when a run
          fails, and look at the run history now and then. I wrote about this in{' '}
          <A to="/blog/n8n-crm-email-triage-workflow">the n8n email triage build</A>; the same habits
          apply here.
        </P>
        <Callout title="Privacy and consent">
          A phone number and a message are personal data. Tell customers their enquiry is recorded,
          keep the sheet shared only with the people who need it, and do not store sensitive details
          such as ID numbers or payment information in it.
        </Callout>
        <H2>Things that catch people out</H2>
        <UL>
          <LI>Replies are limited. After a customer messages you there is a time window in which you can
            answer freely; outside it, WhatsApp requires an approved template message.</LI>
          <LI>Media messages have no text. Store the type and a note rather than leaving a blank row.</LI>
          <LI>Moving a number from the app to the API has consequences for the app. Read Meta's current
            guidance before you do it.</LI>
          <LI>Your n8n address must stay reachable. If it goes down, messages are not logged.</LI>
        </UL>
        <P>
          Want this set up for your business, with alerts and a handover document? See{' '}
          <A to="/whatsapp-automation-small-business">WhatsApp automation for small business</A> and my{' '}
          <A to="/ai-automation-pricing">automation plans</A>, or <A to="/contact">send me the details</A>.
        </P>
      </Reveal>
      <Reveal>
        <Faq items={FAQS} />
      </Reveal>
    </PostShell>
  </PageTransition>
);

export default WhatsappEnquiriesToSheets;
