import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // The main sitemap is usually sufficient if they share a domain, 
    // but pointing to the main one is safe.
    sitemap: 'https://nional.com/sitemap.xml',
  };
}
