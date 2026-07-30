import Link from 'next/link';
import {
  ArrowUpRight,
  BookOpen,
  Github,
  Package,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import {
  getPublicProjects,
  type ProjectCategory,
  type ProjectLocale,
} from '@/lib/public-projects';

const categoryOrder: ProjectCategory[] = [
  'systems',
  'methods',
  'integrations',
  'applications',
];

const categoryCopy: Record<
  ProjectLocale,
  Record<ProjectCategory, { title: string; description: string }>
> = {
  en: {
    systems: {
      title: 'Engineering systems',
      description: 'Harnesses and agent environments for bounded, reviewable software work.',
    },
    methods: {
      title: 'Methods and kits',
      description: 'Reusable workflows and packaged skills with public documentation.',
    },
    integrations: {
      title: 'Integrations',
      description: 'Adapters, plugins, and directories that connect public agent tooling.',
    },
    applications: {
      title: 'Applications and knowledge',
      description: 'Public applications, prototypes, documentation, and knowledge surfaces.',
    },
  },
  es: {
    systems: {
      title: 'Sistemas de ingeniería',
      description:
        'Arneses y entornos de agentes para trabajo de software acotado y revisable.',
    },
    methods: {
      title: 'Métodos y kits',
      description:
        'Flujos reutilizables y skills empaquetados con documentación pública.',
    },
    integrations: {
      title: 'Integraciones',
      description:
        'Adaptadores, plugins y directorios que conectan herramientas públicas de agentes.',
    },
    applications: {
      title: 'Aplicaciones y conocimiento',
      description:
        'Aplicaciones públicas, prototipos, documentación y superficies de conocimiento.',
    },
  },
};

const linkCopy = {
  en: {
    source: 'Source',
    docs: 'Docs',
    package: 'Package',
    license: 'License',
    status: 'Status evidence',
  },
  es: {
    source: 'Código',
    docs: 'Docs',
    package: 'Paquete',
    license: 'Licencia',
    status: 'Evidencia de estado',
  },
} satisfies Record<ProjectLocale, Record<string, string>>;

export function ProjectCatalog({
  locale = 'en',
  compact = false,
}: {
  locale?: ProjectLocale;
  compact?: boolean;
}) {
  const projects = getPublicProjects(locale);
  const visibleProjects = compact
    ? projects.filter((project) => project.featured)
    : projects;

  if (compact) {
    return (
      <div className="project-grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} featured />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {categoryOrder.map((category) => {
        const categoryProjects = visibleProjects.filter(
          (project) => project.category === category,
        );
        const copy = categoryCopy[locale][category];

        return (
          <section key={category} aria-labelledby={`projects-${category}`}>
            <div className="mb-6 max-w-2xl">
              <p className="eyebrow">{String(categoryOrder.indexOf(category) + 1).padStart(2, '0')}</p>
              <h2 id={`projects-${category}`} className="mt-2 text-2xl font-semibold tracking-tight">
                {copy.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
                {copy.description}
              </p>
            </div>
            <div className="project-grid">
              {categoryProjects.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function ProjectCard({
  project,
  locale,
  featured = false,
}: {
  project: ReturnType<typeof getPublicProjects>[number];
  locale: ProjectLocale;
  featured?: boolean;
}) {
  return (
    <article className={`project-card ${featured ? 'project-card-featured' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-fd-border bg-fd-background text-fd-primary">
          <ShieldCheck aria-hidden="true" className="h-5 w-5" />
        </div>
        <span className="project-status">
          {project.license === 'MIT repository'
            ? 'MIT'
            : locale === 'es'
              ? 'MIT (paquete)'
              : 'MIT (package)'}
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
          {project.summary}
        </p>
      </div>

      <p className="mt-5 border-t border-fd-border pt-4 text-xs leading-5 text-fd-muted-foreground">
        {project.status}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <ProjectLink href={project.sourceUrl} label={linkCopy[locale].source} icon="source" />
        <ProjectLink
          href={project.licenseUrl}
          label={linkCopy[locale].license}
          icon="license"
        />
        <ProjectLink
          href={project.statusUrl}
          label={linkCopy[locale].status}
          icon="status"
        />
        {project.docsUrl ? (
          <ProjectLink href={project.docsUrl} label={linkCopy[locale].docs} icon="docs" />
        ) : null}
        {project.packageUrl ? (
          <ProjectLink
            href={project.packageUrl}
            label={linkCopy[locale].package}
            icon="package"
          />
        ) : null}
      </div>
    </article>
  );
}

function ProjectLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: 'source' | 'docs' | 'package' | 'license' | 'status';
}) {
  const Icon =
    icon === 'source'
      ? Github
      : icon === 'docs' || icon === 'status'
        ? BookOpen
        : icon === 'license'
          ? Scale
          : Package;
  const external = href.startsWith('http');

  const className =
    'inline-flex min-h-9 items-center gap-1.5 rounded-full border border-fd-border bg-fd-background px-3 text-xs font-medium text-fd-foreground transition-colors hover:border-fd-primary/50 hover:text-fd-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
        {label}
        <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <Icon aria-hidden="true" className="h-3.5 w-3.5" />
      {label}
    </Link>
  );
}
