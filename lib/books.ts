/**
 * The author's published books, newest first.
 *
 * Every date here comes from Amazon KDP's own "now live" / "published"
 * confirmation emails (Kindle = Kindle eBook live, paperback = paperback
 * published). Subtitles and descriptions are taken from the listing files kept
 * for each book; where no description is on file the field is simply left out
 * rather than written fresh.
 *
 * `amazonUrl` is the amazon.com product page (ASIN) of the Kindle edition. Where it is
 * not set yet, the card sends readers to an Amazon search for the title and author.
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
      'A short, practical guide with simple tools drawn from published psychology research, plus a 21-day plan that takes just 5–10 minutes a day. Spot the overthinking loop, use a 10-minute worry window and make decisions faster with four simple rules.',
    kindle: '2026-11',
    paperback: '2026-11',
    amazonUrl: 'https://www.amazon.com/dp/B0HDXTSNV4',
    cover: '/books/the-overthinking-reset.webp',
    tone: 'teal',
  },
  {
    title: 'The Quiet Discipline',
    subtitle: 'Build Better Habits, Stop Procrastinating, and Transform Your Life',
    description:
      'A practical, research-informed guide to self-discipline, daily habits and focus, for people who want steady progress without burnout or self-blame.',
    kindle: '2026-10',
    paperback: '2026-10',
    amazonUrl: 'https://www.amazon.com/dp/B0HM9BPWVB',
    cover: '/books/the-quiet-discipline.webp',
    tone: 'blue',
  },
  {
    title: 'Transform Yourself',
    subtitle:
      'A Practical Guide to Building Better Habits, Developing a Stronger Mindset, Overcoming Procrastination, and Creating Lasting Change',
    description:
      'Most books tell you that you need more discipline. This one starts somewhere more useful: change does not fail randomly, it fails at a specific point.',
    kindle: '2026-10',
    paperback: '2026-08',
    amazonUrl: 'https://www.amazon.com/dp/B0HLY6PZCH',
    cover: '/books/transform-yourself.webp',
    tone: 'amber',
  },
  {
    title: 'The 5 AM Lie',
    subtitle: 'Ditch the Guru Schedules, Find Your Natural Rhythm, and Get More Done in Your Own Best Hours',
    description:
      'Wake up at 5 AM, take a cold shower, hustle before sunrise: the biggest lie in self-help. There is no universal magic hour, but there is a personal one. Using the science of circadian rhythms and chronotypes, it shows you how to stop copying someone else\'s schedule and design your day around the clock already built into your body.',
    kindle: '2026-07',
    paperback: '2026-08',
    amazonUrl: 'https://www.amazon.com/dp/B0HCCG97K9',
    cover: '/books/the-5-am-lie.webp',
    tone: 'rose',
  },
];

export const amazonSearchUrl = (b: Book): string =>
  b.amazonUrl ??
  `https://www.amazon.com/s?k=${encodeURIComponent(`"${b.title}" Akshay Mahajan`)}&i=digital-text`;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const monthLabel = (iso: string): string => {
  const [y, m] = iso.split('-');
  return `${MONTHS[Number(m) - 1]} ${y}`;
};
