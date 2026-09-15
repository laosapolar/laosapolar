# Migración de páginas interiores

Revisión final: 15 de septiembre de 2026.

## Cobertura

Las 42 URLs públicas con respuesta 200 del inventario original están cubiertas en Astro.

- Se conserva la URL original en 40 casos, incluida `/especializacion/`.
- `/formacion-1/` redirige a `/arteterapia-gestalt/`, porque era una plantilla pública residual.
- `/antonio-castillo/` redirige a `/antonio-castillo-2/`, la ficha canónica enlazada desde el equipo.
- La ruta provisional de Astro `/formaciones/postgrado-corporal-teatro/` redirige a la URL original `/especializacion/`.
- Los tres enlaces `?page_id=68`, `?page_id=62` y `?page_id=82` ya eran respuestas 404 de WordPress y no representan contenido editorial.

Familias implementadas:

- Formaciones: Arteterapia Gestalt, Ciclo Esencial vigente, archivo del ciclo, postgrado y sus páginas históricas, acompañamiento individual y Educación Emocional Sanitaria.
- Escuela: Nosotras, historia de La Osa Polar, directorio completo y 26 fichas personales.
- Arte: galería documental y catálogo de artistas organizado por disciplinas.
- Estados editoriales: Eventos y Educación Emocional Sanitaria conservan su URL, muestran su estado real y usan `noindex`.
- Utilidades: búsqueda local, página 404, robots, sitemap y compatibilidad con los dos nombres de sitemap de WordPress.

Los 140 recursos encontrados en el contenido auditado se han descargado a `public/media/original`. Las páginas no dependen de `/wp-content/` para representarse.

## Arquitectura

`EditorialPage.astro` concentra las estructuras que realmente se repiten: texto editorial, biografías, galerías y páginas con formulario. `PageHero.astro` mantiene el encabezado común. Los textos y el orden de las imágenes proceden del HTML archivado y se guardan en `migrated-pages.json`; el script `generar-contenido.mjs` documenta y permite repetir esa extracción.

Las convocatorias anteriores se identifican como archivo. La edición de Ciclo Esencial en `/arteterapia-esencial/` se presenta como vigente sin añadir fechas que no figuran en el original. Los formularios preparan correos a `elmardelaosapolar@gmail.com` y explican que el visitante debe revisarlos y enviarlos.

## Verificación

- `npm run build`: correcto, 45 salidas estáticas (páginas editoriales, redirecciones y utilidades).
- `node docs/auditoria/verificar-home.mjs`: correcto.
- `node docs/auditoria/verificar-migracion.mjs`: correcto; contrasta las 42 URLs, H1, canonical, imágenes, sitemap y archivos técnicos.
- El proyecto no define scripts de lint ni una suite de tests.
- Revisión en navegador de las 40 páginas de contenido y búsqueda a 390×844 y 1440×1000. Todas las medidas finales presentan `scrollWidth === clientWidth`, un H1 y cero imágenes rotas.
- Inspección visual específica de formación, postgrado, biografía, equipo, catálogo artístico, búsqueda y estados vacíos en móvil; formación, galería, formularios y navegación en escritorio.
- Búsqueda probada con resultados y query persistida en la URL. Menú, submenús y validación de formulario ya se comprobaron en la fase de homepage.

## Pendiente de despliegue

Astro genera documentos de redirección con canonical y `noindex`. Si el hosting permite reglas HTTP, conviene convertir las tres redirecciones documentadas en respuestas 301 del servidor. Antes de retirar WordPress también deben contrastarse Search Console y logs para localizar URLs huérfanas que no aparecían en el sitemap público.
