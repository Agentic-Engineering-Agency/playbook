import { source } from '@/lib/source';
import { getPublicProjects, type ProjectLocale } from '@/lib/public-projects';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
  async buildIndex(page) {
    const structuredData = page.data.structuredData;
    const locale: ProjectLocale = page.locale === 'es' ? 'es' : 'en';
    const catalogProjects =
      page.slugs.join('/') === 'projects' ? getPublicProjects(locale) : [];
    const catalogHeadings = catalogProjects.map((project) => ({
      id: `project-${project.id}`,
      content: project.name,
    }));
    const catalogContents = catalogProjects.map((project) => ({
      heading: `project-${project.id}`,
      content: `${project.name}. ${project.summary} ${project.availability}. ${project.owner}.`,
    }));

    return {
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: {
        ...structuredData,
        headings: [...structuredData.headings, ...catalogHeadings],
        contents: [...structuredData.contents, ...catalogContents],
      },
    };
  },
});
