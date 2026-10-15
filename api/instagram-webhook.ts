/**
 * Instagram auto-reply: comments that ask for details get a private DM, and
 * direct messages get an answer from the same assistant that runs on the site.
 *
 * Meta calls this URL in two ways:
 *   GET  ?hub.mode=subscribe&hub.verify_token=...&hub.challenge=...  (one-off verification)
 *   POST with a signed JSON body                                    (every comment and message)
 *
 * Environment (Vercel project settings):
 *   IG_VERIFY_TOKEN  any string you choose, pasted into the Meta webhook setup
 *   IG_APP_SECRET    the Meta app secret, used to verify the POST signature
 *   IG_ACCESS_TOKEN  Instagram API access token for the account
 *   IG_USER_ID       the Instagram professional account id (17841443589108118)
 *   GEMINI_API_KEY   already set, shared with /api/chat
 *
 * Setup steps are in docs/instagram-dm-bot.md.
 */

import { GoogleGenAI } from '@google/genai';
import { AI_SYSTEM_INSTRUCTION } from '../prompt';
import { PUBLIC_REPLY, WELCOME, clip, extractActions, verifySignature, wantsInfo, type BotAction } from '../lib/igBot';

export const config = { runtime: 'edge' };

const GRAPH = 'https://graph.instagram.com/v21.0';

const DM_RULES = `
You are answering an Instagram direct message. Reply in at most three short sentences, under 600 characters, in the language the person wrote in.
The only links you may give are akshay.website and https://calendly.com/akshaymad0608 . If they want a quote, ask what they are building, then offer the call link.
`;

// Meta retries a delivery that was slow to acknowledge. This is a best-effort guard per warm instance.
const seen = new Set<string>();
const remember = (id: string): boolean => {
  if (seen.has(id)) return false;
  seen.add(id);
  if (seen.size > 500) seen.delete(seen.values().next().value as string);
  return true;
};

async function graphPost(path: string, token: string, body: unknown): Promise<void> {
  const res = await fetch(`${GRAPH}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error('instagram graph error', path, res.status, (await res.text()).slice(0, 300));
}

async function aiReply(text: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return WELCOME;
  try {
    const ai = new GoogleGenAI({ apiKey });
    const out = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: text.slice(0, 1000) }] }],
      config: { systemInstruction: AI_SYSTEM_INSTRUCTION + DM_RULES, temperature: 0.6 },
    });
    return clip(out.text || WELCOME);
  } catch {
    return WELCOME;
  }
}

async function handle(a: BotAction, userId: string, token: string): Promise<void> {
  if (a.kind === 'comment') {
    if (!wantsInfo(a.text)) return;
    // A private reply is the one message Instagram allows to someone who has only commented.
    await graphPost(`${userId}/messages`, token, { recipient: { comment_id: a.commentId }, message: { text: WELCOME } });
    await graphPost(`${a.commentId}/replies`, token, { message: PUBLIC_REPLY });
    return;
  }
  const text = await aiReply(a.text);
  await graphPost(`${userId}/messages`, token, { recipient: { id: a.senderId }, message: { text } });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    const q = new URL(req.url).searchParams;
    const ok = q.get('hub.mode') === 'subscribe' && !!process.env.IG_VERIFY_TOKEN && q.get('hub.verify_token') === process.env.IG_VERIFY_TOKEN;
    return ok ? new Response(q.get('hub.challenge') ?? '', { status: 200 }) : new Response('Forbidden', { status: 403 });
  }
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const { IG_APP_SECRET, IG_ACCESS_TOKEN, IG_USER_ID } = process.env;
  if (!IG_APP_SECRET || !IG_ACCESS_TOKEN || !IG_USER_ID) {
    return Response.json({ error: 'Instagram bot is not configured.' }, { status: 503 });
  }

  const raw = await req.text();
  if (!(await verifySignature(raw, req.headers.get('x-hub-signature-256'), IG_APP_SECRET))) {
    return new Response('Bad signature', { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  const actions = extractActions(payload, IG_USER_ID).filter((a) => remember(a.id));
  // Answer every item but always acknowledge with 200, or Meta keeps retrying the whole delivery.
  await Promise.allSettled(actions.map((a) => handle(a, IG_USER_ID, IG_ACCESS_TOKEN)));
  return new Response('ok', { status: 200 });
}
