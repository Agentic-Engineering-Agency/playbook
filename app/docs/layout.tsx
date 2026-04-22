import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  // i18n={i18n} enables the language switcher in the docs nav. Documentation
  // is the only localized section in this site.
  return (
    <DocsLayout tree={source.getPageTree()} i18n={i18n} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
