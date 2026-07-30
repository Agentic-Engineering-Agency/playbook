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
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
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
