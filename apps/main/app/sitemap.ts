import { MetadataRoute } from 'next';
import { TOOLS } from '../lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nional.com';

  // Static routes
  const routes = [
    '',
    '/write', // Nional Write Tool
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  // Dynamic tool pages
  const toolRoutes = TOOLS.map((tool) => ({
    url: `${baseUrl}/tool/${tool.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...toolRoutes];
}
