/**
 * Pure helpers for the Instagram comment and DM auto-reply (api/instagram-webhook.ts).
 *
 * Kept free of fetch and process.env so they can be unit tested: signature
 * checking, which comments should trigger a reply, and turning a Meta webhook
 * payload into a flat list of things to answer.
 */

export const CALENDLY = 'https://calendly.com/akshaymad0608';

/** A comment or DM containing one of these words gets the details message. */
const TRIGGER = /\b(website|web ?site|price|pricing|cost|quote|chatbot|chat ?bot|demo|details|info|link|book)\b/i;

export const wantsInfo = (text: string): boolean => TRIGGER.test(text);

export const WELCOME =
  `Hi, thanks for your interest. I build fast websites, AI chatbots and automation for businesses. ` +
  `Live work and prices are at akshay.website, or book a free 20-minute call: ${CALENDLY} . ` +
  `Tell me what you need and I will reply here.`;

export const PUBLIC_REPLY = 'Sent you a DM with the details.';

/** Instagram DM text is limited, and a clipped sentence reads worse than a short one. */
export const clip = (text: string, max = 900): string => {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! '));
  return (stop > max * 0.5 ? cut.slice(0, stop + 1) : cut).trim();
};

/** Constant-time compare so the signature check does not leak where it differs. */
const safeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

const hex = (buf: ArrayBuffer): string =>
  Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');

/** Meta signs the raw body: X-Hub-Signature-256 is `sha256=` plus the HMAC-SHA256 hex with the app secret. */
export async function verifySignature(raw: string, header: string | null, secret: string): Promise<boolean> {
  if (!header || !header.startsWith('sha256=') || !secret) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(raw));
  return safeEqual(hex(sig), header.slice('sha256='.length).toLowerCase());
}

export type BotAction =
  | { kind: 'comment'; id: string; commentId: string; text: string }
  | { kind: 'dm'; id: string; senderId: string; text: string };

/** Flatten a webhook payload into the comments and DMs worth answering, skipping our own account and echoes. */
export function extractActions(payload: any, selfId: string): BotAction[] {
  const out: BotAction[] = [];
  if (!payload || !Array.isArray(payload.entry)) return out;
  for (const entry of payload.entry) {
    for (const ch of entry?.changes ?? []) {
      const v = ch?.value;
      if (ch?.field !== 'comments' || !v?.id || typeof v.text !== 'string') continue;
      if (v.from?.id && String(v.from.id) === selfId) continue;
      out.push({ kind: 'comment', id: `c:${v.id}`, commentId: String(v.id), text: v.text });
    }
    for (const m of entry?.messaging ?? []) {
      const text = m?.message?.text;
      if (typeof text !== 'string' || m.message.is_echo) continue;
      const senderId = m?.sender?.id ? String(m.sender.id) : '';
      if (!senderId || senderId === selfId) continue;
      out.push({ kind: 'dm', id: `m:${m.message.mid ?? senderId + text}`, senderId, text });
    }
  }
  return out;
}
