import fs from 'node:fs';
import crypto from 'node:crypto';
import { parse } from 'parse5';
import sharp from 'sharp';

const inventory = JSON.parse(fs.readFileSync('docs/auditoria/inventario.json', 'utf8')).filter(p => !p.file.startsWith('page-') && p.file !== 'inicio');
const assetDir = 'docs/auditoria/media-original';
const optimizedDir = 'public/media/optimized';
fs.mkdirSync(assetDir, { recursive: true });
fs.mkdirSync(optimizedDir, { recursive: true });
for (const file of fs.readdirSync(optimizedDir)) if (file.endsWith('.webp')) fs.unlinkSync(`${optimizedDir}/${file}`);
const assetMap = new Map();
const extFor = url => { const ext = new URL(url).pathname.match(/\.(jpe?g|png|webp|gif)$/i)?.[0].toLowerCase(); return ext || '.jpg'; };
for (const page of inventory) for (const image of page.images.slice(1)) {
  const url = image.url.split('?')[0];
  if (new URL(url).pathname.startsWith('/wp-content/uploads/') && !assetMap.has(url)) assetMap.set(url, `${crypto.createHash('sha1').update(url).digest('hex').slice(0, 12)}${extFor(url)}`);
}
const imageInfo = new Map();
for (const [url, file] of assetMap) {
  const source = `${assetDir}/${file}`;
  if (!fs.existsSync(source)) continue;
  try {
    const meta = await sharp(source).metadata();
    if (!meta.width || !meta.height) continue;
    const stem = file.replace(/\.[^.]+$/, '');
    const targets = [...new Set([480, 960, 1440].filter(w => w < meta.width).concat(meta.width))];
    const variants = [];
    for (const width of targets) {
      const name = `${stem}-${width}.webp`;
      await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(`${optimizedDir}/${name}`);
      variants.push({ width, src: `/media/optimized/${name}` });
    }
    imageInfo.set(url, { width: meta.width, height: meta.height, variants });
  } catch {}
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
    const info = imageInfo.get(original);
    if (!info) return '';
    const largest = info.variants.at(-1);
    const srcset = info.variants.map(v => `${v.src} ${v.width}w`).join(', ');
    return `<img src="${largest.src}" srcset="${srcset}" sizes="(max-width: 520px) calc(100vw - 2.5rem), (max-width: 1100px) 70vw, 760px" width="${info.width}" height="${info.height}" alt="${esc(a.alt || '')}" loading="lazy" decoding="async">`;
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
const descriptions = {
  galeria: 'Galería documental de talleres y procesos creativos de La Osa Polar.',
  colaboraciones: 'Equipo y colaboraciones de La Osa Polar, Escuela de Arteterapia Gestalt y Salud en Málaga.',
  eventos: 'Información sobre eventos de La Osa Polar.',
  'educacion-emocional-sanitaria': 'Educación Emocional Sanitaria en La Osa Polar.',
};
for (const page of inventory) {
  const doc = parse(fs.readFileSync(`docs/auditoria/original/${page.file}.html`, 'utf8'));
  let content;
  const find = node => { if ((attrs(node).class || '').split(' ').includes('entry-content')) content = node; for (const child of node.childNodes || []) find(child); };
  find(doc);
  let html = (content?.childNodes || []).map(render).join('').replace(/<p>\s*<\/p>/g, '');
  if (page.file === 'colaboraciones') html = html.replaceAll('<h3>', '<h2>').replaceAll('</h3>', '</h2>');
  const summary = page.text.replace(/\s+/g, ' ').trim();
  const clipped = summary.length > 155 ? `${summary.slice(0, 152).replace(/\s+\S*$/, '')}…` : summary;
  pages.push({
    slug: page.file,
    title: page.title.replace(/\s+[–—-]\s+La Osa Polar$/, '').trim(),
    description: descriptions[page.file] || clipped,
    html,
    imageCount: page.images.length - 1,
  });
}
fs.writeFileSync('src/data/migrated-pages.json', JSON.stringify(pages, null, 2));
const config = [...assetMap].map(([url,file]) => `url = "${url}"\noutput = "${assetDir}/${file}"`).join('\n\n');
fs.writeFileSync('docs/auditoria/media.curl', config);
fs.writeFileSync('docs/auditoria/media-map.json', JSON.stringify(Object.fromEntries(assetMap), null, 2));
console.log(`${pages.length} páginas y ${assetMap.size} recursos preparados.`);
