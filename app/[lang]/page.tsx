import Link from 'next/link';
import { i18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import type { Metadata } from 'next';
import { ToolGrid } from '@/components/tool-grid';
import { getTools } from '@/lib/tools-catalog';

export default async function LocaleHomePage(
  props: PageProps<'/[lang]'> & { params: Promise<{ lang: string }> },
) {
  const { lang } = await props.params;
  if (!(i18n.languages as string[]).includes(lang)) notFound();

  const tools = getTools(lang === 'es' ? 'es' : 'en');

  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-20 text-center">
        <span className="text-xs font-mono text-fd-muted-foreground uppercase tracking-widest mb-4">
          Agentic Engineering Agency
        </span>
        <h1 className="text-4xl font-bold mb-4 max-w-2xl">
          El Playbook
        </h1>
        <p className="text-fd-muted-foreground text-lg mb-12 max-w-xl">
          Documentación pública y bilingüe de los métodos abiertos y kits que publicamos.
        </p>

        <section className="w-full max-w-6xl mx-auto mb-16 text-left">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-fd-foreground mb-2">
              Documentación publicada
            </h2>
            <p className="text-fd-muted-foreground max-w-xl mx-auto">
              Guías vinculadas a sus fuentes y rutas de instalación verificadas para el trabajo público de Agentic Engineering.
            </p>
          </div>
          <ToolGrid tools={tools} locale="es" />
        </section>

        <div className="max-w-3xl w-full text-left rounded-lg border border-fd-primary/30 bg-fd-primary/5 p-6 mb-6">
          <span className="text-xs font-mono text-fd-primary uppercase tracking-widest">
            Centro de documentación
          </span>
          <h2 className="font-semibold text-lg mt-1 mb-2">Explora toda la documentación</h2>
          <p className="text-sm text-fd-muted-foreground mb-4">
            El índice de documentación agrupa los kits publicados en un solo lugar e incluye comandos rápidos de instalación.
          </p>
          <Link
            href="/es/docs"
            className="rounded-md bg-fd-primary text-fd-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity inline-block"
          >
            Abrir documentación →
          </Link>
        </div>

        <div className="max-w-3xl w-full text-left rounded-lg border border-fd-border bg-fd-card p-6">
          <span className="text-xs font-mono text-fd-muted-foreground uppercase tracking-widest">
            Límite público
          </span>
          <h2 className="font-semibold text-lg mt-1 mb-2">Qué pertenece aquí</h2>
          <p className="text-sm text-fd-muted-foreground mb-4">
            El Playbook publica documentación revisada y rutas de evidencia. No es un dashboard
            interno, un espacio de clientes ni una fuente del estado operativo de la empresa.
          </p>
          <Link
            href="/es/docs/about"
            className="text-sm font-medium text-fd-primary hover:opacity-80 transition-opacity"
          >
            Leer el límite de publicación →
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
    </HomeLayout>
  );
}

export async function generateStaticParams() {
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
        'Documentación pública y bilingüe de los métodos abiertos, kits y rutas de evidencia verificadas de Agentic Engineering.',
    };
  }
  return { title: 'Agentic Engineering Playbook' };
}
