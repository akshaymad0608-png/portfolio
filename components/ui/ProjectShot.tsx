import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ProjectShotProps {
  src?: string;
  /** Live URL — used for the address bar label. */
  link?: string;
  title: string;
  icon?: LucideIcon;
}

const domainOf = (url?: string) => {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  }
};

/**
 * Screenshots sit inside a browser frame, scaled to fit its width, top-aligned.
 *
 * The previous version stretched them to fill a grid cell with object-cover.
 * Because that cell's height is driven by the case-study text beside it, the
 * image got zoomed well past 100% — headlines clipped, buttons the size of a
 * fist. Fitting to width means the shot renders at a sane scale whatever the
 * text does, and the frame makes the cut-off at the bottom read as "the page
 * continues here" rather than as a broken image.
 *
 * Thumbnails come from a third-party service, so failures fall back to a
 * branded panel instead of a broken-image icon.
 */
const ProjectShot: React.FC<ProjectShotProps> = ({ src, link, title, icon: Icon }) => {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-panel p-5 sm:p-7 lg:p-8">
      <div className="absolute inset-0 blueprint opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(closest-side at 50% 0%, rgba(169,166,255,0.12), transparent)' }}
        aria-hidden="true"
      />

      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-cards shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out group-hover:-translate-y-1">
        {/* chrome */}
        <div className="flex items-center gap-2.5 border-b border-border bg-[#0D0E14] px-3.5 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#3A3F4D]" />
            <span className="h-2 w-2 rounded-full bg-[#3A3F4D]" />
            <span className="h-2 w-2 rounded-full bg-[#3A3F4D]" />
          </span>
          <span className="ml-1 flex-1 truncate rounded-md bg-ink/70 px-2.5 py-1 font-mono text-[10.5px] text-muted">
            {domainOf(link) || title.toLowerCase().replace(/\s+/g, '')}
          </span>
        </div>

        {/* viewport */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
          {showImage ? (
            <img
              src={src}
              alt={`${title} homepage`}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
              className="absolute left-0 top-0 w-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              {Icon && (
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-wire/30 bg-cards">
                  <Icon size={22} className="text-wire" />
                </span>
              )}
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{title}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectShot;
