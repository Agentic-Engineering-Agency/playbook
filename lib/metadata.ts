import type { Metadata } from 'next';

export const siteUrl = 'https://labs.agenticengineering.agency';

type SupportedLocale = 'en' | 'es';

function pagePaths(slugs: string[] = []) {
  const suffix = slugs.length > 0 ? `/${slugs.join('/')}` : '';
  return {
    en: slugs.length > 0 ? `/docs${suffix}` : '/',
    es: slugs.length > 0 ? `/es/docs${suffix}` : '/es',
  };
}

export function getPageAlternates(
  locale: SupportedLocale,
  slugs: string[] = [],
): NonNullable<Metadata['alternates']> {
  const paths = pagePaths(slugs);

  return {
    canonical: paths[locale],
    languages: {
      en: paths.en,
      es: paths.es,
      'x-default': paths.en,
    },
  };
}

export function getAbsolutePageUrls(slugs: string[] = []) {
  const paths = pagePaths(slugs);
  return {
    en: new URL(paths.en, siteUrl).toString(),
    es: new URL(paths.es, siteUrl).toString(),
  };
}
