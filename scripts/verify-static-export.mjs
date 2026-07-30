import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const outDir = join(process.cwd(), 'out');

function resolveRoute(route) {
  const clean = route.replace(/^\/|\/$/g, '');
  const candidates =
    route === '/'
      ? [join(outDir, 'index.html')]
      : [
          join(outDir, `${clean}.html`),
          join(outDir, clean, 'index.html'),
          join(outDir, clean),
        ];
  const match = candidates.find(existsSync);
  if (!match) {
    throw new Error(`Static route is missing: ${route}`);
  }
  return match;
}

const routeExpectations = [
  ['/', 'Methods, kits, and proof for building with agents.'],
  ['/es', 'Métodos, kits y evidencia para construir con agentes.'],
  ['/docs', 'The Playbook is a public documentation'],
  ['/es/docs', 'El Playbook es una superficie pública'],
  ['/docs/about', 'About this Playbook'],
  ['/es/docs/about', 'Acerca de este Playbook'],
  ['/docs/methods', 'The shared delivery loop'],
  ['/es/docs/methods', 'El ciclo compartido de entrega'],
  ['/docs/kits', 'Verified distribution paths'],
  ['/es/docs/kits', 'Rutas de distribución verificadas'],
  ['/docs/proof', 'What we publish'],
  ['/es/docs/proof', 'Qué publicamos'],
  ['/docs/projects', 'Ultimate Harness'],
  ['/es/docs/projects', 'Ultimate Harness'],
  ['/docs/projects', 'href="/docs/pm-kit"'],
  ['/es/docs/projects', 'href="/es/docs/pm-kit"'],
  ['/es/docs/projects', 'href="/es/docs/prototype-kit"'],
  ['/docs/prototype-kit/02-install-mcps', '/reload-plugins'],
  ['/es/docs/prototype-kit/02-install-mcps', '/reload-plugins'],
  ['/docs/prototype-kit/04-run-prompt', '/prototype-kit:prototype-from-docs'],
  ['/es/docs/prototype-kit/04-run-prompt', '/prototype-kit:prototype-from-docs'],
  ['/docs/prototype-kit/05-open-prototype', 'three must-have screens'],
  ['/es/docs/prototype-kit/05-open-prototype', 'tres pantallas must-have'],
  ['/llms.mdx/docs/projects/content.md', 'Catalog data'],
  [
    '/llms.mdx/docs/projects/content.md',
    'https://labs.agenticengineering.agency/docs/pm-kit',
  ],
  [
    '/llms.mdx/docs/es/projects/content.md',
    'https://labs.agenticengineering.agency/es/docs/pm-kit',
  ],
  ['/llms.mdx/docs/projects/content.md', 'Owner: Agentic-Engineering-Agency'],
  ['/llms.mdx/docs/projects/content.md', 'License evidence'],
  ['/llms.mdx/docs/projects/content.md', 'Status evidence'],
  ['/llms.mdx/docs/es/projects/content.md', 'Datos del catálogo'],
  ['/llms.mdx/docs/es/projects/content.md', 'Propiedad: Agentic-Engineering-Agency'],
  ['/llms.mdx/docs/es/projects/content.md', 'Evidencia de licencia'],
  ['/llms.mdx/docs/es/projects/content.md', 'Evidencia de estado'],
  ['/llms.txt', 'About this Playbook'],
  ['/llms-full.txt', 'About this Playbook'],
  ['/llms-full.txt', 'Acerca de este Playbook'],
  ['/llms-full.txt', 'https://www.npmjs.com/package/@specsafe/cli'],
  ['/api/search', 'Ultimate Harness'],
  ['/api/search', 'SpecSafe'],
  ['/api/search', 'Agentic PM Kit'],
  ['/api/search', 'Prototype Kit'],
  ['/api/search', 'Paperclip OMP Adapter'],
  ['/api/search', 'Paperclip Langfuse Export'],
  ['/api/search', 'Triage'],
  ['/api/search', 'Un arnés de desarrollo de software independiente del runtime'],
  ['/docs/projects', 'aria-label="View source: Ultimate Harness"'],
  ['/es/docs/projects', 'aria-label="Ver código: Ultimate Harness"'],
];

for (const [route, expected] of routeExpectations) {
  const file = resolveRoute(route);
  const body = readFileSync(file, 'utf8');
  if (!body.includes(expected)) {
    throw new Error(`Static route ${route} does not contain expected text: ${expected}`);
  }
}

const searchExport = JSON.parse(
  readFileSync(resolveRoute('/api/search'), 'utf8'),
);
const catalogProjects = [
  ['ultimate-harness', 'Ultimate Harness'],
  ['specsafe', 'SpecSafe'],
  ['agentic-pm-kit', 'Agentic PM Kit'],
  ['prototype-kit', 'Prototype Kit'],
  ['paperclip-adapter-omp', 'Paperclip OMP Adapter'],
  ['paperclip-plugin-langfuse-export', 'Paperclip Langfuse Export'],
  ['triage', 'Triage'],
];

for (const [locale, routePrefix] of [
  ['en', '/docs/projects'],
  ['es', '/es/docs/projects'],
]) {
  const documents = Object.values(searchExport.data[locale].docs.docs);
  for (const [id, name] of catalogProjects) {
    const url = `${routePrefix}#project-${id}`;
    const heading = documents.find(
      (document) =>
        document.type === 'heading' &&
        document.url === url &&
        document.content === name,
    );
    const content = documents.find(
      (document) =>
        document.type === 'text' &&
        document.url === url &&
        document.content.startsWith(`${name}. `),
    );
    if (!heading || !content) {
      throw new Error(
        `Search export ${locale} is missing a discrete catalog result for ${name}`,
      );
    }
  }

  const oversizedCatalogResult = documents.find(
    (document) =>
      document.type === 'text' &&
      catalogProjects.every(([, name]) => document.content.includes(name)),
  );
  if (oversizedCatalogResult) {
    throw new Error(
      `Search export ${locale} combines every catalog project into one result`,
    );
  }
}

for (const [route, expectedLanguage] of [
  ['/', 'en'],
  ['/docs/projects', 'en'],
  ['/es', 'es'],
  ['/es/docs/projects', 'es'],
]) {
  const body = readFileSync(resolveRoute(route), 'utf8');
  if (!body.includes(`<html lang="${expectedLanguage}"`)) {
    throw new Error(
      `Static route ${route} does not declare lang="${expectedLanguage}" at parse time`,
    );
  }
}

const spanishHome = readFileSync(resolveRoute('/es'), 'utf8');
for (const expectedMetadata of [
  'property="og:locale" content="es_MX"',
  'property="og:description" content="Documentación pública',
  'name="twitter:description" content="Documentación pública',
  'hrefLang="en" href="https://labs.agenticengineering.agency"',
  'hrefLang="es" href="https://labs.agenticengineering.agency/es',
]) {
  if (!spanishHome.includes(expectedMetadata)) {
    throw new Error(`Spanish home metadata is missing: ${expectedMetadata}`);
  }
}

// The landing pages must advertise dedicated home cards; /og/docs/* renders the
// docs index title and description instead of the home copy.
for (const [route, expectedImage] of [
  ['/', 'https://labs.agenticengineering.agency/og/home/image.png'],
  ['/es', 'https://labs.agenticengineering.agency/og/home/es/image.png'],
]) {
  const body = readFileSync(resolveRoute(route), 'utf8');
  if (!body.includes(`property="og:image" content="${expectedImage}"`)) {
    throw new Error(`Static route ${route} does not use its dedicated social card: ${expectedImage}`);
  }
  if (body.includes('/og/docs/')) {
    throw new Error(`Static route ${route} still references a docs social card`);
  }
}

for (const cardAsset of ['og/home/image.png', 'og/home/es/image.png']) {
  if (!existsSync(join(outDir, cardAsset))) {
    throw new Error(`Home social card is missing from the static export: /${cardAsset}`);
  }
}

const sitemap = readFileSync(join(outDir, 'sitemap.xml'), 'utf8');
for (const expectedUrl of [
  'https://labs.agenticengineering.agency/',
  'https://labs.agenticengineering.agency/es',
  'https://labs.agenticengineering.agency/docs',
  'https://labs.agenticengineering.agency/es/docs',
  'https://labs.agenticengineering.agency/docs/projects',
  'https://labs.agenticengineering.agency/es/docs/projects',
]) {
  if (!sitemap.includes(expectedUrl)) {
    throw new Error(`Sitemap is missing bilingual route: ${expectedUrl}`);
  }
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const renderedText = walk(outDir)
  .filter((file) => ['.html', '.txt', '.md', '.mdx'].includes(extname(file)))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

for (const forbidden of [
  'npx @agentic-engineering/prototype-kit init',
  'Ask AI',
  'OPENROUTER_API_KEY',
  'KLGV',
  'Curia',
]) {
  if (renderedText.includes(forbidden)) {
    throw new Error(`Static export contains forbidden public text: ${forbidden}`);
  }
}

const redirects = readFileSync(join(outDir, '_redirects'), 'utf8');
if (/^\/es\s/m.test(redirects)) {
  throw new Error('Deployment redirects shadow the Spanish landing page at /es');
}

for (const removedRoute of ['/api/chat', '/api/chat.html', '/api/chat/index.html']) {
  if (existsSync(join(outDir, removedRoute.replace(/^\//, '')))) {
    throw new Error(`Removed AI route exists in static export: ${removedRoute}`);
  }
}

console.log(`Static export verified: ${routeExpectations.length} representative routes passed.`);
