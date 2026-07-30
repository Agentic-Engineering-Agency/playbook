import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const outDir = join(process.cwd(), 'out');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const spanishHtml = [
  join(outDir, 'es.html'),
  ...walk(join(outDir, 'es')).filter((file) => extname(file) === '.html'),
];

for (const file of spanishHtml) {
  const body = readFileSync(file, 'utf8');
  const localized = body.replace('<html lang="en"', '<html lang="es"');
  if (localized === body) {
    throw new Error(`Could not localize exported Spanish document: ${file}`);
  }
  writeFileSync(file, localized);
}

console.log(`Localized ${spanishHtml.length} exported Spanish HTML documents.`);
