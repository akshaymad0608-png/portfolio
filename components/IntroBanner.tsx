import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './ui/Reveal';
import RevealText from './ui/RevealText';

/**
 * The introduction band — the site's own advertisement for itself.
 *
 * It rebuilds a printed poster: headline and claims on the left, Akshay on the
 * right, pointing back across at them. The poster's own layout is the reason
 * the photograph works here — the gesture aims into the copy, so the reader's
 * eye lands where the argument is.
 *
 * Rebuilt as markup rather than dropped in as the flat artwork. The poster was
 * green with its type baked into pixels; on this page that would have added a
 * second accent to a design whose whole idea is one, blurred the wording on
 * every large screen, and hidden the headline from search entirely. As markup
 * it stays sharp, readable and the site's own colour.
 */

const POINTS = [
  { icon: Cpu, title: 'AI Powered', note: 'Smart Solutions' },
  { icon: ShieldCheck, title: 'Trusted & Secure', note: 'Your Data, Our Priority' },
  { icon: Zap, title: 'Fast & Reliable', note: 'Performance You Can Count On' },
  { icon: Star, title: 'Built With Passion', note: 'Made for You' },
];

const IntroBanner: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-border bg-section">
      <div className="absolute inset-0 blueprint opacity-60" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-shell px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:gap-8">
          {/* ---- the claim ---- */}
          <div className="min-w-0 pb-4 pt-16 lg:pb-20 lg:pt-24">
            <div className="mb-6 flex items-center gap-3">
              <motion.span
                className="h-px w-8 origin-left bg-wire"
                initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="eyebrow">Built with AI</span>
            </div>

            <h2 className="font-display text-[38px] font-bold leading-[1.02] tracking-tightest text-text sm:text-[48px] lg:text-[62px]">
              <RevealText>Built with AI.</RevealText>
              <span className="block text-wire">
                <RevealText delay={0.12}>Designed for you.</RevealText>
              </span>
            </h2>

            <Reveal delay={0.24}>
              <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
                by Akshay Mahajan &middot; Surat, India
              </p>
            </Reveal>

            <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {POINTS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={0.3 + i * 0.07}>
                    <div className="flex items-start gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] bg-wire text-white">
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-[15px] font-semibold leading-tight text-text">{p.title}</dt>
                        <dd className="mt-1 text-[13.5px] leading-snug text-textSecondary">{p.note}</dd>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </dl>

            <Reveal delay={0.6}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/work"
                  className="btn-signal inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px]"
                >
                  See what I&rsquo;ve built <ArrowRight size={16} />
                </Link>
                <Link
                  to="/services"
                  className="btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px]"
                >
                  What I can build for you
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ---- the photograph ----
              He points left, into the copy. The figure sits flush to the bottom
              rule so he stands on the band rather than floating inside it. */}
          <motion.div
            className="relative mx-auto w-full max-w-[380px] self-end lg:mx-0 lg:max-w-none"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* A flat red panel behind him — the band's one block of colour,
                squared off rather than glowing, so it reads as print. */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-[76%] w-[74%] -translate-x-1/2 rounded-[4px] bg-wire/10"
            />
            <img
              src="/akshay-pointing-1010.webp"
              srcSet="/akshay-pointing-620.webp 620w, /akshay-pointing-1010.webp 1010w"
              /* The column renders around 520px wide on desktop. Declaring less
                 than that made the browser settle for the 620w file, which is
                 short of what a 2x screen needs. */
              sizes="(min-width: 1024px) 520px, 88vw"
              width={1010}
              height={1507}
              alt="Akshay Mahajan"
              className="relative block w-full select-none"
              /* Not lazy: this band sits directly under the hero, so on most
                 screens it is in view before the loader would ever release it,
                 and deferring only buys a visible pop-in. 134 KB. */
              decoding="async"
              fetchPriority="low"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroBanner;
