export type InstallType = 'npx' | 'slash' | 'cli' | 'link';

export interface InstallCommand {
  label: string;
  command: string;
  type: InstallType;
}

export interface AgentSupport {
  id: string;
  name: string;
  installCommands: InstallCommand[];
}

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'prototyping' | 'project-management' | 'development';
  docsHref: string;
  githubUrl?: string;
  agents: AgentSupport[];
}

type Locale = 'en' | 'es';

interface ToolCopy {
  name: string;
  tagline: string;
  description: string;
}

interface ToolDefinition extends Omit<Tool, 'name' | 'tagline' | 'description'> {
  copy: Record<Locale, ToolCopy>;
}

const toolDefinitions: ToolDefinition[] = [
  {
    id: 'prototype-kit',
    copy: {
      en: {
        name: 'Prototype Kit',
        tagline:
          'Ship a polished React + shadcn prototype in an afternoon, without writing code.',
        description:
          'Scaffold production-grade React + shadcn/ui frontend prototypes from product docs. Bundles a frontend-design skill and a /prototype-from-docs command.',
      },
      es: {
        name: 'Prototype Kit',
        tagline:
          'Construye un prototipo pulido con React + shadcn en una tarde, sin escribir codigo.',
        description:
          'Genera prototipos frontend de React + shadcn/ui a partir de documentos de producto. Incluye un skill de diseno frontend y el comando /prototype-from-docs.',
      },
    },
    category: 'prototyping',
    docsHref: '/docs/prototype-kit',
    githubUrl: 'https://github.com/Agentic-Engineering-Agency/prototype-kit',
    agents: [
      {
        id: 'claude-code',
        name: 'Claude Code',
        installCommands: [
          {
            label: 'Add marketplace',
            command:
              '/plugin marketplace add Agentic-Engineering-Agency/prototype-kit',
            type: 'slash',
          },
          {
            label: 'Install plugin',
            command: '/plugin install prototype-kit@prototype-kit',
            type: 'slash',
          },
        ],
      },
      {
        id: 'gemini-cli',
        name: 'Gemini CLI',
        installCommands: [
          {
            label: 'Install extension',
            command:
              'gemini extensions install --consent https://github.com/Agentic-Engineering-Agency/prototype-kit',
            type: 'cli',
          },
        ],
      },
      {
        id: 'opencode',
        name: 'OpenCode',
        installCommands: [
          {
            label: 'Universal install',
            command: 'npx @agentic-engineering/prototype-kit init',
            type: 'npx',
          },
        ],
      },
    ],
  },
  {
    id: 'agentic-pm-kit',
    copy: {
      en: {
        name: 'PM Kit',
        tagline:
          'Turn Claude Code and Gemini CLI into competent drafters of PMBOK- and Scrum-shaped project artifacts.',
        description:
          '40 Agent Skills across five lifecycle phases: Ideation, Initiation, Planning, Execution, and Closing. Each skill produces drafts grounded in authoritative sources.',
      },
      es: {
        name: 'PM Kit',
        tagline:
          'Convierte Claude Code y Gemini CLI en redactores competentes de artefactos PMBOK y Scrum.',
        description:
          '40 Agent Skills repartidos en cinco fases: ideacion, inicio, planeacion, ejecucion y cierre. Cada skill genera borradores anclados a fuentes autoritativas.',
      },
    },
    category: 'project-management',
    docsHref: '/docs/pm-kit',
    githubUrl: 'https://github.com/Agentic-Engineering-Agency/agentic-pm-kit',
    agents: [
      {
        id: 'claude-code',
        name: 'Claude Code',
        installCommands: [
          {
            label: 'Add marketplace',
            command:
              '/plugin marketplace add Agentic-Engineering-Agency/agentic-pm-kit',
            type: 'slash',
          },
          {
            label: 'Install plugin',
            command:
              '/plugin install agentic-pm-kit@agentic-engineering-agency',
            type: 'slash',
          },
        ],
      },
      {
        id: 'gemini-cli',
        name: 'Gemini CLI',
        installCommands: [
          {
            label: 'Install extension',
            command:
              'gemini extensions install --consent https://github.com/Agentic-Engineering-Agency/agentic-pm-kit',
            type: 'cli',
          },
        ],
      },
      {
        id: 'universal',
        name: 'Universal',
        installCommands: [
          {
            label: 'Universal install',
            command: 'npx agentic-pm-kit install',
            type: 'npx',
          },
        ],
      },
    ],
  },
  {
    id: 'specsafe',
    copy: {
      en: {
        name: 'SpecSafe',
        tagline:
          'Spec-driven TDD framework that keeps AI coding agents aligned with human intent.',
        description:
          'A two-phase framework for AI-assisted development: plan first to reduce ambiguity, then move through spec-driven implementation, verification, and QA.',
      },
      es: {
        name: 'SpecSafe',
        tagline:
          'Framework de TDD guiado por especificaciones que mantiene a los agentes alineados con la intencion humana.',
        description:
          'Un framework de dos fases para desarrollo asistido por IA: primero planeacion para reducir ambiguedad, despues implementacion guiada por specs, verificacion y QA.',
      },
    },
    category: 'development',
    docsHref: 'https://specsafe.agenticengineering.lat/',
    githubUrl: 'https://github.com/Agentic-Engineering-Agency/specsafe',
    agents: [
      {
        id: 'claude-code',
        name: 'Claude Code',
        installCommands: [
          {
            label: 'Install CLI',
            command: 'npm install -g @specsafe/cli',
            type: 'cli',
          },
          {
            label: 'Install support',
            command: 'specsafe install claude-code',
            type: 'cli',
          },
        ],
      },
      {
        id: 'gemini',
        name: 'Gemini',
        installCommands: [
          {
            label: 'Install CLI',
            command: 'npm install -g @specsafe/cli',
            type: 'cli',
          },
          {
            label: 'Install support',
            command: 'specsafe install gemini',
            type: 'cli',
          },
        ],
      },
    ],
  },
];

export function getTools(locale: Locale = 'en'): Tool[] {
  return toolDefinitions.map(({ copy, ...tool }) => ({
    ...tool,
    ...copy[locale],
  }));
}
