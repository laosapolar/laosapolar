import { navigation, type NavItem } from '../data/site';
import { getPublications } from './sanity';

// Menú fijo + publicaciones de Sanity marcadas como «Mostrar en el menú».
export const getNavigation = async (): Promise<NavItem[]> => {
  const publications = await getPublications();
  return navigation.map(item => {
    const extra = publications
      .filter(publication => publication.section === item.section && publication.inMenu && !publication.archive)
      .map(publication => ({ label: publication.title, href: publication.href }));
    if (!extra.length) return item;
    const base = item.children ?? (item.href ? [{ label: item.label, href: item.href }] : []);
    return { ...item, href: undefined, children: [...base, ...extra, { label: 'Ver todas las publicaciones', href: `/${item.section}/` }] };
  });
};
