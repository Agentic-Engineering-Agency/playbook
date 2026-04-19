import { blogPosts } from '@/lib/source';
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

function getEnglishPosts() {
  return blogPosts.filter((p) => !p.info.path.includes('.es.'));
}

export default async function BlogPage(props: PageProps<'/blog/[[...slug]]'>) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    const posts = getEnglishPosts();
    return (
      <DocsPage>
        <DocsTitle>Blog</DocsTitle>
        <DocsDescription>
          Thoughts on agentic engineering, AI-assisted development, and building products.
        </DocsDescription>
        <DocsBody>
          <ul className="not-prose flex flex-col gap-6 mt-8">
            {posts.map((post) => {
              const slug = post.info.path.replace(/\.mdx$/, '');
              return (
                <li key={slug}>
                  <Link href={`/blog/${slug}`} className="group block">
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
  const post = blogPosts.find(
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
    ...getEnglishPosts().map((post) => ({
      slug: [post.info.path.replace(/\.mdx$/, '')],
    })),
  ];
}

export async function generateMetadata(props: PageProps<'/blog/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  if (!params.slug || params.slug.length === 0) {
    return { title: 'Blog', description: 'Agentic Engineering Agency blog' };
  }

  const slug = params.slug.join('/');
  const post = blogPosts.find(
    (p) => p.info.path === `${slug}.mdx` && !p.info.path.includes('.es.'),
  );
  if (!post) notFound();

  return {
    title: post.title,
    description: post.description,
  };
}
