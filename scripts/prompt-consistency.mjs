#!/usr/bin/env node
/**
 * Does the chat assistant still know the real services and prices?
 *
 * prompt.ts restates them as literals because it is bundled into an edge
 * function and the sources (constants.tsx, lib/pricing.ts) both import
 * lucide-react. Restating means they can drift, and a chatbot quoting a price
 * that no longer exists is worse than one that says it does not know: the
 * visitor acts on it.
 *
 * So this asserts coverage. Every service title and every pricing tier — with
 * its dollar and rupee figures — has to appear in the instruction. The prose
 * around them is free.
 *
 * Run: node scripts/prompt-consistency.mjs
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

const prompt = read('prompt.ts');

/** Service titles, scoped to the SERVICES array. */
const serviceTitles = () => {
  const src = read('constants.tsx');
  const anchor = src.indexOf('export const SERVICES');
  if (anchor === -1) throw new Error('constants.tsx no longer exports SERVICES');
  // Start after the `=`, or the `[` of the type annotation (`Service[]`) wins.
  const start = src.indexOf('[', src.indexOf('=', anchor));
  let depth = 0;
  let end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']' && --depth === 0) { end = i + 1; break; }
  }
  const out = [];
  const re = /title:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src.slice(start, end)))) out.push(m[1]);
  if (!out.length) throw new Error('no service titles parsed — has SERVICES changed shape?');
  return out;
};

/** Every tier as {title, price, priceINR}, straight out of the pricing data. */
const tiers = () => {
  const src = read('lib/pricing.ts');
  const out = [];
  const re = /title:\s*'([^']+)',\s*\n\s*price:\s*'([^']+)',\s*\n\s*priceINR:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src))) out.push({ title: m[1], price: m[2], priceINR: m[3] });
  if (!out.length) throw new Error('no tiers parsed from lib/pricing.ts — has its shape changed?');
  return out;
};

const problems = [];

for (const title of serviceTitles()) {
  if (!prompt.includes(title)) problems.push(`service "${title}" is missing from prompt.ts`);
}

for (const { title, price, priceINR } of tiers()) {
  if (!prompt.includes(title)) {
    problems.push(`tier "${title}" is missing from prompt.ts`);
    continue;
  }
  // "from $275" also matches a prompt written as "from $275 / from ₹25,000".
  if (!prompt.includes(price)) problems.push(`tier "${title}" should quote ${price} and does not`);
  if (!prompt.includes(priceINR)) problems.push(`tier "${title}" should quote ${priceINR} and does not`);
}

if (problems.length) {
  console.error(
    'prompt-consistency: the chat assistant would answer with stale facts.\n  ' + problems.join('\n  '),
  );
  process.exit(1);
}

console.log(
  `prompt-consistency: ${serviceTitles().length} services and ${tiers().length} price tiers all present in prompt.ts.`,
);
