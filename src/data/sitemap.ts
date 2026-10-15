import pages from './migrated-pages.json';
import { site } from './site';
import { getPublications } from '../lib/sanity';
const excluded = new Set(['inicio','eventos','educacion-emocional-sanitaria','formacion-1','antonio-castillo']);
export const sitemapXml = async () => {
  const publications = await getPublications();
  const sectionPaths = [...new Set(publications.map(p => `/${p.section}/`))];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    '/', ...pages.filter(p => !excluded.has(p.slug)).map(p => `/${p.slug}/`), ...sectionPaths, ...publications.map(p => p.href)
  ].map(path => `  <url><loc>${new URL(path, site.url).href}</loc></url>`).join('\n')}\n</urlset>`;
};
export const sitemapResponse = async () => new Response(await sitemapXml(), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
