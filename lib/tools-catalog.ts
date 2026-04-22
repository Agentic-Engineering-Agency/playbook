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

export const tools: Tool[] = [
  {
    id: 'prototype-kit',
    name: 'Prototype Kit',
    tagline:
      'Ship a polished React + shadcn prototype in an afternoon, without writing code.',
    description:
      'Scaffold production-grade React + shadcn/ui frontend prototypes from product docs. Bundles a frontend-design skill and a /prototype-from-docs command.',
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
    name: 'Agentic PM Kit',
    tagline:
      'Turn Claude Code and Gemini CLI into competent drafters of PMBOK- and Scrum-shaped PM artifacts.',
    description:
      '40 Agent Skills across five lifecycle phases — Ideation, Initiation, Planning, Execution, and Closing. Each skill produces drafts grounded in authoritative sources.',
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
    name: 'SpecSafe',
    tagline:
      'Spec-driven TDD framework that keeps AI coding agents aligned with human intent.',
    description:
      'A skills-first TDD framework for development assisted by AI. Specifications, test-driven implementation, and QA gates keep agents on track.',
    category: 'development',
    docsHref: 'https://specsafe.agenticengineering.lat/',
    githubUrl: 'https://github.com/Agentic-Engineering-Agency/specsafe',
    agents: [],
  },
];
