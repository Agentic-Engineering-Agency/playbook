import type { Metadata } from 'next';

export const siteUrl = 'https://labs.agenticengineering.agency';

type SupportedLocale = 'en' | 'es';

export const homeImageRoute = '/og/home';

// The landing pages are not docs pages, so they cannot reuse /og/docs/*, which
// would render the docs index title and description instead of the home copy.
export const homeSocialCards = {
  en: {
    title: 'Methods, kits, and proof for building with agents.',
    description:
      'Public bilingual documentation for the methods, kits, proof paths, and source-verified projects published by Agentic Engineering.',
    imagePath: `${homeImageRoute}/image.png`,
  },
  es: {
    title: 'Métodos, kits y evidencia para construir con agentes.',
    description:
      'Documentación pública y bilingüe de los métodos abiertos, kits, proyectos y rutas de evidencia verificadas de Agentic Engineering.',
    imagePath: `${homeImageRoute}/es/image.png`,
  },
} satisfies Record<
  SupportedLocale,
  { title: string; description: string; imagePath: string }
>;

export function getHomeSocialImage(locale: SupportedLocale) {
  return new URL(homeSocialCards[locale].imagePath, siteUrl).toString();
}

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
