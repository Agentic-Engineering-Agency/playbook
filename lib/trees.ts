import type { Root as PageTreeRoot } from 'fumadocs-core/page-tree';
import { blogPosts, casePosts } from './source';

/**
 * Build a Fumadocs PageTree.Root from a flat collection of MDX entries.
 *
 * Why this exists: Fumadocs's `DocsLayout` renders its sidebar from a page
 * tree. The `docs` collection (defineDocs) produces one automatically via
 * `source.getPageTree()`. But `blog` and `cases` use
 * `defineCollections({ type: 'doc' })`, which returns a plain array — no
 * page tree. We hand-build one so `DocsLayout` can serve as the shared
 * sidebar shell without migrating those sections to defineDocs.
 *
 * Convention: entries with `.es.` in their path are the Spanish mirror and
 * are filtered out of the EN tree. We sort by date descending when a date
 * field exists, else alphabetically by title.
 */
interface TreeEntry {
  info: { path: string };
  title: string;
  description?: string;
  date?: string;
}

function buildTree(
  label: string,
  baseUrl: string,
  posts: readonly TreeEntry[],
): PageTreeRoot {
  const english = posts.filter((p) => !p.info.path.includes('.es.'));

  const sorted = [...english].sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return a.title.localeCompare(b.title);
  });

  return {
    name: label,
    children: sorted.map((post) => {
      const slug = post.info.path.replace(/\.mdx$/, '');
      return {
        type: 'page',
        name: post.title,
        url: `${baseUrl}/${slug}`,
        description: post.description,
      };
    }),
  };
}

export const blogTree: PageTreeRoot = buildTree('Blog', '/blog', blogPosts);
export const casesTree: PageTreeRoot = buildTree(
  'Case Studies',
  '/cases',
  casePosts,
);
