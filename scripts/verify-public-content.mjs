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

const contentRoots = ['README.md', 'app', 'components', 'content', 'lib', 'package.json'];
const publicFiles = contentRoots.flatMap((path) => {
  const absolute = join(root, path);
  return path.endsWith('.md') || path.endsWith('.json')
    ? [absolute]
    : walk(absolute, (file) => /\.(?:md|mdx|json|ts|tsx)$/.test(file));
});

const publicText = publicFiles
  .map((file) => `${relative(root, file)}\n${readFileSync(file, 'utf8')}`)
  .join('\n');

const forbidden = [
  ['unpublished Prototype Kit npm command', 'npx @agentic-engineering/prototype-kit init'],
  ['removed generative chat endpoint', '/api/chat'],
  ['removed OpenRouter secret binding', 'OPENROUTER_API_KEY'],
  ['removed AI chat trigger', 'Ask AI'],
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
  `Public content verified: ${publicFiles.length} source files, ${mdxFiles.length / 2} bilingual page pairs, no generative chat surface, and no unpublished Prototype Kit npm command.`,
);
