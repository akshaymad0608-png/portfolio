#!/usr/bin/env node
/**
 * Does every build on /work also appear in the prerendered copy?
 *
 * This exists because the answer was no and nobody noticed. The /work page
 * renders PROJECTS and INTERNAL_BUILDS from constants.tsx, but the document
 * crawlers and link-preview bots receive is built from the hand-written
 * "points" list in site.routes.json. Nothing connected the two, so adding a
 * build to constants.tsx left it visible only once JavaScript ran. Jewellery
 * Business Intelligence shipped that way and stayed invisible to search for
 * days, which is exactly the failure this catches.
 *
 * The wording is deliberately not derived: the points are shorter and punchier
 * than the case-study summaries, and that is an editorial choice worth keeping.
 * What is enforced is coverage — every title must appear somewhere in the list.
 *
 * Run: node scripts/builds-consistency.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

/**
 * Titles declared in one exported array of constants.tsx.
 *
 * Scoped by bracket-matching the array rather than scanning the whole file,
 * because services, process steps and trust factors all use `title:` too.
 */
const titlesIn = (src, exportName) => {
  const anchor = src.indexOf(`export const ${exportName}`);
  if (anchor === -1) throw new Error(`constants.tsx no longer exports ${exportName}`);
  // Start after the `=`, or the `[` of the type annotation (`Project[]`) wins.
  const start = src.indexOf('[', src.indexOf('=', anchor));
  let depth = 0;
  let end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']' && --depth === 0) { end = i + 1; break; }
  }
  if (end === -1) throw new Error(`could not find the end of ${exportName}`);
  const out = [];
  const re = /title:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src.slice(start, end)))) out.push(m[1]);
  if (!out.length) throw new Error(`no titles parsed from ${exportName} — has its shape changed?`);
  return out;
};

const constants = readFileSync(join(ROOT, 'constants.tsx'), 'utf8');
const manifest = JSON.parse(readFileSync(join(ROOT, 'site.routes.json'), 'utf8'));

const work = manifest.routes.find((r) => r.path === '/work');
if (!work) {
  console.error('builds-consistency: site.routes.json has no /work route');
  process.exit(1);
}

const listed = (work.points || []).join('\n');
const expected = [...titlesIn(constants, 'PROJECTS'), ...titlesIn(constants, 'INTERNAL_BUILDS')];
const missing = expected.filter((t) => !listed.includes(t));

/**
 * A diagram referenced but not generated is a broken image on the page, and
 * nothing else would catch it: the src is a string, so it type-checks fine.
 */
const brokenDiagrams = [];
const diagramRe = /diagram:\s*\{\s*src:\s*"([^"]+)"/g;
let d;
while ((d = diagramRe.exec(constants))) {
  if (!existsSync(join(ROOT, 'public', d[1].replace(/^\//, '')))) brokenDiagrams.push(d[1]);
}
if (brokenDiagrams.length) {
  console.error(
    'builds-consistency: these diagrams are referenced but not in public/.\n' +
      'Run `npm run diagrams` to draw them:\n  ' +
      brokenDiagrams.join('\n  '),
  );
  process.exit(1);
}

if (missing.length) {
  console.error(
    'builds-consistency: these builds render on /work but are missing from the\n' +
      'prerendered copy, so crawlers and link previews never see them.\n' +
      'Add a line for each to the /work "points" in site.routes.json:\n  ' +
      missing.join('\n  '),
  );
  process.exit(1);
}

console.log(`builds-consistency: ${expected.length} builds, all present in the prerendered /work copy`);
