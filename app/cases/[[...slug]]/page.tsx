import { casePosts } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function getEnglishCases() {
  return casePosts.filter((p) => !p.info.path.includes('.es.'));
}

export default async function CasesPage(props: PageProps<'/cases/[[...slug]]'>) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    const posts = getEnglishCases();
    return (
      <DocsPage>
        <DocsTitle>Case Studies</DocsTitle>
        <DocsDescription>
          Real projects built with the prototype-kit workflow.
        </DocsDescription>
        <DocsBody>
          <ul className="not-prose flex flex-col gap-6 mt-8">
            {posts.map((post) => {
              const slug = post.info.path.replace(/\.mdx$/, '');
              return (
                <li key={slug}>
                  <Link href={`/cases/${slug}`} className="group block">
                    <h2 className="text-xl font-semibold group-hover:text-fd-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-fd-muted-foreground mt-1">{post.description}</p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </DocsBody>
      </DocsPage>
    );
  }

  const slug = params.slug.join('/');
  const post = casePosts.find(
    (p) => p.info.path === `${slug}.mdx` && !p.info.path.includes('.es.'),
  );
  if (!post) notFound();

  const MDX = post.body;

  return (
    <DocsPage>
      <DocsTitle>{post.title}</DocsTitle>
      {post.description && <DocsDescription>{post.description}</DocsDescription>}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return [
    { slug: [] as string[] },
    ...getEnglishCases().map((post) => ({
      slug: [post.info.path.replace(/\.mdx$/, '')],
    })),
  ];
}

export async function generateMetadata(props: PageProps<'/cases/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  if (!params.slug || params.slug.length === 0) {
    return { title: 'Case Studies', description: 'Agentic Engineering Agency case studies' };
  }

  const slug = params.slug.join('/');
  const post = casePosts.find(
    (p) => p.info.path === `${slug}.mdx` && !p.info.path.includes('.es.'),
  );
  if (!post) notFound();

  return {
    title: post.title,
    description: post.description,
  };
}
