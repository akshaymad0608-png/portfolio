import { Bot, Layers, Workflow, Headphones, Code2, Globe, Search, Image as ImageIcon, Video, ShieldCheck, MapPin } from 'lucide-react';

/**
 * `service` matches an option in the SERVICES list on pages/Contact.tsx, so a
 * card can hand someone to the form with their choice already made.
 *
 * `excludes` keeps the page hero's promise of "an honest note on what each one
 * does and doesn't include". The promise was in the copy and never kept, which
 * left the exclusions to surface halfway through a project instead.
 */
export const PACKAGES = [
  {
    title: 'Website development',
    price: 'from $275',
    priceINR: 'from ₹25,000',
    delivery: '1–2 weeks',
    icon: Globe,
    desc: 'A business site that loads fast, reads well on a phone, and is built to be found.',
    features: [
      'Up to 6 pages, designed and built',
      'Responsive down to small phones',
      'SEO structure, metadata and sitemap',
      'Contact form and analytics wired in',
      'Live on your own domain',
    ],
    excludes: 'Copywriting, photography, and the domain and hosting bill are yours.',
    service: 'Website / web app build',
    popular: false,
  },
  {
    title: 'AI agent or chatbot',
    price: 'from $900',
    priceINR: 'from ₹80,000',
    delivery: '3–4 weeks',
    icon: Bot,
    desc: 'For work that needs judgement, not just steps \u2014 replies, research, routing.',
    features: [
      'OpenAI, Claude or Gemini',
      'Trained on your own documents',
      'Vector database set up',
      'Chat widget or API endpoint',
      'Prompt tuning against real cases',
    ],
    excludes: 'Model usage is billed to your own API account, so you see every token.',
    service: 'AI agent or chatbot',
    popular: true,
  },
  {
    title: 'Full product build',
    price: 'from $1,800',
    priceINR: 'from ₹1,60,000',
    delivery: '4–8 weeks',
    icon: Layers,
    desc: 'For when the thing you need doesn\u2019t exist yet and has to be built.',
    features: [
      'React / Next.js front end',
      'Node.js back end',
      'Database design',
      'Auth and security',
      'Deploy and CI/CD pipeline',
    ],
    excludes: 'Hosting, database and third-party services run on your accounts, not mine.',
    service: 'Custom AI tool or micro-SaaS',
    popular: false,
  },
];

export const RETAINERS = [
  {
    title: 'SEO & AI search',
    price: 'from $150 / month',
    priceINR: 'from ₹12,000 / month',
    icon: Search,
    features: ['Technical audit and fixes', 'On-page copy and schema', 'Found by ChatGPT and Perplexity', 'Search Console tracking'],
  },
  {
    title: 'n8n automation build',
    price: 'from $300',
    priceINR: 'from ₹27,000',
    icon: Workflow,
    features: ['n8n, Make or Zapier', 'Up to 3 multi-step workflows', 'API and sheet connections', 'Error alerts that reach you'],
  },
  {
    title: 'AI images',
    price: 'from $75 / batch',
    priceINR: 'from ₹6,500 / batch',
    icon: ImageIcon,
    features: ['20 finished, ready-to-post images', 'Product shots, ads or thumbnails', 'Matched to your brand colours', 'Source files included'],
  },
  {
    title: 'AI video',
    price: 'from $100 / video',
    priceINR: 'from ₹9,000 / video',
    icon: Video,
    features: ['Up to 60 seconds, reel or ad format', 'AI avatar or voiceover', 'Subtitles and background music', 'Two rounds of revisions'],
  },
  {
    title: 'Site audit & rescue',
    price: 'from $175',
    priceINR: 'from ₹15,000',
    icon: ShieldCheck,
    features: ['Indexing and soft-404 fixes', 'Mobile and layout bugs', 'Broken links, assets and previews', 'Written findings you keep'],
  },
  {
    title: 'Local SEO setup',
    price: 'from $120',
    priceINR: 'from ₹10,000',
    icon: MapPin,
    features: ['Name, address and phone made consistent', 'LocalBusiness schema with coordinates', 'Google Business Profile set up', 'Service-area pages'],
  },
  {
    title: 'Advice only',
    price: '$90 / hour',
    priceINR: '₹8,000 / hour',
    icon: Headphones,
    features: ['Architecture review', 'Stack selection', 'Code review', 'AI strategy'],
  },
  {
    title: 'Monthly retainer',
    price: 'quoted per scope',
    priceINR: 'quoted per scope',
    icon: Code2,
    features: ['Ongoing maintenance', 'New features', 'Priority response', 'Reserved hours'],
  },
];

/**
 * The running cost of an automation, said out loud.
 *
 * It is the question every enquiry eventually asks and the one most quotes
 * dodge: fine, but what does it cost me every month after you leave? The
 * figures match /blog/ai-workflow-automation-cost-small-business, which itemises
 * a real bill from a system I run rather than a market average.
 */
