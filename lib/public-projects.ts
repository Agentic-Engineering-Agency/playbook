export type ProjectLocale = 'en' | 'es';

export type ProjectCategory =
  | 'systems'
  | 'methods'
  | 'integrations'
  | 'applications';

interface ProjectCopy {
  summary: string;
  status: string;
}

export interface PublicProject {
  id: string;
  name: string;
  category: ProjectCategory;
  featured?: boolean;
  license: 'MIT repository' | 'MIT package metadata';
  licenseUrl: string;
  statusUrl: string;
  sourceUrl: string;
  docsUrl?: string;
  packageUrl?: string;
  copy: Record<ProjectLocale, ProjectCopy>;
}

export const publicProjects: PublicProject[] = [
  {
    id: 'ultimate-harness',
    name: 'Ultimate Harness',
    category: 'systems',
    featured: true,
    license: 'MIT package metadata',
    licenseUrl:
      'https://github.com/Agentic-Engineering-Agency/ultimate-harness/blob/main/package.json',
    statusUrl:
      'https://github.com/Agentic-Engineering-Agency/ultimate-harness#current-status',
    sourceUrl: 'https://github.com/Agentic-Engineering-Agency/ultimate-harness',
    docsUrl: 'https://uh.agenticengineering.lat',
    packageUrl: 'https://www.npmjs.com/package/@agenticengineeringagency/ultimate-harness',
    copy: {
      en: {
        summary:
          'A runtime-agnostic software-development harness built around mission packets, runtime adapters, sandboxed execution, verification records, and human promotion decisions.',
        status: 'Public source · MIT package metadata · npm package',
      },
      es: {
        summary:
          'Un arnés de desarrollo de software independiente del runtime, basado en paquetes de misión, adaptadores, ejecución aislada, registros de verificación y decisiones humanas de promoción.',
        status: 'Código público · metadatos de paquete MIT · paquete npm',
      },
    },
  },
  {
    id: 'specsafe',
    name: 'SpecSafe',
    category: 'methods',
    featured: true,
    license: 'MIT repository',
    licenseUrl:
      'https://github.com/Agentic-Engineering-Agency/specsafe/blob/main/LICENSE',
    statusUrl: 'https://github.com/Agentic-Engineering-Agency/specsafe#quick-start',
    sourceUrl: 'https://github.com/Agentic-Engineering-Agency/specsafe',
    docsUrl: 'https://specsafe.agenticengineering.lat/',
    packageUrl: 'https://www.npmjs.com/package/@specsafe/cli',
    copy: {
      en: {
        summary:
          'A two-phase framework for AI-assisted development: reduce ambiguity through planning, then deliver through spec slices, tests, verification, QA, and human approval.',
        status: 'Open source · MIT · npm package',
      },
      es: {
        summary:
          'Un framework de dos fases para desarrollo asistido por IA: reduce ambigüedad mediante planeación y después entrega con slices de especificación, pruebas, verificación, QA y aprobación humana.',
        status: 'Código abierto · MIT · paquete npm',
      },
    },
  },
  {
    id: 'agentic-pm-kit',
    name: 'Agentic PM Kit',
    category: 'methods',
    featured: true,
    license: 'MIT repository',
    licenseUrl:
      'https://github.com/Agentic-Engineering-Agency/agentic-pm-kit/blob/master/LICENSE',
    statusUrl:
      'https://github.com/Agentic-Engineering-Agency/agentic-pm-kit#install',
    sourceUrl: 'https://github.com/Agentic-Engineering-Agency/agentic-pm-kit',
    docsUrl: 'https://labs.agenticengineering.agency/docs/pm-kit',
    packageUrl: 'https://www.npmjs.com/package/agentic-pm-kit',
    copy: {
      en: {
        summary:
          'A source-grounded collection of project-management Agent Skills for drafting PMBOK- and Scrum-shaped artifacts with Claude Code and Gemini CLI.',
        status: 'Open source · MIT · npm package',
      },
      es: {
        summary:
          'Una colección de Agent Skills de gestión de proyectos, anclada a fuentes, para redactar artefactos con forma PMBOK y Scrum en Claude Code y Gemini CLI.',
        status: 'Código abierto · MIT · paquete npm',
      },
    },
  },
  {
    id: 'prototype-kit',
    name: 'Prototype Kit',
    category: 'methods',
    license: 'MIT repository',
    licenseUrl:
      'https://github.com/Agentic-Engineering-Agency/prototype-kit/blob/main/LICENSE',
    statusUrl:
      'https://github.com/Agentic-Engineering-Agency/prototype-kit',
    sourceUrl: 'https://github.com/Agentic-Engineering-Agency/prototype-kit',
    docsUrl: 'https://labs.agenticengineering.agency/docs/prototype-kit',
    copy: {
      en: {
        summary:
          'A documented workflow for turning product documents into a React and shadcn/ui prototype through supported agent plugin and extension paths.',
        status: 'Open source · MIT · source installs verified',
      },
      es: {
        summary:
          'Un flujo documentado para convertir documentos de producto en un prototipo con React y shadcn/ui mediante rutas verificadas de plugins y extensiones.',
        status: 'Código abierto · MIT · instalaciones desde fuente verificadas',
      },
    },
  },
  {
    id: 'paperclip-adapter-omp',
    name: 'Paperclip OMP Adapter',
    category: 'integrations',
    license: 'MIT repository',
    licenseUrl:
      'https://github.com/Agentic-Engineering-Agency/paperclip-adapter-omp/blob/main/LICENSE',
    statusUrl:
      'https://github.com/Agentic-Engineering-Agency/paperclip-adapter-omp/blob/main/docs/integration.md',
    sourceUrl:
      'https://github.com/Agentic-Engineering-Agency/paperclip-adapter-omp',
    docsUrl:
      'https://github.com/Agentic-Engineering-Agency/paperclip-adapter-omp/blob/main/docs/integration.md',
    packageUrl:
      'https://www.npmjs.com/package/@agentic-engineering-agency/paperclip-adapter-omp',
    copy: {
      en: {
        summary:
          'A Paperclip runtime adapter that invokes OMP locally, parses its event stream, persists sessions, and surfaces model, usage, and cost metadata.',
        status: 'Open source · MIT · npm package',
      },
      es: {
        summary:
          'Un adaptador de runtime para Paperclip que ejecuta OMP localmente, interpreta su flujo de eventos, conserva sesiones y expone metadatos de modelo, uso y costo.',
        status: 'Código abierto · MIT · paquete npm',
      },
    },
  },
  {
    id: 'paperclip-plugin-langfuse-export',
    name: 'Paperclip Langfuse Export',
    category: 'integrations',
    license: 'MIT package metadata',
    licenseUrl:
      'https://www.npmjs.com/package/@agentic-engineering-agency/paperclip-plugin-langfuse-export',
    statusUrl:
      'https://github.com/Agentic-Engineering-Agency/paperclip-plugin-langfuse-export',
    sourceUrl:
      'https://github.com/Agentic-Engineering-Agency/paperclip-plugin-langfuse-export',
    packageUrl:
      'https://www.npmjs.com/package/@agentic-engineering-agency/paperclip-plugin-langfuse-export',
    copy: {
      en: {
        summary:
          'A Paperclip plugin that maps trace-shaped events to Langfuse traces and observations with bounded retry behavior and credential redaction.',
        status: 'Public source · MIT package metadata · npm package',
      },
      es: {
        summary:
          'Un plugin de Paperclip que transforma eventos de trazas en trazas y observaciones de Langfuse, con reintentos acotados y ocultamiento de credenciales.',
        status: 'Código público · metadatos de paquete MIT · paquete npm',
      },
    },
  },
  {
    id: 'triage',
    name: 'Triage',
    category: 'applications',
    license: 'MIT repository',
    licenseUrl:
      'https://github.com/Agentic-Engineering-Agency/triage/blob/main/LICENSE',
    statusUrl: 'https://triage.agenticengineering.lat',
    sourceUrl: 'https://github.com/Agentic-Engineering-Agency/triage',
    docsUrl: 'https://triage.agenticengineering.lat',
    copy: {
      en: {
        summary:
          'An incident-intake and SRE triage application that grounds analysis in a connected codebase and supports human-reviewed ticket and notification workflows.',
        status: 'Open source · MIT · public documentation',
      },
      es: {
        summary:
          'Una aplicación de recepción y triage de incidentes SRE que fundamenta el análisis en un repositorio conectado y permite flujos de tickets y notificaciones con revisión humana.',
        status: 'Código abierto · MIT · documentación pública',
      },
    },
  },
];

export function getPublicProjects(locale: ProjectLocale) {
  return publicProjects.map(({ copy, ...project }) => ({
    ...project,
    ...copy[locale],
  }));
}

const catalogTextCopy = {
  en: {
    heading: 'Catalog data',
    intro:
      'Serialized from the same reviewed catalog data used to render the project cards.',
    category: 'Category',
    license: 'License',
    status: 'Status',
    statusEvidence: 'Status evidence',
    licenseEvidence: 'License evidence',
    source: 'Source',
    docs: 'Documentation',
    package: 'Package',
    categories: {
      systems: 'Engineering systems',
      methods: 'Methods and kits',
      integrations: 'Integrations',
      applications: 'Applications and knowledge',
    },
    licenses: {
      'MIT repository': 'MIT repository',
      'MIT package metadata': 'MIT package metadata',
    },
  },
  es: {
    heading: 'Datos del catálogo',
    intro:
      'Serializado a partir de los mismos datos revisados que generan las tarjetas de proyecto.',
    category: 'Categoría',
    license: 'Licencia',
    status: 'Estado',
    statusEvidence: 'Evidencia de estado',
    licenseEvidence: 'Evidencia de licencia',
    source: 'Código',
    docs: 'Documentación',
    package: 'Paquete',
    categories: {
      systems: 'Sistemas de ingeniería',
      methods: 'Métodos y kits',
      integrations: 'Integraciones',
      applications: 'Aplicaciones y conocimiento',
    },
    licenses: {
      'MIT repository': 'repositorio MIT',
      'MIT package metadata': 'metadatos de paquete MIT',
    },
  },
} satisfies Record<
  ProjectLocale,
  {
    heading: string;
    intro: string;
    category: string;
    license: string;
    status: string;
    statusEvidence: string;
    licenseEvidence: string;
    source: string;
    docs: string;
    package: string;
    categories: Record<ProjectCategory, string>;
    licenses: Record<PublicProject['license'], string>;
  }
>;

// Text-export representation of the catalog. `<ProjectCatalog />` renders React,
// so the MDX text pipeline that powers /llms-full.txt and the per-page Markdown
// copies would otherwise omit every project status, source, and package link.
export function getPublicProjectsText(locale: ProjectLocale) {
  const copy = catalogTextCopy[locale];
  const lines = [`## ${copy.heading}`, '', copy.intro];

  for (const project of getPublicProjects(locale)) {
    lines.push(
      '',
      `### ${project.name}`,
      '',
      project.summary,
      '',
      `- ${copy.category}: ${copy.categories[project.category]}`,
      `- ${copy.license}: ${copy.licenses[project.license]}`,
      `- ${copy.status}: ${project.status}`,
      `- ${copy.licenseEvidence}: ${project.licenseUrl}`,
      `- ${copy.statusEvidence}: ${project.statusUrl}`,
      `- ${copy.source}: ${project.sourceUrl}`,
    );

    if (project.docsUrl) {
      lines.push(`- ${copy.docs}: ${project.docsUrl}`);
    }

    if (project.packageUrl) {
      lines.push(`- ${copy.package}: ${project.packageUrl}`);
    }
  }

  return lines.join('\n');
}
