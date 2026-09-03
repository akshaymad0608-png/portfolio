#!/usr/bin/env node
/**
 * data/wf-*.json -> public/diagrams/wf-*.svg
 *
 * The automation builds on /work had nothing to look at. A screenshot of the
 * n8n canvas would have been the obvious answer and the wrong one: it carries
 * sheet IDs and chat IDs in node subtitles, it is someone else's visual
 * language on this page, and it is a 300kB PNG for a picture of boxes.
 *
 * This draws the same graph from the shape alone — names, kinds, canvas
 * positions and wiring — in the site's own palette, as a few kB of SVG that
 * stays sharp at any width. Nothing from the workflow's parameters is read, so
 * there is nothing to leak.
 *
 * Run: node scripts/gen-workflow-diagrams.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DATA = join(ROOT, 'data');
const OUT = join(ROOT, 'public', 'diagrams');

/* Straight out of tailwind.config.js so the diagrams cannot drift from the page. */
const INK = '#0A0A0A';
const MUTED = '#6E6E6E';
const WIRE = '#107808';
const WIRE_DIM = '#BFE3B8';
const BORDER = 'rgba(10, 10, 10, 0.12)';
const SECTION = '#FAFAFA';

const NODE_W = 200;
const NODE_H = 76;
const PAD = 40;
const COL = 244;
const ROW = 104;

/**
 * n8n's canvas coordinates carry a lot of empty space — a branch parked eight
 * hundred units below the trunk reads fine when you can pan around it, and
 * squashes the labels to nothing when the whole graph has to fit a card.
 *
 * So the columns and rows are kept and the gaps between them are not: distinct
 * x and y values (snapped, because hand-placed nodes miss the grid by a few
 * units) become ranks, and ranks get a fixed pitch. Same topology, same rows,
 * a third of the dead space, and labels big enough to read.
 */
const compact = (nodes) => {
  const rank = (values) => {
    const uniq = [...new Set(values.map((v) => Math.round(v / 24) * 24))].sort((a, b) => a - b);
    return new Map(uniq.map((v, i) => [v, i]));
  };
  const cols = rank(nodes.map((n) => n.p[0]));
  const rows = rank(nodes.map((n) => n.p[1]));
  return nodes.map((n) => ({
    ...n,
    p: [cols.get(Math.round(n.p[0] / 24) * 24) * COL, rows.get(Math.round(n.p[1] / 24) * 24) * ROW],
  }));
};

/**
 * Three kinds, because that is what a visitor can actually read at a glance:
 * where the run starts, where a model thinks, and everything in between.
 */
const kindOf = (type) => {
  const t = type.replace('n8n-nodes-base.', '').replace('@n8n/n8n-nodes-langchain.', '');
  if (/Trigger$/i.test(t) || t === 'manualTrigger') return 'trigger';
  if (/^(chainLlm|lmChat|outputParser|agent)/i.test(t)) return 'ai';
  return 'step';
};

const ACCENT = { trigger: WIRE, ai: WIRE, step: 'rgba(10,10,10,0.22)' };

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Two lines beat an ellipsis: these names are the only label a reader gets. */
const wrap = (name, max = 22) => {
  const words = String(name).split(' ');
  const lines = [''];
  for (const w of words) {
    const line = lines[lines.length - 1];
    if (!line) lines[lines.length - 1] = w;
    else if ((line + ' ' + w).length <= max) lines[lines.length - 1] = line + ' ' + w;
    else lines.push(w);
  }
  if (lines.length > 2) {
    const rest = lines.slice(1).join(' ');
    return [lines[0], rest.length > max ? rest.slice(0, max - 1) + '…' : rest];
  }
  return lines;
};

const curve = (x1, y1, x2, y2) => {
  const dx = Math.max(36, Math.abs(x2 - x1) / 2);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
};

const render = (g) => {
  const laid = compact(g.nodes);
  const byName = new Map(laid.map((n) => [n.n, n]));
  const xs = laid.map((n) => n.p[0]);
  const ys = laid.map((n) => n.p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const w = Math.max(...xs) - minX + NODE_W + PAD * 2;
  const h = Math.max(...ys) - minY + NODE_H + PAD * 2;
  const at = (n) => ({ x: n.p[0] - minX + PAD, y: n.p[1] - minY + PAD });

  const wires = [];
  for (const [src, outputs] of Object.entries(g.connections || {})) {
    const from = byName.get(src);
    if (!from) continue;
    const a = at(from);
    outputs.forEach((targets, branch) => {
      for (const t of targets || []) {
        const to = byName.get(t);
        if (!to) continue;
        const b = at(to);
        // Two outputs means an IF: the second one is the "no" path, drawn faint.
        const faint = outputs.length > 1 && branch > 0;
        wires.push(
          `<path d="${curve(a.x + NODE_W, a.y + NODE_H / 2, b.x, b.y + NODE_H / 2)}" fill="none" stroke="${
            faint ? WIRE_DIM : WIRE
          }" stroke-width="${faint ? 1.5 : 2}" stroke-linecap="round"/>`,
        );
      }
    });
  }

  /* Model and parser hang below the node they serve, so they get a dashed stem. */
  for (const [src, targets] of Object.entries(g.ai || {})) {
    const from = byName.get(src);
    if (!from) continue;
    const a = at(from);
    for (const t of targets) {
      const to = byName.get(t);
      if (!to) continue;
      const b = at(to);
      wires.push(
        `<path d="${curve(a.x + NODE_W / 2, a.y, b.x + NODE_W / 2, b.y + NODE_H)}" fill="none" stroke="${WIRE_DIM}" stroke-width="1.5" stroke-dasharray="4 4" stroke-linecap="round"/>`,
      );
    }
  }

  const boxes = laid.map((n) => {
    const { x, y } = at(n);
    const kind = kindOf(n.t);
    const lines = wrap(n.n, 19);
    const text = lines
      .map(
        (l, i) =>
          `<text x="${x + 22}" y="${y + (lines.length === 1 ? 44 : 34 + i * 20)}" font-size="16" fill="${
            i === 0 ? INK : MUTED
          }" font-weight="${i === 0 ? 500 : 400}">${esc(l)}</text>`,
      )
      .join('');
    return `<g>
    <rect x="${x}" y="${y}" width="${NODE_W}" height="${NODE_H}" rx="12" fill="#FFFFFF" stroke="${BORDER}"/>
    <rect x="${x}" y="${y + 16}" width="4" height="${NODE_H - 32}" rx="2" fill="${ACCENT[kind]}"/>
    ${text}
  </g>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(
    g.name,
  )} — ${g.nodes.length} n8n nodes and how they connect">
  <title>${esc(g.name)}</title>
  <defs>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="rgba(10,10,10,0.07)"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="${SECTION}"/>
  <rect width="${w}" height="${h}" fill="url(#dots)"/>
  <g font-family="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
${wires.join('\n')}
${boxes.join('\n')}
  </g>
</svg>
`;
};

mkdirSync(OUT, { recursive: true });
const files = readdirSync(DATA).filter((f) => f.startsWith('wf-') && f.endsWith('.json'));
if (!files.length) {
  console.error('gen-workflow-diagrams: no data/wf-*.json to draw');
  process.exit(1);
}
for (const f of files) {
  const g = JSON.parse(readFileSync(join(DATA, f), 'utf8'));
  const svg = render(g);
  writeFileSync(join(OUT, `wf-${g.id}.svg`), svg);
  console.log(`gen-workflow-diagrams: wf-${g.id}.svg — ${g.nodes.length} nodes, ${(svg.length / 1024).toFixed(1)} kB`);
}
