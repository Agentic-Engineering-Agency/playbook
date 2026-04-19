import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';

// Pass-through wrapper for non-default locales. The EN tree uses route groups
// so each section (docs, home, blog, cases) owns its own layout chrome and
// nothing nests. ES has to mirror that pattern — if we wrap everything here
// in HomeLayout, the nested DocsLayout under /es/docs/* ends up with HomeLayout
// around it, which sets --fd-layout-width:1400px and an extra top nav. That
// produced visible layout/sizing drift between the EN and ES versions of the
// same doc page. The landing (/es) now applies HomeLayout in its own page.tsx.
export default async function LocaleLayout(
  props: LayoutProps<'/[lang]'> & { params: Promise<{ lang: string }> },
) {
  const { lang } = await props.params;
  if (!(i18n.languages as string[]).includes(lang)) notFound();
  return props.children;
}
