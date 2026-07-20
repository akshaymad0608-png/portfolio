import React from 'react';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  lead,
  align = 'left',
  className = '',
}) => {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}>
      <Reveal>
        <div className={`flex items-center gap-3 mb-5 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-wire/50" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="text-[32px] md:text-[44px] lg:text-[52px] leading-[1.05] font-display font-bold text-text">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-textSecondary text-base md:text-lg leading-relaxed">{lead}</p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
