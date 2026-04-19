import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  // i18n={i18n} enables the language switcher in the top nav. We scope it to
  // /docs because that's the only section with Spanish translations wired up;
  // /blog and /cases are EN-only for now so their DocsLayouts omit this prop.
  return (
    <DocsLayout tree={source.getPageTree()} i18n={i18n} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
