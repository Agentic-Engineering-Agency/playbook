import Link from 'next/link';
import { ToolGrid } from '@/components/tool-grid';
import { getTools } from '@/lib/tools-catalog';

export default function HomePage() {
  const tools = getTools('en');

  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 py-20 text-center">
      <span className="text-xs font-mono text-fd-muted-foreground uppercase tracking-widest mb-4">
        Agentic Engineering Agency
      </span>
      <h1 className="text-4xl font-bold mb-4 max-w-2xl">
        The Playbook
      </h1>
      <p className="text-fd-muted-foreground text-lg mb-12 max-w-xl">
        Public, bilingual documentation for the open methods and kits we publish.
      </p>

      <section className="w-full max-w-6xl mx-auto mb-16 text-left">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-fd-foreground mb-2">
            Published documentation
          </h2>
          <p className="text-fd-muted-foreground max-w-xl mx-auto">
            Source-linked guides and verified install paths for public Agentic Engineering work.
          </p>
        </div>
        <ToolGrid tools={tools} />
      </section>

      <div className="max-w-3xl w-full text-left rounded-lg border border-fd-primary/30 bg-fd-primary/5 p-6 mb-6">
        <span className="text-xs font-mono text-fd-primary uppercase tracking-widest">
          Documentation hub
        </span>
        <h2 className="font-semibold text-lg mt-1 mb-2">Browse all docs</h2>
        <p className="text-sm text-fd-muted-foreground mb-4">
          The documentation index groups the published kit docs in one place and includes quick install commands.
        </p>
        <Link
          href="/docs"
          className="rounded-md bg-fd-primary text-fd-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity inline-block"
        >
          Open documentation →
        </Link>
      </div>

      <div className="max-w-3xl w-full text-left rounded-lg border border-fd-border bg-fd-card p-6">
        <span className="text-xs font-mono text-fd-muted-foreground uppercase tracking-widest">
          Public boundary
        </span>
        <h2 className="font-semibold text-lg mt-1 mb-2">What belongs here</h2>
        <p className="text-sm text-fd-muted-foreground mb-4">
          The Playbook publishes reviewed documentation and proof paths. It is not an internal
          dashboard, customer workspace, or source of live company status.
        </p>
        <Link
          href="/docs/about"
          className="text-sm font-medium text-fd-primary hover:opacity-80 transition-opacity"
        >
          Read the publishing boundary →
        </Link>
      </div>

      <footer className="mt-16 flex gap-6 text-sm text-fd-muted-foreground">
        <a
          href="https://github.com/Agentic-Engineering-Agency"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fd-foreground transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://agenticengineering.agency"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fd-foreground transition-colors"
        >
          agenticengineering.agency
        </a>
      </footer>
    </main>
  );
}
