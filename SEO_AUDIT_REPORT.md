# SEO audit report — akshay.website (portfolio)

Audited 2026-10-04. Origin: https://akshay.website

## Scope and method

- **Stack:** Vite + React SPA with `scripts/prerender.mjs` driven by `site.routes.json`, plus guard scripts (`seo-limits`, `csp-check`, price/prompt consistency) that run in `npm run build`; deployed on Vercel.
- **Static validation:** `scripts/seo-validate.mjs` over the production build (what a crawler sees without running JavaScript).
- **Lab performance:** Lighthouse 12 (mobile preset, simulated throttling), Chromium headless, against a plain local static server serving the build. A plain `python3 -m http.server` does **not** gzip/brotli, so the "enable text compression" findings and the absolute LCP are pessimistic compared with production hosting. Treat the numbers as a baseline to compare against after changes, not as field data.
- **Not verified here:** indexing status, rankings and Core Web Vitals field data (INP is only measurable in the field). Those come from Search Console.
- Search Console data for this property is not available to the tooling in this environment; use the CSV workflow.

## Results at a glance

| Pages built | Indexable | `noindex` | Sitemap URLs | Errors | Warnings | Notes |
|---|---|---|---|---|---|---|
| 14 | 14 | 0 | 14 | 0 | 3 | 2 |

### Validator findings (after this PR's fixes)

| Severity | Check | Count | Example |
|---|---|---|---|
| warn | `thin-static-content` | 3 | `/blog — 101 visible words in static HTML` |
| info | `one-inbound-link` | 2 | `/blog/ai-workflow-automation-cost-small-business — only linked from /blog` |

### Lighthouse (mobile, local baseline)

| Category | Score |
|---|---|
| Performance | 60 |
| Accessibility | 89 |
| Best practices | 96 |
| SEO | 100 |

Lab metrics (home page): LCP **5.8 s**, FCP 4.1 s, TBT 370 ms, CLS 0.

## Issues found and fixed so far

- Earlier work (PRs #12–#13): removed a single-item `BreadcrumbList` from the home page and linked the five live projects from the home page static HTML so crawlers can reach them.

## Issues still open

- `/blog`, `/privacy`, `/terms` have little static text (48–101 words). Legal pages are fine; `/blog` should list post titles with excerpts.
- Two blog posts have a single inbound link (from `/blog`). Link them from the home page or related posts.
- Home page: 162 KiB unused JavaScript and 56 KiB of oversized images reported by Lighthouse.

## What this audit deliberately does not claim

- No ranking, traffic or indexing improvement is promised. Rankings depend on content quality, links and competition.
- Structured data uses only facts visible on the site; no review/rating markup is emitted without real reviews.
