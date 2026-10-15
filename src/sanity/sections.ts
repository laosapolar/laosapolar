// Secciones en las que se pueden crear publicaciones desde el panel (/admin).
// El `id` es la primera parte de la URL (/formaciones/mi-publicacion/) y debe
// coincidir con el `section` del menú en src/data/site.ts.
export const sections = [
  { id: 'formaciones', title: 'Formaciones' },
  { id: 'ciclo-esencial', title: 'Ciclo Esencial' },
  { id: 'sesiones-individuales', title: 'Sesiones individuales' },
  { id: 'arte', title: 'Arte' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export const sectionTitle = (id: string) => sections.find(section => section.id === id)?.title ?? id;
