# Primera fase del rediseño

Revisión final: 15 de septiembre de 2026.

## Resultado

Homepage completa y base compartida en Astro: Layout, Brand, SiteHeader, SiteFooter, MailForm, IllustratedLink y Arrow. Tokens globales en `src/styles/global.css` y navegación/datos de contacto en `src/data/site.ts`.

Se mantienen las fotografías e ilustraciones originales, sus créditos, el tono artesanal y la secuencia informativa. Inter y Yesteryear se sirven localmente con sus licencias. Fondo papel, texto oscuro, verde turquesa y composiciones sin tarjetas decorativas. Astro genera variantes WebP con dimensiones y carga diferida fuera de la portada.

Los formularios preparan un correo a elmardelaosapolar@gmail.com. Explican que el visitante debe revisarlo y enviarlo en su aplicación. No existe envío automático ni alta automática en una lista.

## Verificación realizada

- `npm run build`: correcto, dos páginas estáticas y 49 variantes de imagen. La ejecución restringida falló por resolución de módulos; la ejecución autorizada fuera de ese entorno completó correctamente.
- `node docs/auditoria/verificar-home.mjs`: correcto. Comprueba H1, idioma, canonical, descripción, IDs, anclas, recursos locales, alternativas de imágenes, etiquetas y destinatarios de formularios.
- El repositorio no tiene scripts de lint ni una suite de tests configurados.
- Revisión visual con viewport de navegador de 320×740, 390×844, 768×1024, 1366×900, 1440×1000 y 1920×1080. En las seis mediciones, scrollWidth coincide con clientWidth: sin overflow horizontal de página.
- Revisados portada, ilustraciones, propuestas, suscripción, galería, contacto y footer mediante capturas y desplazamiento. Las capturas largas del navegador presentaban artefactos de composición; se utilizaron capturas por viewport para decidir las correcciones.
- Corregidos navegación de escritorio oculta por details cerrado, colisión de títulos en móvil pequeño y crecimiento excesivo de la fotografía de portada en escritorio.
- Probados apertura del menú móvil, submenú, cierre con Escape y restitución del foco, submenú de escritorio, enlace a contacto y vuelta arriba. Probada validación nativa de contacto vacío. Sin errores de consola observados ni imágenes rotas en la homepage.
- Comprobada la página existente de postgrado en móvil, con aviso de archivo y sin overflow horizontal. Se conserva con una capa de compatibilidad; su rediseño completo queda pendiente.

## Límites y siguiente fase

- No se ha desplegado. Esta fase no sustituye todavía el dominio completo: los enlaces a interiores pendientes apuntan a las URLs originales publicadas, centralizados con `originalPage`.
- La migración de rutas, redirecciones, sitemap y restantes páginas continúa según `PLAN-MIGRACION-ASTRO.md`. El postgrado mantiene provisionalmente su ruta Astro existente.
- Las convocatorias antiguas se conservarán como archivo y se distinguirá la vigente. No se han inventado nuevas fechas.
- No se ha enviado ningún correo real. La apertura efectiva del cliente de correo depende de la configuración del visitante; el texto del formulario ofrece la dirección como alternativa. No se ha realizado una matriz de navegadores ni una auditoría formal de accesibilidad.
