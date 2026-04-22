import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { MessageCircleIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  // i18n={i18n} enables the language switcher in the docs nav. Documentation
  // is the only localized section in this site.
  return (
    <AISearch>
      <DocsLayout tree={source.getPageTree()} i18n={i18n} {...baseOptions()}>
        {children}
      </DocsLayout>
      <AISearchPanel />
      <AISearchTrigger
        position="float"
        className={cn(
          buttonVariants({
            color: 'secondary',
            className: 'gap-2 rounded-full shadow-lg',
          }),
        )}
      >
        <MessageCircleIcon className="size-4" />
        Ask AI
      </AISearchTrigger>
    </AISearch>
  );
}
