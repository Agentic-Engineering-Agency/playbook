import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 max-w-2xl">
        Ship a polished prototype in an afternoon.{' '}
        <span className="text-fd-primary">Without writing code.</span>
      </h1>
      <p className="text-fd-muted-foreground text-lg mb-10 max-w-xl">
        The Agentic Engineering Playbook teaches non-developer students how to build
        real React + shadcn/ui prototypes using a free AI coding agent.
      </p>
      <div className="flex gap-4 flex-wrap justify-center mb-16">
        <Link
          href="/docs"
          className="rounded-md bg-fd-primary text-fd-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity"
        >
          Read the guide
        </Link>
        <Link
          href="/blog"
          className="rounded-md border border-fd-border px-6 py-3 font-medium hover:bg-fd-muted transition-colors"
        >
          Blog
        </Link>
        <Link
          href="/cases"
          className="rounded-md border border-fd-border px-6 py-3 font-medium hover:bg-fd-muted transition-colors"
        >
          Case studies
        </Link>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full text-left">
        {steps.map((step) => (
          <Link
            key={step.href}
            href={step.href}
            className="rounded-lg border border-fd-border p-5 hover:bg-fd-muted transition-colors"
          >
            <span className="text-xs font-mono text-fd-muted-foreground uppercase tracking-wider">
              {step.label}
            </span>
            <h2 className="font-semibold mt-1 mb-1">{step.title}</h2>
            <p className="text-sm text-fd-muted-foreground">{step.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

const steps = [
  {
    label: 'Step 1',
    title: 'Install the agent',
    description: 'Install Gemini CLI and authenticate with your Google account.',
    href: '/docs/guide/01-install-agent',
  },
  {
    label: 'Step 2',
    title: 'Install prototype-kit',
    description: 'Add the extension that teaches the agent your stack.',
    href: '/docs/guide/02-install-mcps',
  },
  {
    label: 'Step 3',
    title: 'Prepare your docs',
    description: 'Write three short documents: product brief, UX vibes, screens.',
    href: '/docs/guide/03-prepare-docs',
  },
  {
    label: 'Step 4',
    title: 'Run the prompt',
    description: 'Open the agent, run /prototype-from-docs, answer its questions.',
    href: '/docs/guide/04-run-prompt',
  },
  {
    label: 'Step 5',
    title: 'Open the prototype',
    description: 'Start the dev server and see your prototype at localhost:5173.',
    href: '/docs/guide/05-open-prototype',
  },
  {
    label: 'Case study',
    title: 'Billi',
    description: 'The first prototype built with this workflow — a finance app for Mexico.',
    href: '/cases/billi',
  },
];
