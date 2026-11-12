import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { POSTS } from '../BlogList';
import { Reveal, SectionHead } from './ui';

const LpPosts: React.FC = () => {
  const latest = POSTS.filter((p) => p.href).slice(-3).reverse();
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-6">
        <SectionHead
          pill="Writing"
          icon={<BookOpen size={13} aria-hidden="true" />}
          title="Read before you hire."
          lead="Costs, checklists and step-by-step builds. Useful whether or not we ever work together."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06} className="h-full">
              <Link
                to={post.href as string}
                className="group flex h-full flex-col rounded-[24px] border border-lp-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_rgba(15,23,42,0.35)]"
              >
                <span className="self-start rounded-full bg-lp-tint px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-lp-blue">
                  {post.category}
                </span>
                <h3 className="mt-5 font-lp text-[27px] font-normal leading-[1.12] tracking-[-0.01em] text-lp-ink">{post.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-lp-body">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-lp-line pt-4 text-[13px] text-lp-muted">
                  <span>{post.readTime}</span>
                  <ArrowRight size={16} className="text-lp-blue transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[15px] font-semibold text-lp-blue hover:text-lp-deep">
            All writing <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default LpPosts;
