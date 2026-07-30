import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import type { Metadata } from 'next';
import { PlaybookHome } from '@/components/playbook-home';
import { getPageAlternates } from '@/lib/metadata';

const spanishDescription =
  'Documentación pública y bilingüe de los métodos abiertos, kits, proyectos y rutas de evidencia verificadas de Agentic Engineering.';

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
      alternates: getPageAlternates('es'),
      openGraph: {
        type: 'website',
        siteName: 'Agentic Engineering Playbook',
        title: 'Agentic Engineering Playbook',
        description: spanishDescription,
        locale: 'es_MX',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Agentic Engineering Playbook',
        description: spanishDescription,
      },
    };
  }
  return { title: { absolute: 'Agentic Engineering Playbook' } };
}
