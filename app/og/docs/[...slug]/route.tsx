import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName } from '@/lib/shared';
import { i18n } from '@/lib/i18n';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const pageSegments = slug.slice(0, -1);
  const [maybeLocale, ...localizedSegments] = pageSegments;
  const locale = maybeLocale === 'es' ? 'es' : 'en';
  const slugs = locale === 'es' ? localizedSegments : pageSegments;
  const page = source.getPage(slugs, locale);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage title={page.data.title} description={page.data.description} site={appName} />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return i18n.languages.flatMap((locale) =>
    source.getPages(locale).map((page) => ({
      slug: getPageImage(page).segments,
    })),
  );
}
