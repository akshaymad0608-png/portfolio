import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, Cpu, Network, Bot, Sparkles, MessageSquare, Image as ImageIcon, Video,
  Code2, Layers, ArrowRight, Play, Zap, Target, Eye, Wrench, Repeat, GraduationCap,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import FinalCTA from '../components/FinalCTA';
import SEO from '../components/SEO';

/* ------------------------------------------------------------------ data --- */

const TIMELINE = [
  { year: '1950', title: 'The question', body: 'Alan Turing asks "Can machines think?" and proposes the Turing Test.' },
  { year: '1956', title: 'AI is named', body: 'At the Dartmouth Conference, John McCarthy coins the term "Artificial Intelligence".' },
  { year: '1997', title: 'Machines win', body: 'IBM Deep Blue beats world chess champion Garry Kasparov.' },
  { year: '2012', title: 'Deep learning', body: 'AlexNet crushes the ImageNet contest — neural networks take over.' },
  { year: '2017', title: 'The transformer', body: '"Attention Is All You Need" introduces the architecture behind every modern LLM.' },
  { year: '2022', title: 'AI goes mainstream', body: 'ChatGPT launches and generative AI reaches hundreds of millions of people.' },
  { year: '2023', title: 'Multimodal & open', body: 'GPT-4, Claude and open models (Llama) handle text, images, audio and code.' },
  { year: '2024–25', title: 'Agentic AI', body: 'AI stops just answering and starts acting — planning and using tools to finish real tasks.' },
];

const CAPABILITY_TYPES = [
  { icon: Cpu, tag: 'Here today', name: 'Narrow AI (ANI)', body: 'Great at one job — chatbots, translation, recommendations, image generation. Every AI you use right now is narrow AI.' },
  { icon: Brain, tag: 'Not here yet', name: 'General AI (AGI)', body: 'Human-level intelligence across any task — learning and reasoning like a person. Still a research goal, not a product.' },
  { icon: Sparkles, tag: 'Hypothetical', name: 'Super AI (ASI)', body: 'Intelligence beyond humans in every field. Entirely theoretical — a topic of debate, not something that exists.' },
];

const NESTING = [
  { name: 'Artificial Intelligence', short: 'AI', body: 'The broad goal: machines doing things that need human-like intelligence.' },
  { name: 'Machine Learning', short: 'ML', body: 'Systems that learn patterns from data instead of being hand-coded with rules.' },
  { name: 'Deep Learning', short: 'DL', body: 'Machine learning using neural networks with many layers — the engine behind modern AI.' },
  { name: 'Generative AI', short: 'GenAI', body: 'Deep learning that creates new content: text, images, audio, video and code.' },
];

const LLM_PIPELINE = [
  { icon: MessageSquare, label: 'Your prompt', sub: 'plain text' },
  { icon: Layers, label: 'Tokens', sub: 'text broken into pieces' },
  { icon: Network, label: 'Transformer', sub: 'billions of parameters' },
  { icon: Zap, label: 'Prediction', sub: 'most likely next token' },
  { icon: Sparkles, label: 'Answer', sub: 'one token at a time' },
];

const GENAI_KINDS = [
  { icon: MessageSquare, name: 'Text', body: 'ChatGPT, Claude, Gemini — writing, answering, summarizing, coding.' },
  { icon: ImageIcon, name: 'Images', body: 'Midjourney, DALL·E, Stable Diffusion — art and product visuals from a prompt.' },
  { icon: Video, name: 'Video & audio', body: 'Sora, Runway, ElevenLabs, HeyGen — clips, voiceovers and avatars.' },
  { icon: Code2, name: 'Code', body: 'Copilot, Cursor, Claude Code — writing and fixing software.' },
];

const AGENT_LOOP = [
  { icon: Target, label: 'Goal', body: 'You give it an objective.' },
  { icon: Brain, label: 'Plan', body: 'It reasons out the steps.' },
  { icon: Wrench, label: 'Act', body: 'It uses tools — search, APIs, code.' },
  { icon: Eye, label: 'Observe', body: 'It checks the result…' },
];

const WATCH = [
  { q: 'What is Artificial Intelligence explained', label: 'AI, explained', topic: 'The big picture in a few minutes' },
  { q: 'What is a Large Language Model LLM explained', label: 'How LLMs work', topic: 'Tokens, training and prediction' },
  { q: 'What is Generative AI explained', label: 'Generative AI', topic: 'How machines create new content' },
  { q: 'What are AI agents and agentic AI explained', label: 'AI agents & agentic AI', topic: 'When AI starts to act on its own' },
];

/* -------------------------------------------------------------- schema/seo -- */

const guideSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'AI, explained simply — from history to agentic AI',
  about: ['Artificial Intelligence', 'Machine Learning', 'Large Language Models', 'Generative AI', 'AI Agents', 'Agentic AI'],
  author: { '@type': 'Person', name: 'Akshay Mahajan' },
  publisher: { '@type': 'Person', name: 'Akshay Mahajan' },
  description:
    'A plain-English guide to AI: what it is, its history, types of AI, machine learning vs deep learning vs generative AI, what a model and an LLM are, and how AI agents and agentic AI work.',
};

/* ----------------------------------------------------------------- blocks -- */

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="rounded-full border border-border bg-cards px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-wire">
    {children}
  </span>
);

const AIGuide: React.FC = () => (
  <PageTransition>
    <SEO
      schema={[guideSchema]}
    />

    <PageHero
      eyebrow="AI Guide"
      title={<>AI, explained simply — <span className="text-gradient">history to agentic AI.</span></>}
      lead="No hype, no jargon walls. What AI actually is, where it came from, and the words everyone throws around — models, LLMs, generative AI, agents — in plain English."
    >
      <div className="flex flex-wrap gap-2">
        <Chip>What is AI</Chip><Chip>Types</Chip><Chip>LLMs</Chip><Chip>Generative AI</Chip><Chip>AI agents</Chip>
      </div>
    </PageHero>

    {/* WHAT IS AI ------------------------------------------------------------ */}
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto max-w-shell px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            eyebrow="Start here"
            title={<>What is<br className="hidden md:block" /> Artificial Intelligence?</>}
          />
          <Reveal delay={0.1}>
            <div className="space-y-5 text-[16px] leading-relaxed text-textSecondary md:text-[17px]">
              <p>
                <span className="font-semibold text-text">Artificial Intelligence (AI)</span> is software that does
                things which normally need human intelligence — understanding language, recognising images, making
                decisions, and solving problems.
              </p>
              <p>
                The key shift: instead of a programmer writing every rule by hand, modern AI <span className="text-text font-medium">learns
                patterns from huge amounts of data</span> and then applies them to new situations it has never seen.
              </p>
              <p>
                That's it at the core. Everything below — machine learning, deep learning, LLMs, generative AI, agents —
                is just a more specific slice of that same idea.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* HISTORY TIMELINE ------------------------------------------------------ */}
    <section className="relative border-y border-border bg-panel py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="How we got here"
          title={<>From a question in 1950<br className="hidden md:block" /> to AI that acts.</>}
          lead="Seven decades in eight moments — the milestones that actually changed what AI could do."
          className="mb-14"
        />
        <ol className="relative grid gap-8 md:grid-cols-2">
          <div className="absolute left-[7px] top-2 bottom-2 hidden w-px bg-border md:block" aria-hidden="true" />
          {TIMELINE.map((item, i) => (
            <li key={item.year} className="relative">
              <Reveal delay={Math.min(i, 6) * 0.05}>
                <div className="flex gap-5 rounded-2xl border border-border bg-cards p-5 md:p-6">
                  <div className="shrink-0">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-wire/30 bg-ink font-mono text-[12px] font-semibold text-wire">
                      {item.year.slice(2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.2em] text-wire">{item.year}</div>
                    <h3 className="mt-1 font-display text-lg font-bold text-text">{item.title}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-textSecondary">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* TYPES OF AI ----------------------------------------------------------- */}
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Types of AI"
          title={<>Narrow, general, super.</>}
          lead="One way to sort AI is by how capable it is. Only the first one actually exists today."
          className="mb-14"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {CAPABILITY_TYPES.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-cards p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-ink text-wire">
                      <Icon size={20} />
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{t.tag}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-text">{t.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-textSecondary">{t.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* NESTING DIAGRAM: AI > ML > DL > GenAI --------------------------------- */}
    <section className="relative border-y border-border bg-panel py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="How the words fit together"
          title={<>AI, ML, deep learning, GenAI —<br className="hidden md:block" /> boxes inside boxes.</>}
          lead="These aren't competing terms. Each one sits inside the last, getting more specific."
          className="mb-14"
        />
        <div className="grid items-center gap-10 lg:grid-cols-[420px_1fr]">
          {/* concentric boxes */}
          <Reveal>
            <div className="rounded-[26px] border-2 border-wire/25 bg-cards p-5">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-wire">AI</span>
              <div className="mt-3 rounded-[22px] border-2 border-wire/35 p-5">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-wire">Machine Learning</span>
                <div className="mt-3 rounded-[18px] border-2 border-wire/50 p-5">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-wire">Deep Learning</span>
                  <div className="mt-3 rounded-[14px] border-2 border-signal bg-wire/5 p-5 text-center">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-signalDim">Generative AI</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          {/* explanations */}
          <div className="space-y-3">
            {NESTING.map((n, i) => (
              <Reveal key={n.short} delay={i * 0.07}>
                <div className="flex gap-4 rounded-xl border border-border bg-cards p-4">
                  <span className="flex h-9 shrink-0 items-center rounded-lg border border-border bg-ink px-2.5 font-mono text-[12px] font-bold text-wire">
                    {n.short}
                  </span>
                  <div>
                    <h3 className="font-semibold text-text">{n.name}</h3>
                    <p className="mt-0.5 text-[14.5px] leading-relaxed text-textSecondary">{n.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* MODEL + LLM ----------------------------------------------------------- */}
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-cards p-7 md:p-9">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-ink text-wire">
                <Layers size={20} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-text">What is a "model"?</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-textSecondary">
                A <span className="font-medium text-text">model</span> is the trained "brain" of an AI. You feed a
                program lots of examples, it adjusts millions or billions of internal numbers (called
                <span className="font-medium text-text"> parameters</span> or weights) until it gets good at a task —
                and that trained result is the model.
              </p>
              <ul className="mt-5 space-y-2 text-[14.5px] text-textSecondary">
                <li className="flex gap-2"><span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-wire" /> <span><span className="text-text">Training</span> — the slow, expensive part where it learns from data.</span></li>
                <li className="flex gap-2"><span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-wire" /> <span><span className="text-text">Inference</span> — the fast part where you actually use it.</span></li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-border bg-cards p-7 md:p-9">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-ink text-wire">
                <MessageSquare size={20} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-text">What is an LLM?</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-textSecondary">
                A <span className="font-medium text-text">Large Language Model</span> is a model trained on enormous
                amounts of text. Its one core skill is deceptively simple: <span className="font-medium text-text">predict
                the next word</span> (token). Do that well enough, billions of times, and it can write, reason,
                translate and code.
              </p>
              <p className="mt-3 text-[14.5px] text-textSecondary">
                Examples: <span className="text-text">GPT (ChatGPT), Claude, Gemini, Llama.</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* LLM pipeline */}
        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-border bg-panel p-6 md:p-8">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">How an LLM answers you</div>
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              {LLM_PIPELINE.map((step, i) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.label}>
                    <div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-cards p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-ink text-wire">
                        <Icon size={18} />
                      </span>
                      <div>
                        <div className="text-[14px] font-semibold text-text">{step.label}</div>
                        <div className="font-mono text-[11px] text-muted">{step.sub}</div>
                      </div>
                    </div>
                    {i < LLM_PIPELINE.length - 1 && (
                      <ArrowRight size={18} className="mx-auto shrink-0 rotate-90 text-wire md:rotate-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* GENERATIVE AI --------------------------------------------------------- */}
    <section className="relative border-y border-border bg-panel py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Generative AI"
          title={<>AI that creates.</>}
          lead="Older AI mostly classified or predicted. Generative AI makes brand-new content — and it's what most people mean today when they say 'AI'."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GENAI_KINDS.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.name} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-cards p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-ink text-wire">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-text">{g.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-textSecondary">{g.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

    {/* AI AGENTS & AGENTIC AI ------------------------------------------------ */}
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="The next step"
          title={<>AI agents & agentic AI.</>}
          lead="A chatbot answers. An agent acts. This is the shift happening right now — and the kind of AI I build into products."
          className="mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-border bg-cards p-7 md:p-9">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-ink text-wire">
                <Bot size={20} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-text">AI Agent</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-textSecondary">
                An <span className="font-medium text-text">AI agent</span> is an LLM given a goal and a set of
                <span className="font-medium text-text"> tools</span> — web search, a database, code, other apps. Instead
                of just replying, it decides which tool to use, uses it, checks the result, and keeps going until the job
                is done.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-border bg-cards p-7 md:p-9">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-ink text-wire">
                <Network size={20} />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-text">Agentic AI</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-textSecondary">
                <span className="font-medium text-text">Agentic AI</span> is the broader idea: systems that
                <span className="font-medium text-text"> plan, decide and act on their own</span> across many steps —
                often several agents working together — to reach a goal with little hand-holding.
              </p>
            </div>
          </Reveal>
        </div>

        {/* agent loop */}
        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-border bg-panel p-6 md:p-8">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">The agent loop</div>
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              {AGENT_LOOP.map((step, i) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.label}>
                    <div className="flex flex-1 items-start gap-3 rounded-xl border border-border bg-cards p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-ink text-wire">
                        <Icon size={18} />
                      </span>
                      <div>
                        <div className="text-[14px] font-semibold text-text">{step.label}</div>
                        <div className="text-[12.5px] leading-snug text-muted">{step.body}</div>
                      </div>
                    </div>
                    {i < AGENT_LOOP.length - 1 && (
                      <ArrowRight size={18} className="mx-auto shrink-0 rotate-90 text-wire md:rotate-0" />
                    )}
                  </React.Fragment>
                );
              })}
              <Repeat size={18} className="mx-auto shrink-0 rotate-90 text-signal md:rotate-0" />
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-signal/40 bg-wire/5 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-signal/40 bg-ink text-signalDim">
                  <Zap size={18} />
                </span>
                <div className="text-[14px] font-semibold text-text">…or finish</div>
              </div>
            </div>
            <p className="mt-5 text-[13.5px] text-muted">
              The loop repeats — plan, act, observe — until the goal is met. That autonomy is what makes it "agentic".
            </p>
          </div>
        </Reveal>
      </div>
    </section>

    {/* WATCH & LEARN --------------------------------------------------------- */}
    <section className="relative border-t border-border bg-panel py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="Watch & learn"
          title={<>Prefer to watch?</>}
          lead="Short, well-made explainers for each idea on this page."
          className="mb-14"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WATCH.map((v, i) => (
            <Reveal key={v.label} delay={i * 0.06}>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(v.q)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-cards transition-all hover:-translate-y-0.5 hover:border-wire/40"
              >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-ink">
                  <div className="absolute inset-0 blueprint opacity-40" aria-hidden="true" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-signal text-ink shadow-lg transition-transform group-hover:scale-110">
                    <Play size={22} className="ml-0.5 fill-current" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[16px] font-bold text-text">{v.label}</h3>
                  <p className="mt-1 text-[13.5px] text-textSecondary">{v.topic}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-wire">
                    Watch <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-2 font-mono text-[12px] text-muted">
            <GraduationCap size={15} className="text-wire" />
            New to this? Read top to bottom — each section builds on the last.
          </p>
        </Reveal>
      </div>
    </section>

    {/* CTA ------------------------------------------------------------------- */}
    <FinalCTA />
  </PageTransition>
);

export default AIGuide;
