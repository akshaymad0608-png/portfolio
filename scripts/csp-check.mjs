#!/usr/bin/env node
/**
 * Does the CSP allow every origin the app actually calls?
 *
 * This exists because it did not. `connect-src` listed Google Analytics and two
 * GitHub APIs but not formspree.io, which is where the contact form posts. The
 * browser blocked every submission before it left the page, the catch branch
 * showed "That didn't go through", and nothing reached the inbox. Nothing in
 * the build, the type checker or a local dev run notices: the CSP header is set
 * by Vercel in production only, so the form works perfectly on localhost.
 *
 * Run: node scripts/csp-check.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const SKIP = new Set(['node_modules', 'dist', '.git', 'public', '.vercel']);
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);

/** Every https:// origin passed to fetch() or axios in the source. */
const collectCalledOrigins = (dir, found = new Map()) => {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      collectCalledOrigins(full, found);
      continue;
    }
    if (!EXTS.has(extname(name))) continue;

    const src = readFileSync(full, 'utf8');
    const re = /(?:fetch|axios(?:\.\w+)?)\s*\(\s*[`'"](https:\/\/[^`'"\s)]+)/g;
    let m;
    while ((m = re.exec(src))) {
      const origin = new URL(m[1]).origin;
      if (!found.has(origin)) found.set(origin, full.replace(ROOT + '\\', '').replace(ROOT + '/', ''));
    }
  }
  return found;
};

const cspOf = () => {
  const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
  for (const block of vercel.headers ?? []) {
    const h = (block.headers ?? []).find((x) => x.key === 'Content-Security-Policy');
    if (h) return h.value;
  }
  return null;
};

const csp = cspOf();
if (!csp) {
  console.error('csp-check: no Content-Security-Policy in vercel.json');
  process.exit(1);
}

const connectSrc = (csp.split(';').find((d) => d.trim().startsWith('connect-src')) ?? '')
  .trim()
  .split(/\s+/)
  .slice(1);

/** `https://*.analytics.google.com` has to match `https://region1.analytics.google.com`. */
const allowed = (origin) =>
  connectSrc.some((entry) => {
    if (entry === origin || entry === "'self'") return entry === origin;
    if (!entry.includes('*')) return false;
    const re = new RegExp('^' + entry.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^.]+') + '$');
    return re.test(origin);
  });

const missing = [...collectCalledOrigins(ROOT)].filter(([origin]) => !allowed(origin));

if (missing.length) {
  console.error('csp-check: connect-src blocks origins the code calls:\n');
  for (const [origin, file] of missing) console.error(`  ✗ ${origin}   (${file})`);
  console.error('\nAdd them to connect-src in vercel.json, or the call fails silently in production.');
  process.exit(1);
}

console.log(`csp-check: ${collectCalledOrigins(ROOT).size} called origin(s), all allowed by connect-src.`);
