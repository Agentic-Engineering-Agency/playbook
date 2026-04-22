import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { notFound } from 'next/navigation';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { MessageCircleIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export default async function LocaleDocsLayout(
  props: LayoutProps<'/[lang]/docs'> & { params: Promise<{ lang: string }> },
) {
  const { lang } = await props.params;
  if (!(i18n.languages as string[]).includes(lang)) notFound();

  return (
    <AISearch>
      <DocsLayout
        tree={source.getPageTree(lang as 'en' | 'es')}
        i18n={i18n}
        {...baseOptions()}
      >
        {props.children}
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
