import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import { POSTS } from './BlogList';

/**
 * Three recent write-ups on the home page.
 *
 * Posts used to be reachable only from /blog, one click down. Linking them
 * from the page that gets the most visits gives them a path in for visitors
 * and for crawlers, and gives a first-time visitor something to read before
 * deciding to talk to anyone.
 */
const LatestPosts: React.FC = () => {
  const latest = POSTS.filter((p) => p.href).slice(-3).reverse();
  return (
    <section className="relative py-20 md:py-28">
      <div className="container mx-auto max-w-shell px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Writing"
            title={<>Read before you hire.</>}
            lead="Costs, checklists and step-by-step builds. Useful whether or not we ever work together."
          />
          <Reveal delay={0.1}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[14.5px] font-medium text-text hover:text-wire"
            >
              All writing <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <Link
                to={post.href as string}
                className="panel spotlight group flex h-full flex-col p-7 transition-colors hover:border-wire/35"
              >
                <span className="self-start rounded-md border border-border bg-ink px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-wire">
                  {post.category}
                </span>
                <h3 className="mt-5 font-display text-[19px] font-bold leading-snug text-text">{post.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-textSecondary">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-5 font-mono text-[11.5px] text-muted">
                  <span>{post.readTime}</span>
                  <ArrowRight size={15} className="text-wire" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPosts;
