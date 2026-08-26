/**
 * Reads the AI news digest out of the Google Sheet that the n8n workflow writes
 * to every morning, so /work can show the automation's actual output rather than
 * a description of it.
 *
 * The sheet is read through Google's gviz CSV endpoint, which needs no API key
 * as long as the document is link-shareable. That keeps the deploy free of
 * another secret, and the data is public AI-blog headlines either way.
 *
 * Shared by api/news.ts (Vercel) and the /api/news route in server.ts (local),
 * because those two have to stay in step and duplicating the parser is how they
 * stop being in step.
 */

const SHEET_ID = process.env.NEWS_SHEET_ID ?? '1y8k9ge8_3GPBuwiIIIMu0zCNK7D5ahZYuRNP2ceuf0s';
const SHEET_TAB = process.env.NEWS_SHEET_TAB ?? 'Sheet1';
const MAX_ITEMS = 12;

export interface NewsItem {
  date: string;
  title: string;
  link: string;
  source: string;
}

/**
 * Minimal RFC-4180 reader. Google quotes any field containing a comma and
 * doubles inner quotes, and headlines contain commas constantly, so splitting
 * on ',' loses half the titles.
 */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      quoted = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (ch !== '\r') {
      field += ch;
    }
  }

  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function isHttpUrl(value: string): boolean {
  return value.startsWith('https://') || value.startsWith('http://');
}

export async function fetchNews(): Promise<NewsItem[]> {
  const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
    `?tqx=out:csv&sheet=${encodeURIComponent(SHEET_TAB)}`;

  const res = await fetch(url, { headers: { accept: 'text/csv' } });
  if (!res.ok) {
    throw new Error(`Sheet responded ${res.status}`);
  }

  const rows = parseCsv(await res.text());
  if (rows.length === 0) return [];

  // Row 0 is the header the workflow writes: date, title, link, source.
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = {
    date: header.indexOf('date'),
    title: header.indexOf('title'),
    link: header.indexOf('link'),
    source: header.indexOf('source'),
  };
  if (col.title === -1 || col.link === -1) {
    throw new Error('Sheet is missing the title/link columns');
  }

  const seen = new Set<string>();
  const items: NewsItem[] = [];

  // Newest rows are appended last, so walk backwards and stop once we have enough.
  for (let i = rows.length - 1; i >= 1; i -= 1) {
    const row = rows[i];
    const link = (row[col.link] ?? '').trim();
    const title = (row[col.title] ?? '').trim();

    if (!title || !isHttpUrl(link) || seen.has(link)) continue;
    seen.add(link);

    const rawSource = col.source === -1 ? '' : (row[col.source] ?? '').trim();
    items.push({
      date: col.date === -1 ? '' : (row[col.date] ?? '').trim(),
      title,
      link,
      // The first workflow run wrote this column empty, so derive it when missing.
      source: rawSource || link.split('/')[2] || '',
    });

    if (items.length >= MAX_ITEMS) break;
  }

  return items;
}
