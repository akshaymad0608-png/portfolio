import React from 'react';
import { MessageCircle } from 'lucide-react';
import { PROCESS_STEPS } from '../../constants';
import { Pill, Reveal, RevealItem } from './ui';

type Msg = { from: 'client' | 'me'; text: string; time: string };

/** An illustrative thread, not a real client conversation; the card says so. */
const THREAD: Msg[] = [
  { from: 'client', text: 'Hi Akshay, I need a booking site for my clinic. Can it take WhatsApp enquiries too?', time: '10:02' },
  { from: 'me', text: "Yes. I'll send a one-page scope and a fixed quote today. Sites like this usually go live in 1–2 weeks.", time: '10:05' },
  { from: 'me', text: 'A website starts at $275 (about ₹25,000). You see the final number before anything starts.', time: '10:05' },
  { from: 'client', text: "That works. Let's do it.", time: '10:11' },
  { from: 'me', text: 'Scope signed ✓  Day 1: wireframes. Day 5: preview link. Then launch on your own domain.', time: '10:14' },
];

const Bubble: React.FC<{ m: Msg }> = ({ m }) => (
  <div className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14.5px] leading-[1.5] ${
        m.from === 'me'
          ? 'rounded-br-md bg-lp-blue text-white'
          : 'rounded-bl-md border border-lp-line bg-white text-lp-ink'
      }`}
    >
      {m.text}
      <span className={`mt-1 block text-[11px] ${m.from === 'me' ? 'text-white/90' : 'text-lp-muted'}`}>{m.time}</span>
    </div>
  </div>
);

const LpHow: React.FC = () => (
  <section id="how-it-works" className="relative py-24 md:py-32">
    <div className="mx-auto grid max-w-[1120px] items-center gap-14 px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      <div>
        <Reveal>
          <Pill icon={<MessageCircle size={13} aria-hidden="true" />}>How it works</Pill>
          <h2 className="mt-5 font-lp text-[40px] font-normal leading-[1.04] tracking-[-0.02em] text-lp-ink sm:text-[52px]">
            From first message to launch, in five steps.
          </h2>
          <p className="mt-4 max-w-[520px] text-[17px] leading-[1.65] text-lp-body">
            You talk to me, not an agency layer. You see a scope and a price first, and a working preview
            before launch.
          </p>
        </Reveal>

        <ol className="mt-9 space-y-5">
          {PROCESS_STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealItem key={s.id} delay={i * 0.05} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lp-tint text-lp-blue">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[16.5px] font-semibold text-lp-ink">
                    <span className="mr-2 text-lp-muted">{String(i + 1).padStart(2, '0')}</span>
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-[15px] leading-[1.6] text-lp-body">{s.description}</p>
                </div>
              </RevealItem>
            );
          })}
        </ol>
      </div>

      <Reveal delay={0.1}>
        <div className="rounded-[28px] border border-lp-line bg-lp-tint/60 p-4 shadow-[0_40px_80px_-40px_rgba(31,91,255,0.35)] sm:p-6">
          <div className="rounded-[20px] border border-lp-line bg-white p-4 sm:p-5">
            <div className="flex items-center gap-3 border-b border-lp-line pb-4">
              <img src="/akshay-avatar-96.webp" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-[15px] font-semibold text-lp-ink">Akshay Mahajan</p>
                <p className="flex items-center gap-1.5 text-[12.5px] text-lp-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  Replies within a working day
                </p>
              </div>
            </div>
            <div className="space-y-3 pt-5" role="img" aria-label="Example conversation between a client and Akshay about a website project">
              {THREAD.map((m, i) => (
                <Bubble key={i} m={m} />
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-[12px] text-lp-muted">Illustrative conversation. Typical scope, timeline and price.</p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default LpHow;
