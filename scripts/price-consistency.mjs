#!/usr/bin/env node
/**
 * Do the prices quoted in prose match the pricing table?
 *
 * This exists because that answer has been wrong twice. The FAQ said a workflow
 * starts at $1,500 — that is the AI agent tier — and it is the answer Google
 * lifts into the FAQ rich result, so the search listing advertised a price more
 * than three times the real one. Corrected to $450, which turned out to be the
 * website tier. Both times everything type-checked and every test passed,
 * because a wrong number is still a valid string.
 *
 * The prices cannot simply be computed at the call site: scripts/prerender.mjs
 * reads FAQ_DATA out of the source with eval and needs plain literals. So they
 * stay literal and this compares them instead.
 *
 * Run: node scripts/price-consistency.mjs
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

/** title -> USD price, straight out of the pricing data. */
const table = () => {
  const src = read('lib/pricing.ts');
  const out = new Map();
  const re = /title:\s*'([^']+)',\s*\n\s*price:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src))) out.set(m[1], m[2].replace(/^from /, ''));
  if (!out.size) throw new Error('no tiers parsed from lib/pricing.ts — has its shape changed?');
  return out;
};

const PRICES = table();

/**
 * Each claim: the file, the tier it is talking about, and the text that must
 * contain that tier's price. Add a row whenever prose quotes a number.
 */
const CLAIMS = [
  { file: 'components/FAQ.tsx', tier: 'Website development', label: 'website' },
  { file: 'components/FAQ.tsx', tier: 'n8n automation build', label: 'automation build' },
  { file: 'components/FAQ.tsx', tier: 'AI agent or chatbot', label: 'agent/chatbot' },
  { file: 'components/AIChatBot.tsx', tier: 'Website development', label: 'website' },
  { file: 'components/AIChatBot.tsx', tier: 'n8n automation build', label: 'automation build' },
  { file: 'components/AIChatBot.tsx', tier: 'AI agent or chatbot', label: 'agent/chatbot' },
  { file: 'components/AIChatBot.tsx', tier: 'Full product build', label: 'full build' },
];

const problems = [];
for (const { file, tier, label } of CLAIMS) {
  const expected = PRICES.get(tier);
  if (!expected) {
    problems.push(`${file}: tier "${tier}" is no longer in lib/pricing.ts`);
    continue;
  }
  if (!read(file).includes(expected)) {
    problems.push(`${file}: ${label} should quote ${expected} (the "${tier}" tier) and does not`);
  }
}

if (problems.length) {
  console.error('price-consistency: prose disagrees with lib/pricing.ts\n');
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error('\nUpdate the copy, or the site quotes a price that does not exist.');
  process.exit(1);
}

console.log(`price-consistency: ${CLAIMS.length} quoted price(s) match lib/pricing.ts.`);
