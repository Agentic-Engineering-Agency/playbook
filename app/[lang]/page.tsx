import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import type { Metadata } from 'next';
import { PlaybookHome } from '@/components/playbook-home';

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
      description:
        'Documentación pública y bilingüe de los métodos abiertos, kits y rutas de evidencia verificadas de Agentic Engineering.',
    };
  }
  return { title: { absolute: 'Agentic Engineering Playbook' } };
}
