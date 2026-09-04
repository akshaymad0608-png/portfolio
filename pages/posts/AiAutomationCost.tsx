import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import SEO from '../../components/SEO';
import Reveal from '../../components/ui/Reveal';
import FinalCTA from '../../components/FinalCTA';

/**
 * The first actual article on this site.
 *
 * Written as a component rather than run through a markdown pipeline: there is
 * one post. A loader, a parser and a content directory for a single file would
 * be machinery with nothing to carry. When there are three or four, lift the
 * shared parts out of here into a layout and keep the bodies as data.
 *
 * The opening paragraph states the price before anything else on purpose. It is
 * the passage an AI assistant lifts when someone asks what automation costs, and
 * a definition-first intro would hand that slot to somebody else.
 */

const PUBLISHED = '2026-08-28';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What AI Workflow Automation Actually Costs a Small Business (2026, in Rupees)',
  description:
    'One workflow costs ₹15,000–₹60,000 to build and ₹500–₹3,000 a month to run in India. Real rupee figures, an itemised bill, and when not to bother.',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: 'en-IN',
  mainEntityOfPage: 'https://akshay.website/blog/ai-workflow-automation-cost-small-business',
  image: 'https://akshay.website/blog/featured-ai-automation-cost-breakdown.svg',
  author: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
  publisher: { '@type': 'Person', name: 'Akshay Mahajan' },
  about: ['AI workflow automation', 'n8n', 'small business automation pricing'],
};

/**
 * The questions, in one place.
 *
 * There used to be two copies of these six answers in this file — one for the
 * FAQPage markup and one for the accordion — and nothing kept them in step.
 * The markup is now generated from this array at build time by
 * scripts/prerender.mjs, so there is a single copy and it is the one on screen.
 */
const FAQS = [
  {
    q: 'How much does AI workflow automation cost for a small business?',
    a: '₹15,000–₹60,000 to build one workflow in India in 2026, then ₹500–₹3,000 a month to run it. Building it yourself removes the one-time cost and leaves only the monthly tool fee.',
  },
  {
    q: 'What does n8n cost per month in India?',
    a: 'n8n Cloud starts at $24/month, about ₹2,100, for 2,500 executions. Self-hosted on an Indian VPS it is ₹500–₹1,500/month with unlimited runs, but you maintain the server.',
  },
  {
    q: 'Is it cheaper to build it myself?',
    a: 'In money, always. In time, rarely. Expect a few days to learn the tool and a day per workflow after that, plus the failures you only find in production. Worth it if you will build several.',
  },
  {
    q: 'Are there ongoing costs after it is built?',
    a: 'Yes, and you should insist on seeing them before you commit. Platform subscription, AI usage if any, and optionally a maintenance retainer. For a single small workflow this is usually under ₹3,000/month.',
  },
  {
    q: 'How long before it pays for itself?',
    a: 'Take the hours saved per month, multiply by what an hour of that person’s time costs, and divide the build cost by it. Most single-workflow builds land between two and six months. If your estimate says eighteen, do not build it.',
  },
  {
    q: 'When is automation not worth the money?',
    a: 'When the task happens rarely, changes often, or needs a judgement call at every step. Frequency is what pays for automation — not how annoying the task feels.',
  },
];

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="mt-14 font-display text-[26px] font-bold tracking-tightest text-text md:text-[30px]">
    {children}
  </h2>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mt-5 text-[17px] leading-[1.75] text-textSecondary">{children}</p>
);

const AiAutomationCost: React.FC = () => (
  <PageTransition>
    {/* FAQPage is emitted at build time from FAQS above, by
        scripts/prerender.mjs, so the answers sit in the document a crawler
        downloads rather than only in the one it renders. Passing it here as
        well would leave two FAQPage nodes on the page. */}
    <SEO
      title="AI Workflow Automation Cost for Small Business in India"
      description="One workflow costs ₹15,000–₹60,000 to build and ₹500–₹3,000 a month to run in India. Real rupee figures, an itemised bill, and when not to bother."
      canonical="https://akshay.website/blog/ai-workflow-automation-cost-small-business"
      schema={schema}
    />

    <article className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-wire" />
              <span className="eyebrow">Automation</span>
            </div>

            <h1 className="font-display text-[34px] font-bold leading-[1.15] tracking-tightest text-text md:text-[46px]">
              What AI workflow automation actually costs a small business
            </h1>

            <p className="mt-4 font-mono text-[11.5px] uppercase tracking-[0.16em] text-muted">
              28 Aug 2026 · ~6 min · figures in rupees, dated
            </p>

            {/* The answer, before anything else. */}
            <p className="mt-8 border-l-2 border-wire pl-6 text-[19px] leading-[1.7] text-text">
              For a small business in India in 2026, one automated workflow costs{' '}
              <strong className="font-semibold">₹15,000–₹60,000 to build once</strong>, then{' '}
              <strong className="font-semibold">₹500–₹3,000 a month to keep running</strong>. Doing
              it yourself costs only the monthly tool fee. Automating a whole function — sales
              follow-up, onboarding, reporting — runs ₹1,50,000–₹5,00,000.
            </p>

            <P>
              That is the answer. The rest of this page is why those numbers are what they are,
              what the monthly bill is actually made of, and one system I run myself with the real
              figures attached.
            </P>
          </Reveal>

          <Reveal>
            <H2>The short answer, by how far you go</H2>
            {/* Scrolls inside its own box below ~700px. Shrunk to a phone's width
                the labels come out around five pixels tall, which is a picture of
                text rather than text. */}
            <figure className="mt-6 overflow-x-auto">
              <img
                src="/blog/featured-ai-automation-cost-breakdown.svg"
                alt="Three cost tiers for AI workflow automation in India: build it yourself at ₹0 to build and ₹500–2,000 a month; one workflow built for you at ₹15,000–60,000 once and ₹500–3,000 a month; a whole function at ₹1.5–5 lakh once and ₹3,000–15,000 a month"
                className="w-full min-w-[700px] border border-border"
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
              />
            </figure>

            <P>
              “One workflow” means one job, end to end: every new enquiry lands in a sheet and pings
              your phone. “A whole function” means the job and everything around it: the enquiry is
              captured, scored, routed to the right person, followed up twice if nobody replies, and
              reported on Monday.
            </P>
            <P>
              Most businesses that ask me this need the first row and think they need the third. My{' '}
              <Link className="underline decoration-border underline-offset-4 hover:text-wire hover:decoration-wire" to="/pricing">
                pricing page
              </Link>{' '}
              has the current project figures if you want them before a call.
            </P>
          </Reveal>

          <Reveal>
            <H2>The monthly bill nobody itemises</H2>
            <P>
              Every quote splits into two very different things, and confusing them is why the
              numbers online feel arbitrary.
            </P>
            <P>
              <strong className="font-semibold text-text">Build cost</strong> is one-time. Someone
              maps your process, wires the tools, tests the failures, hands it over. Once it works,
              it keeps working.
            </P>
            <P>
              <strong className="font-semibold text-text">Running cost</strong> is forever, and it is
              smaller than people fear. It is made of three parts:
            </P>

            <ul className="mt-5 space-y-4 text-[17px] leading-[1.75] text-textSecondary">
              <li className="border-l border-border pl-5">
                <strong className="font-semibold text-text">The automation platform.</strong> n8n
                Cloud starts at $24/month, roughly ₹2,100, for 2,500 workflow runs. Make starts
                around $9/month. Zapier is the friendliest and the most expensive at volume — its
                Professional plan is $29.99/month for 750 tasks. Self-host n8n on an Indian VPS and
                you are at ₹500–₹1,500/month with no per-run fee at all.
              </li>
              <li className="border-l border-border pl-5">
                <strong className="font-semibold text-text">The AI model, if you use one.</strong>{' '}
                This is where people brace for a large number and it does not come. Google’s Gemini
                has a free tier generous enough for a few hundred short tasks a day. Paid usage for a
                small business writing a handful of things daily lands under ₹500/month.
              </li>
              <li className="border-l border-border pl-5">
                <strong className="font-semibold text-text">Everything else, usually zero.</strong>{' '}
                Google Sheets, Telegram, Gmail, most CRMs you already pay for. Automation reads and
                writes to tools you have; it rarely adds new ones.
              </li>
            </ul>
          </Reveal>

          <Reveal>
            <H2>A real example, with the actual bill</H2>
            <P>
              Here is a system I built and run, so the numbers are mine rather than a range I
              collected.
            </P>
            <P>
              It wakes at 9am every day, reads five AI industry blogs, throws out anything older than
              a day or already seen, keeps the best few, writes them to a Google Sheet, sends me a
              summary on Telegram, and drafts three LinkedIn posts in my voice. One arrives with an
              approve button. I read it, tap once, and it posts with an image. The whole thing feeds
              a live section on my{' '}
              <Link className="underline decoration-border underline-offset-4 hover:text-wire hover:decoration-wire" to="/work">
                work page
              </Link>{' '}
              as well.
            </P>

            <figure className="mt-8 overflow-x-auto">
              <img
                src="/blog/supporting-monthly-bill-split.svg"
                alt="The monthly bill for one running automation: n8n Cloud Starter about ₹2,100, Google Gemini free tier ₹0, Google Sheets Telegram and LinkedIn ₹0, total about ₹2,100 a month"
                className="w-full min-w-[700px] border border-border"
                width={1200}
                height={600}
                loading="lazy"
                decoding="async"
              />
            </figure>

            <P>
              Building it took the better part of a working day, including the parts that broke — an
              expired token, an image the model truncated, a publisher that blocks automated readers.
              If you hired that out, you are in the ₹15,000–₹40,000 band. It replaces roughly an hour
              of my morning, every morning.
            </P>
            <P>
              That is the honest shape of it: the monthly cost is small and predictable, the build is
              the real spend, and the payback is entirely a question of how many hours the job was
              eating.
            </P>
          </Reveal>

          <Reveal>
            <H2>Why the dollar figures you found don’t apply to you</H2>
            <P>
              Search this question and you will find the same three numbers everywhere: $1,500–$5,000
              per workflow, $8,000–$25,000 per function, $200–$600/month in tools.
            </P>
            <P>
              Those are real. They are US agency rates, written for US readers, and they are roughly
              four to six times what the same work costs from an Indian developer. The monthly figure
              is inflated too, because it assumes an enterprise tool stack rather than the free tiers
              a small business can legitimately sit on for years.
            </P>
            <P>
              If a quote you receive looks like a converted dollar figure, ask what is in it.
              Sometimes the answer is good — a retainer, monitoring, someone who picks up the phone
              when it breaks. Sometimes it is just a rate card.
            </P>
          </Reveal>

          <Reveal>
            <H2>When it isn’t worth it</H2>
            <P>
              Automation is worth building when the job is repetitive, rule-based, and frequent.
              Remove any one of those and the maths stops working.
            </P>
            <ul className="mt-5 space-y-4 text-[17px] leading-[1.75] text-textSecondary">
              <li className="border-l border-border pl-5">
                <strong className="font-semibold text-text">Fewer than about 20 repetitions a
                month.</strong> A ₹20,000 build to save two hours a year is a bad trade. Do it by
                hand.
              </li>
              <li className="border-l border-border pl-5">
                <strong className="font-semibold text-text">The process changes constantly.</strong>{' '}
                You will pay to rebuild it every quarter.
              </li>
              <li className="border-l border-border pl-5">
                <strong className="font-semibold text-text">The process isn’t written down.</strong>{' '}
                Automating a process nobody has agreed on just makes the disagreement faster. Write
                it down first; sometimes that alone fixes it.
              </li>
              <li className="border-l border-border pl-5">
                <strong className="font-semibold text-text">It needs judgement at every step.</strong>{' '}
                Automate the fetching and the filing. Keep the deciding.
              </li>
            </ul>
            <P>
              I turn down this work when the numbers say so. A workflow that runs twice a month is
              not a business case.
            </P>
          </Reveal>

          <Reveal>
            <H2>What to ask before you pay anyone</H2>
            <P>Five questions. The answers tell you more than the quote does.</P>
            <ol className="mt-5 space-y-4 text-[17px] leading-[1.75] text-textSecondary">
              {[
                ['What is the monthly cost after handover, itemised?', 'Anyone who cannot break it into platform, AI, and other has not built it yet.'],
                ['What happens when it breaks?', 'Everything breaks. Tokens expire, APIs change. Ask how you find out — a message on your phone, or silence for three weeks.'],
                ['Who owns the account?', 'If the automation lives in the builder’s workspace, you are renting your own process. It should sit in an account you control.'],
                ['How many hours a month does this actually save?', 'Make them say a number. Then check it against the build cost.'],
                ['What is the smallest useful version?', 'A good answer starts smaller than you asked for.'],
              ].map(([q, a], i) => (
                <li key={q} className="border-l border-border pl-5">
                  <strong className="font-semibold text-text">
                    {i + 1}. {q}
                  </strong>{' '}
                  {a}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <H2>Frequently asked questions</H2>
            <dl className="mt-6 border-t border-border">
              {FAQS.map((f) => (
                <div key={f.q} className="border-b border-border py-6">
                  <dt className="text-[17px] font-semibold text-text">{f.q}</dt>
                  <dd className="mt-2 text-[17px] leading-[1.75] text-textSecondary">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <P>
              I build these from Surat, mostly for small teams who have one job eating a person’s
              morning. If you want to know what your specific case would cost,{' '}
              <Link className="underline decoration-border underline-offset-4 hover:text-wire hover:decoration-wire" to="/contact">
                tell me what the job is
              </Link>{' '}
              and I will give you a number, or tell you it isn’t worth automating.
            </P>
            <p className="mt-10 border-t border-border pt-6">
              <Link
                className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-muted hover:text-wire"
                to="/blog"
              >
                ← All writing
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </article>

    <FinalCTA />
  </PageTransition>
);

export default AiAutomationCost;
