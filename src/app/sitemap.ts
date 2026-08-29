import type { MetadataRoute } from 'next';
import { sortingAlgorithms, searchingAlgorithms, dataStructures } from '@/data';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const sortingRoutes: MetadataRoute.Sitemap = sortingAlgorithms.map((algo) => ({
    url: `${baseUrl}/sorting/${algo.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const searchingRoutes: MetadataRoute.Sitemap = searchingAlgorithms.map((algo) => ({
    url: `${baseUrl}/searching/${algo.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const dataStructureRoutes: MetadataRoute.Sitemap = dataStructures.map((ds) => ({
    url: `${baseUrl}/data-structures/${ds.id}`,
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
    ...dataStructureRoutes,
    ...sortingRoutes,
    ...searchingRoutes,
  ];
}
