/**
 * The author's published books, newest first.
 *
 * Every date here comes from Amazon KDP's own "now live" / "published"
 * confirmation emails (Kindle = Kindle eBook live, paperback = paperback
 * published). Subtitles and descriptions are taken from the listing files kept
 * for each book; where no description is on file the field is simply left out
 * rather than written fresh.
 *
 * `amazonUrl` is optional. Until a direct product link is added, the card sends
 * readers to an Amazon search for the title and author, which always resolves.
 */
export interface Book {
  title: string;
  subtitle?: string;
  description?: string;
  /** ISO month, e.g. 2026-11 */
  kindle?: string;
  paperback?: string;
  /** Direct Amazon product URL, once known. */
  amazonUrl?: string;
  /** Path under /public to the real cover image. Falls back to a typographic tile when absent. */
  cover?: string;
  /** Short accent for the typographic cover tile. */
  tone: 'blue' | 'teal' | 'violet' | 'amber' | 'rose';
}

export const BOOKS: Book[] = [
  {
    title: 'Say No Without the Guilt',
    subtitle: 'How to Set Boundaries at Work, Stop People-Pleasing, and Protect Your Time',
    description:
      'A short, practical guide to setting clear boundaries at work: a simple four-part formula for a calm no, real wording for managers and colleagues, and a gentle fourteen-day start.',
    kindle: '2026-11',
    cover: '/books/say-no-without-the-guilt.webp',
    tone: 'violet',
  },
  {
    title: 'The Overthinking Reset',
    subtitle: '21 Days to Calm Your Mind, Decide Faster, and Take Action',
    description:
      'A text-based self-help guide to calming overthinking, with a day-by-day plan that takes 5–10 minutes a day.',
    kindle: '2026-11',
    paperback: '2026-11',
    tone: 'teal',
  },
  {
    title: 'The Quiet Discipline',
    subtitle: 'Build Better Habits, Stop Procrastinating, and Transform Your Life',
    description:
      'A practical, research-informed guide to self-discipline, daily habits and focus, for people who want progress without burnout or self-blame. Twelve chapters, each ending with an exercise.',
    kindle: '2026-10',
    paperback: '2026-10',
    cover: '/books/the-quiet-discipline.webp',
    tone: 'blue',
  },
  {
    title: 'Transform Yourself',
    kindle: '2026-10',
    paperback: '2026-08',
    tone: 'amber',
  },
  {
    title: 'The 5 AM Lie',
    kindle: '2026-07',
    paperback: '2026-08',
    tone: 'rose',
  },
];

export const amazonSearchUrl = (b: Book): string =>
  b.amazonUrl ??
  `https://www.amazon.com/s?k=${encodeURIComponent(`${b.title} Akshay Mahajan`)}`;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const monthLabel = (iso: string): string => {
  const [y, m] = iso.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
};
