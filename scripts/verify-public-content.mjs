import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();

function walk(dir, predicate = () => true) {
  const paths = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...walk(path, predicate));
    } else if (predicate(path)) {
      paths.push(path);
    }
  }
  return paths;
}

const contentRoots = [
  'README.md',
  'app',
  'components',
  'content',
  'lib',
  'package.json',
  'public',
];
const publicFiles = contentRoots.flatMap((path) => {
  const absolute = join(root, path);
  return path.endsWith('.md') || path.endsWith('.json')
    ? [absolute]
    : walk(absolute, (file) => /\.(?:md|mdx|json|ts|tsx)$/.test(file));
});

const publicText = publicFiles
  .map((file) => `${relative(root, file)}\n${readFileSync(file, 'utf8')}`)
  .join('\n');

const allowedDeployablePublicFiles = new Set(['public/_redirects']);
for (const file of walk(join(root, 'public'))) {
  const path = relative(root, file);
  if (!allowedDeployablePublicFiles.has(path)) {
    throw new Error(
      `Deployable public asset requires an explicit privacy review and allowlist entry: ${path}`,
    );
  }
}

const forbidden = [
  ['unpublished Prototype Kit npm command', 'npx @agentic-engineering/prototype-kit init'],
  ['removed generative chat endpoint', '/api/chat'],
  ['removed OpenRouter secret binding', 'OPENROUTER_API_KEY'],
  ['removed AI chat trigger', 'Ask AI'],
  ['internal KLGV data', 'KLGV'],
  ['retired Gemini individual free-account instruction', 'authenticate with your free Google account'],
  ['retired Spanish Gemini free-account instruction', 'cuenta de Google gratuita'],
  ['incorrect Prototype Kit screen output path', 'prototype/src/screens/'],
  ['stale Gemini CLI Node floor', 'Gemini CLI requires Node.js 18'],
  ['stale Spanish Gemini CLI Node floor', 'Gemini CLI requiere Node.js 18'],
  ['stale Prototype workflow Node threshold', 'below `v18.0.0`'],
  ['stale Spanish Prototype workflow Node threshold', 'menor a `v18.0.0`'],
  [
    'stale Gemini extension-list guidance',
    '`gemini extensions list` only renders inside an interactive',
  ],
  [
    'stale Gemini extension-list literal output',
    'prototype-kit  v0.x.x  Agentic Engineering Agency',
  ],
];

for (const [label, value] of forbidden) {
  if (publicText.includes(value)) {
    throw new Error(`Public content still contains ${label}: ${value}`);
  }
}

const required = [
  [
    'verified Prototype Kit Gemini source install',
    'gemini extensions install --consent https://github.com/Agentic-Engineering-Agency/prototype-kit',
  ],
  [
    'verified Prototype Kit Claude marketplace',
    '/plugin marketplace add Agentic-Engineering-Agency/prototype-kit',
  ],
  ['public boundary page', 'The Playbook is a public documentation and proof-distribution surface'],
  ['Spanish public boundary page', 'El Playbook es una superficie pública'],
  [
    'Ultimate Harness canonical source',
    'https://github.com/Agentic-Engineering-Agency/ultimate-harness',
  ],
  ['Ultimate Harness public package', '@agenticengineeringagency/ultimate-harness'],
  ['public project catalog heading', 'Public projects'],
  ['Spanish public project catalog heading', 'Proyectos públicos'],
  ['proof publication rule', 'Public visibility alone is not enough'],
  ['Spanish proof publication rule', 'La visibilidad pública por sí sola no es suficiente'],
  [
    'current Gemini CLI access transition notice',
    'https://github.com/google-gemini/gemini-cli/discussions/27274',
  ],
  ['canonical Prototype Kit route output', 'my-prototype/src/routes/'],
  ['canonical Spanish Prototype Kit route output', 'mi-prototipo/src/routes/'],
  ['canonical Gemini Prototype Kit output', 'my-prototype/prototype/'],
  ['canonical Spanish Gemini Prototype Kit output', 'mi-prototipo/prototype/'],
  ['canonical Claude Prototype Kit command', '/prototype-kit:prototype-from-docs'],
  ['current Gemini CLI Node floor', 'Node.js 20'],
  ['interactive Gemini extension-list command', '/extensions list'],
  ['stable Gemini extension success criterion', 'marks it active or enabled'],
  ['stable Spanish Gemini extension success criterion', 'marque como activo o habilitado'],
  ['Claude plugin activation command', '/reload-plugins'],
];

for (const [label, value] of required) {
  if (!publicText.includes(value)) {
    throw new Error(`Public content is missing ${label}: ${value}`);
  }
}

const removedPaths = [
  'app/api/chat/route.ts',
  'components/ai/search.tsx',
  'functions/api/chat.ts',
  'functions/api/_docs-data.ts',
];

for (const path of removedPaths) {
  if (existsSync(join(root, path))) {
    throw new Error(`Removed AI surface still exists: ${path}`);
  }
}

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
for (const dependency of [
  '@ai-sdk/react',
  '@openrouter/ai-sdk-provider',
  'ai',
  'flexsearch',
  'zod',
]) {
  if (dependency in dependencies) {
    throw new Error(`Removed AI dependency still declared: ${dependency}`);
  }
}

const catalogFile = readFileSync(join(root, 'lib/public-projects.ts'), 'utf8');
const catalogProjects = [
  'ultimate-harness',
  'specsafe',
  'agentic-pm-kit',
  'prototype-kit',
  'paperclip-adapter-omp',
  'paperclip-plugin-langfuse-export',
  'triage',
];

for (const project of catalogProjects) {
  if (!catalogFile.includes(`id: '${project}'`)) {
    throw new Error(`Verified public project is missing from the catalog: ${project}`);
  }
}

for (const evidenceField of ['licenseUrl:', 'statusUrl:']) {
  const occurrences = catalogFile.match(
    new RegExp(`^    ${evidenceField}`, 'gm'),
  )?.length ?? 0;
  if (occurrences !== catalogProjects.length) {
    throw new Error(
      `Catalog must provide ${evidenceField} for all ${catalogProjects.length} projects; found ${occurrences}`,
    );
  }
}

const ownershipOccurrences =
  catalogFile.match(/^    owner: 'Agentic-Engineering-Agency',$/gm)?.length ?? 0;
if (ownershipOccurrences !== catalogProjects.length) {
  throw new Error(
    `Catalog must provide verified ownership for all ${catalogProjects.length} projects; found ${ownershipOccurrences}`,
  );
}

for (const excludedProject of [
  'curia-landing',
  'code-colony',
  'omp-pantheon',
  'pi-seshat',
  'agentic-engineering-wiki',
]) {
  if (catalogFile.includes(`id: '${excludedProject}'`)) {
    throw new Error(`Intentionally excluded project is present in the catalog: ${excludedProject}`);
  }
}

const docsDir = join(root, 'content/docs');
const mdxFiles = walk(docsDir, (file) => file.endsWith('.mdx'));
for (const file of mdxFiles) {
  const counterpart = file.endsWith('.es.mdx')
    ? file.replace(/\.es\.mdx$/, '.mdx')
    : file.replace(/\.mdx$/, '.es.mdx');
  if (!existsSync(counterpart)) {
    throw new Error(
      `Missing bilingual counterpart for ${relative(root, file)}: ${relative(root, counterpart)}`,
    );
  }
}

console.log(
  `Public content verified: ${publicFiles.length} source files, ${mdxFiles.length / 2} bilingual page pairs, ${catalogProjects.length} source-verified catalog projects, no generative chat surface, and no unpublished Prototype Kit npm command.`,
);
