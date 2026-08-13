/**
 * Serverless twin of the /api/chat route in server.ts.
 *
 * server.ts only runs under `npm run dev` and `npm start`. The live site is a
 * static deploy on Vercel, where nothing was listening on /api/chat — the SPA
 * rewrite swallowed the POST and the platform answered 405, so the chat widget
 * on every page failed on the first message. This file is the production half:
 * same model, same system instruction, same validation and the same streamed
 * plain-text response the client already reads.
 */

import { GoogleGenAI } from '@google/genai';
import { AI_SYSTEM_INSTRUCTION } from '../prompt';

export const config = { runtime: 'edge' };

const MAX_MESSAGES = 20;
const MAX_CHARS = 1000;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 });
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
      config: { systemInstruction: AI_SYSTEM_INSTRUCTION, temperature: 0.7 },
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
