import React from 'react';
import { ArrowDown } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { EXECUTION_FLOW, USAGE_EXAMPLES } from '../../lib/automationPricing';

/**
 * What an execution is, drawn rather than described.
 *
 * The caveat under the examples is not boilerplate: one lead does not reliably
 * equal one execution — a retry, a second workflow reacting to the first, or a
 * poll that finds nothing all change the count. Saying "around" and then
 * saying why is the difference between an illustration and a promise.
 */
const ExecutionExplainer: React.FC = () => (
  <section id="executions" className="relative bg-section py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <SectionHeading
        eyebrow="Usage"
        title="How n8n pricing and usage works"
        lead="Your automation runs through workflows. The total cost depends on how your n8n setup is hosted and how frequently your automation runs."
        className="mb-14"
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              What is a workflow execution?
            </h3>
            <ol className="mt-6 space-y-0">
              {EXECUTION_FLOW.map((step, i) => (
                <li key={step}>
                  <div
                    className={`panel px-5 py-4 text-[15px] ${
                      i === EXECUTION_FLOW.length - 1
                        ? 'border-wire/45 font-bold text-wire'
                        : 'text-text'
                    }`}
                  >
                    {step}
                  </div>
                  {i < EXECUTION_FLOW.length - 1 && (
                    <div className="flex justify-center py-2" aria-hidden>
                      <ArrowDown size={16} className="text-wire" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <div className="min-w-0">
          <Reveal delay={0.06}>
            <p className="text-[16px] leading-relaxed text-text">
              An execution means your automation workflow runs once. Actual usage can vary
              depending on workflow complexity, triggers and how many workflows run for each
              event.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {USAGE_EXAMPLES.map((ex, i) => (
              <Reveal key={ex.leads} delay={0.1 + i * 0.05}>
                <div className="panel h-full p-6">
                  <p className="font-display text-[24px] font-bold leading-none text-text">
                    {ex.leads}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-textSecondary">
                    {ex.executions}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-6 border-l-2 border-wire bg-wire/8 px-5 py-4 text-[14.5px] leading-relaxed text-text">
              These are simplified examples. Actual execution usage varies with your workflow
              architecture — retries, one workflow triggering another, and scheduled checks all
              count separately, so treat these as illustrations rather than a quota.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default ExecutionExplainer;
