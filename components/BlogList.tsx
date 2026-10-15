import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

/**
 * A mix of published articles and the topics still queued.
 *
 * A post with an `href` renders as a real link; one without renders as a card
 * marked "In progress". That distinction is the whole point — an earlier version
 * showed every topic as a finished article with a date and a read time and
 * nothing behind it, which is a dead end for a reader and a page of unclickable
 * teasers for a crawler.
 */
type Post = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  href?: string;
};

const POSTS: Post[] = [
  {
    id: 0,
    title: 'What AI workflow automation actually costs a small business',
    excerpt:
      '₹15,000–₹60,000 to build one workflow in India, then ₹500–₹3,000 a month. Including the itemised bill for a system I run myself.',
    category: 'Automation',
    readTime: '~6 min',
    href: '/blog/ai-workflow-automation-cost-small-business',
  },
  {
    id: 4,
    title: 'LLM optimization cost for small businesses in India',
    excerpt:
      'Prompt engineering, fine-tuning and RAG compared — written by my own Blog Agent pipeline, scored 93/100 by its own reviewer before it went up.',
    category: 'AI for Business',
    readTime: '~10 min',
    href: '/blog/llm-optimization-cost-small-businesses-india',
  },
  {
    id: 1,
    title: 'How to build an AI agent that survives contact with real users',
    excerpt:
      'Most agent demos work because nobody is trying to break them. Seven decisions on scope, tools, prompt injection, handoff and limits.',
    category: 'AI engineering',
    readTime: '~8 min',
    href: '/blog/ai-agent-that-survives-real-users',
  },
  {
    id: 2,
    title: 'The parts of web development generative AI is genuinely good at',
    excerpt:
      'And the parts where it quietly costs you a week. A working split, useful whether you build sites or buy them.',
    category: 'Web development',
    readTime: '~7 min',
    href: '/blog/generative-ai-in-web-development',
  },
  {
    id: 3,
    title: 'Automating CRM updates and email triage with n8n',
    excerpt:
      'A node-by-node build: classify inbound email, log it to a sheet, alert only when it matters, with the error branches included.',
    category: 'Automation',
    readTime: '~9 min',
    href: '/blog/n8n-crm-email-triage-workflow',
  },
  {
    id: 5,
    title: 'A website for a Surat business: the local SEO checklist',
    excerpt:
      'Google Business Profile, consistent details, reviews, a WhatsApp button, mobile speed and Gujarati pages, in the order to do them.',
    category: 'Local SEO',
    readTime: '~7 min',
    href: '/blog/website-for-surat-business-local-seo',
  },
];

const Card: React.FC<{ post: Post }> = ({ post }) => (
  <>
    <div className="mb-5 flex items-center justify-between gap-3">
      <span className="rounded-md border border-border bg-ink px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-wire">
        {post.category}
      </span>
      {!post.href && (
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
          In progress
        </span>
      )}
    </div>

    <h3 className="font-display text-[19px] font-bold leading-snug text-text">{post.title}</h3>
    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-textSecondary">{post.excerpt}</p>

    <div className="mt-6 flex items-center justify-between border-t border-border pt-5 font-mono text-[11.5px] text-muted">
      <span>{post.readTime}</span>
      {post.href && <ArrowRight size={15} className="text-wire" />}
    </div>
  </>
);

const BlogList: React.FC = () => (
  <section className="relative py-8 pb-24 md:pb-32">
    <div className="container mx-auto max-w-shell px-6">
      <SectionHeading
        eyebrow="Writing"
        title="Everything published so far"
        lead="Six write-ups: what things cost, how the workflows are built and how to avoid the expensive mistakes. Each one ends with the checklist or the steps, so you can use it without hiring anyone."
        className="mb-14"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.08}>
            {post.href ? (
              <Link
                to={post.href}
                className="panel spotlight group flex h-full flex-col p-7 transition-colors hover:border-wire/35"
              >
                <Card post={post} />
              </Link>
            ) : (
              <div className="panel flex h-full flex-col p-7 opacity-90">
                <Card post={post} />
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-border bg-panel p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-lg font-bold text-text">Which one would actually help you?</p>
            <p className="mt-1 text-sm text-textSecondary">
              Tell me and I'll write that one first — or just ask the question directly and skip the article.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-signal inline-flex shrink-0 items-center gap-2 px-6 py-3 text-[15px]"
          >
            Ask me instead <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default BlogList;
