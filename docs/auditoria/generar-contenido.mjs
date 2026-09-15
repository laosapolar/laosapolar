import fs from 'node:fs';
import crypto from 'node:crypto';
import { parse } from 'parse5';

const inventory = JSON.parse(fs.readFileSync('docs/auditoria/inventario.json', 'utf8')).filter(p => !p.file.startsWith('page-'));
const assetDir = 'public/media/original';
fs.mkdirSync(assetDir, { recursive: true });
const assetMap = new Map();
const extFor = url => { const ext = new URL(url).pathname.match(/\.(jpe?g|png|webp|gif)$/i)?.[0].toLowerCase(); return ext || '.jpg'; };
for (const page of inventory) for (const image of page.images.slice(1)) {
  const url = image.url.split('?')[0];
  if (!assetMap.has(url)) assetMap.set(url, `${crypto.createHash('sha1').update(url).digest('hex').slice(0, 12)}${extFor(url)}`);
}
const esc = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const attrs = node => Object.fromEntries((node.attrs || []).map(a => [a.name, a.value]));
const allowed = new Set(['p','h2','h3','h4','ul','ol','li','strong','em','blockquote','figure','figcaption','a','br','img']);
const render = node => {
  if (node.nodeName === '#text') return esc(node.value);
  if (['script','style','form','noscript'].includes(node.tagName)) return '';
  const inner = (node.childNodes || []).map(render).join('');
  if (!allowed.has(node.tagName)) return inner;
  const a = attrs(node);
  if (node.tagName === 'img') {
    const original = new URL(a.src, 'https://laosapolar.es').href.split('?')[0];
    const local = assetMap.get(original);
    return local ? `<img src="/media/original/${local}" alt="${esc(a.alt || '')}" loading="lazy" decoding="async">` : '';
  }
  if (node.tagName === 'a') {
    let href = a.href || '';
    try { const u = new URL(href, 'https://laosapolar.es'); href = u.hostname === 'laosapolar.es' ? `${u.pathname}${u.search}${u.hash}` : u.href; } catch {}
    return `<a href="${esc(href)}">${inner}</a>`;
  }
  if (node.tagName === 'br') return '<br>';
  return `<${node.tagName}>${inner}</${node.tagName}>`;
};
const pages = [];
for (const page of inventory) {
  const doc = parse(fs.readFileSync(`docs/auditoria/original/${page.file}.html`, 'utf8'));
  let content;
  const find = node => { if ((attrs(node).class || '').split(' ').includes('entry-content')) content = node; for (const child of node.childNodes || []) find(child); };
  find(doc);
  pages.push({
    slug: page.file,
    title: page.title.replace(/\s+[–—-]\s+La Osa Polar$/, '').trim(),
    description: page.text.replace(/\s+/g, ' ').trim().slice(0, 155),
    html: (content?.childNodes || []).map(render).join('').replace(/<p>\s*<\/p>/g, ''),
    imageCount: page.images.length - 1,
  });
}
fs.writeFileSync('src/data/migrated-pages.json', JSON.stringify(pages, null, 2));
const config = [...assetMap].map(([url,file]) => `url = "${url}"\noutput = "${assetDir}/${file}"`).join('\n\n');
fs.writeFileSync('docs/auditoria/media.curl', config);
fs.writeFileSync('docs/auditoria/media-map.json', JSON.stringify(Object.fromEntries(assetMap), null, 2));
console.log(`${pages.length} páginas y ${assetMap.size} recursos preparados.`);
