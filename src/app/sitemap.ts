import type { MetadataRoute } from 'next';
import { algorithms } from '@/data';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const algorithmRoutes: MetadataRoute.Sitemap = algorithms.map((algo) => ({
    url: `${baseUrl}/algorithm/${algo.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...algorithmRoutes,
  ];
}
