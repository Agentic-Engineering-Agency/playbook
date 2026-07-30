import {
  getLLMText,
  getPageMarkdownUrl,
  parsePageMarkdownSegments,
  source,
} from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/llms.mdx/docs/[[...slug]]'>) {
  const { slug } = await params;
  // remove the appended "content.md", then split off an optional locale prefix
  const { language, slugs } = parsePageMarkdownSegments(slug?.slice(0, -1) ?? []);
  const page = source.getPage(slugs, language);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageMarkdownUrl(page).segments,
  }));
}
