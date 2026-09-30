/**
 * Engine behind /free-website-audit.
 *
 * One request to the visitor's homepage (plus robots.txt and sitemap.xml), a
 * fixed set of checks, and a score that is always the sum of its visible parts.
 * Every finding carries the evidence that produced it. Nothing here calls an
 * LLM, so it costs nothing to run and cannot invent a problem.
 *
 * Runs unchanged on the Vercel Edge runtime (api/audit.ts) and under Node
 * (server.ts): web APIs only, no dns/net/Buffer.
 *
 * The URL comes from a stranger, so fetching it is the risky part. Guards: only
 * http(s) on ports 80/443, domain names only (no IP literals), every hostname
 * resolved and refused if any address is private, redirects followed by hand
 * with the same checks on every hop, and hard caps on time and bytes. DNS goes
 * through DNS-over-HTTPS so the same code works on both runtimes. The fetch
 * resolves the name again itself, so a DNS-rebinding host could still slip past
 * — acceptable because neither runtime has a private network to reach.
 */

export type CheckStatus = 'pass' | 'warn' | 'fail' | 'unknown';
export type CategoryId = 'security' | 'speed' | 'seo' | 'mobile' | 'leads';

export interface AuditCheck {
  id: string;
  category: CategoryId;
  label: string;
  status: CheckStatus;
  earned: number;
  max: number;
  evidence: string;
  why: string;
  fix: string;
}

export interface AuditCategory {
  id: CategoryId;
  label: string;
  earned: number;
  max: number;
  /** Points that could actually be judged; below `max` when checks were unknown. */
  measurable: number;
}

export interface AuditResult {
  url: string;
  finalUrl: string;
  httpStatus: number;
  responseMs: number;
  htmlKb: number;
  /** 0–100 of what could be measured; null when too little could be. */
  score: number | null;
  measurableMax: number;
  categories: AuditCategory[];
  checks: AuditCheck[];
  /** The three checks that cost the most points. */
  priorities: AuditCheck[];
  limitations: string[];
}

export class AuditError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = 'AuditError';
    this.status = status;
  }
}

export type Resolver = (hostname: string) => Promise<string[]>;

export interface AuditDeps {
  fetch: typeof fetch;
  /** Returns every A/AAAA address for a hostname; [] when it does not exist. */
  resolve: Resolver;
}

const USER_AGENT = 'AkshayWebsiteAudit/1.0 (+https://akshay.website/free-website-audit)';
const MAX_REDIRECTS = 4;
const MAIN_TIMEOUT_MS = 9000;
const SIDE_TIMEOUT_MS = 4000;
const MAIN_MAX_BYTES = 1_500_000;
const SIDE_MAX_BYTES = 200_000;
const PARSE_LIMIT = 300_000;

/* ------------------------------------------------------------ address rules -- */

export function isPrivateIPv4(ip: string): boolean {
  const p = ip.split('.').map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true;
  const [a, b, c] = p;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && (c === 0 || c === 2)) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113) ||
    a >= 224
  );
}

export function isPrivateIPv6(ip: string): boolean {
  const s = ip.toLowerCase().replace(/^\[|\]$/g, '');
  if (s === '::' || s === '::1') return true;

  const mapped = s.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]);
  const mappedHex = s.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (mappedHex) {
    const hi = parseInt(mappedHex[1], 16);
    const lo = parseInt(mappedHex[2], 16);
    return isPrivateIPv4(`${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`);
  }

  const first = parseInt(s.split(':')[0], 16);
  if (Number.isNaN(first) || first === 0) return true;
  if ((first & 0xfe00) === 0xfc00) return true; // fc00::/7 unique local
  if ((first & 0xffc0) === 0xfe80) return true; // fe80::/10 link-local
  if ((first & 0xff00) === 0xff00) return true; // multicast
  if (s.startsWith('2001:db8')) return true; // documentation
  if (s.startsWith('64:ff9b:')) return true; // NAT64 can embed a private IPv4
  if (first === 0x2002) return true; // 6to4 embeds an IPv4
  return false;
}

export const isPrivateAddress = (ip: string): boolean =>
  ip.includes(':') ? isPrivateIPv6(ip) : isPrivateIPv4(ip);

const BLOCKED_SUFFIXES = ['.localhost', '.local', '.internal', '.intranet', '.lan', '.home', '.corp', '.private'];

/** Throws unless `u` is something we are willing to send a request to. */
export function assertFetchable(u: URL): string {
  if (u.protocol !== 'http:' && u.protocol !== 'https:') {
    throw new AuditError('Only http and https addresses can be audited.');
  }
  if (u.username || u.password) throw new AuditError('Remove the username and password from the address.');
  if (u.port && u.port !== '80' && u.port !== '443') {
    throw new AuditError('Only standard web ports (80 and 443) can be audited.');
  }

  const host = u.hostname.toLowerCase().replace(/\.$/, '');
  if (!host || host.length > 253) throw new AuditError("That doesn't look like a web address.");
  if (host.startsWith('[') || /^[\d.]+$/.test(host)) {
    throw new AuditError('Please enter a domain name such as example.com, not an IP address.');
  }
  if (host === 'localhost' || BLOCKED_SUFFIXES.some((s) => host.endsWith(s))) {
    throw new AuditError('That address is not on the public internet.');
  }
  const labels = host.split('.');
  if (labels.length < 2 || labels.some((l) => !/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(l))) {
    throw new AuditError("That doesn't look like a web address.");
  }
  if (!/^[a-z]/.test(labels[labels.length - 1])) throw new AuditError("That doesn't look like a web address.");
  return host;
}

/* --------------------------------------------------------------------- DNS -- */

async function timedFetch(
  f: typeof fetch,
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await f(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

const DOH_ENDPOINTS = ['https://cloudflare-dns.com/dns-query', 'https://dns.google/resolve'];

async function dohQuery(f: typeof fetch, name: string, type: 'A' | 'AAAA'): Promise<string[]> {
  const want = type === 'A' ? 1 : 28;
  for (const endpoint of DOH_ENDPOINTS) {
    let json: { Status: number; Answer?: { type: number; data: string }[] };
    try {
      const res = await timedFetch(
        f,
        `${endpoint}?name=${encodeURIComponent(name)}&type=${type}`,
        { headers: { accept: 'application/dns-json' } },
        3000,
      );
      if (!res.ok) continue;
      json = await res.json();
    } catch {
      continue;
    }
    if (json.Status === 3) return [];
    if (json.Status !== 0) continue;
    return (json.Answer ?? []).filter((a) => a.type === want).map((a) => a.data);
  }
  throw new AuditError('The address lookup failed. Please try again in a moment.', 502);
}

export const dohResolver =
  (f: typeof fetch = fetch): Resolver =>
  async (hostname) => {
    const [v4, v6] = await Promise.all([dohQuery(f, hostname, 'A'), dohQuery(f, hostname, 'AAAA')]);
    return [...v4, ...v6];
  };

/* -------------------------------------------------------------- safe fetch -- */

interface Fetched {
  finalUrl: string;
  status: number;
  headers: Headers;
  body: string;
  bytes: number;
  truncated: boolean;
  ms: number;
}

async function readCapped(res: Response, maxBytes: number) {
  const reader = res.body?.getReader();
  if (!reader) return { body: '', bytes: 0, truncated: false };
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  let truncated = false;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.length;
    if (bytes > maxBytes) {
      chunks.push(value.subarray(0, value.length - (bytes - maxBytes)));
      bytes = maxBytes;
      truncated = true;
      await reader.cancel();
      break;
    }
    chunks.push(value);
  }
  const merged = new Uint8Array(bytes);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.length;
  }
  return { body: new TextDecoder('utf-8').decode(merged), bytes, truncated };
}

async function safeFetch(
  start: string,
  deps: AuditDeps,
  opts: { timeoutMs: number; maxBytes: number; accept: string },
  resolved: Map<string, Promise<string[]>>,
): Promise<Fetched> {
  const deadline = Date.now() + opts.timeoutMs;
  let current = start;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    let u: URL;
    try {
      u = new URL(current);
    } catch {
      throw new AuditError("That doesn't look like a web address.");
    }
    const host = assertFetchable(u);

    let addrs = resolved.get(host);
    if (!addrs) {
      addrs = deps.resolve(host);
      resolved.set(host, addrs);
    }
    const list = await addrs;
    if (list.length === 0) throw new AuditError("I couldn't find that domain. Check the spelling.");
    if (list.some(isPrivateAddress)) throw new AuditError('That address is not on the public internet.');

    const remaining = deadline - Date.now();
    if (remaining <= 0) throw new AuditError('The site took too long to answer.', 504);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), remaining);
    const hopStart = Date.now();
    try {
      let res: Response;
      try {
        res = await deps.fetch(u.href, {
          redirect: 'manual',
          signal: ctrl.signal,
          headers: { 'user-agent': USER_AGENT, accept: opts.accept },
        });
      } catch {
        throw new AuditError(
          ctrl.signal.aborted ? 'The site took too long to answer.' : "I couldn't reach that site.",
          ctrl.signal.aborted ? 504 : 502,
        );
      }

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location');
        await res.body?.cancel();
        if (!location) throw new AuditError('The site sent a redirect with nowhere to go.', 502);
        current = new URL(location, u).href;
        continue;
      }
      if (res.status === 0) throw new AuditError("I couldn't follow that site's redirect.", 502);

      const { body, bytes, truncated } = await readCapped(res, opts.maxBytes);
      return { finalUrl: u.href, status: res.status, headers: res.headers, body, bytes, truncated, ms: Date.now() - hopStart };
    } finally {
      clearTimeout(timer);
    }
  }
  throw new AuditError('That address redirects too many times.', 502);
}

/* ------------------------------------------------------------------ parsing -- */

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? (m[1] ?? m[2] ?? m[3] ?? '') : null;
}

const tagsOf = (html: string, name: string, cap = 400): string[] =>
  (html.match(new RegExp(`<${name}\\b[^>]{0,1500}>`, 'gi')) ?? []).slice(0, cap);

interface Page {
  title: string | null;
  description: string | null;
  robotsMeta: string;
  viewport: string | null;
  canonical: string | null;
  lang: string | null;
  h1Count: number;
  og: Set<string>;
  images: { total: number; missingAlt: number };
  hasJsonLd: boolean;
  hasLeadForm: boolean;
  contactChannels: string[];
  hasCta: boolean;
  chatWidget: string | null;
  analytics: string | null;
  usesTagManager: boolean;
  textLength: number;
  clientRendered: boolean;
}

const CHAT_WIDGETS: [string, RegExp][] = [
  ['Tawk.to', /tawk\.to/i],
  ['Crisp', /crisp\.chat/i],
  ['Intercom', /intercom(cdn)?\.(io|com)|widget\.intercom/i],
  ['Tidio', /tidio/i],
  ['Drift', /drift\.com|driftt\.com/i],
  ['LiveChat', /livechatinc\.com/i],
  ['HubSpot chat', /js\.usemessages\.com|hs-scripts\.com/i],
  ['Smartsupp', /smartsupp/i],
  ['Freshchat', /freshchat|wchat\.freshchat/i],
  ['Chatbase', /chatbase\.co/i],
  ['Botpress', /botpress/i],
  ['Voiceflow', /voiceflow/i],
  ['WhatsApp widget', /wa-widget|whatsapp-chat|getbutton\.io|wati\.io/i],
];

const ANALYTICS: [string, RegExp][] = [
  ['Google Analytics', /google-analytics\.com|gtag\(|G-[A-Z0-9]{6,}/i],
  ['Plausible', /plausible\.io/i],
  ['Matomo', /matomo|piwik/i],
  ['Umami', /umami/i],
  ['PostHog', /posthog/i],
  ['Fathom', /usefathom\.com/i],
  ['Microsoft Clarity', /clarity\.ms/i],
  ['Hotjar', /hotjar/i],
  ['Meta Pixel', /fbq\(|connect\.facebook\.net/i],
];

const EMBEDDED_FORMS = /typeform\.com|forms\.gle|docs\.google\.com\/forms|jotform\.com|tally\.so|hsforms\.(com|net)|formspree\.io|web3forms|getform\.io|airtable\.com\/embed|wufoo\.com|paperform\.co/i;
const BOOKING = /calendly\.com|cal\.com|savvycal\.com|tidycal\.com|zcal\.co|meetings\.hubspot\.com|youcanbook\.me|setmore\.com/i;
const CTA_WORDS =
  /\b(book (a|your) (free )?(call|demo|consultation|meeting)|get (a|your) (free )?(quote|estimate|proposal)|request (a )?(quote|demo|proposal|callback)|contact us|get in touch|free consultation|schedule (a )?(call|demo|consultation)|call us|talk to us|start (a|your) project|enquire now|inquire now)\b/i;

/**
 * The page is written by whoever typed the URL, so nothing below may run in
 * more than linear time on hostile input. A lazy `[\\s\\S]*?` behind thousands
 * of unclosed tags rescans to the end of the document from each one; these
 * walk forward with indexOf instead, and every regex has a bounded window.
 */
function visibleText(html: string): string {
  const lower = html.toLowerCase();
  const next = new Map<string, number>();
  let out = '';
  let i = 0;
  while (i < html.length) {
    let at = Infinity;
    let name = '';
    for (const n of ['script', 'style', 'noscript']) {
      let p = next.get(n) ?? -1;
      if (p !== Infinity && p < i) {
        p = lower.indexOf(`<${n}`, i);
        if (p === -1) p = Infinity;
        next.set(n, p);
      }
      if (p < at) {
        at = p;
        name = n;
      }
    }
    if (at === Infinity) {
      out += html.slice(i);
      break;
    }
    out += `${html.slice(i, at)} `;
    const close = lower.indexOf(`</${name}`, at);
    if (close === -1) break;
    const end = lower.indexOf('>', close);
    i = end === -1 ? html.length : end + 1;
  }
  return stripTags(out).replace(/\s+/g, ' ').trim();
}

function stripTags(s: string): string {
  let out = '';
  let i = 0;
  let gt = -2;
  while (i < s.length) {
    const lt = s.indexOf('<', i);
    if (lt === -1) {
      out += s.slice(i);
      break;
    }
    out += s.slice(i, lt);
    if (gt !== -1 && gt < lt) gt = s.indexOf('>', lt);
    if (gt === -1) {
      out += s.slice(lt);
      break;
    }
    if (gt - lt <= 2000) {
      out += ' ';
      i = gt + 1;
    } else {
      out += '<';
      i = lt + 1;
    }
  }
  return out;
}

function formsOf(html: string): string[] {
  const lower = html.toLowerCase();
  const forms: string[] = [];
  let i = 0;
  while (forms.length < 25) {
    const start = lower.indexOf('<form', i);
    if (start === -1) break;
    const close = lower.indexOf('</form', start);
    const end = close === -1 ? start + 20_000 : Math.min(close + 7, start + 20_000);
    forms.push(html.slice(start, end));
    i = start + 5;
  }
  return forms;
}

function parsePage(fullHtml: string): Page {
  const html = fullHtml.slice(0, PARSE_LIMIT);

  const titleMatch = html.match(/<title[^>]{0,300}>([\s\S]{0,400}?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1]).replace(/\s+/g, ' ').trim() : null;

  let description: string | null = null;
  let robotsMeta = '';
  let viewport: string | null = null;
  const og = new Set<string>();
  for (const tag of tagsOf(html, 'meta')) {
    const name = (attr(tag, 'name') ?? '').toLowerCase();
    const prop = (attr(tag, 'property') ?? '').toLowerCase();
    const content = attr(tag, 'content') ?? '';
    if (name === 'description') description = decodeEntities(content).trim();
    else if (name === 'robots') robotsMeta += ` ${content.toLowerCase()}`;
    else if (name === 'viewport') viewport = content;
    if (prop.startsWith('og:') && content.trim()) og.add(prop);
  }

  let canonical: string | null = null;
  for (const tag of tagsOf(html, 'link')) {
    if ((attr(tag, 'rel') ?? '').toLowerCase().split(/\s+/).includes('canonical')) {
      canonical = attr(tag, 'href');
      break;
    }
  }

  const htmlTag = html.match(/<html\b[^>]{0,500}>/i);
  const lang = htmlTag ? attr(htmlTag[0], 'lang') : null;

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  const imgs = tagsOf(html, 'img', 500);
  const missingAlt = imgs.filter((t) => attr(t, 'alt') === null).length;

  const hasJsonLd = /<script\b[^>]{0,500}type\s*=\s*["']application\/ld\+json["']/i.test(html);

  const forms = formsOf(html);
  const embedded = tagsOf(html, 'iframe', 50)
    .concat(tagsOf(html, 'script', 200))
    .some((t) => EMBEDDED_FORMS.test(attr(t, 'src') ?? ''));
  const hasLeadForm =
    embedded ||
    forms.some(
      (f) =>
        !/role\s*=\s*["']search["']/i.test(f.slice(0, 300)) &&
        /<textarea\b|<input\b[^>]{0,300}type\s*=\s*["'](email|tel)["']/i.test(f),
    );

  const contactChannels: string[] = [];
  if (/href\s*=\s*["']?tel:/i.test(html)) contactChannels.push('phone');
  if (/href\s*=\s*["']?mailto:/i.test(html)) contactChannels.push('email');
  if (/href\s*=\s*["']?https?:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\//i.test(html)) {
    contactChannels.push('WhatsApp');
  }

  const visible = visibleText(html);
  const hasCta = BOOKING.test(html) || CTA_WORDS.test(visible);

  const scriptSources = tagsOf(html, 'script', 200).map((t) => attr(t, 'src') ?? '').join(' ');
  const inline = (html.match(/<script\b[^>]{0,500}>[\s\S]{0,4000}?<\/script>/gi) ?? []).slice(0, 60).join(' ');
  const scripts = `${scriptSources} ${inline}`;
  const chatWidget = CHAT_WIDGETS.find(([, re]) => re.test(scripts))?.[0] ?? null;
  const usesTagManager = /googletagmanager\.com\/gtm\.js|GTM-[A-Z0-9]{4,}/i.test(scripts);
  const analytics =
    ANALYTICS.find(([, re]) => re.test(scripts))?.[0] ?? (usesTagManager ? 'Google Tag Manager' : null);

  const shell = /<div\b[^>]{0,300}id\s*=\s*["'](root|app|__next|__nuxt)["']/i.test(html);
  const clientRendered = shell && visible.length < 400;

  return {
    title,
    description,
    robotsMeta,
    viewport,
    canonical,
    lang,
    h1Count,
    og,
    images: { total: imgs.length, missingAlt },
    hasJsonLd,
    hasLeadForm,
    contactChannels,
    hasCta,
    chatWidget,
    analytics,
    usesTagManager,
    textLength: visible.length,
    clientRendered,
  };
}

/* ------------------------------------------------------------------- checks -- */

const CATEGORY_LABELS: Record<CategoryId, string> = {
  security: 'Security',
  speed: 'Speed',
  seo: 'Search visibility',
  mobile: 'Mobile & accessibility',
  leads: 'Turning visitors into enquiries',
};
const CATEGORY_ORDER: CategoryId[] = ['leads', 'seo', 'speed', 'mobile', 'security'];

type Spec = Omit<AuditCheck, 'earned'> & { earned?: number };

const finish = (s: Spec): AuditCheck => ({
  ...s,
  earned: s.status === 'pass' ? s.max : s.status === 'warn' ? Math.round(s.max / 2) : 0,
});

function buildChecks(args: {
  page: Page;
  finalUrl: string;
  headers: Headers;
  ms: number;
  bytes: number;
  truncated: boolean;
  hasRobots: boolean;
  hasSitemap: boolean;
}): AuditCheck[] {
  const { page, finalUrl, headers, ms, bytes, truncated, hasRobots, hasSitemap } = args;
  const https = finalUrl.startsWith('https://');
  const unk = page.clientRendered ? 'unknown' : null;
  const out: AuditCheck[] = [];

  /* leads — 30 */
  out.push(
    finish({
      id: 'lead-form',
      category: 'leads',
      label: 'A way to enquire without leaving the page',
      max: 8,
      status: unk ?? (page.hasLeadForm ? 'pass' : 'fail'),
      evidence: page.clientRendered
        ? 'This page builds itself in the browser, so its forms are not visible to an automated check.'
        : page.hasLeadForm
          ? 'Found a form with an email, phone or message field (or an embedded form service).'
          : 'No form with an email, phone or message field on this page.',
      why: 'Most visitors will not write an email from scratch. A short form catches the ones who would otherwise leave.',
      fix: 'Add a 3-field enquiry form (name, email, what you need) above the fold or right after your services, and send each submission to your phone.',
    }),
    finish({
      id: 'contact-channel',
      category: 'leads',
      label: 'Direct contact: phone, email or WhatsApp',
      max: 7,
      status: unk ?? (page.contactChannels.length > 0 ? 'pass' : 'fail'),
      evidence: page.clientRendered
        ? 'Links are built in the browser, so they could not be checked.'
        : page.contactChannels.length > 0
          ? `Found a link for ${page.contactChannels.join(', ')}.`
          : 'No tap-to-call, mailto or WhatsApp link found on this page.',
      why: 'On mobile, a tap-to-call or WhatsApp link turns a browsing visitor into a conversation in one tap.',
      fix: 'Add a WhatsApp button and a tel: link in the header and footer.',
    }),
    finish({
      id: 'cta',
      category: 'leads',
      label: 'A clear next step',
      max: 5,
      status: unk ?? (page.hasCta ? 'pass' : 'fail'),
      evidence: page.clientRendered
        ? 'The page text is built in the browser, so its buttons could not be read.'
        : page.hasCta
          ? 'Found a booking link or a call-to-action such as "get a quote" or "contact us".'
          : 'No booking link or call-to-action wording ("get a quote", "book a call", "contact us") found.',
      why: 'A page that never asks for anything gets read and closed.',
      fix: 'Put one primary button ("Get a free quote" or "Book a call") in the header and repeat it after each section.',
    }),
    finish({
      id: 'chat',
      category: 'leads',
      label: 'Live chat or an AI assistant',
      max: 5,
      status: page.chatWidget ? 'pass' : page.usesTagManager || page.clientRendered ? 'unknown' : 'fail',
      evidence: page.chatWidget
        ? `Found ${page.chatWidget}.`
        : page.usesTagManager
          ? 'None in the page itself, but Google Tag Manager is present and can load one after the page opens.'
          : page.clientRendered
            ? 'Scripts that load after the page opens could not be checked.'
            : 'No chat widget found.',
      why: 'Questions asked at 11pm are lost leads by morning. An assistant answers them and collects contact details.',
      fix: 'Add an AI chat assistant trained on your services and prices that hands off to WhatsApp or email.',
    }),
    finish({
      id: 'analytics',
      category: 'leads',
      label: 'Measuring visitors',
      max: 5,
      status: page.analytics ? 'pass' : page.clientRendered ? 'unknown' : 'fail',
      evidence: page.analytics
        ? `Found ${page.analytics}.`
        : page.clientRendered
          ? 'Scripts that load after the page opens could not be checked.'
          : 'No analytics script found.',
      why: 'Without numbers you cannot tell which page or source brings enquiries, so every change is a guess.',
      fix: 'Install Google Analytics or a privacy-friendly alternative such as Plausible and track form submissions as goals.',
    }),
  );

  /* seo — 25 */
  const tl = page.title?.length ?? 0;
  out.push(
    finish({
      id: 'title',
      category: 'seo',
      label: 'Page title',
      max: 5,
      status: !page.title ? 'fail' : tl >= 30 && tl <= 65 ? 'pass' : 'warn',
      evidence: page.title ? `"${page.title.slice(0, 90)}" (${tl} characters).` : 'No <title> found.',
      why: 'The title is the blue link on Google. Too long gets cut off; too short wastes the space.',
      fix: 'Write a title of 30–65 characters with what you do and where, e.g. "Web Developer in Surat | Your Name".',
    }),
  );
  const dl = page.description?.length ?? 0;
  out.push(
    finish({
      id: 'description',
      category: 'seo',
      label: 'Meta description',
      max: 5,
      status: !page.description ? 'fail' : dl >= 70 && dl <= 170 ? 'pass' : 'warn',
      evidence: page.description ? `${dl} characters.` : 'No meta description found.',
      why: 'It is the sentence under your link in search results, and it decides whether people click.',
      fix: 'Write one 70–170 character sentence that says what you offer and ends with a reason to click.',
    }),
    finish({
      id: 'h1',
      category: 'seo',
      label: 'One main heading',
      max: 4,
      status: page.h1Count === 1 ? 'pass' : page.h1Count === 0 ? (unk ?? 'fail') : 'warn',
      evidence: page.clientRendered && page.h1Count === 0
        ? 'The heading is built in the browser, so it could not be counted.'
        : `Found ${page.h1Count} <h1> heading${page.h1Count === 1 ? '' : 's'}.`,
      why: 'One clear H1 tells search engines and screen readers what the page is about.',
      fix: 'Use exactly one <h1> stating the main thing you offer; make other headings <h2> and below.',
    }),
    finish({
      id: 'canonical',
      category: 'seo',
      label: 'Canonical link',
      max: 3,
      status: page.canonical ? 'pass' : 'fail',
      evidence: page.canonical ? `Points to ${page.canonical.slice(0, 90)}.` : 'No canonical link found.',
      why: 'It stops the www / non-www and tracking-parameter versions of your page competing with each other.',
      fix: 'Add <link rel="canonical" href="https://yourdomain/"> to each page.',
    }),
    finish({
      id: 'lang',
      category: 'seo',
      label: 'Page language',
      max: 2,
      status: page.lang ? 'pass' : 'fail',
      evidence: page.lang ? `lang="${page.lang.slice(0, 12)}".` : 'No lang attribute on <html>.',
      why: 'Search engines and screen readers use it to pick the right voice and audience.',
      fix: 'Add lang="en" (or lang="en-IN") to the <html> tag.',
    }),
    finish({
      id: 'social',
      category: 'seo',
      label: 'Link preview (Open Graph)',
      max: 3,
      status: page.og.has('og:title') && page.og.has('og:image') ? 'pass' : page.og.size > 0 ? 'warn' : 'fail',
      evidence:
        page.og.size > 0 ? `Found ${[...page.og].slice(0, 5).join(', ')}.` : 'No og: tags found.',
      why: 'When someone shares your link on WhatsApp or LinkedIn, these tags make the preview card. Without them it is a bare link.',
      fix: 'Add og:title, og:description and a 1200×630 og:image.',
    }),
    finish({
      id: 'crawl-files',
      category: 'seo',
      label: 'robots.txt and sitemap',
      max: 2,
      status: hasRobots && hasSitemap ? 'pass' : hasRobots || hasSitemap ? 'warn' : 'fail',
      evidence: `robots.txt: ${hasRobots ? 'found' : 'not found or blocked'}. Sitemap: ${hasSitemap ? 'found' : 'not found or blocked'}.`,
      why: 'They tell Google which pages exist, so new pages get found in days instead of weeks.',
      fix: 'Publish /robots.txt and /sitemap.xml, and submit the sitemap in Google Search Console.',
    }),
  );
  const noindex = /noindex/.test(page.robotsMeta) || /noindex/i.test(headers.get('x-robots-tag') ?? '');
  out.push(
    finish({
      id: 'indexable',
      category: 'seo',
      label: 'Allowed into Google',
      max: 1,
      status: noindex ? 'fail' : 'pass',
      evidence: noindex
        ? 'This page tells search engines not to list it (noindex).'
        : 'No noindex instruction found.',
      why: 'A noindex left on from development keeps a site out of search entirely.',
      fix: 'Remove the noindex robots meta tag or X-Robots-Tag header.',
    }),
  );

  /* speed — 15 */
  out.push(
    finish({
      id: 'response',
      category: 'speed',
      label: 'Page response time',
      max: 10,
      status: ms <= 800 ? 'pass' : ms <= 2000 ? 'warn' : 'fail',
      evidence: `The page arrived in ${ms} ms, measured from my server. A visitor on a phone will see something different.`,
      why: 'Slow pages lose visitors before they read a word, and Google ranks slow sites lower.',
      fix: 'Put the site behind a CDN, enable caching and compression, and cut plugins or scripts that run before the page shows.',
    }),
    finish({
      id: 'weight',
      category: 'speed',
      label: 'Page HTML size',
      max: 5,
      status: truncated || bytes > 500_000 ? 'fail' : bytes > 200_000 ? 'warn' : 'pass',
      evidence: truncated
        ? 'The HTML alone is over 1.5 MB.'
        : `The HTML is ${Math.round(bytes / 1024)} KB, not counting images and scripts.`,
      why: 'A heavy document delays everything that follows, and hurts most on mobile data.',
      fix: 'Remove inline bloat (page-builder markup, embedded data) and load below-the-fold sections on demand.',
    }),
  );

  /* mobile & accessibility — 15 */
  const imgPct = page.images.total ? page.images.missingAlt / page.images.total : 0;
  out.push(
    finish({
      id: 'viewport',
      category: 'mobile',
      label: 'Mobile layout',
      max: 8,
      status: page.viewport && /width\s*=\s*device-width/i.test(page.viewport) ? 'pass' : 'fail',
      evidence:
        page.viewport && /width\s*=\s*device-width/i.test(page.viewport)
          ? 'The viewport meta tag is set for mobile.'
          : 'No mobile viewport meta tag, so phones show a shrunken desktop page.',
      why: 'Most of your visitors are on phones. Without this tag the page is tiny and Google marks it not mobile-friendly.',
      fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> and check the layout at 390px wide.',
    }),
    finish({
      id: 'alt',
      category: 'mobile',
      label: 'Image descriptions (alt text)',
      max: 7,
      status:
        page.images.total === 0
          ? (unk ?? 'pass')
          : imgPct === 0
            ? 'pass'
            : imgPct <= 0.2
              ? 'warn'
              : 'fail',
      evidence:
        page.images.total === 0
          ? page.clientRendered
            ? 'Images are built in the browser, so they could not be counted.'
            : 'No <img> tags on the page.'
          : `${page.images.missingAlt} of ${page.images.total} images have no alt attribute.`,
      why: 'Alt text is how screen-reader users and Google Images understand a picture.',
      fix: 'Give every meaningful image a short alt description; use alt="" for pure decoration.',
    }),
  );

  /* security — 15 */
  const secHeaders: [string, boolean][] = [
    ['X-Content-Type-Options', /nosniff/i.test(headers.get('x-content-type-options') ?? '')],
    [
      'clickjacking protection',
      !!headers.get('x-frame-options') || /frame-ancestors/i.test(headers.get('content-security-policy') ?? ''),
    ],
    ['Referrer-Policy', !!headers.get('referrer-policy')],
    ['Content-Security-Policy', !!headers.get('content-security-policy')],
  ];
  const present = secHeaders.filter(([, ok]) => ok);
  const missing = secHeaders.filter(([, ok]) => !ok);
  out.push(
    finish({
      id: 'https',
      category: 'security',
      label: 'Served over HTTPS',
      max: 8,
      status: https ? 'pass' : 'fail',
      evidence: https ? 'The site ends up on https.' : 'The site is served over plain http.',
      why: 'Browsers label http sites "Not secure", and forms on them scare visitors away.',
      fix: 'Install a free SSL certificate (Let\'s Encrypt or your host\'s one-click option) and redirect all http traffic to https.',
    }),
    finish({
      id: 'hsts',
      category: 'security',
      label: 'HTTPS enforced (HSTS)',
      max: 3,
      status: !https ? 'fail' : headers.get('strict-transport-security') ? 'pass' : 'fail',
      evidence: headers.get('strict-transport-security')
        ? 'The Strict-Transport-Security header is set.'
        : 'No Strict-Transport-Security header.',
      why: 'It tells browsers to never load the site over http again, closing a downgrade attack.',
      fix: 'Send Strict-Transport-Security: max-age=31536000; includeSubDomains once https works everywhere.',
    }),
    finish({
      id: 'sec-headers',
      category: 'security',
      label: 'Basic security headers',
      max: 4,
      status: present.length >= 3 ? 'pass' : present.length >= 1 ? 'warn' : 'fail',
      evidence: `Present: ${present.map(([n]) => n).join(', ') || 'none'}. Missing: ${missing.map(([n]) => n).join(', ') || 'none'}.`,
      why: 'Cheap, invisible protection against clickjacking, content sniffing and script injection.',
      fix: 'Add the missing headers at your host or CDN; most take one line each.',
    }),
  );

  return out;
}

/* -------------------------------------------------------------------- audit -- */

function normalise(input: string): string {
  const raw = input.trim();
  if (!raw || raw.length > 300) throw new AuditError("That doesn't look like a web address.");
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const u = new URL(withScheme);
    u.hash = '';
    return u.href;
  } catch {
    throw new AuditError("That doesn't look like a web address.");
  }
}

export async function runAudit(
  input: string,
  deps: AuditDeps = { fetch: (input, init) => fetch(input, init), resolve: dohResolver() },
): Promise<AuditResult> {
  const url = normalise(input);
  const resolved = new Map<string, Promise<string[]>>();

  const main = await safeFetch(url, deps, { timeoutMs: MAIN_TIMEOUT_MS, maxBytes: MAIN_MAX_BYTES, accept: 'text/html,application/xhtml+xml' }, resolved);

  if (main.status >= 400) {
    throw new AuditError(
      main.status === 403 || main.status === 429 || main.status === 503
        ? `The site refused my request (HTTP ${main.status}). That is common behind bot protection. Message me and I will audit it by hand.`
        : `The site answered with an error (HTTP ${main.status}).`,
      502,
    );
  }
  const type = (main.headers.get('content-type') ?? '').toLowerCase();
  if (type && !type.includes('html')) throw new AuditError('That address is not a web page.');

  const origin = new URL(main.finalUrl).origin;
  const side = async (path: string) => {
    try {
      const r = await safeFetch(`${origin}${path}`, deps, { timeoutMs: SIDE_TIMEOUT_MS, maxBytes: SIDE_MAX_BYTES, accept: '*/*' }, resolved);
      return r.status === 200 ? r : null;
    } catch {
      return null;
    }
  };
  const [robots, sitemap] = await Promise.all([side('/robots.txt'), side('/sitemap.xml')]);
  const robotsOk = !!robots && !/<html/i.test(robots.body.slice(0, 500));
  const sitemapOk =
    (!!sitemap && /<urlset|<sitemapindex/i.test(sitemap.body)) ||
    (robotsOk && /^[ \t]*sitemap:/im.test(robots!.body));

  const page = parsePage(main.body);
  const checks = buildChecks({
    page,
    finalUrl: main.finalUrl,
    headers: main.headers,
    ms: main.ms,
    bytes: main.bytes,
    truncated: main.truncated,
    hasRobots: robotsOk,
    hasSitemap: sitemapOk,
  });

  const categories: AuditCategory[] = CATEGORY_ORDER.map((id) => {
    const own = checks.filter((c) => c.category === id);
    return {
      id,
      label: CATEGORY_LABELS[id],
      earned: own.reduce((n, c) => n + c.earned, 0),
      max: own.reduce((n, c) => n + c.max, 0),
      measurable: own.filter((c) => c.status !== 'unknown').reduce((n, c) => n + c.max, 0),
    };
  });
  const measurableMax = categories.reduce((n, c) => n + c.measurable, 0);
  const earned = categories.reduce((n, c) => n + c.earned, 0);

  const priorities = checks
    .filter((c) => c.status === 'fail' || c.status === 'warn')
    .sort((a, b) => b.max - b.earned - (a.max - a.earned) || CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category))
    .slice(0, 3);

  const limitations = [
    'This checked one page (your homepage) plus robots.txt and sitemap.xml. It is not a full crawl and not a Lighthouse test.',
    'Speed is how fast your server sent the page to mine. A visitor on a phone connection will see something different.',
  ];
  if (page.clientRendered) {
    limitations.push(
      'This page builds itself in the browser, so its forms, buttons and images are invisible to an automated check. Those checks are marked "not measurable" and left out of the score.',
    );
  }
  if (main.truncated) limitations.push('The page was over 1.5 MB, so only the first part was read.');

  return {
    url,
    finalUrl: main.finalUrl,
    httpStatus: main.status,
    responseMs: main.ms,
    htmlKb: Math.round(main.bytes / 1024),
    score: measurableMax >= 30 ? Math.round((earned / measurableMax) * 100) : null,
    measurableMax,
    categories,
    checks,
    priorities,
    limitations,
  };
}
