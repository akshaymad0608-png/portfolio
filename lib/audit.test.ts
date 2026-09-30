import test from 'node:test';
import assert from 'node:assert/strict';
import { AuditError, assertFetchable, dohResolver, isPrivateAddress, runAudit, type AuditDeps } from './audit';

const GOOD_HTML = `<!doctype html><html lang="en"><head>
<title>Acme Plumbing in Surat | Emergency Repairs</title>
<meta name="description" content="Acme Plumbing fixes leaks, blocked drains and geysers across Surat, usually the same day. Call or WhatsApp for a fixed quote.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://acme.test/">
<meta property="og:title" content="Acme"><meta property="og:image" content="https://acme.test/og.jpg">
<script src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script src="https://embed.tawk.to/abc/def"></script>
</head><body>
<h1>Plumbers in Surat</h1>
<p>${'We fix things properly and quickly. '.repeat(20)}</p>
<a href="tel:+911234567890">Call</a> <a href="https://wa.me/911234567890">WhatsApp</a>
<a href="/quote">Get a quote</a>
<form action="/send"><input type="email" name="e"><textarea name="m"></textarea></form>
<img src="a.jpg" alt="A plumber"><img src="b.jpg" alt="">
</body></html>`;

const HEADERS = {
  'content-type': 'text/html; charset=utf-8',
  'strict-transport-security': 'max-age=63072000',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'no-referrer',
};

const PUBLIC_IP = ['93.184.216.34'];

/** A fake internet: `sites` maps "host/path" to a response, everything else 404s. */
function fakeWeb(
  sites: Record<string, { status?: number; headers?: Record<string, string>; body?: string }>,
  dns: Record<string, string[]> = {},
) {
  const seen: string[] = [];
  const deps: AuditDeps = {
    fetch: async (input) => {
      const u = new URL(String(input));
      seen.push(u.href);
      const hit = sites[`${u.host}${u.pathname}`];
      if (!hit) return new Response('not found', { status: 404 });
      return new Response(hit.body ?? '', { status: hit.status ?? 200, headers: hit.headers });
    },
    resolve: async (host) => dns[host] ?? PUBLIC_IP,
  };
  return { deps, seen };
}

const rejects = (fn: () => Promise<unknown>, pattern: RegExp) =>
  assert.rejects(fn, (e: unknown) => e instanceof AuditError && pattern.test(e.message));

test('private and reserved addresses are recognised', () => {
  for (const ip of [
    '127.0.0.1', '10.1.2.3', '172.16.0.1', '172.31.255.255', '192.168.1.1', '169.254.169.254',
    '100.64.0.1', '0.0.0.0', '224.0.0.1', '::1', '::', 'fe80::1', 'fc00::1', 'fd12:3456::1',
    '::ffff:127.0.0.1', '::ffff:7f00:1', '64:ff9b::7f00:1', '2002:7f00:1::1',
  ]) {
    assert.equal(isPrivateAddress(ip), true, ip);
  }
  for (const ip of ['93.184.216.34', '8.8.8.8', '172.32.0.1', '2606:4700:4700::1111', '2a00:1450:4001::200e']) {
    assert.equal(isPrivateAddress(ip), false, ip);
  }
});

test('addresses that must never be fetched are refused before any request', () => {
  const bad = [
    'file:///etc/passwd', 'ftp://example.com', 'gopher://example.com',
    'http://user:pass@example.com', 'https://example.com:8443', 'http://example.com:22',
    'http://127.0.0.1', 'http://2130706433', 'http://0x7f.1', 'http://[::1]', 'http://[::ffff:127.0.0.1]',
    'http://localhost', 'http://intranet', 'http://app.internal', 'http://printer.local', 'http://a..b',
  ];
  for (const raw of bad) {
    assert.throws(() => assertFetchable(new URL(raw)), AuditError, raw);
  }
  assert.equal(assertFetchable(new URL('https://Example.COM./path')), 'example.com');
});

test('a well-built page scores from visible parts that add up', async () => {
  const { deps } = fakeWeb({
    'acme.test/': { headers: HEADERS, body: GOOD_HTML },
    'acme.test/robots.txt': { body: 'User-agent: *\nSitemap: https://acme.test/sitemap.xml' },
    'acme.test/sitemap.xml': { body: '<urlset></urlset>' },
  });
  const r = await runAudit('acme.test', deps);
  assert.equal(r.finalUrl, 'https://acme.test/');
  assert.equal(r.categories.reduce((n, c) => n + c.max, 0), 100);
  assert.equal(r.measurableMax, 100);
  assert.equal(r.score, Math.round((r.checks.reduce((n, c) => n + c.earned, 0) / 100) * 100));
  assert.ok(r.score! >= 90, `expected a strong score, got ${r.score}`);
  assert.equal(r.checks.find((c) => c.id === 'chat')?.status, 'pass');
  assert.equal(r.checks.find((c) => c.id === 'lead-form')?.status, 'pass');
  assert.deepEqual(r.checks.find((c) => c.id === 'contact-channel')?.evidence, 'Found a link for phone, WhatsApp.');
});

test('a bare page loses points where the evidence is missing and says why', async () => {
  const { deps } = fakeWeb({
    'bare.test/': { headers: { 'content-type': 'text/html' }, body: '<html><head></head><body><h1>Hi</h1><h1>Again</h1><p>' + 'word '.repeat(200) + '</p></body></html>' },
  });
  const r = await runAudit('http://bare.test', deps);
  const status = Object.fromEntries(r.checks.map((c) => [c.id, c.status]));
  assert.equal(status.https, 'fail');
  assert.equal(status.title, 'fail');
  assert.equal(status.viewport, 'fail');
  assert.equal(status.h1, 'warn');
  assert.equal(status['lead-form'], 'fail');
  assert.equal(r.priorities.length, 3);
  assert.ok(r.priorities.every((c) => c.status === 'fail' || c.status === 'warn'));
  assert.ok(r.score! < 30, `expected a weak score, got ${r.score}`);
  for (const c of r.checks) assert.ok(c.evidence && c.why && c.fix, c.id);
});

test('a page that builds itself in the browser is not blamed for what cannot be seen', async () => {
  const { deps } = fakeWeb({
    'spa.test/': {
      headers: { ...HEADERS },
      body: '<!doctype html><html lang="en"><head><title>Some Single Page App Title Here For Testing</title><meta name="viewport" content="width=device-width"></head><body><div id="root"></div><script src="/app.js"></script></body></html>',
    },
  });
  const r = await runAudit('https://spa.test', deps);
  for (const id of ['lead-form', 'contact-channel', 'cta', 'analytics']) {
    assert.equal(r.checks.find((c) => c.id === id)?.status, 'unknown', id);
  }
  assert.ok(r.measurableMax < 100);
  assert.ok(r.limitations.some((l) => /builds itself in the browser/.test(l)));
});

test('an address that resolves to a private network is refused', async () => {
  const { deps, seen } = fakeWeb({ 'evil.test/': { body: 'x' } }, { 'evil.test': ['10.0.0.5'] });
  await rejects(() => runAudit('evil.test', deps), /not on the public internet/);
  assert.deepEqual(seen, []);
});

test('one private address among public ones is enough to refuse', async () => {
  const { deps } = fakeWeb({ 'mixed.test/': { body: 'x' } }, { 'mixed.test': ['93.184.216.34', '169.254.169.254'] });
  await rejects(() => runAudit('mixed.test', deps), /not on the public internet/);
});

test('a redirect to a private host is refused on that hop', async () => {
  const { deps, seen } = fakeWeb(
    {
      'start.test/': { status: 302, headers: { location: 'http://metadata.internal/latest' } },
      'other.test/': { status: 301, headers: { location: 'https://internal.test/' } },
      'internal.test/': { body: 'secret' },
    },
    { 'internal.test': ['192.168.0.10'] },
  );
  await rejects(() => runAudit('start.test', deps), /not on the public internet/);
  await rejects(() => runAudit('other.test', deps), /not on the public internet/);
  assert.ok(!seen.some((u) => u.includes('internal.test/') || u.includes('metadata')));
});

test('a redirect to an IP literal is refused', async () => {
  const { deps } = fakeWeb({ 'hop.test/': { status: 301, headers: { location: 'http://169.254.169.254/latest/meta-data' } } });
  await rejects(() => runAudit('hop.test', deps), /domain name/);
});

test('redirect loops stop', async () => {
  const { deps } = fakeWeb({ 'loop.test/': { status: 302, headers: { location: 'https://loop.test/' } } });
  await rejects(() => runAudit('loop.test', deps), /too many times/);
});

test('sensible redirects are followed, including to www', async () => {
  const { deps } = fakeWeb({
    'acme.test/': { status: 301, headers: { location: 'https://www.acme.test/' } },
    'www.acme.test/': { headers: HEADERS, body: GOOD_HTML },
  });
  const r = await runAudit('acme.test', deps);
  assert.equal(r.finalUrl, 'https://www.acme.test/');
});

test('bot-protection responses and non-pages give a plain explanation', async () => {
  const web = fakeWeb({
    'wall.test/': { status: 403, body: 'blocked' },
    'file.test/': { headers: { 'content-type': 'application/pdf' }, body: '%PDF' },
    'down.test/': { status: 500, body: 'oops' },
  });
  await rejects(() => runAudit('wall.test', web.deps), /refused my request \(HTTP 403\)/);
  await rejects(() => runAudit('file.test', web.deps), /not a web page/);
  await rejects(() => runAudit('down.test', web.deps), /HTTP 500/);
});

test('unknown domains and junk input are refused', async () => {
  const { deps } = fakeWeb({}, { 'nope.test': [] });
  await rejects(() => runAudit('nope.test', deps), /couldn't find that domain/);
  await rejects(() => runAudit('   ', deps), /web address/);
  await rejects(() => runAudit('x'.repeat(400), deps), /web address/);
  await rejects(() => runAudit('http://', deps), /web address/);
});

test('a huge page is capped rather than read in full', async () => {
  const { deps } = fakeWeb({
    'big.test/': { headers: HEADERS, body: `<html lang="en"><head><title>${'a'.repeat(40)}</title></head><body>${'x'.repeat(2_000_000)}</body></html>` },
  });
  const r = await runAudit('big.test', deps);
  assert.ok(r.htmlKb <= 1466, `read ${r.htmlKb} KB`);
  assert.equal(r.checks.find((c) => c.id === 'weight')?.status, 'fail');
  assert.ok(r.limitations.some((l) => /over 1.5 MB/.test(l)));
});

test('hostile markup cannot make parsing slow', async () => {
  const attacks = [
    '<form '.repeat(40_000),
    '<meta '.repeat(40_000),
    '<script '.repeat(30_000),
    '<title'.repeat(50_000),
    '<img '.repeat(60_000),
    '<'.repeat(250_000),
    `<html>${'<input type=email '.repeat(10_000)}</html>`,
    '<form>' + '<input '.repeat(3_000) + '</form>',
  ];
  for (const body of attacks) {
    const { deps } = fakeWeb({ 'slow.test/': { headers: { 'content-type': 'text/html' }, body } });
    const t0 = Date.now();
    await runAudit('slow.test', deps);
    assert.ok(Date.now() - t0 < 1500, `${body.slice(0, 12)}… took ${Date.now() - t0} ms`);
  }
});

test('markup in the page is returned as text, never interpreted', async () => {
  const { deps } = fakeWeb({
    'xss.test/': {
      headers: HEADERS,
      body: '<html lang="en"><head><title>&lt;img src=x onerror=alert(1)&gt; padding padding padding padding</title></head><body></body></html>',
    },
  });
  const r = await runAudit('xss.test', deps);
  const title = r.checks.find((c) => c.id === 'title')!;
  assert.ok(title.evidence.includes('<img src=x onerror=alert(1)>'), 'raw text is kept as data for the UI to escape');
  assert.equal(typeof title.evidence, 'string');
});

test('DNS lookups fall back to a second provider and ignore CNAME records', async () => {
  const calls: string[] = [];
  const f = (async (input: RequestInfo | URL) => {
    const u = new URL(String(input));
    calls.push(`${u.host} ${u.searchParams.get('type')}`);
    if (u.host === 'cloudflare-dns.com') return new Response('down', { status: 503 });
    const type = u.searchParams.get('type');
    return Response.json({
      Status: 0,
      Answer:
        type === 'A'
          ? [{ type: 5, data: 'edge.example.net.' }, { type: 1, data: '93.184.216.34' }]
          : [{ type: 28, data: '2606:2800:220:1::1' }],
    });
  }) as typeof fetch;
  assert.deepEqual((await dohResolver(f)('example.com')).sort(), ['2606:2800:220:1::1', '93.184.216.34']);
  assert.ok(calls.some((c) => c.startsWith('dns.google')));
});

test('a missing domain resolves to nothing, and a dead resolver refuses rather than guessing', async () => {
  const nx = (async () => Response.json({ Status: 3 })) as unknown as typeof fetch;
  assert.deepEqual(await dohResolver(nx)('no-such-domain.test'), []);
  const dead = (async () => {
    throw new Error('offline');
  }) as unknown as typeof fetch;
  await rejects(() => dohResolver(dead)('example.com'), /lookup failed/);
});
