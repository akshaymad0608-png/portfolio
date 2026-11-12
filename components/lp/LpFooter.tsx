import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Mail, MessageCircle, Send } from 'lucide-react';
import { EMAIL, WHATSAPP } from './ui';

const COLS = [
  {
    heading: 'Work with me',
    links: [
      { label: 'Services', to: '/services' },
      { label: 'Case studies', to: '/work' },
      { label: 'Free website audit', to: '/free-website-audit' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Automation plans', to: '/ai-automation-pricing' },
      { label: 'Website developer Surat', to: '/website-developer-surat' },
      { label: 'WhatsApp automation', to: '/whatsapp-automation-small-business' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'About', to: '/about' },
      { label: 'AI guide', to: '/ai-guide' },
      { label: 'Blog', to: '/blog' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
];

/** Light footer card for the home page; same links and newsletter form as the dark footer. */
const LpFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === 'sending') return;
    setState('sending');
    try {
      const res = await fetch('https://formspree.io/f/mbdndbdr', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, _subject: 'Newsletter sign-up: One build a week', message: 'Please add me to "One build a week".' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
      setEmail('');
    } catch {
      setState('error');
    }
  };

  return (
    <footer className="relative px-4 pb-6 pt-4 md:px-6">
      <div className="mx-auto max-w-[1180px] rounded-[28px] border border-lp-line bg-white p-7 md:p-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/akshay-avatar-96.webp" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <p className="text-[17px] font-semibold text-lp-ink">Akshay Mahajan</p>
                <p className="text-[13px] text-lp-muted">Full-stack &amp; AI web developer, Surat</p>
              </div>
            </div>
            <p className="mt-4 max-w-[340px] text-[14.5px] leading-[1.6] text-lp-body">
              One build a week: what I shipped, what broke, and what it cost. Straight to your inbox.
            </p>
            <form onSubmit={subscribe} className="mt-4 flex max-w-[380px] gap-2">
              <label htmlFor="lp-footer-email" className="sr-only">Email address</label>
              <input
                id="lp-footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-full border border-lp-line bg-lp-bg px-4 py-2.5 text-[14px] text-lp-ink outline-none placeholder:text-lp-muted focus:border-lp-blue"
              />
              <button
                type="submit"
                disabled={state === 'sending'}
                className="inline-flex items-center gap-1.5 rounded-full bg-lp-blue px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-lp-deep disabled:opacity-60"
              >
                {state === 'done' ? <Check size={15} aria-hidden="true" /> : <Send size={15} aria-hidden="true" />}
                {state === 'done' ? 'Subscribed' : 'Subscribe'}
              </button>
            </form>
            <p className="mt-2 min-h-[20px] text-[12.5px] text-lp-muted" role="status">
              {state === 'error' && "That didn't go through. Try again, or email me directly."}
              {state === 'done' && 'Thanks. You are on the list.'}
            </p>
          </div>

          {COLS.map((c) => (
            <nav key={c.heading} aria-label={c.heading}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-lp-muted">{c.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-[14.5px] text-lp-body transition-colors hover:text-lp-blue">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-lp-line pt-6 text-[13px] text-lp-muted md:flex-row md:items-center">
          <p>
            &copy; {new Date().getFullYear()} Akshay Mahajan &middot; Surat, Gujarat, India &middot;{' '}
            <a href="tel:+917600885080" className="hover:text-lp-blue">+91 76008 85080</a>
          </p>
          <div className="flex items-center gap-2">
            <a href="https://linkedin.com/in/akshay-mahajan-95bb86187" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full border border-lp-line px-3 py-1.5 text-[12.5px] font-medium hover:border-lp-blue/40 hover:text-lp-blue">LinkedIn</a>
            <a href="https://instagram.com/akshay.website" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-lp-line px-3 py-1.5 text-[12.5px] font-medium hover:border-lp-blue/40 hover:text-lp-blue">Instagram</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-8 w-8 items-center justify-center rounded-full border border-lp-line hover:border-lp-blue/40 hover:text-lp-blue"><MessageCircle size={15} aria-hidden="true" /></a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="flex h-8 w-8 items-center justify-center rounded-full border border-lp-line hover:border-lp-blue/40 hover:text-lp-blue"><Mail size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LpFooter;
