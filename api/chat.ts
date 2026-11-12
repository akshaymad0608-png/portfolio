/**
 * Serverless twin of the /api/chat route in server.ts.
 *
 * server.ts only runs under `npm run dev` and `npm start`. The live site is a
 * static deploy on Vercel, where nothing was listening on /api/chat — the SPA
 * rewrite swallowed the POST and the platform answered 405, so the chat widget
 * on every page failed on the first message. This file is the production half:
 * same model, same system instruction, same validation and the same streamed
 * plain-text response the client already reads.
 *
 * Every request spends the owner's Gemini key, so the endpoint is not left
 * open: browsers must call it from this site (Origin check), each caller is
 * limited to the same 50 requests per 15 minutes the local server allows, and
 * replies are capped in length. The counter lives in the edge instance and
 * resets when it is recycled, so it slows a script down rather than stopping
 * one; for a hard limit, add a Vercel Firewall rate-limit rule as well.
 */

import { GoogleGenAI } from '@google/genai';
import { AI_SYSTEM_INSTRUCTION } from '../prompt';

export const config = { runtime: 'edge' };

const MAX_MESSAGES = 20;
const MAX_CHARS = 1000;
const MAX_OUTPUT_TOKENS = 700;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 50;
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

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 });
  }

  // Browsers always send Origin on a cross-site POST; refuse other sites so this is
  // not someone else's free model. Server-to-server calls carry no Origin and are
  // still held to the rate limit below.
  const origin = req.headers.get('origin');
  if (origin) {
    let sameSite = false;
    try {
      sameSite = new URL(origin).host === (req.headers.get('host') ?? new URL(req.url).host);
    } catch {
      /* malformed Origin: refused below */
    }
    if (!sameSite) return Response.json({ error: 'Not allowed from this site.' }, { status: 403 });
  }

  const ip =
    req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const wait = retryAfter(ip, Date.now());
  if (wait > 0) {
    return Response.json(
      { error: 'Too many requests from this connection. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(wait) } },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'The chat is not configured yet. Email akshaymad0608@gmail.com and I will reply directly.' },
      { status: 503 },
    );
  }

  let messages: unknown;
  try {
    ({ messages } = await req.json());
  } catch {
    return Response.json({ error: 'Malformed request.' }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return Response.json({ error: 'Invalid or too many messages.' }, { status: 400 });
  }

  // The client sends {role: 'user' | 'ai'}; Gemini expects 'user' | 'model'.
  const contents = messages
    .map((m: { role?: string; text?: unknown }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: typeof m.text === 'string' ? m.text.slice(0, MAX_CHARS) : '' }],
    }))
    .filter((m) => m.parts[0].text.length > 0);

  if (contents.length === 0) {
    return Response.json({ error: 'Nothing to send.' }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const stream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents,
      config: { systemInstruction: AI_SYSTEM_INSTRUCTION, temperature: 0.7, maxOutputTokens: MAX_OUTPUT_TOKENS },
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
          }
        } catch {
          controller.enqueue(encoder.encode('\n\nThe answer cut off. Please ask again.'));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(body, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ error: 'The chat is unavailable right now. Please try again shortly.' }, { status: 502 });
  }
}
