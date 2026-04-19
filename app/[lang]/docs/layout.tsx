import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { notFound } from 'next/navigation';

export default async function LocaleDocsLayout(
  props: LayoutProps<'/[lang]/docs'> & { params: Promise<{ lang: string }> },
) {
  const { lang } = await props.params;
  if (!(i18n.languages as string[]).includes(lang)) notFound();

  return (
    <DocsLayout tree={source.getPageTree(lang as 'en' | 'es')} {...baseOptions()}>
      {props.children}
    </DocsLayout>
  );
}
