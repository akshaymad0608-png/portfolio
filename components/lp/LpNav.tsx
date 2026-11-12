import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Btn, CALENDLY, EMAIL, WHATSAPP } from './ui';

const LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
];

/** Floating light navigation bar for the home page. */
const LpNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto max-w-[1080px]">
        <div className="flex items-center justify-between rounded-full border border-lp-line bg-white/80 py-2 pl-2.5 pr-2 shadow-[0_6px_30px_-14px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <Link to="/" aria-label="Akshay Mahajan, home" className="flex items-center gap-2.5">
            <img
              src="/akshay-avatar-96.webp"
              alt=""
              width={34}
              height={34}
              className="h-[34px] w-[34px] rounded-full object-cover"
            />
            <span className="text-[15px] font-semibold tracking-tight text-lp-ink">Akshay Mahajan</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-lp-body transition-colors hover:bg-lp-tint hover:text-lp-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Btn href={CALENDLY} arrow className="hidden !px-5 !py-2.5 !text-[14px] sm:inline-flex">
              Book a call
            </Btn>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-lp-ink hover:bg-lp-tint md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 rounded-3xl border border-lp-line bg-white p-4 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.3)] md:hidden">
            <nav aria-label="Site menu" className="flex flex-col">
              {LINKS.concat([{ label: 'Contact', to: '/contact' }]).map((l) => (
                <Link key={l.to} to={l.to} className="rounded-xl px-3 py-3 text-[16px] font-medium text-lp-ink hover:bg-lp-tint">
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 border-t border-lp-line pt-4">
              <Btn href={CALENDLY} arrow>Book a 20-minute call</Btn>
              <div className="flex gap-2">
                <Btn href={WHATSAPP} variant="ghost" className="flex-1 !px-4 !py-2.5 !text-[14px]">WhatsApp</Btn>
                <Btn href={`mailto:${EMAIL}`} variant="ghost" className="flex-1 !px-4 !py-2.5 !text-[14px]">Email</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LpNav;
