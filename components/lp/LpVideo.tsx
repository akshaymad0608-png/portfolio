import React from 'react';
import { PlayCircle } from 'lucide-react';
import IntroductionVideo from '../IntroductionVideo';
import { INTRO_VIDEO, TRANSCRIPT } from '../IntroVideoSection';
import { Reveal, SectionHead } from './ui';

/** The welcome video the page's VideoObject structured data describes. */
const LpVideo: React.FC = () => (
  <section className="relative bg-white py-24 md:py-32" aria-labelledby="lp-video-title">
    <div className="mx-auto max-w-[900px] px-6">
      <SectionHead
        pill="Start here"
        icon={<PlayCircle size={13} aria-hidden="true" />}
        title={<span id="lp-video-title">A one-minute tour of what I build.</span>}
        lead="Press play for a short animated welcome: who I am, the four things I do, and how to start. Captions are on."
      />
      <Reveal delay={0.1} className="mt-12">
        <div className="overflow-hidden rounded-[28px] border border-lp-line shadow-[0_40px_80px_-40px_rgba(15,23,42,0.4)]">
          <IntroductionVideo src={INTRO_VIDEO.src} poster={INTRO_VIDEO.poster} variant="player" />
        </div>
        <details className="mt-6 text-[15.5px] leading-[1.7] text-lp-body">
          <summary className="cursor-pointer text-[13px] font-semibold uppercase tracking-[0.12em] text-lp-muted hover:text-lp-blue">
            Read the transcript
          </summary>
          <p className="mt-3">{TRANSCRIPT}</p>
        </details>
      </Reveal>
    </div>
  </section>
);

export default LpVideo;
