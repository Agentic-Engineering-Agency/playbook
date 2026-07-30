import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import test from 'node:test';

const outDir = join(process.cwd(), 'out');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

test('all exported Spanish HTML declares Spanish at parse time', () => {
  const files = [
    join(outDir, 'es.html'),
    ...walk(join(outDir, 'es')).filter((file) => extname(file) === '.html'),
  ];
  assert.ok(files.length > 1);
  for (const file of files) {
    assert.match(readFileSync(file, 'utf8'), /<html lang="es"/);
  }
});

test('Spanish home metadata is localized and language-linked', () => {
  const body = readFileSync(join(outDir, 'es.html'), 'utf8');
  assert.match(body, /property="og:locale" content="es_MX"/);
  assert.match(body, /property="og:description" content="Documentación pública/);
  assert.match(body, /name="twitter:description" content="Documentación pública/);
  assert.match(body, /hrefLang="en" href="https:\/\/labs\.agenticengineering\.agency"/);
  assert.match(body, /hrefLang="es" href="https:\/\/labs\.agenticengineering\.agency\/es"/);
});

test('the static sitemap covers both locale roots', () => {
  const body = readFileSync(join(outDir, 'sitemap.xml'), 'utf8');
  assert.match(body, /https:\/\/labs\.agenticengineering\.agency\/<\/loc>/);
  assert.match(body, /https:\/\/labs\.agenticengineering\.agency\/es<\/loc>/);
});
