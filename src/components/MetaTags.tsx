// components/MetaTags.tsx

import React from 'react';
import Head from 'next/head';

interface MetaTagsProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, imageUrl, url }) => {
  return (
    <Head>
      {/* General meta tags */}
      <meta name="description" content={description} />
      <meta name="author" content="Dagwan Pan'an Danladi" />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Favicon */}
      <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default MetaTags;
