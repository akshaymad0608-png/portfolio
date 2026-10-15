import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { clip, extractActions, verifySignature, wantsInfo } from './igBot';

test('wantsInfo matches whole trigger words only', () => {
  assert.equal(wantsInfo('WEBSITE'), true);
  assert.equal(wantsInfo('what is the price?'), true);
  assert.equal(wantsInfo('Nice reel!'), false);
  assert.equal(wantsInfo('booking'), false);
});

test('verifySignature accepts the real HMAC and rejects anything else', async () => {
  const body = '{"object":"instagram"}';
  const good = 'sha256=' + createHmac('sha256', 's3cret').update(body).digest('hex');
  assert.equal(await verifySignature(body, good, 's3cret'), true);
  assert.equal(await verifySignature(body, good, 'other'), false);
  assert.equal(await verifySignature(body + ' ', good, 's3cret'), false);
  assert.equal(await verifySignature(body, null, 's3cret'), false);
  assert.equal(await verifySignature(body, 'sha256=00', 's3cret'), false);
});

test('extractActions keeps comments and DMs, skips our own account and echoes', () => {
  const payload = {
    entry: [
      {
        changes: [
          { field: 'comments', value: { id: 'c1', text: 'website', from: { id: '99' } } },
          { field: 'comments', value: { id: 'c2', text: 'website', from: { id: 'SELF' } } },
          { field: 'mentions', value: { id: 'c3', text: 'x' } },
        ],
        messaging: [
          { sender: { id: '55' }, message: { mid: 'm1', text: 'hello' } },
          { sender: { id: 'SELF' }, message: { mid: 'm2', text: 'echo', is_echo: true } },
          { sender: { id: '56' }, message: { mid: 'm3' } },
        ],
      },
    ],
  };
  const out = extractActions(payload, 'SELF');
  assert.deepEqual(out.map((a) => a.id), ['c:c1', 'm:m1']);
});

test('clip prefers a sentence boundary', () => {
  const t = 'One sentence here. ' + 'x'.repeat(100);
  assert.ok(clip(t, 30).endsWith('here.'));
  assert.equal(clip('short', 60), 'short');
});
