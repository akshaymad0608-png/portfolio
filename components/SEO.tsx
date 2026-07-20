import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import manifest from '../site.routes.json';

interface SEOProps {
  /** Overrides the manifest entry for this route. Rarely needed. */
  title?: string;
  description?: string;
  canonical?: string;
  /** Extra JSON-LD for this page — merged with the site-wide graph in the prerendered HTML. */
  schema?: Record<string, any> | Record<string, any>[];
  noindex?: boolean;
}

/**
 * Runtime <head> management.
 *
 * The same values are baked into static HTML at build time by
 * scripts/prerender.mjs — that's what non-JS crawlers (WhatsApp, LinkedIn,
 * Slack) actually read. This component keeps the tags correct during
 * client-side navigation, when no new document is fetched.
 *
 * Both read site.routes.json, so there is one place to change a title.
 */
const SEO: React.FC<SEOProps> = ({ title, description, canonical, schema, noindex }) => {
  const { pathname } = useLocation();
  const { baseUrl, siteName, locale, ogImage, routes } = manifest;

  const normalised = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const entry = routes.find((r) => r.path === normalised);

  const finalTitle = title ?? entry?.title ?? siteName;
  const finalDescription = description ?? entry?.description ?? '';
  const url = canonical ?? `${baseUrl}${normalised === '/' ? '/' : normalised}`;
  const image = `${baseUrl}${ogImage}`;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, follow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Akshay Mahajan — AI agents, chatbots and automation" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default SEO;
