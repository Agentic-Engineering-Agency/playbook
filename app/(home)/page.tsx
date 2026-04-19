import Link from 'next/link';

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

      <div className="max-w-3xl w-full text-left rounded-lg border border-fd-primary/30 bg-fd-primary/5 p-6">
        <span className="text-xs font-mono text-fd-primary uppercase tracking-widest">
          Featured guide
        </span>
        <h2 className="font-semibold text-lg mt-1 mb-2">Prototype Kit</h2>
        <p className="text-sm text-fd-muted-foreground mb-4">
          Ship a polished React + shadcn prototype in an afternoon, without writing code.
        </p>
        <Link
          href="/docs/prototype-kit"
          className="rounded-md bg-fd-primary text-fd-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity inline-block"
        >
          Start →
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

const sections = [
  {
    title: 'Guides',
    description: 'Opinionated playbooks for teams shipping with AI agents.',
    href: '/docs',
  },
  {
    title: 'Case Studies',
    description: 'Real products we built and what the process looked like.',
    href: '/cases',
  },
  {
    title: 'Blog',
    description: 'Short posts on agentic development, tools, and craft.',
    href: '/blog',
  },
];
