import { ToolCard } from '@/components/tool-card';
import type { Tool } from '@/lib/tools-catalog';

export function ToolGrid({
  tools,
  locale = 'en',
}: {
  tools: Tool[];
  locale?: 'en' | 'es';
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} locale={locale} />
      ))}
    </div>
  );
}
