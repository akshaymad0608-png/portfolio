/**
 * Serverless twin of the /api/audit route in server.ts.
 *
 * server.ts only runs under `npm run dev` and `npm start`; the live site is a
 * static deploy on Vercel, so the audit endpoint has to exist here too (the same
 * reason api/chat.ts does). The work happens in lib/audit.ts.
 *
 * The rate limit is per edge instance and resets when the instance is recycled,
 * so it slows a script down rather than stopping one. If this ever gets abused,
 * move the counter to a shared store (Vercel KV or Upstash).
 */

import { AuditError, runAudit } from '../lib/audit';

export const config = { runtime: 'edge' };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const MAX_BODY_CHARS = 2000;
const hits = new Map<string, number[]>();

/** Seconds until this caller may try again, or 0 if they may go ahead. */
function retryAfter(ip: string, now: number): number {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return Math.ceil((recent[0] + WINDOW_MS - now) / 1000);
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return 0;
}

const json = (body: unknown, status: number, extra: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...extra } });

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405, { Allow: 'POST' });
  }

  // Browsers always send Origin on a cross-site POST. Refusing other sites keeps
  // this from being used as someone else's free scanner; server-to-server calls
  // carry no Origin and still work, which is what the rate limit is for.
  const origin = req.headers.get('origin');
  if (origin) {
    let sameSite = false;
    try {
      sameSite = new URL(origin).host === (req.headers.get('host') ?? new URL(req.url).host);
    } catch {
      /* malformed Origin: refuse below */
    }
    if (!sameSite) return json({ error: 'Not allowed from this site.' }, 403);
  }

  const ip =
    req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const wait = retryAfter(ip, Date.now());
  if (wait > 0) {
    return json({ error: 'That is a lot of audits. Please try again in a few minutes.' }, 429, {
      'Retry-After': String(wait),
    });
  }

  let url: unknown;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_CHARS) return json({ error: 'Request too large.' }, 413);
    ({ url } = JSON.parse(raw));
  } catch {
    return json({ error: 'Malformed request.' }, 400);
  }
  if (typeof url !== 'string') return json({ error: 'Enter your website address.' }, 400);

  try {
    return json(await runAudit(url), 200);
  } catch (e) {
    if (e instanceof AuditError) return json({ error: e.message }, e.status);
    console.error('audit failed', e);
    return json({ error: 'The audit failed on my side. Please try again shortly.' }, 500);
  }
}
