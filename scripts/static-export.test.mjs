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
  assert.match(
    body,
    /property="og:image" content="https:\/\/labs\.agenticengineering\.agency\/og\/docs\/es\/image\.png"/,
  );
  assert.match(
    body,
    /name="twitter:image" content="https:\/\/labs\.agenticengineering\.agency\/og\/docs\/es\/image\.png"/,
  );
  assert.match(body, /hrefLang="en" href="https:\/\/labs\.agenticengineering\.agency"/);
  assert.match(body, /hrefLang="es" href="https:\/\/labs\.agenticengineering\.agency\/es"/);
});

test('English home publishes its matching social image', () => {
  const body = readFileSync(join(outDir, 'index.html'), 'utf8');
  assert.match(
    body,
    /property="og:image" content="https:\/\/labs\.agenticengineering\.agency\/og\/docs\/image\.png"/,
  );
  assert.match(
    body,
    /name="twitter:image" content="https:\/\/labs\.agenticengineering\.agency\/og\/docs\/image\.png"/,
  );
});

test('the static sitemap covers both locale roots', () => {
  const body = readFileSync(join(outDir, 'sitemap.xml'), 'utf8');
  assert.match(body, /https:\/\/labs\.agenticengineering\.agency<\/loc>/);
  assert.match(body, /https:\/\/labs\.agenticengineering\.agency\/es<\/loc>/);
  assert.match(body, /https:\/\/labs\.agenticengineering\.agency\/docs<\/loc>/);
  assert.match(body, /https:\/\/labs\.agenticengineering\.agency\/es\/docs<\/loc>/);
});

test('docs indexes keep their own bilingual canonical routes', () => {
  const english = readFileSync(join(outDir, 'docs.html'), 'utf8');
  const spanish = readFileSync(join(outDir, 'es', 'docs.html'), 'utf8');
  assert.match(
    english,
    /rel="canonical" href="https:\/\/labs\.agenticengineering\.agency\/docs"/,
  );
  assert.match(
    spanish,
    /rel="canonical" href="https:\/\/labs\.agenticengineering\.agency\/es\/docs"/,
  );
});

test('Spanish docs use locale-specific social images', () => {
  const body = readFileSync(join(outDir, 'es', 'docs', 'methods.html'), 'utf8');
  assert.match(
    body,
    /content="https:\/\/labs\.agenticengineering\.agency\/og\/docs\/es\/methods\/image\.png"/,
  );
  const image = join(outDir, 'og', 'docs', 'es', 'methods', 'image.png');
  assert.ok(readFileSync(image).byteLength > 0);
});

test('every documentation page has exactly one primary heading', () => {
  const files = [
    join(outDir, 'docs.html'),
    ...walk(join(outDir, 'docs')).filter((file) => extname(file) === '.html'),
    join(outDir, 'es', 'docs.html'),
    ...walk(join(outDir, 'es', 'docs')).filter((file) => extname(file) === '.html'),
  ];
  for (const file of files) {
    const headings = readFileSync(file, 'utf8').match(/<h1(?:\s|>)/g) ?? [];
    assert.equal(headings.length, 1, `${file} should contain exactly one h1`);
  }
});
