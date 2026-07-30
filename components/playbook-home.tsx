import Link from 'next/link';
import {
  ArrowRight,
  BookMarked,
  Braces,
  Boxes,
  CheckCircle2,
  Github,
  Languages,
  Library,
  Route,
} from 'lucide-react';
import { ProjectCatalog } from '@/components/project-catalog';
import type { ProjectLocale } from '@/lib/public-projects';

const copy = {
  en: {
    eyebrow: 'Public engineering field guide',
    title: 'Methods, kits, and proof for building with agents.',
    intro:
      'A bilingual, source-linked guide to the open systems Agentic Engineering publishes—designed for inspection, adoption, and reuse.',
    primaryCta: 'Explore the catalog',
    secondaryCta: 'Read the methods',
    trust: ['English + Español', 'Source-linked', 'Static and machine-readable'],
    mapEyebrow: 'Start with the map',
    mapTitle: 'Four paths through the Playbook',
    mapDescription:
      'Choose the question you are trying to answer. Each section leads back to canonical public sources.',
    featuredEyebrow: 'Featured public work',
    featuredTitle: 'Inspect the systems behind the methods',
    featuredDescription:
      'Start with the projects that define the current public engineering direction, then continue into the complete catalog.',
    allProjects: 'View every public project',
    proofEyebrow: 'Publication contract',
    proofTitle: 'Claims travel with evidence.',
    proofDescription:
      'Project labels, availability, licenses, and links are checked against the public organization and canonical repositories. Public source without a declared license is labeled separately from open source.',
    proofCta: 'How proof is published',
    footer: 'Public documentation, not an internal operating dashboard.',
  },
  es: {
    eyebrow: 'Guía pública de ingeniería',
    title: 'Métodos, kits y evidencia para construir con agentes.',
    intro:
      'Una guía bilingüe y vinculada a fuentes de los sistemas abiertos que publica Agentic Engineering, diseñada para inspección, adopción y reutilización.',
    primaryCta: 'Explorar el catálogo',
    secondaryCta: 'Leer los métodos',
    trust: ['English + Español', 'Vinculado a fuentes', 'Estático y legible por máquinas'],
    mapEyebrow: 'Empieza por el mapa',
    mapTitle: 'Cuatro rutas por el Playbook',
    mapDescription:
      'Elige la pregunta que quieres responder. Cada sección regresa a fuentes públicas canónicas.',
    featuredEyebrow: 'Trabajo público destacado',
    featuredTitle: 'Inspecciona los sistemas detrás de los métodos',
    featuredDescription:
      'Empieza con los proyectos que definen la dirección pública actual de ingeniería y continúa al catálogo completo.',
    allProjects: 'Ver todos los proyectos públicos',
    proofEyebrow: 'Contrato de publicación',
    proofTitle: 'Las afirmaciones viajan con evidencia.',
    proofDescription:
      'Las etiquetas, disponibilidad, licencias y enlaces se revisan contra la organización pública y los repositorios canónicos. El código público sin licencia declarada se distingue del código abierto.',
    proofCta: 'Cómo publicamos evidencia',
    footer: 'Documentación pública, no un dashboard operativo interno.',
  },
} satisfies Record<ProjectLocale, Record<string, string | string[]>>;

const paths = {
  en: [
    {
      number: '01',
      title: 'Methods',
      description: 'Understand the repeatable planning, specification, and verification loops.',
      href: '/docs/methods',
      icon: Route,
    },
    {
      number: '02',
      title: 'Kits',
      description: 'Install and use packaged skills through source-verified paths.',
      href: '/docs/kits',
      icon: Boxes,
    },
    {
      number: '03',
      title: 'Proof',
      description: 'See the publication rules behind status, evidence, and claims.',
      href: '/docs/proof',
      icon: CheckCircle2,
    },
    {
      number: '04',
      title: 'Open projects',
      description: 'Browse every suitable public repository with its ownership and source.',
      href: '/docs/projects',
      icon: Library,
    },
  ],
  es: [
    {
      number: '01',
      title: 'Métodos',
      description: 'Entiende los ciclos repetibles de planeación, especificación y verificación.',
      href: '/es/docs/methods',
      icon: Route,
    },
    {
      number: '02',
      title: 'Kits',
      description: 'Instala y usa skills empaquetados mediante rutas verificadas en la fuente.',
      href: '/es/docs/kits',
      icon: Boxes,
    },
    {
      number: '03',
      title: 'Evidencia',
      description: 'Consulta las reglas de publicación detrás del estado y las afirmaciones.',
      href: '/es/docs/proof',
      icon: CheckCircle2,
    },
    {
      number: '04',
      title: 'Proyectos abiertos',
      description: 'Explora cada repositorio público apto, con propiedad y fuente.',
      href: '/es/docs/projects',
      icon: Library,
    },
  ],
} satisfies Record<
  ProjectLocale,
  Array<{
    number: string;
    title: string;
    description: string;
    href: string;
    icon: typeof Route;
  }>
>;

export function PlaybookHome({ locale }: { locale: ProjectLocale }) {
  const text = copy[locale];
  const localePrefix = locale === 'es' ? '/es' : '';

  return (
    <main className="playbook-shell">
      <section className="hero-grid overflow-hidden border-b border-fd-border">
        <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div>
            <div className="eyebrow">
              <Braces aria-hidden="true" className="h-3.5 w-3.5" />
              {text.eyebrow}
            </div>
            <h1 className="mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {text.title}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-fd-muted-foreground sm:text-xl">
              {text.intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={`${localePrefix}/docs/projects`} className="button-primary">
                {text.primaryCta}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href={`${localePrefix}/docs/methods`} className="button-secondary">
                <BookMarked aria-hidden="true" className="h-4 w-4" />
                {text.secondaryCta}
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-fd-muted-foreground">
              {(text.trust as string[]).map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  {index === 0 ? (
                    <Languages aria-hidden="true" className="h-3.5 w-3.5 text-fd-primary" />
                  ) : (
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-fd-primary" />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="signal-panel" aria-label={locale === 'es' ? 'Mapa del Playbook' : 'Playbook map'}>
            <div className="signal-panel-header">
              <span>PLAYBOOK / PUBLIC</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                SOURCE-LINKED
              </span>
            </div>
            <ol className="divide-y divide-white/10">
              {paths[locale].map((path) => (
                <li key={path.number}>
                  <Link href={path.href} className="signal-row group">
                    <span className="font-mono text-xs text-white/40">{path.number}</span>
                    <span>
                      <strong className="block text-sm font-medium text-white">{path.title}</strong>
                      <span className="mt-1 block text-xs leading-5 text-white/55">
                        {path.description}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-shell" aria-labelledby="playbook-map-title">
        <div className="section-heading">
          <p className="eyebrow">{text.mapEyebrow}</p>
          <h2 id="playbook-map-title">{text.mapTitle}</h2>
          <p>{text.mapDescription}</p>
        </div>
        <div className="path-grid">
          {paths[locale].map((path) => {
            const Icon = path.icon;
            return (
              <Link key={path.number} href={path.href} className="path-card group">
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="h-5 w-5 text-fd-primary" />
                  <span className="font-mono text-xs text-fd-muted-foreground">{path.number}</span>
                </div>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-fd-primary">
                  {locale === 'es' ? 'Explorar' : 'Explore'}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-shell border-y border-fd-border bg-fd-muted/25" aria-labelledby="featured-projects-title">
        <div className="section-heading">
          <p className="eyebrow">{text.featuredEyebrow}</p>
          <h2 id="featured-projects-title">{text.featuredTitle}</h2>
          <p>{text.featuredDescription}</p>
        </div>
        <ProjectCatalog locale={locale} compact />
        <div className="mt-9">
          <Link href={`${localePrefix}/docs/projects`} className="button-secondary">
            {text.allProjects}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-shell">
        <div className="proof-panel">
          <div>
            <p className="eyebrow">{text.proofEyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {text.proofTitle}
            </h2>
          </div>
          <div>
            <p className="max-w-xl text-sm leading-7 text-fd-muted-foreground">
              {text.proofDescription}
            </p>
            <Link href={`${localePrefix}/docs/proof`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fd-primary">
              {text.proofCta}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-fd-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>{text.footer}</p>
          <div className="flex flex-wrap gap-5">
            <a
              href="https://github.com/Agentic-Engineering-Agency"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-fd-foreground"
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://agenticengineering.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fd-foreground"
            >
              agenticengineering.agency
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
