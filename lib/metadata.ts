import type { Metadata } from 'next';

export const siteUrl = 'https://labs.agenticengineering.agency';

type SupportedLocale = 'en' | 'es';

function homePaths() {
  return { en: '/', es: '/es' };
}

function docsPaths(slugs: string[] = []) {
  const suffix = slugs.length > 0 ? `/${slugs.join('/')}` : '';
  return {
    en: `/docs${suffix}`,
    es: `/es/docs${suffix}`,
  };
}

function alternatesFor(paths: Record<SupportedLocale, string>, locale: SupportedLocale) {
  return {
    canonical: paths[locale],
    languages: {
      en: paths.en,
      es: paths.es,
      'x-default': paths.en,
    },
  } satisfies NonNullable<Metadata['alternates']>;
}

export function getHomeAlternates(
  locale: SupportedLocale,
): NonNullable<Metadata['alternates']> {
  return alternatesFor(homePaths(), locale);
}

export function getDocsAlternates(
  locale: SupportedLocale,
  slugs: string[] = [],
): NonNullable<Metadata['alternates']> {
  return alternatesFor(docsPaths(slugs), locale);
}

function absoluteUrls(paths: Record<SupportedLocale, string>) {
  return {
    en: new URL(paths.en, siteUrl).toString(),
    es: new URL(paths.es, siteUrl).toString(),
  };
}

export function getAbsoluteHomeUrls() {
  return absoluteUrls(homePaths());
}

export function getAbsoluteDocsUrls(slugs: string[] = []) {
  return absoluteUrls(docsPaths(slugs));
}
