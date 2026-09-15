import fs from 'node:fs';
import assert from 'node:assert/strict';
import { parse } from 'parse5';

const inventory = JSON.parse(fs.readFileSync('docs/auditoria/inventario.json', 'utf8')).filter(p => !p.file.startsWith('page-'));
const migrated = JSON.parse(fs.readFileSync('src/data/migrated-pages.json', 'utf8'));
const redirects = new Set(['formacion-1', 'antonio-castillo']);
const failures = [];
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
for (const page of inventory) {
  const target = page.file === 'inicio' ? 'dist/index.html' : `dist/${page.file}/index.html`;
  if (!fs.existsSync(target)) { failures.push(`${page.url}: falta ${target}`); continue; }
  if (redirects.has(page.file)) continue;
  const nodes=[]; const walk=n=>{nodes.push(n);for(const c of n.childNodes||[])walk(c)}; walk(parse(fs.readFileSync(target,'utf8')));
  if (nodes.filter(n=>n.tagName==='h1').length !== 1) failures.push(`${page.file}: H1 incorrecto`);
  if (!nodes.some(n=>n.tagName==='link'&&attr(n,'rel')==='canonical')) failures.push(`${page.file}: sin canonical`);
  for (const img of nodes.filter(n=>n.tagName==='img')) {
    if (attr(img,'alt') === undefined) failures.push(`${page.file}: imagen sin alt`);
    const src=attr(img,'src'); if(src?.startsWith('/')&&!fs.existsSync(`dist${src}`)) failures.push(`${page.file}: falta ${src}`);
  }
}
assert.deepEqual(failures, []);
for (const file of ['dist/sitemap.xml','dist/wp-sitemap.xml','dist/wp-sitemap-posts-page-1.xml','dist/robots.txt','dist/404.html']) assert.ok(fs.existsSync(file), `Falta ${file}`);
const source = fs.readFileSync('dist/sitemap.xml','utf8');
for (const page of inventory.filter(p=>!['eventos','educacion-emocional-sanitaria','formacion-1','antonio-castillo'].includes(p.file))) {
  const path=page.file==='inicio'?'':`${page.file}/`; assert.ok(source.includes(`https://laosapolar.es/${path}`), `Sitemap sin ${page.file}`);
}
assert.ok(!source.includes('wp-content'));
for (const page of migrated) {
  const original = inventory.find(item => item.file === page.slug)?.text.replace(/\s/g, '') || '';
  const retained = page.html.replace(/<[^>]+>/g, '').replace(/&\w+;|\s/g, '');
  assert.ok(!original.length || retained.length / original.length >= .9, `${page.slug}: posible pérdida de contenido indexable`);
}
console.log(`Migración verificada: ${inventory.length} URLs originales cubiertas, recursos locales y sitemap compatible.`);
