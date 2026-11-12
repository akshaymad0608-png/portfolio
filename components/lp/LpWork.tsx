import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, FolderOpen } from 'lucide-react';
import { PROJECTS } from '../../constants';
import { Reveal, SectionHead, shotProps } from './ui';

const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const LpWork: React.FC = () => (
  <section id="work" className="relative bg-white py-24 md:py-32">
    <div className="mx-auto max-w-[1120px] px-6">
      <SectionHead
        pill="Work"
        icon={<FolderOpen size={13} aria-hidden="true" />}
        title="Five products, all live."
        lead="Built and run by me, end to end. Open any of them and try it."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.06}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-lp-line bg-lp-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-lp-tint">
                <img
                  {...shotProps(p.image, '(min-width: 1024px) 360px, (min-width: 768px) 50vw, 92vw')}
                  alt={`${p.title} screenshot`}
                  width={640}
                  height={400}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-lp-blue">{p.category}</span>
                  <span className="text-[11px] font-medium text-lp-muted">{p.stat}</span>
                </div>
                <h3 className="mt-3 font-lp text-[30px] font-normal leading-[1.1] tracking-[-0.01em] text-lp-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-lp-body">{p.description}</p>
                <p className="mt-5 flex items-center justify-between border-t border-lp-line pt-4 text-[13.5px] font-medium text-lp-ink">
                  {host(p.link)}
                  <ArrowUpRight size={16} className="text-lp-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </p>
              </div>
            </a>
          </Reveal>
        ))}

        <Reveal delay={0.12}>
          <Link
            to="/work"
            className="group flex h-full min-h-[240px] flex-col justify-between rounded-[24px] bg-lp-navy p-7 text-white transition-transform duration-300 hover:-translate-y-1"
          >
            <p className="font-lp text-[34px] leading-[1.08] tracking-[-0.01em]">Read the case studies</p>
            <div>
              <p className="text-[15px] leading-[1.6] text-white/70">
                The problem, the build and the result behind each product.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold">
                See all work <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </div>
  </section>
);

export default LpWork;
