import Logo from './ui/Logo';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Send, Check } from 'lucide-react';

const NAV = [
  { heading: 'Work with me', links: [
    { label: 'Services', to: '/services' },
    { label: 'Case studies', to: '/work' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
  ]},
  { heading: 'More', links: [
    { label: 'About', to: '/about' },
    { label: 'Testimonials', to: '/testimonials' },
    { label: 'Blog', to: '/blog' },
  ]},
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'done'>('idle');

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState('done');
    setEmail('');
    setTimeout(() => setState('idle'), 3500);
  };

  return (
    <footer className="relative overflow-hidden border-t border-border bg-panel pt-20 pb-10">
      <div className="absolute inset-0 blueprint opacity-50" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-shell px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <Logo size={34} />
            </Link>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-textSecondary">
              AI agents, chatbots and automation pipelines for businesses that are tired of doing the
              same thing by hand every week.
            </p>

            <div className="mt-7 flex gap-3">
              <a
                href="https://linkedin.com/in/akshay-mahajan-95bb86187"
                target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-cards text-textSecondary transition-all hover:-translate-y-0.5 hover:border-wire/40 hover:text-wire"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href="https://instagram.com/akshay.website"
                target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-cards text-textSecondary transition-all hover:-translate-y-0.5 hover:border-wire/40 hover:text-wire"
              >
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>

          {NAV.map((group) => (
            <nav key={group.heading} className="lg:col-span-2">
              <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {group.heading}
              </h2>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="group inline-flex min-h-[40px] items-center gap-1 py-1 text-[15px] text-textSecondary transition-colors hover:text-wire"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={14}
                        className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              One automation a week
            </h2>
            <p className="mb-4 text-[15px] leading-relaxed text-textSecondary">
              A short email with one workflow you can copy. No course, no upsell.
            </p>
            <form onSubmit={subscribe} className="relative">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-border bg-ink py-3 pl-4 pr-12 text-sm text-text placeholder-muted transition-colors focus:border-wire/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-wire transition-colors hover:bg-wire/10"
              >
                {state === 'done' ? <Check size={17} /> : <Send size={16} />}
              </button>
            </form>
            {state === 'done' && (
              <p className="mt-2 font-mono text-[11.5px] text-wire">Subscribed. First one lands Monday.</p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="font-mono text-[12px] text-muted">
            &copy; {new Date().getFullYear()} Akshay Mahajan &middot; Surat, India
          </p>
          <p className="flex items-center gap-2 font-mono text-[12px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-wire pulse-soft" />
            All systems running
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
