import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { casesTree } from '@/lib/trees';

export default function CasesLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={casesTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
