# Inventario completo de rutas

Fecha: 15 de septiembre de 2026. Fuente: sitemap público, enlaces HTML y respuestas HTTP. 42 rutas del sitemap responden 200; las 3 URLs con page_id del menú responden 404.

| URL original | HTTP | Correspondencia Astro actual | Tratamiento propuesto |
|---|---|---|---|
| [/](https://laosapolar.es/) | 200 | / | Portada: fotografía de taller, presentación, 4 accesos ilustrados, cita, 4 propuestas, suscripción, accesos a galería/artistas y contacto. Reutilizar estructura de index.astro. |
| [/arteterapia-esencial/](https://laosapolar.es/arteterapia-esencial/) | 200 | No existe | Presentación del Ciclo Esencial; 8 talleres y referencia a junio de 2027, sin año inicial explícito. Mantener como presentación/convocatoria más reciente, sin inventar fechas. |
| [/espacio-individual/](https://laosapolar.es/espacio-individual/) | 200 | No existe | Acompañamiento: introducción, profesionales y contacto. Conservar ruta. |
| [/especializacion/](https://laosapolar.es/especializacion/) | 200 | /formaciones/postgrado-corporal-teatro | Postgrado 2024–2025: programa, docentes, calendario, precios y contacto. Reutilizar el Astro existente en /especializacion/; marcar edición archivada. |
| [/arteterapia-gestalt/](https://laosapolar.es/arteterapia-gestalt/) | 200 | No existe | Formación: cartel de septiembre de 2026 y 7 láminas informativas. Transcribir a HTML; mantener carteles como complemento. |
| [/educacion-emocional-sanitaria/](https://laosapolar.es/educacion-emocional-sanitaria/) | 200 | No existe | Únicamente «Página en actualización». Mantener URL con estado claro y contacto; no inventar programa. Excluir del sitemap mientras siga vacía. |
| [/ciclo-esencial-2024/](https://laosapolar.es/ciclo-esencial-2024/) | 200 | No existe | Contenido de noviembre 2025–junio 2026 y fotos 2023/2024, pese al slug 2024. Conservar URL como archivo y distinguir ediciones. |
| [/eventos/](https://laosapolar.es/eventos/) | 200 | No existe | Página en construcción sin contenido. Mantener acceso con estado claro y noindex hasta disponer de contenido; retirar del menú activo. |
| [/monograficos/](https://laosapolar.es/monograficos/) | 200 | No existe | Repite casi todo el postgrado con un encabezado de intensivo. Conservar provisionalmente como archivo; consolidar solo si se confirma equivalencia editorial completa. |
| [/nosotras/](https://laosapolar.es/nosotras/) | 200 | No existe | Presentación conjunta de Rocío y Natalia; retratos y biografías separadas. Conservar voz y estructura editorial. |
| [/la-osa-polar/](https://laosapolar.es/la-osa-polar/) | 200 | No existe | Historia del cuento y del proyecto, filosofía de la escuela y enfoque social/humanista. Conservar prosa, corregir erratas sin sustituir la voz. |
| [/colaboraciones/](https://laosapolar.es/colaboraciones/) | 200 | No existe | Directorio de 25 personas, fotos enlazadas y nombres. Generar desde una colección compartida con sus fichas. |
| [/ejemplo-colaborador/](https://laosapolar.es/ejemplo-colaborador/) | 200 | No existe | Ficha real de Natalia Daimiel. El slug parece de prueba, pero el contenido es público y está enlazado. Conservar. |
| [/formacion-1/](https://laosapolar.es/formacion-1/) | 200 | No existe | Plantilla pública con texto de edición y Nombre Apellido; recibe el enlace de formación desde la portada. Propuesta: 301 a /arteterapia-gestalt/ y corregir ese enlace. |
| [/informacion-postgrado/](https://laosapolar.es/informacion-postgrado/) | 200 | No existe | Versión anterior del postgrado, con fechas y horarios diferentes. Mantener como archivo de información preliminar; no fusionar sin preservar las diferencias. |
| [/galeria/](https://laosapolar.es/galeria/) | 200 | No existe | 11 fotografías de talleres/procesos con muy poco texto. Conservar como galería documental, diferenciada del catálogo de artistas. |
| [/rocio/](https://laosapolar.es/rocio/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/catalina-llado/](https://laosapolar.es/catalina-llado/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/consuelo-trujillo/](https://laosapolar.es/consuelo-trujillo/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/victor-orive/](https://laosapolar.es/victor-orive/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/alain-vigneau/](https://laosapolar.es/alain-vigneau/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/victor-rios/](https://laosapolar.es/victor-rios/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/antonio-castillo/](https://laosapolar.es/antonio-castillo/) | 200 | No existe | Biografía idéntica a /antonio-castillo-2/. Propuesta: 301 hacia la ruta -2, que es la actualmente enlazada desde el directorio; revisar señales de tráfico antes de publicar. |
| [/lolique-llorente/](https://laosapolar.es/lolique-llorente/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/amos-vasquez/](https://laosapolar.es/amos-vasquez/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/raquel-jimenez/](https://laosapolar.es/raquel-jimenez/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/ana/](https://laosapolar.es/ana/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/jorge-gregorio/](https://laosapolar.es/jorge-gregorio/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/amaia-roldan/](https://laosapolar.es/amaia-roldan/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/oscar-velado/](https://laosapolar.es/oscar-velado/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/marisol-molina/](https://laosapolar.es/marisol-molina/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/inaki-zapirain/](https://laosapolar.es/inaki-zapirain/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/montse-perez/](https://laosapolar.es/montse-perez/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/elena-curiel/](https://laosapolar.es/elena-curiel/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/maria-silva/](https://laosapolar.es/maria-silva/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/guillermo-urbano/](https://laosapolar.es/guillermo-urbano/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/magda-pineyro/](https://laosapolar.es/magda-pineyro/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/simon-castillo/](https://laosapolar.es/simon-castillo/) | 200 | No existe | Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida. |
| [/antonio-castillo-2/](https://laosapolar.es/antonio-castillo-2/) | 200 | No existe | Biografía de Antonio Castillo; actualmente enlazada por el directorio. Candidata a canónica del duplicado. |
| [/elena-garcia/](https://laosapolar.es/elena-garcia/) | 200 | No existe | La persona se presenta como Elena Ferrández. Mantener slug existente y usar el nombre visible correcto. |
| [/artistas-vida-y-obras/](https://laosapolar.es/artistas-vida-y-obras/) | 200 | No existe | 38 imágenes en 8 disciplinas; escritura y teatro en construcción. Conservar autorías, categorías y obras sin inventar fichas biográficas que no existen. |
| [/alejandro-rodriguez/](https://laosapolar.es/alejandro-rodriguez/) | 200 | No existe | Ficha larga con trayectoria profesional, formación y actividades. Requiere plantilla de biografía extensa, no recorte a una tarjeta. |
| [/?page_id=68](https://laosapolar.es/?page_id=68) | 404 | No existe | 404 actual. «Formaciones» es una etiqueta de navegación, no una página pública operativa. Sustituir el enlace por un desplegable accesible; sin redirección arbitraria. |
| [/?page_id=62](https://laosapolar.es/?page_id=62) | 404 | No existe | 404 actual. «Arte» es una etiqueta de navegación sin página operativa. Sustituir por desplegable hacia Galería y Artistas. |
| [/?page_id=82](https://laosapolar.es/?page_id=82) | 404 | No existe | 404 actual; submenú Arte. Retirar enlace; conservar respuesta 404 salvo que aparezca contenido histórico que justifique una equivalencia. |

## Rutas funcionales y técnicas

- `/?s=consulta`: buscador WordPress expuesto por formularios GET en footer y barra lateral. Mantener función de búsqueda con índice local de páginas; resolver la query original sin mostrar silenciosamente la portada. No indexar resultados internos.
- `/#content` y `/#top` (y equivalentes en interiores): conservar anclas de acceso al contenido y principio. `/#nosotras`, `/#propuestas`, `/#galeria`, `/#contacto` son anclas ya presentes en Astro, no páginas originales independientes.
- `/nosotras` sin barra: variante enlazada por el footer; normalizar a `/nosotras/`.
- `/robots.txt`, `/wp-sitemap.xml`, `/wp-sitemap-posts-page-1.xml`: sustituir el contenido técnico al migrar y conservar compatibilidad del sitemap antiguo.
- `/wp-content/uploads/...`: rutas públicas de imágenes que no deben desaparecer al retirar WordPress; manifiesto en assets.json.
- `/feed/`, `/comments/feed/`, `/wp-json/`, oEmbed y XML-RPC: endpoints WordPress presentes en metadatos, no páginas editoriales. No copiarlos como páginas; decidir compatibilidad de feeds según uso, retirar referencias técnicas obsoletas.
- Otros `?page_id=N` de páginas publicadas: extraídos del HTML en alias-wordpress.json; probar y resolver con reglas de hosting en la migración. Solo los tres del menú se han verificado directamente en esta fase.

El sitemap y los enlaces se han cruzado sin descubrir más páginas editoriales distintas. Esto no demuestra que no existan URLs huérfanas fuera del sitemap o enlaces externos históricos: completar con Search Console y logs antes del lanzamiento.
