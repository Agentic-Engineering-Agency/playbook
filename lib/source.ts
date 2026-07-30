import { docs } from 'collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { i18n } from './i18n';
import { getPublicProjectsText, type ProjectLocale } from './public-projects';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

// Main docs source with i18n support.
// loader generates a page tree for every locale; missing translations fall back
// to the default language (en).
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  i18n,
  plugins: [],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const localePrefix = page.locale === 'es' ? ['es'] : [];
  const segments = [...localePrefix, ...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

// Non-default locales carry their language as the first segment so the Markdown
// copy of a Spanish page resolves to the Spanish source instead of the English
// fallback. See app/llms.mdx/docs/[[...slug]]/route.ts.
export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const localePrefix =
    page.locale && page.locale !== i18n.defaultLanguage ? [page.locale] : [];
  const segments = [...localePrefix, ...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

// Split the Markdown route segments (without the trailing "content.md") into a
// language and the page slugs.
export function parsePageMarkdownSegments(segments: string[]) {
  const [maybeLanguage, ...rest] = segments;
  const isLanguage =
    maybeLanguage !== undefined &&
    maybeLanguage !== i18n.defaultLanguage &&
    (i18n.languages as string[]).includes(maybeLanguage);

  return isLanguage
    ? { language: maybeLanguage, slugs: rest }
    : { language: undefined, slugs: segments };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');
  const locale: ProjectLocale = page.locale === 'es' ? 'es' : 'en';
  // The catalog page renders its entries through <ProjectCatalog />, which the
  // MDX text pipeline cannot see, so append the serialized catalog data.
  const catalog =
    page.slugs.join('/') === 'projects'
      ? `\n\n${getPublicProjectsText(locale)}`
      : '';

  return `# ${page.data.title} (${page.url})

${processed}${catalog}`;
}
