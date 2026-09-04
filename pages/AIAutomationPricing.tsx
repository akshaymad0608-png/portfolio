import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import AutomationPlans from '../components/automation/AutomationPlans';
import ExecutionExplainer from '../components/automation/ExecutionExplainer';
import AutomationCosts from '../components/automation/AutomationCosts';
import CostEstimator from '../components/automation/CostEstimator';
import AutomationFaq from '../components/automation/AutomationFaq';
import {
  AUTOMATION_FAQ,
  AUTOMATION_PLANS,
  CONTACT_SERVICE,
  WHATSAPP_NUMBER,
} from '../lib/automationPricing';

const contactHref = (details: string) =>
  `/contact?service=${encodeURIComponent(CONTACT_SERVICE)}&details=${encodeURIComponent(details)}`;

/**
 * FAQPage markup built from the same array the accordion renders, so the two
 * cannot drift. Google treats structured data that does not match the visible
 * page as a violation, and the usual way that happens is a second hand-written
 * copy of the answers.
 */
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AUTOMATION_FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Automation Development',
    serviceType: 'Business process automation with n8n and AI agents',
    provider: {
      '@type': 'Person',
      name: 'Akshay Mahajan',
      url: 'https://akshay.website',
    },
    areaServed: 'Worldwide',
    description:
      'Custom AI automation built with n8n, Claude, Gemini and ChatGPT — lead generation, automated follow-ups, CRM workflows, reporting and AI agents.',
    offers: AUTOMATION_PLANS.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      description: p.description,
      priceCurrency: 'INR',
      // The published figure, digits only. Premium is a floor, so it is marked
      // as a minimum rather than stated as the price.
      ...(p.id === 'premium'
        ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: 49999, priceCurrency: 'INR' } }
        : { price: p.setup.replace(/[^0-9]/g, '') }),
    })),
  },
];

const AIAutomationPricing: React.FC = () => (
  <PageTransition>
    <SEO schema={schema} />

    <PageHero
      eyebrow="AI Automation Pricing"
      title="AI Automation That Saves Time & Scales Your Business"
      lead="Custom AI-powered automation solutions built using n8n, Claude, Gemini, ChatGPT and AI Agents. From lead generation and automated follow-ups to sales reports, CRM workflows and intelligent AI agents — I build systems designed around your business."
    >
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to={contactHref('I would like a free consultation about AI automation.')}
          className="btn-signal inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px]"
        >
          Get Free Consultation <ArrowRight size={17} />
        </Link>
        <a
          href="#estimator"
          className="btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px]"
        >
          Request Custom Quote
        </a>
      </div>

      {/* The stack, named rather than drawn with logos I have no licence to use. */}
      <ul className="mt-9 flex flex-wrap gap-2">
        {['n8n', 'Claude', 'Gemini', 'ChatGPT', 'AI Agents', 'CRM', 'Google Sheets', 'WhatsApp'].map(
          (t) => (
            <li
              key={t}
              className="border border-border px-3 py-1.5 font-mono text-[11.5px] text-textSecondary"
            >
              {t}
            </li>
          ),
        )}
      </ul>
    </PageHero>

    <AutomationPlans />
    <ExecutionExplainer />
    <AutomationCosts />
    <CostEstimator />
    <AutomationFaq />

    <section className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-shell px-6">
        <Reveal>
          <div className="panel ticked border-wire/45 p-10 text-center md:p-16">
            <SectionHeading
              eyebrow="Next step"
              title="Ready to Automate Your Business?"
              align="center"
              className="mb-6"
            />
            <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-textSecondary">
              Stop wasting time on repetitive tasks. Let&rsquo;s build a smart AI automation system
              designed to save time, reduce manual work and help your business scale.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to={contactHref('I would like to book a free consultation about AI automation.')}
                className="btn-signal inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px]"
              >
                Book Your Free Consultation <ArrowRight size={17} />
              </Link>
              <a
                href="#estimator"
                className="btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px]"
              >
                Get a Custom Quote
              </a>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi Akshay, I'd like to discuss AI automation for my business.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 text-[14.5px] text-textSecondary transition-colors hover:text-wire"
            >
              <MessageCircle size={16} /> Or message me on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  </PageTransition>
);

export default AIAutomationPricing;
