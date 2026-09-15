import fs from 'node:fs';
import assert from 'node:assert/strict';
import { parse } from 'parse5';

const nodes = [];
function walk(node) { nodes.push(node); for (const child of node.childNodes || []) walk(child); }
walk(parse(fs.readFileSync('dist/index.html', 'utf8')));
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
const tags = name => nodes.filter(n => n.tagName === name);
const ids = nodes.map(n => attr(n, 'id')).filter(Boolean);
assert.equal(new Set(ids).size, ids.length, 'IDs duplicados');
assert.equal(tags('h1').length, 1, 'Debe existir un solo H1');
assert.equal(attr(tags('html')[0], 'lang'), 'es');
assert.equal(attr(tags('link').find(n => attr(n, 'rel') === 'canonical'), 'href'), 'https://laosapolar.es/');
assert.ok(tags('meta').some(n => attr(n, 'name') === 'description' && attr(n, 'content')));
for (const node of tags('a')) {
  const href = attr(node, 'href');
  if (href?.startsWith('#') || href?.startsWith('/#')) assert.ok(ids.includes(href.split('#')[1]), `Ancla inexistente: ${href}`);
}
for (const node of [...tags('img'), ...tags('script'), ...tags('link')]) {
  const url = attr(node, 'src') || attr(node, 'href');
  if (url?.startsWith('/') && !url.startsWith('//')) assert.ok(fs.existsSync(`dist${url}`), `Recurso inexistente: ${url}`);
  if (node.tagName === 'img') assert.notEqual(attr(node, 'alt'), undefined);
}
for (const node of [...tags('input'), ...tags('textarea')]) assert.ok(tags('label').some(label => attr(label, 'for') === attr(node, 'id')), 'Campo sin etiqueta');
assert.equal(tags('form').length, 2);
for (const form of tags('form')) assert.equal(attr(form, 'action'), 'mailto:elmardelaosapolar@gmail.com');
console.log('Homepage: metadatos, H1, IDs, anclas, recursos, alternativas de imágenes, etiquetas y destinatarios correctos.');
