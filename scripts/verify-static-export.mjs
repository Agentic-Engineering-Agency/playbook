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
  ['/llms.mdx/docs/projects/content.md', 'Catalog data'],
  ['/llms.mdx/docs/projects/content.md', 'License evidence'],
  ['/llms.mdx/docs/projects/content.md', 'Status evidence'],
  ['/llms.mdx/docs/es/projects/content.md', 'Datos del catálogo'],
  ['/llms.mdx/docs/es/projects/content.md', 'Evidencia de licencia'],
  ['/llms.mdx/docs/es/projects/content.md', 'Evidencia de estado'],
  ['/llms.txt', 'About this Playbook'],
  ['/llms-full.txt', 'About this Playbook'],
  ['/llms-full.txt', 'Acerca de este Playbook'],
  ['/llms-full.txt', 'https://www.npmjs.com/package/@specsafe/cli'],
];

for (const [route, expected] of routeExpectations) {
  const file = resolveRoute(route);
  const body = readFileSync(file, 'utf8');
  if (!body.includes(expected)) {
    throw new Error(`Static route ${route} does not contain expected text: ${expected}`);
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
