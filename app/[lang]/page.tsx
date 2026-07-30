import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import type { Metadata } from 'next';
import { PlaybookHome } from '@/components/playbook-home';
import { getHomeAlternates, getHomeSocialImage, homeSocialCards } from '@/lib/metadata';

const spanishDescription = homeSocialCards.es.description;
const spanishSocialImage = getHomeSocialImage('es');

export default async function LocaleHomePage(
  props: PageProps<'/[lang]'> & { params: Promise<{ lang: string }> },
) {
  const { lang } = await props.params;
  if (!(i18n.languages as string[]).includes(lang)) notFound();

  return (
    <HomeLayout {...baseOptions('es')}>
      <PlaybookHome locale="es" />
    </HomeLayout>
  );
}

export async function generateStaticParams() {
  const nonDefaultLocales = i18n.languages.filter((l) => l !== i18n.defaultLanguage);
  return nonDefaultLocales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: PageProps<'/[lang]'> & { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await props.params;
  if (lang === 'es') {
    return {
      title: { absolute: 'Agentic Engineering Playbook' },
      description: spanishDescription,
      alternates: getHomeAlternates('es'),
      openGraph: {
        type: 'website',
        siteName: 'Agentic Engineering Playbook',
        title: 'Agentic Engineering Playbook',
        description: spanishDescription,
        locale: 'es_MX',
        images: spanishSocialImage,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Agentic Engineering Playbook',
        description: spanishDescription,
        images: spanishSocialImage,
      },
    };
  }
  return { title: { absolute: 'Agentic Engineering Playbook' } };
}
