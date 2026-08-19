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
 * Rebuilt as markup rather than dropped in as the flat artwork. Baked-in type
 * blurs on every large screen and is invisible to search; set as markup it
 * stays sharp and crawlable. The poster's green is now the site's accent and
 * its marker hand sets this one headline, so the rebuild matches the print.
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

            {/* The one line the poster sets by hand, set by hand here too.
                Caveat runs small and open for its point size, so it is stepped
                up about a quarter and the display face's -0.04em tracking is
                dropped — negative tracking on a script collides the letters.
                1.12 leading, not the 1.02 the other headings use: Caveat's
                descenders reach 4px past a 1.0 line box, and RevealText clips
                each word to that box. The padding there covers it, but only by
                a few pixels — this keeps the tails inside the line itself. */}
            <h2 className="font-hand text-[50px] font-bold leading-[1.12] tracking-normal text-text sm:text-[62px] lg:text-[82px]">
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
            {/* A flat green panel behind him — the band's one block of colour,
                squared off rather than glowing, so it reads as print. */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 h-[76%] w-[74%] -translate-x-1/2 rounded-[4px] bg-wire/10"
            />
            <img
              src="/akshay-pointing-900.webp"
              srcSet="/akshay-pointing-620.webp 620w, /akshay-pointing-900.webp 900w"
              /* The column renders around 520px wide on desktop. Declaring less
                 than that made the browser settle for the 620w file, which is
                 short of what a 2x screen needs. */
              sizes="(min-width: 1024px) 520px, 88vw"
              width={900}
              height={1343}
              alt="Akshay Mahajan"
              className="relative block w-full select-none"
              /* Neither lazy nor deprioritised: this band sits directly under
                 the hero, so on most screens it is in view before either would
                 release it, and both only buy a visible pop-in. 90 KB — it was
                 1010w/134 KB, over the 100 KB budget; 900w at a higher quality
                 setting beats 1010w crushed to fit, and is still 1.7x the slot. */
              decoding="async"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroBanner;
