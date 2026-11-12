import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '../../constants';
import { availabilityMonth } from '../../lib/availability';
import { Btn, CALENDLY, EMAIL, WHATSAPP, shotProps } from './ui';

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

type Product = (typeof PROJECTS)[number];

const ProductCard: React.FC<{ p: Product; className?: string }> = ({ p, className = '' }) => (
  <a
    href={p.link}
    target="_blank"
    rel="noopener noreferrer"
    className={`group block w-[250px] overflow-hidden rounded-[22px] border border-lp-line bg-white shadow-[0_30px_60px_-28px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1 sm:w-[330px] ${className}`}
  >
    <div className="aspect-[16/10] w-full overflow-hidden bg-lp-tint">
      <img
        {...shotProps(p.image, '(min-width: 640px) 350px, 250px')}
        alt={`${p.title} screenshot`}
        width={660}
        height={412}
        loading="eager"
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lp-blue">{p.stat}</span>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-lp-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" /> Live
        </span>
      </div>
      <p className="mt-1.5 text-[16px] font-semibold text-lp-ink">{p.title}</p>
      <p className="mt-0.5 flex items-center gap-1 text-[12.5px] text-lp-muted">
        {host(p.link)} <ExternalLink size={11} aria-hidden="true" />
      </p>
    </div>
  </a>
);

/** Centred headline, two actions, and three live products fanned out below. */
const LpHero: React.FC = () => {
  const reduced = useReducedMotion();
  const rise = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] as const },
  });
  const [a, b, c] = PROJECTS;

  return (
    <section className="relative overflow-hidden pt-36 md:pt-44">
      <div aria-hidden="true" className="lp-grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-lp-blue/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[900px] px-6 text-center">
        <motion.div {...rise(0)} className="flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-lp-line bg-white px-4 py-1.5 text-[13px] font-medium text-lp-body shadow-[0_1px_0_rgba(15,23,42,0.03)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Taking projects for {availabilityMonth()} · Surat, IN
          </span>
        </motion.div>

        {/* The headline is the largest paint on the page, so it is never hidden and animated in:
            an element that starts at opacity 0 is not painted, and the page's LCP waits for it. */}
        <h1 className="mt-7 font-lp text-[48px] font-normal leading-[1.01] tracking-[-0.03em] text-lp-ink sm:text-[68px] md:text-[88px]">
          I build full-stack websites, <em className="italic text-lp-blue">wired with AI.</em>
        </h1>

        <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-[1.65] text-lp-body md:text-[19px]">
          I'm Akshay Mahajan — a full-stack developer who ships fast with LLMs. Websites, web apps and
          custom tools, plus the AI agents and automation that make them smarter.
        </p>

        <motion.div {...rise(3)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Btn href={CALENDLY} arrow>Book a 20-minute call</Btn>
          <Btn to="/work" variant="ghost">See what I've built</Btn>
        </motion.div>

        <motion.p {...rise(4)} className="mt-5 text-[13.5px] text-lp-muted">
          Rather just ask something?{' '}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-medium text-lp-body underline decoration-lp-blue/40 underline-offset-4 hover:text-lp-blue">
            WhatsApp me
          </a>{' '}
          or{' '}
          <a href={`mailto:${EMAIL}`} className="font-medium text-lp-body underline decoration-lp-blue/40 underline-offset-4 hover:text-lp-blue">
            send an email
          </a>
          . I reply within a working day.
        </motion.p>
      </div>

      {/* three live products, fanned and cropped by the next section */}
      {/* Decorative on phones, where it would also become the page's largest paint and delay LCP;
          the same cards sit in the Work section further down. */}
      <motion.div
        {...rise(5)}
        className="lp-fade-bottom relative mx-auto mt-16 hidden h-[300px] max-w-[1080px] items-start justify-center overflow-hidden px-4 sm:flex md:h-[400px]"
        aria-label="Live products"
      >
        <div className="relative z-10 md:translate-x-[34px] md:-rotate-[5deg] md:translate-y-8">
          <ProductCard p={a} />
        </div>
        <div className="relative z-20 hidden -mx-10 md:block">
          <ProductCard p={b} className="!w-[350px]" />
        </div>
        <div className="relative z-10 hidden -translate-x-[34px] translate-y-8 rotate-[5deg] md:block">
          <ProductCard p={c} />
        </div>
      </motion.div>
    </section>
  );
};

export default LpHero;
