import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url, image, type = 'website', jsonLd }) {
  const siteName = "Kalpnova | Premium Design & Brand Growth Agency";
  const defaultDesc = "Kalpnova helps ambitious brands scale with high-impact design, strategic identity, and high-performance digital solutions.";
  
  const formattedTitle = title ? `${title} | Kalpnova` : siteName;
  const formattedDesc = description || defaultDesc;
  const formattedImage = image || "https://kalpnova.com/public/kalpnova.svg";
  const formattedUrl = url ? `https://kalpnova.com${url}` : "https://kalpnova.com/";

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{formattedTitle}</title>
      <meta name="description" content={formattedDesc} />
      <link rel="canonical" href={formattedUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={formattedUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={formattedDesc} />
      <meta property="og:image" content={formattedImage} />
      <meta property="og:site_name" content="Kalpnova" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={formattedUrl} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={formattedDesc} />
      <meta name="twitter:image" content={formattedImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
