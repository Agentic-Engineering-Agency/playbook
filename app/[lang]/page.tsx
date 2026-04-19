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
      <h1 className="text-4xl font-bold mb-4 max-w-2xl">
        Construye un prototipo pulido en una tarde.{' '}
        <span className="text-fd-primary">Sin escribir código.</span>
      </h1>
      <p className="text-fd-muted-foreground text-lg mb-10 max-w-xl">
        El Agentic Engineering Playbook enseña a estudiantes universitarios sin experiencia en
        código cómo construir prototipos reales con React y shadcn/ui usando un agente de IA
        gratuito.
      </p>
      <div className="flex gap-4 flex-wrap justify-center mb-16">
        <Link
          href="/es/docs"
          className="rounded-md bg-fd-primary text-fd-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity"
        >
          Leer la guía
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
          Casos de estudio
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
    label: 'Paso 1',
    title: 'Instalar el agente',
    description: 'Instala Gemini CLI y autentícate con tu cuenta de Google.',
    href: '/es/docs/guide/01-install-agent',
  },
  {
    label: 'Paso 2',
    title: 'Instalar prototype-kit',
    description: 'Añade la extensión que le enseña al agente tu stack.',
    href: '/es/docs/guide/02-install-mcps',
  },
  {
    label: 'Paso 3',
    title: 'Preparar tus documentos',
    description: 'Escribe tres documentos cortos: brief de producto, vibes de UX, pantallas.',
    href: '/es/docs/guide/03-prepare-docs',
  },
  {
    label: 'Paso 4',
    title: 'Ejecutar el prompt',
    description: 'Abre el agente, ejecuta /prototype-from-docs y responde sus preguntas.',
    href: '/es/docs/guide/04-run-prompt',
  },
  {
    label: 'Paso 5',
    title: 'Abrir el prototipo',
    description: 'Inicia el servidor de desarrollo y ve tu prototipo en localhost:5173.',
    href: '/es/docs/guide/05-open-prototype',
  },
  {
    label: 'Caso de estudio',
    title: 'Billi',
    description: 'El primer prototipo construido con este flujo — una app de finanzas para México.',
    href: '/cases/billi',
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
        'Aprende a construir prototipos React + shadcn/ui con un agente de IA, sin escribir código.',
    };
  }
  return { title: 'Agentic Engineering Playbook' };
}
