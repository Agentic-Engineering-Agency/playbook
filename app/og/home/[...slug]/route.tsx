import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName } from '@/lib/shared';
import { i18n } from '@/lib/i18n';
import { homeSocialCards } from '@/lib/metadata';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/home/[...slug]'>) {
  const { slug } = await params;
  const [maybeLocale] = slug.slice(0, -1);
  if (maybeLocale !== undefined && maybeLocale !== 'es') notFound();
  const locale = maybeLocale === 'es' ? 'es' : 'en';
  const card = homeSocialCards[locale];

  return new ImageResponse(
    <DefaultImage title={card.title} description={card.description} site={appName} />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return i18n.languages.map((locale) => ({
    slug: locale === i18n.defaultLanguage ? ['image.png'] : [locale, 'image.png'],
  }));
}
