import Link from 'next/link';
import { ToolGrid } from '@/components/tool-grid';
import { tools } from '@/lib/tools-catalog';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 py-20 text-center">
      <span className="text-xs font-mono text-fd-muted-foreground uppercase tracking-widest mb-4">
        Agentic Engineering Agency
      </span>
      <h1 className="text-4xl font-bold mb-4 max-w-2xl">
        The Playbook
      </h1>
      <p className="text-fd-muted-foreground text-lg mb-12 max-w-xl">
        We build with AI agents for LATAM startups. This is where we share what we&apos;ve learned.
      </p>

      {/* Tools & Plugins section */}
      <section className="w-full max-w-6xl mx-auto mb-16 text-left">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-fd-foreground mb-2">
            Tools & Plugins
          </h2>
          <p className="text-fd-muted-foreground max-w-xl mx-auto">
            Open-source kits and frameworks we built to ship faster with AI agents.
          </p>
        </div>
        <ToolGrid tools={tools} />
      </section>

      {/* Navigation link cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full text-left mb-12">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-lg border border-fd-border p-5 hover:bg-fd-muted transition-colors"
          >
            <h2 className="font-semibold mb-1">{s.title}</h2>
            <p className="text-sm text-fd-muted-foreground">{s.description}</p>
          </Link>
        ))}
      </section>

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

const sections = [
  {
    title: 'Guides →',
    description: 'Opinionated playbooks for teams shipping with AI agents.',
    href: '/docs',
  },
  {
    title: 'Case Studies →',
    description: 'Real products we built and what the process looked like.',
    href: '/cases',
  },
  {
    title: 'Blog →',
    description: 'Short posts on agentic development, tools, and craft.',
    href: '/blog',
  },
];
