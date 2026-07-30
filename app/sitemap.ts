import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import {
  getAbsoluteDocsUrls,
  getAbsoluteHomeUrls,
  siteUrl,
} from '@/lib/metadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const home = getAbsoluteHomeUrls();
  const pages = source.getPages('en');

  return [
    {
      url: siteUrl,
      alternates: { languages: { en: home.en, es: home.es } },
    },
    {
      url: home.es,
      alternates: { languages: { en: home.en, es: home.es } },
    },
    ...pages.flatMap((page) => {
      const urls = getAbsoluteDocsUrls(page.slugs);
      const alternates = { languages: { en: urls.en, es: urls.es } };
      return [
        { url: urls.en, alternates },
        { url: urls.es, alternates },
      ];
    }),
  ];
}
