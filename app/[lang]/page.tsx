import Link from 'next/link';
import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export default async function LocaleHomePage(
  props: PageProps<'/[lang]'> & { params: Promise<{ lang: string }> },
) {
  const { lang } = await props.params;
  if (!(i18n.languages as string[]).includes(lang)) notFound();

  // Currently only Spanish is served under a locale prefix
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 py-20 text-center">
      <span className="text-xs font-mono text-fd-muted-foreground uppercase tracking-widest mb-4">
        Agentic Engineering Agency
      </span>
      <h1 className="text-4xl font-bold mb-4 max-w-2xl">
        El Playbook
      </h1>
      <p className="text-fd-muted-foreground text-lg mb-12 max-w-xl">
        Construimos con agentes de IA para startups de LATAM. Aquí compartimos lo que hemos aprendido.
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
          Guía destacada
        </span>
        <h2 className="font-semibold text-lg mt-1 mb-2">Prototype Kit</h2>
        <p className="text-sm text-fd-muted-foreground mb-4">
          Construye un prototipo pulido con React + shadcn en una tarde, sin escribir código.
        </p>
        <Link
          href="/es/docs/prototype-kit"
          className="rounded-md bg-fd-primary text-fd-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity inline-block"
        >
          Empezar →
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

// Blog and cases only have EN routes wired up for now. Until /es/blog and
// /es/cases exist, the ES landing only surfaces Guías to avoid dropping Spanish
// readers onto English content without warning.
const sections = [
  {
    title: 'Guías',
    description: 'Manuales con criterio para equipos que construyen con agentes de IA.',
    href: '/es/docs',
  },
  {
    title: 'Casos de estudio',
    description: 'Productos reales que construimos y cómo fue el proceso (próximamente en español).',
    href: '/cases',
  },
  {
    title: 'Blog',
    description: 'Notas sobre desarrollo con agentes, herramientas y craft (próximamente en español).',
    href: '/blog',
  },
];

export async function generateStaticParams() {
  // Only generate for non-default locales (en is served without a prefix)
  const nonDefaultLocales = i18n.languages.filter((l) => l !== i18n.defaultLanguage);
  return nonDefaultLocales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: PageProps<'/[lang]'> & { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await props.params;
  if (lang === 'es') {
    return {
      title: 'Agentic Engineering Playbook',
      description:
        'Construimos con agentes de IA para startups de LATAM. Guías, casos de estudio y notas del proceso.',
    };
  }
  return { title: 'Agentic Engineering Playbook' };
}
