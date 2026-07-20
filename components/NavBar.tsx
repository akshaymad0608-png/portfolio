import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Logo from './ui/Logo';

const NAV_LINKS = [
  { name: 'Services', href: '/services' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

// Reachable from the footer and in-page links, but the mobile sheet has the room
// to surface them properly rather than leaving them orphaned.
const SECONDARY_LINKS = [
  { name: 'Case studies', href: '/work' },
  { name: 'Client feedback', href: '/testimonials' },
  { name: 'Blog', href: '/blog' },
];

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on navigation. Scroll restoration lives in App, not here.
  useEffect(() => setIsOpen(false), [location.pathname]);

  // Escape closes the sheet, and focus goes back to the button that opened it —
  // otherwise keyboard users land at the top of the document with no context.
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    sheetRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
          scrolled ? 'border-b border-border bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        {/* fixed height — the old version changed padding on scroll, which nudged
            the whole bar and made the logo jump under the cursor */}
        <div className="container mx-auto flex h-[72px] max-w-shell items-center justify-between px-6">
          <Link to="/" aria-label="Akshay Mahajan, home" className="group flex items-center">
            <Logo size={34} />
          </Link>

          {/* desktop */}
          <nav aria-label="Main" className="hidden items-center gap-1 rounded-full border border-border bg-cards/70 p-1.5 backdrop-blur lg:flex">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative z-10 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                    active ? 'text-wire' : 'text-textSecondary hover:text-text'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-wire/30 bg-wire/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <a
              href="https://calendly.com/akshaymad0608"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-signal inline-flex items-center gap-2 px-5 py-2.5 text-[13.5px]"
            >
              Book a call <ArrowRight size={15} />
            </a>
          </div>

          <button
            ref={toggleRef}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-cards text-text transition-colors hover:border-wire/40 lg:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* reading progress — a wire filling as you scroll */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-wire"
        />
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] overflow-y-auto bg-ink/97 pt-[72px] backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col px-6 pb-14">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    aria-current={location.pathname === link.href ? 'page' : undefined}
                    className={`flex items-center justify-between border-b border-border py-5 font-display text-2xl font-bold ${
                      location.pathname === link.href ? 'text-wire' : 'text-text'
                    }`}
                  >
                    {link.name}
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.a
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                href="https://calendly.com/akshaymad0608"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-signal mt-8 flex items-center justify-center gap-2 py-4 text-base"
              >
                Book a 20-minute call <ArrowRight size={17} />
              </motion.a>

              {/* lower-friction routes for anyone not ready to book a slot */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="mt-3 grid grid-cols-2 gap-3"
              >
                <a
                  href="https://wa.me/917600885080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center justify-center gap-2 py-3.5 text-sm font-medium"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a
                  href="mailto:akshaymad0608@gmail.com"
                  className="btn-ghost flex items-center justify-center gap-2 py-3.5 text-sm font-medium"
                >
                  <Mail size={16} /> Email
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.44 }}
                className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6"
              >
                {SECONDARY_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="font-mono text-[12px] tracking-wide text-muted transition-colors hover:text-wire"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
