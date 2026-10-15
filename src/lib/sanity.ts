import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { toHTML, escapeHTML, type PortableTextComponents } from '@portabletext/to-html';
import type { PortableTextBlock } from '@portabletext/types';
import { sections } from '../sanity/sections';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

// Sin proyecto configurado la web se construye igual, solo con las páginas fijas.
export const sanityEnabled = Boolean(projectId);
const client = sanityEnabled ? createClient({ projectId, dataset, apiVersion: '2026-10-01', useCdn: false }) : null;
const imageBuilder = client ? createImageUrlBuilder(client) : null;

type SanityImage = SanityImageSource & { alt?: string; pie?: string; asset?: { _ref: string } };

export interface Publication {
  title: string;
  slug: string;
  section: string;
  date: string;
  summary?: string;
  image?: SanityImage;
  content?: PortableTextBlock[];
  inMenu: boolean;
  contactForm: boolean;
  archive: boolean;
  href: string;
}

const query = `*[_type == "publicacion" && defined(slug.current) && seccion in $sections] | order(fecha desc, _createdAt desc) {
  "title": titulo, "slug": slug.current, "section": seccion, "date": fecha, "summary": resumen,
  "image": imagen, "content": contenido,
  "inMenu": coalesce(mostrarEnMenu, true), "contactForm": coalesce(formularioContacto, true), "archive": coalesce(archivo, false)
}`;

// Una sola petición por build, compartida por todas las páginas (menú, listados, sitemap…).
let cache: Promise<Publication[]> | undefined;
export const getPublications = () => cache ??= (async () => {
  if (!client) return [];
  const rows = await client.fetch<Omit<Publication, 'href'>[]>(query, { sections: sections.map(section => section.id) });
  return rows.map(row => ({ ...row, href: `/${row.section}/${row.slug}/` }));
})();

// Dimensiones originales a partir del id del asset: image-<id>-<ancho>x<alto>-<formato>
const dimensions = (image: SanityImage) => {
  const match = image.asset?._ref.match(/-(\d+)x(\d+)-/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 1600, height: 1067 };
};

export const imageAttrs = (image: SanityImage, maxWidth = 1600) => {
  if (!imageBuilder) return null;
  const { width, height } = dimensions(image);
  const widths = [480, 960, 1440, 1920].filter(w => w < Math.min(width, maxWidth));
  widths.push(Math.min(width, maxWidth));
  const url = (w: number) => imageBuilder.image(image).width(w).fit('max').auto('format').quality(80).url();
  const finalWidth = widths[widths.length - 1];
  return {
    src: url(finalWidth),
    srcset: widths.map(w => `${url(w)} ${w}w`).join(', '),
    width: finalWidth,
    height: Math.round(height * finalWidth / width),
    alt: image.alt ?? '',
  };
};

const sizes = '(max-width: 520px) calc(100vw - 2.5rem), (max-width: 1100px) 70vw, 760px';
const imgTag = (image: SanityImage, loading: 'lazy' | 'eager' = 'lazy') => {
  const attrs = imageAttrs(image);
  if (!attrs) return '';
  return `<img src="${escapeHTML(attrs.src)}" srcset="${escapeHTML(attrs.srcset)}" sizes="${sizes}" width="${attrs.width}" height="${attrs.height}" alt="${escapeHTML(attrs.alt)}" loading="${loading}" decoding="async">`;
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => `<figure>${imgTag(value)}${value.pie ? `<figcaption>${escapeHTML(value.pie)}</figcaption>` : ''}</figure>`,
  },
  marks: {
    link: ({ children, value }) => {
      const href = String(value?.href ?? '');
      const external = /^https?:\/\//.test(href) && !href.startsWith('https://laosapolar.es');
      return `<a href="${escapeHTML(href)}"${external ? ' rel="noopener" target="_blank"' : ''}>${children}</a>`;
    },
  },
};

// HTML con el mismo formato que las páginas migradas, para reutilizar EditorialPage.
export const publicationHtml = (publication: Publication) => {
  const cover = publication.image?.asset ? `<figure>${imgTag(publication.image, 'eager')}</figure>` : '';
  return cover + toHTML(publication.content ?? [], { components });
};

export const countImages = (publication: Publication) =>
  (publication.image?.asset ? 1 : 0) + (publication.content ?? []).filter(block => block._type === 'image').length;
