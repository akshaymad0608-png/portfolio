/**
 * Serverless twin of the /api/news route in server.ts, same arrangement as
 * api/chat.ts — server.ts only runs locally, so without this file the live site
 * would answer the feed request with the SPA shell.
 *
 * Cached at the edge for half an hour when there is something to show: the sheet
 * only changes once a day at 9am, and hammering Google's CSV endpoint on every
 * page view would earn a throttle.
 *
 * An empty result is cached for a minute instead. Caching "nothing" for half an
 * hour means one transient blank — a cleared sheet, a slow morning run — hides
 * the section long after the data is back, which is exactly what happened the
 * first time this shipped.
 */

import { fetchNews } from '../lib/news';

export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return Response.json({ error: 'Method not allowed.' }, { status: 405 });
  }

  try {
    const items = await fetchNews();
    const cache = items.length
      ? 'public, s-maxage=1800, stale-while-revalidate=86400'
      : 'public, s-maxage=60';

    return Response.json({ items }, { headers: { 'Cache-Control': cache } });
  } catch {
    // The section hides itself on an empty list, which is the right outcome here:
    // a sheet outage should cost a section, not the page.
    return Response.json(
      { items: [] },
      { headers: { 'Cache-Control': 'public, s-maxage=60' } },
    );
  }
}
