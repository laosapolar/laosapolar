import { defineArrayMember, defineField, defineType } from 'sanity';
import { sections } from '../sections';

// Rutas que ya existen como páginas fijas y que una publicación no puede ocupar.
const reservedPaths = new Set(['formaciones/postgrado-corporal-teatro']);

export const publicacion = defineType({
  name: 'publicacion',
  title: 'Publicación',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: rule => rule.required().max(120),
    }),
    defineField({
      name: 'seccion',
      title: 'Sección',
      description: 'Dónde aparecerá la publicación dentro de la web.',
      type: 'string',
      options: { list: sections.map(({ id, title }) => ({ value: id, title })), layout: 'radio' },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Dirección web',
      description: 'Pulsa «Generate» para crearla a partir del título. Será la parte final del enlace: laosapolar.es/sección/esta-direccion/',
      type: 'slug',
      options: { source: 'titulo', maxLength: 80 },
      validation: rule => rule.required().custom((slug, context) => {
        const seccion = (context.document as { seccion?: string } | undefined)?.seccion;
        return slug?.current && seccion && reservedPaths.has(`${seccion}/${slug.current}`)
          ? 'Esta dirección ya la usa otra página de la web. Elige otra.'
          : true;
      }),
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha',
      description: 'Las publicaciones más recientes aparecen primero.',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      description: 'Una o dos frases. Se muestra en los listados y en Google.',
      type: 'text',
      rows: 3,
      validation: rule => rule.max(220).warning('Mejor si no pasa de 220 caracteres.'),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen principal',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Descripción de la imagen', description: 'Qué se ve en la imagen (para personas que no pueden verla).', type: 'string' }),
      ],
    }),
    defineField({
      name: 'contenido',
      title: 'Contenido',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título', value: 'h2' },
            { title: 'Subtítulo', value: 'h3' },
            { title: 'Cita', value: 'blockquote' },
          ],
          lists: [
            { title: 'Lista con puntos', value: 'bullet' },
            { title: 'Lista numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Enlace',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'Dirección',
                    type: 'url',
                    validation: rule => rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Imagen',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Descripción de la imagen', type: 'string' }),
            defineField({ name: 'pie', title: 'Pie de foto', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'mostrarEnMenu',
      title: 'Mostrar en el menú',
      description: 'Añade un enlace a esta publicación en el menú superior, dentro de su sección.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'formularioContacto',
      title: 'Mostrar formulario «Escríbenos»',
      description: 'Muestra al lado del contenido el formulario para pedir información.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'archivo',
      title: 'Edición anterior (archivo)',
      description: 'Márcalo cuando la convocatoria ya haya pasado. Se mostrará un aviso y dejará de aparecer en el menú.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Más recientes', name: 'fechaDesc', by: [{ field: 'fecha', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'titulo', seccion: 'seccion', fecha: 'fecha', media: 'imagen', archivo: 'archivo' },
    prepare: ({ title, seccion, fecha, media, archivo }) => ({
      title,
      media,
      subtitle: [sections.find(section => section.id === seccion)?.title, fecha?.split('-').reverse().join('/'), archivo && 'Archivo'].filter(Boolean).join(' · '),
    }),
  },
});
