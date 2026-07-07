import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  schema?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, canonical, schema }) => {
  const baseUrl = "https://akshay.website";
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const currentUrl = canonical || `${baseUrl}${path}`;

  const defaultPersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akshay Mahajan",
    "url": baseUrl,
    "jobTitle": "AI Engineer & Founder",
    "sameAs": [
      "https://github.com/akshay",
      "https://linkedin.com/in/akshay"
    ]
  };

  const finalSchema = schema || defaultPersonSchema;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/akshay_avatar.jpeg`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/akshay_avatar.jpeg`} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
