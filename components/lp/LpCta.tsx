import React from 'react';
import { Btn, CALENDLY, EMAIL, Reveal } from './ui';

/** The closing call to action: a deep-navy block with a dotted glow at the bottom. */
const LpCta: React.FC = () => (
  <section className="relative px-4 pb-8 pt-4 md:px-6">
    <Reveal>
      <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-lp-navy px-6 py-24 text-center text-white md:py-28">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(31,91,255,0.45),transparent_70%)]" />
        <div
          aria-hidden="true"
          className="lp-dots absolute inset-x-0 bottom-0 h-[55%]"
          style={{ WebkitMaskImage: 'linear-gradient(to top, #000, transparent)', maskImage: 'linear-gradient(to top, #000, transparent)' }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-[760px] font-lp text-[42px] font-normal leading-[1.04] tracking-[-0.02em] sm:text-[58px] md:text-[66px]">
            Your next project starts with a <span className="whitespace-nowrap">20-minute</span> call.
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-[1.6] text-white/70">
            No pitch deck, no prep. If I'm not the right fit, I'll tell you who is.
          </p>
          <div className="mt-9 flex justify-center">
            <Btn href={CALENDLY} variant="white" arrow>Book a free call</Btn>
          </div>
          <p className="mt-5 text-[14px] text-white/60">
            or email{' '}
            <a href={`mailto:${EMAIL}`} className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              {EMAIL}
            </a>
          </p>
        </div>
      </div>
    </Reveal>
  </section>
);

export default LpCta;
