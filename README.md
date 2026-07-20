# akshay.website

Portfolio for Akshay Mahajan — AI agents, chatbots and workflow automation.

## Design system

The site is built around one idea: **an automation wiring canvas**. Node graphs
are the tool of the trade, so the site borrows that visual language rather than
defaulting to generic SaaS gradients.

**Surfaces** (dark, blueprint-inspired)

| Token | Hex | Used for |
| --- | --- | --- |
| `ink` / `background` | `#0A0B0F` | page background |
| `panel` / `section` | `#111219` | alternating sections |
| `cards` | `#171922` | cards, nodes, inputs |
| `raised` | `#1F222D` | panel gradient top |

**Accents** — only two, each with a fixed meaning:

| Token | Hex | Meaning |
| --- | --- | --- |
| `wire` | `#A9A6FF` | data, signal, automated movement |
| `signal` | `#D6FF3F` | human action — every primary CTA |
| `secondary` | `#FF8A6B` | rare third accent, gradients only |

Lilac carries everything automatic; lime marks the one thing a human should
click. Never use lime for decoration — the moment it appears twice on a screen
it stops meaning anything.

Text runs `text` `#F2F3F8`, `textSecondary` `#9CA1B4`, `muted` `#82889D`. All
three clear WCAG AA (4.5:1) against every surface above — `muted` sits at 4.50
on `raised`, its worst case, so darkening it any further will fail.

**Type**

- `font-display` — Bricolage Grotesque (headings)
- `font-sans` — Instrument Sans (body)
- `font-mono` — JetBrains Mono (eyebrows, node labels, stats)

**Utility classes** (see `styles/global.css`): `.blueprint`, `.blueprint-fade`,
`.panel`, `.ticked`, `.eyebrow`, `.wire-flow`, `.spotlight`, `.btn-signal`,
`.btn-ghost`, `.marquee-track`, `.pulse-soft`.

## Logo

`components/ui/Logo.tsx` exports `LogoMark` (icon only) and a default `Logo`
(mark plus wordmark). The mark is an "A" drawn as a routed circuit trace inside
a node, with wire stubs entering and leaving — so it reads as one step in a
pipeline rather than a monogram in a box. The apex dot and crossbar are the only
lime in the mark.

The mark inherits `currentColor` for its trace, so it recolours with the parent;
the node fill and signal colour come from CSS variables. `public/favicon.svg`
draws the same letterform without the container, which mushes below ~20px.

## Signature component

`components/ui/FlowCanvas.tsx` — the live flow diagram in the hero. Triggers wire
into an agent node (the portrait), which wires out to completed actions. Signal
dots travel the wire paths via SVG `animateMotion`.

It renders **two compositions**: a wide one for `sm:` and up, and a stacked
vertical one below that. The mobile version is a different layout, not the wide
one scaled down — scaling made the labels unreadable at 390px.

All motion is gated on `prefers-reduced-motion`.

## Stack

React 19 · Vite 6 · React Router 7 · Framer Motion · Tailwind CSS 3 · Lenis ·
Lucide · react-helmet-async

Tailwind is compiled through PostCSS (`tailwind.config.js`, `postcss.config.js`)
and imported once via `styles/global.css`. It is **not** loaded from the CDN —
the CDN build is development-only and adds a render-blocking request.

## SEO & prerendering

The app is client-rendered. Vite emits one `index.html` with no title and no
Open Graph tags — react-helmet-async adds them at runtime. Google eventually
renders the JS and sees them, but the crawlers that build link previews
(WhatsApp, LinkedIn, Facebook, Slack, X) **do not run JavaScript**, so sharing
any page produced a blank preview card.

`scripts/prerender.mjs` runs after `vite build` and writes
`dist/<route>/index.html` for every route, with title, description, canonical,
OG/Twitter tags and a JSON-LD `@graph` (Person, WebSite, ProfessionalService,
BreadcrumbList) already in the markup. It also regenerates `sitemap.xml` and a
noindex `404.html`.

**`site.routes.json` is the single source of truth.** The prerender script, the
runtime `<SEO>` component and the sitemap all read it, so a title can only be
changed in one place. Adding a route means adding it there *and* to the router
in `App.tsx`.

Hosting must serve the per-route file rather than always returning the root
`index.html`:

- **Vercel** — handled by `vercel.json`. Rewrites run after the filesystem
  check, so `dist/services/index.html` wins for `/services`; the catch-all only
  fires for genuinely unknown paths and returns `404.html`.
- **Node** — `server.ts` looks for `dist/<path>/index.html` and falls back to a
  real 404 status.

Verify after any deploy:

```bash
curl -s https://akshay.website/work | grep -o '<title>[^<]*</title>'
```

If that comes back empty, the host is serving the SPA shell and link previews
are broken again.

## Run locally

```bash
npm install
npm run dev      # vite dev server
npm run build    # vite build + esbuild bundle of server.ts
npm start        # serve the production build
```

`npm run dev` needs no API keys. The contact form posts to Formspree; the
endpoint ID lives in `pages/Contact.tsx`.

## Structure

```
components/         section components (Hero, Services, Process, …)
components/ui/      shared primitives (Reveal, SectionHeading, FlowCanvas,
                    Marquee, Counter, SpotlightCard, WireDivider, TiltCard,
                    PageHero)
pages/              route wrappers — each composes sections + SEO + PageTransition
constants.tsx       all real content: projects, services, testimonials, skills
lib/avatarImage.ts  portrait asset URLs + intrinsic dimensions
styles/global.css   design tokens and utility classes
```

## Home page narrative

The section order is deliberate and worth preserving:

1. **Hero** — who, what, proof, and two ways to start
2. **Problem** — names the symptom before selling anything
3. **Services** — six of eight, linking to the rest
4. **Process** — what the engagement looks like
5. **Case studies** — two of four, linking to the rest
6. **Testimonials** — social proof
7. **FAQ** — objection handling
8. **Final CTA** — the ask

The standalone `Stats` section was removed from home; the hero stat row and the
per-project stat badges already carried those numbers, so it was the third
telling. `Stats` still lives on `/work`, where it isn't duplicated.

## Case study screenshots

`components/ui/ProjectShot.tsx` renders thumbnails inside a browser frame at
16:10, scaled to fit the frame width and top-aligned.

They were previously `object-cover`'d into the grid cell. Because that cell's
height is set by the case-study text beside it, screenshots got zoomed well past
100% — headlines clipped mid-word, buttons enormous. Fitting to width keeps them
at a sane scale regardless of the text, and the frame makes the bottom cut-off
read as "the page continues" rather than as a broken image.

The `crop` value in the thum.io URLs must stay at 16:10 against `width`
(currently `width/1200/crop/750`) or the shot will letterbox inside the frame.
If the service is down, the component falls back to a branded panel.

## Content notes

The portrait source is 900×506 with the subject on the right. The shipped assets
in `public/` are pre-cropped to 430×506 around the subject, so consumers no
longer need an object-position offset. If you re-export from the original frame,
crop from x=470 or the subject drifts out of square crops.

Images are served as WebP with a JPEG fallback via `<picture>`. They used to be
a ~59 kB base64 data URI compiled into the JS bundle; moving them to real files
cut the main bundle by roughly a quarter and made them cacheable.

`public/og-image.jpg` (1200×630) is generated, not hand-designed — the script
lives in the project history and composites the portrait, logo and headline over
the blueprint grid. Regenerate it if the headline or palette changes.

Availability copy ("taking projects for August") is computed by
`lib/availability.ts`, not typed in — it rolls to the next month past mid-month,
since scoping plus build runs two to four weeks. Nothing to update by hand.

Stats in `Stats.tsx` and the hero are deliberately limited to figures that can be
verified from the live products. Testimonials in `constants.tsx` are currently
role-only; swap in real names and companies when permission is available.
