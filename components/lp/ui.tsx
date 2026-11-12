import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/** "/work/x.webp" (1200 px) -> props for a 640 px / 1200 px srcset. */
export const shotProps = (src: string, sizes: string) => ({
  src: src.replace(/\.webp$/, '-640.webp'),
  srcSet: `${src.replace(/\.webp$/, '-640.webp')} 640w, ${src} 1200w`,
  sizes,
});

export const CALENDLY = 'https://calendly.com/akshaymad0608';
export const WHATSAPP = 'https://wa.me/917600885080';
export const EMAIL = 'akshaymad0608@gmail.com';

/** Fades and lifts a block in once, the first time it scrolls into view. */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Same reveal, but renders an <li> so it can sit directly inside a <ul>/<ol>. */
export const RevealItem: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className,
}) => {
  const reduced = useReducedMotion();
  return (
    <motion.li
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.li>
  );
};

/** The small rounded label above a section heading. */
export const Pill: React.FC<{ icon?: React.ReactNode; children: React.ReactNode; className?: string }> = ({
  icon,
  children,
  className = '',
}) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border border-lp-line bg-white px-3 py-1 text-[12.5px] font-medium text-lp-body shadow-[0_1px_0_rgba(15,23,42,0.03)] ${className}`}
  >
    {icon}
    {children}
  </span>
);

type BtnProps = {
  variant?: 'primary' | 'ghost' | 'white';
  href?: string;
  to?: string;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-all duration-200';
const BTN_VARIANT = {
  primary:
    'bg-lp-blue text-white shadow-[0_10px_28px_-10px_rgba(31,91,255,0.75)] hover:-translate-y-0.5 hover:bg-lp-deep',
  ghost: 'border border-lp-line bg-white text-lp-ink hover:-translate-y-0.5 hover:border-lp-blue/40',
  white: 'bg-white text-lp-ink hover:-translate-y-0.5 hover:bg-lp-tint',
};

/** One button for both external links and in-app routes. */
export const Btn: React.FC<BtnProps> = ({ variant = 'primary', href, to, arrow, className = '', children, onClick }) => {
  const cls = `${BTN_BASE} ${BTN_VARIANT[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight size={16} aria-hidden="true" />}
    </>
  );
  if (to) return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
  return (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {inner}
    </a>
  );
};

/** Pill + serif heading + lead, used at the top of each section. */
export const SectionHead: React.FC<{
  pill: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  icon?: React.ReactNode;
}> = ({ pill, title, lead, align = 'center', icon }) => (
  <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
    <Reveal>
      <Pill icon={icon}>{pill}</Pill>
      <h2 className="mt-5 font-lp text-[38px] font-normal leading-[1.05] tracking-[-0.02em] text-lp-ink sm:text-[48px] md:text-[56px]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[17px] leading-[1.65] text-lp-body">{lead}</p>}
    </Reveal>
  </div>
);
