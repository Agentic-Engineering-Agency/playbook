import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function LocaleHomeLayout(
  props: LayoutProps<'/[lang]'> & { params: Promise<{ lang: string }> },
) {
  const { lang } = await props.params;
  // Only allow known locales; the default locale (en) is served without a prefix
  if (!(i18n.languages as string[]).includes(lang)) notFound();

  return <HomeLayout {...baseOptions()}>{props.children}</HomeLayout>;
}
