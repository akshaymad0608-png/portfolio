import React from 'react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import Reveal from './ui/Reveal';

const FinalCTA: React.FC = () => (
  <section className="relative py-24 md:py-32">
    <div className="container mx-auto max-w-shell px-6">
      <Reveal>
        <div className="panel ticked relative overflow-hidden px-7 py-14 text-center md:px-16 md:py-20">
          <div className="absolute inset-0 blueprint opacity-40" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(214,255,63,0.14), transparent)' }}
            aria-hidden="true"
          />

          <div className="relative">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-signal/50" />
              <span className="eyebrow text-signal">Next step</span>
              <span className="h-px w-8 bg-signal/50" />
            </div>

            <h2 className="mx-auto max-w-2xl font-display text-[32px] font-bold leading-[1.06] tracking-tightest text-text md:text-[46px]">
              Bring me the task nobody on your team wants to do.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-textSecondary md:text-lg">
              Twenty minutes, no pitch. You describe the workflow, I tell you whether automating it is
              worth the money — including when it isn't.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://calendly.com/akshaymad0608"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-signal inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 text-[15px] sm:w-auto"
              >
                Book the call <ArrowRight size={17} />
              </a>
              <a
                href="https://wa.me/917600885080?text=Hi%20Akshay%2C%20I%27d%20like%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-medium sm:w-auto"
              >
                <MessageCircle size={17} /> WhatsApp me
              </a>
            </div>

            <a
              href="mailto:akshaymad0608@gmail.com"
              className="mt-8 inline-flex min-h-[28px] items-center gap-2 py-1 font-mono text-[13px] text-textSecondary transition-colors hover:text-wire"
            >
              <Mail size={14} /> akshaymad0608@gmail.com
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default FinalCTA;
