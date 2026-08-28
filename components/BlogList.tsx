import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

/**
 * A mix of one published article and the topics still queued.
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
    id: 1,
    title: 'How to build an AI agent that survives contact with real users',
    excerpt:
      'Most agent demos work because nobody is trying to break them. What changes when a stranger is on the other end.',
    category: 'AI engineering',
    readTime: '~8 min',
  },
  {
    id: 2,
    title: 'The parts of web development generative AI is genuinely good at',
    excerpt:
      'And the parts where it quietly costs you a week. A working split, from building products this way.',
    category: 'Web development',
    readTime: '~6 min',
  },
  {
    id: 3,
    title: 'Automating CRM updates and email triage with n8n',
    excerpt:
      'A step-by-step build of the workflow I set up most often for small teams, including the error branches nobody mentions.',
    category: 'Automation',
    readTime: '~11 min',
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
        title="What's on the list"
        lead="One published, three queued — all drawn from work I've actually shipped. The queued ones are marked as such rather than dressed up as a back catalogue."
        className="mb-14"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {POSTS.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.08}>
            {post.href ? (
              <a
                href={post.href}
                className="panel spotlight group flex h-full flex-col p-7 transition-colors hover:border-wire/35"
              >
                <Card post={post} />
              </a>
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
