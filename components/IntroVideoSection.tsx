import React from 'react';
import Reveal from './ui/Reveal';
import IntroductionVideo from './IntroductionVideo';

export const INTRO_VIDEO = {
  src: '/intro/akshay-intro.mp4',
  poster: '/intro/akshay-intro.webp',
  duration: 'PT53S',
};

const TRANSCRIPT =
  "Hi, I'm Akshay, and welcome to my website! I'm a full-stack developer from Surat, India, and I build with AI. I work in English, Hindi and Gujarati. Here is what I can do for you: websites, AI chatbots, automation, and search visibility. First, websites: fast, mobile-friendly sites, usually live in one to two weeks, with a fixed written quote. Second, AI chatbots that answer customer questions from your own documents and hand over to a person when they are unsure. Third, automation: enquiries from WhatsApp or forms flow into your sheet, and you get an alert only when it matters. Fourth, search: I structure your site so Google and AI assistants can find it and recommend it. I've built and run five live products myself, and you can try every one. Ready to start? Book a free twenty minute call, or message me on WhatsApp.";

/** Schema.org VideoObject for the welcome video, passed to the page's SEO block. */
export const introVideoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Welcome to akshay.website: what Akshay builds',
  description:
    'A one-minute animated welcome from Akshay Mahajan covering websites, AI chatbots, automation and search visibility.',
  thumbnailUrl: `https://akshay.website${INTRO_VIDEO.poster}`,
  contentUrl: `https://akshay.website${INTRO_VIDEO.src}`,
  uploadDate: '2026-10-15',
  duration: INTRO_VIDEO.duration,
  inLanguage: 'en',
  transcript: TRANSCRIPT,
};

/** Animated welcome and services overview, placed under the intro band on the home page. */
const IntroVideoSection: React.FC = () => (
  <section className="relative py-16 md:py-24" aria-labelledby="intro-video-title">
    <div className="container mx-auto max-w-shell px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-wire" />
            <span className="eyebrow">Start here</span>
          </div>
          <h2
            id="intro-video-title"
            className="font-display text-[30px] font-bold leading-[1.15] tracking-tightest text-text md:text-[40px]"
          >
            A one-minute tour of what I build
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.7] text-textSecondary">
            Press play for a short animated welcome: who I am, the four things I do, and how to start.
            Captions are on.
          </p>
        </Reveal>
        <div className="mt-8">
          <IntroductionVideo src={INTRO_VIDEO.src} poster={INTRO_VIDEO.poster} variant="player" />
        </div>
        <details className="mt-5 text-[15.5px] leading-[1.7] text-textSecondary">
          <summary className="cursor-pointer font-mono text-[11.5px] uppercase tracking-[0.16em] text-muted hover:text-wire">
            Read the transcript
          </summary>
          <p className="mt-3">{TRANSCRIPT}</p>
        </details>
      </div>
    </div>
  </section>
);

export default IntroVideoSection;
