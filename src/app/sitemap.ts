import { MetadataRoute } from 'next';
import { PROJECTS } from '@/config/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sudoanirudh.vercel.app';

  const uniqueSlugs = Array.from(new Set(Object.values(PROJECTS).map((p) => p.slug)));

  const projectRoutes: MetadataRoute.Sitemap = uniqueSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}
