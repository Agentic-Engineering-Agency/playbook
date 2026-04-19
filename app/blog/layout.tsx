import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { blogTree } from '@/lib/trees';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={blogTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
