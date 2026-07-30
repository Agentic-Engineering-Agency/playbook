import { source } from '@/lib/source';
import { getPublicProjectsText, type ProjectLocale } from '@/lib/public-projects';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
  async buildIndex(page) {
    const structuredData = page.data.structuredData;
    const locale: ProjectLocale = page.locale === 'es' ? 'es' : 'en';
    const catalogContent =
      page.slugs.join('/') === 'projects'
        ? [
            {
              content: getPublicProjectsText(locale),
              heading: undefined,
            },
          ]
        : [];

    return {
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: {
        ...structuredData,
        contents: [...structuredData.contents, ...catalogContent],
      },
    };
  },
});
