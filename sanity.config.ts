import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { esESLocale } from '@sanity/locale-es-es';
import { publicacion } from './src/sanity/schemaTypes/publicacion';
import { sections } from './src/sanity/sections';

// En la web (Vite) llegan por import.meta.env; en la CLI de Sanity, por process.env.
const env = import.meta.env ?? process.env;

export default defineConfig({
  name: 'la-osa-polar',
  title: 'La Osa Polar',
  projectId: env.PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    esESLocale(),
    structureTool({
      title: 'Contenido',
      // Una carpeta por sección: lo que se crea dentro ya lleva la sección elegida.
      structure: S => S.list().title('Publicaciones').items([
        ...sections.map(section => S.listItem()
          .id(section.id)
          .title(section.title)
          .child(S.documentList()
            .id(section.id)
            .title(section.title)
            .schemaType('publicacion')
            .filter('_type == "publicacion" && seccion == $seccion')
            .params({ seccion: section.id })
            .defaultOrdering([{ field: 'fecha', direction: 'desc' }])
            .initialValueTemplates([S.initialValueTemplateItem('publicacion-seccion', { seccion: section.id })]))),
        S.divider(),
        S.documentTypeListItem('publicacion').title('Todas las publicaciones'),
      ]),
    }),
  ],
  schema: {
    types: [publicacion],
    templates: prev => [
      ...prev,
      {
        id: 'publicacion-seccion',
        title: 'Publicación en sección',
        schemaType: 'publicacion',
        parameters: [{ name: 'seccion', type: 'string' }],
        value: (params: { seccion: string }) => ({ seccion: params.seccion }),
      },
    ],
  },
  document: {
    // Las publicaciones solo se crean desde el panel, sin opciones técnicas extra.
    newDocumentOptions: prev => prev.filter(item => item.templateId === 'publicacion'),
  },
});
