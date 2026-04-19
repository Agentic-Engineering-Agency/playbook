import { blogPosts } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Filter to EN-only posts (files without .es. in the path)
function getEnglishPosts() {
  return blogPosts.filter((p) => !p.info.path.includes('.es.'));
}

export default async function BlogPage(props: PageProps<'/blog/[[...slug]]'>) {
  const params = await props.params;

  // List view when no slug is provided
  if (!params.slug || params.slug.length === 0) {
    const posts = getEnglishPosts();
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-fd-muted-foreground mb-10">
          Thoughts on agentic engineering, AI-assisted development, and building products.
        </p>
        <ul className="space-y-6">
          {posts.map((post) => {
            // info.path is like "hello-world.mdx" — strip extension for URL slug
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
      </main>
    );
  }

  const slug = params.slug.join('/');
  const post = blogPosts.find(
    (p) => p.info.path === `${slug}.mdx` && !p.info.path.includes('.es.'),
  );
  if (!post) notFound();

  const MDX = post.body;

  return (
    <article className="max-w-3xl mx-auto px-4 py-16 prose prose-neutral dark:prose-invert">
      <h1>{post.title}</h1>
      {post.description && <p className="lead">{post.description}</p>}
      <MDX components={getMDXComponents()} />
    </article>
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
