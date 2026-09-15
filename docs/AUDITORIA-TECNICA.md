# Auditoría técnica: SEO, rendimiento, accesibilidad y Astro

Fecha: 15 de septiembre de 2026.

## Correcciones aplicadas

- Metadatos comunes ampliados con Open Graph completo, Twitter Cards, dimensiones de imagen social y JSON-LD de `EducationalOrganization` con los datos públicos existentes.
- Títulos de archivo diferenciados para evitar duplicados, descriptions truncadas por palabra y descriptions específicas en páginas con poco texto.
- Sitemap depurado: búsqueda y páginas `noindex` quedan fuera. Se mantienen `robots.txt` y los nombres históricos de sitemap de WordPress.
- Jerarquía del directorio corregida de H1→H3 a H1→H2. El estado activo también aparece en enlaces dentro de submenús.
- Se comprueba automáticamente un H1 por página, jerarquía de encabezados, canonical, metadatos sociales, enlaces y anclas internas, labels y atributos de imágenes.
- El control de conservación de contenido compara las páginas migradas con el contenido original y falla por debajo del 90 %.
- Las 127 imágenes interiores relevantes se sirven en WebP responsive, con variantes de 480, 960 y hasta 1440 px, `srcset`, `sizes`, anchura, altura, `decoding=async` y lazy loading. Los originales quedan como fuentes de regeneración fuera del directorio público.
- La homepage mantiene Astro Image; su LCP tiene carga eager y `fetchpriority=high`. El logo usa ahora un recorte real de 96×96 y el navegador recibe una variante de 44 o 54 px.
- Se precargan las dos fuentes locales usadas sobre el primer viewport. No hay fuentes de terceros.
- Tailwind y su plugin de Vite se retiraron: no se utilizaban. También se eliminó la página duplicada de postgrado, dejando una redirección mínima.
- Los enlaces del footer alcanzan 44 px de altura. Se conserva focus visible, navegación por teclado, escape en menús, skip link, formularios etiquetados y respeto a `prefers-reduced-motion`.

## Verificación

- `npm run build`: correcto, 45 salidas estáticas y sin warnings de build relevantes.
- `npm run audit`: correcto, 45 páginas inspeccionadas y 0 incidencias.
- `npm` comunicó 0 vulnerabilidades tras actualizar las dependencias.
- Las 42 URLs editoriales originales están cubiertas; no se detecta pérdida de contenido indexable según el control de retención.
- Todos los enlaces internos resuelven a una salida estática y las anclas locales existen.
- Revisión visual móvil y escritorio: sin overflow, imágenes rotas ni cambios de composición. En móvil, el catálogo carga una variante de 480 px; en escritorio, la imagen LCP de portada carga 800 px y el logo 54 px.
- La salida de producción no contiene bundles JavaScript externos ni componentes hidratados. Las interacciones pequeñas permanecen como scripts inline de Astro.

## Consideraciones de publicación

Las tres redirecciones se generan como documentos estáticos con canonical y `noindex`. El proveedor de hosting debería convertirlas en respuestas HTTP 301. Conviene repetir una medición de Core Web Vitals sobre la URL pública tras desplegar, porque latencia, CDN y cabeceras de caché pertenecen al entorno de hosting.
