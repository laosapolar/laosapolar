# La Osa Polar — auditoría y plan de migración a Astro

Fecha de inspección: **15 de septiembre de 2026**.

## Resumen y alcance

La base Astro se puede aprovechar. La recomendación es conservar la estructura editorial que ya has trabajado, recuperar el lenguaje visual de la web original y completar la migración del contenido con rutas estables.

Se han consultado el sitemap, robots y el HTML de **42 páginas públicas con respuesta 200**, más **3 enlaces del menú que responden 404**. Se han inventariado **140 URLs distintas de imágenes en uploads**, además de fondos CSS. Se ha inspeccionado visualmente una muestra de las familias de página y las dos páginas Astro, y se ha compilado el proyecto.

**Esta fase solo añade documentación y evidencias de auditoría. No modifica las páginas, los estilos ni la configuración del sitio.**

### Decisiones confirmadas por el propietario

- Correo principal y destinatario de los formularios: **elmardelaosapolar@gmail.com**.
- Conservar las convocatorias antiguas como archivo y distinguir la convocatoria vigente.
- Mantener razonablemente las URLs originales.
- Conservar personalidad, ilustraciones, fotografía y filosofía visual; evitar estética SaaS, gradientes gratuitos, glassmorphism, tarjetas generalizadas y animaciones innecesarias.

### Documentación complementaria

- [Inventario completo de rutas y correspondencias](auditoria/RUTAS.md): las 45 URLs comprobadas, una por fila, con tratamiento propuesto.
- [Fichas de contenido por página](auditoria/CONTENIDO.md): jerarquía, bloques de texto HTML, enlaces y recursos.
- [Inventario estructurado](auditoria/inventario.json): títulos, canónicas, metadatos, imágenes, formularios y enlaces.
- [Manifiesto de imágenes](auditoria/assets.json): URL, dimensiones declaradas, alt, srcset y páginas donde se utiliza.
- [Identificadores WordPress](auditoria/alias-wordpress.json): 42 IDs observados en HTML para planificar compatibilidad de enlaces antiguos.
- `auditoria/original/`: copias de HTML, sitemap, robots y texto extraído. No son código de producción.

Las fuentes principales son la [portada](https://laosapolar.es/), el [sitemap de páginas](https://laosapolar.es/wp-sitemap-posts-page-1.xml) y cada URL enlazada en el inventario.

## 1. Web original: arquitectura y contenido

### Navegación principal

1. **Inicio** → `/`.
2. **Formaciones** → actualmente `/?page_id=68`, que devuelve 404.
   - Postgrado Corporal-Teatro → `/especializacion/`.
   - Arteterapia Gestalt → `/arteterapia-gestalt/`.
   - Educación Emocional Sanitaria → `/educacion-emocional-sanitaria/`.
3. **Ciclo Esencial** → `/arteterapia-esencial/`.
   - Ciclo Esencial de Arteterapia Gestalt → `/ciclo-esencial-2024/`.
4. **Sesiones individuales** → `/espacio-individual/`.
5. **Arte** → actualmente `/?page_id=62`, que devuelve 404.
   - Página en construcción → `/eventos/`.
   - Página en construcción → `/?page_id=82`, también 404.

El header combina el logo completo con navegación horizontal y un botón de barra lateral. La barra lateral repite navegación, búsqueda y datos básicos. Existe enlace para saltar al contenido. La cabecera de portada se superpone a una fotografía; las interiores utilizan una cabecera oscura. El footer contiene ubicación «Málaga, España», enlaces a Galería, Nosotras e Inicio, búsqueda, copyright y crédito del tema Inspiro/WPZOOM. Hay enlace de regreso arriba.

**Propuesta:** conservar las cinco categorías reconocibles. Formaciones y Arte serán controles de desplegable accesibles, no enlaces rotos. Arte ofrecerá Galería y Artistas, vida y obras. La navegación secundaria agrupará Nosotras, La Osa Polar, Equipo y Contacto. Mantener acceso al archivo desde las páginas de formación. Evitar duplicar todo el menú en dos implementaciones independientes.

### Familias de página y jerarquía

| Familia | Estructura observada | Tratamiento |
|---|---|---|
| Portada | Foto de taller y título manuscrito → presentación con fotografía de pinceles → 4 accesos ilustrados → cita de Hendrix → 4 propuestas ilustradas → suscripción → cita de Duchamp → Galería y Artistas → contacto | Conservar secuencia y ritmo; corregir proporciones, espacios y enlaces |
| Nosotras | Presentación conjunta de Rocío y Natalia → agradecimiento → retratos y biografías | Página editorial con texto legible y perfiles relacionados |
| La Osa Polar | Origen del cuento → nacimiento de la escuela → filosofía, relación, arte, cuidado y dimensión social | Mantener voz narrativa; introducir subtítulos con criterio, sin resumirla en eslóganes |
| Equipo y colaboraciones | 25 retratos enlazados y nombres | Directorio sobrio desde datos compartidos |
| Fichas personales | Título → retrato → biografía; algunas incluyen publicaciones y enlaces externos | Una plantilla flexible para textos breves y extensos |
| Arteterapia Gestalt | Título → cartel de septiembre de 2026 → 7 láminas sobre propuesta y metodología → contacto para dossier e inscripción | Extraer información gráfica a HTML y conservar carteles complementarios |
| Ciclo Esencial | Presentación → enfoque → técnicas → 8 talleres → horarios, lugar, dirección e inscripción | Separar programa permanente de datos de cada edición |
| Ciclo Esencial 2024, según URL | Texto de la edición 2025–2026 → temas → fechas → tarifas según recursos/beca → inscripción → fotos de 2023/2024 | Archivo con fechas explícitas; conservar slug aunque su año no coincida |
| Postgrado | Lema e imagen abstracta → objetivos → estructura → metodología → 5 docentes → fechas → horarios → costes → inscripción por contacto | Reutilizar organización del Astro, restaurar contenido necesario y marcar archivo 2024–2025 |
| Monográficos / Información Postgrado | Variantes del postgrado; la segunda contiene horarios y fechas anteriores | Conservar diferencias históricas; revisar duplicación antes de consolidar |
| Acompañamiento individual | Presentación del acompañamiento → invitación al contacto → teléfono/correo | Página breve, sin añadir tarifas o modalidades inventadas |
| Galería | 11 fotografías documentales y muy poco texto | Galería fotográfica con proporciones respetadas y descripciones útiles |
| Artistas, vida y obras | 38 imágenes con autorías en 8 disciplinas; escritura y teatro en construcción | Mantener disciplinas y pies de obra; jerarquía de encabezados e índice de secciones |
| Páginas incompletas | Educación Sanitaria: «Página en actualización»; Eventos: construcción; Formación #1: plantilla de prueba | Tratamiento explícito, sin convertir borradores en contenido definitivo |

Las ocho disciplinas artísticas son collage, danza, pintura, costura, vídeo/performance, fotografía, escultura y música/voz. No se han descubierto páginas individuales de estos artistas: son figuras dentro de una página, a diferencia de las fichas del equipo.

### Contenido que requiere atención

- `/arteterapia-gestalt/` apenas contiene 126 caracteres de texto principal en HTML: la información sustancial está incrustada en las imágenes. Visualmente anuncia **inicio en septiembre de 2026** y presenta bienvenida, proceso de transformación, metodología, técnicas artísticas, equipo y estructura.
- `/arteterapia-esencial/` menciona talleres «de nov a junio de 2027»; no explicita el año de noviembre ni el calendario completo. Mantener esa incertidumbre hasta disponer de datos, sin deducir días o precios.
- `/ciclo-esencial-2024/` describe noviembre de 2025–junio de 2026, con una sección fotográfica 2023/2024. El slug no debe interpretarse como el año real de todo su contenido.
- `/especializacion/` describe noviembre de 2024–marzo de 2025. Astro elimina el año del calendario y puede aparentar vigencia actual. Recuperar el contexto temporal.
- El postgrado menciona 5 talleres y un residencial; el calendario tiene 5 citas, una residencial. Presentarlo como cinco encuentros, uno residencial, tras contrastar el programa; evitar sugerir seis encuentros por sumar los dos rótulos.
- El original tiene un correo visualmente partido: «elmarde» seguido de un enlace `mailto:laosapolar@gmail.com`. Corregir texto y destino a la dirección confirmada.
- Enlaces de «Leer más» o imágenes llevan en algunos casos a Google, no a información propia. Deben sustituirse por destinos útiles, sin conservar errores de navegación.
- `/formacion-1/` contiene instrucciones de edición y «Nombre Apellido», pero recibe el enlace de formación desde la portada. No migrarlo como una formación real.
- `/ejemplo-colaborador/` sí contiene una biografía real de Natalia y está enlazada desde el equipo: conservarlo, aunque el nombre de la ruta parezca provisional.
- `/elena-garcia/` corresponde a Elena Ferrández. Conservar URL y nombre visible correcto.
- `/antonio-castillo/` y `/antonio-castillo-2/` tienen la misma biografía; el directorio enlaza la segunda.

### Formularios y llamadas a la acción

Original: **WPForms Lite**, formulario 353 de suscripción (nombre, apellidos, correo) y 177 de contacto (nombre, correo, mensaje), ambos POST. Hay búsqueda GET mediante `s`. La mayoría de interiores conduce a contacto por correo o teléfono; no se ha encontrado un pago online ni una inscripción transaccional.

El formulario de solicitud del postgrado es un añadido de Astro, útil si se integra correctamente. Conservar CTAs concretos: consultar programa, solicitar dossier/inscripción, pedir información y contactar. En archivo, utilizar «Consultar próximas ediciones» en lugar de simular una matrícula abierta.

No se han enviado formularios: la auditoría no demuestra entrega real, destinatarios configurados ni automatización de newsletter. El backend de WPForms no se puede migrar copiando su HTML.

## 2. Inventario y correspondencia de rutas

La tabla exhaustiva está en [RUTAS.md](auditoria/RUTAS.md). Resumen:

- **42 páginas originales**, 26 de ellas URLs de fichas personales (25 personas y el duplicado de Antonio).
- **2 páginas Astro:** `/` y `/formaciones/postgrado-corporal-teatro`.
- Solo la portada coincide ya en ruta. El postgrado existe como implementación parcial, pero su URL original es **`/especializacion/`**.
- Las otras 40 páginas originales no tienen equivalente implementado, incluidos contenidos incompletos y duplicados.

### Política de URLs propuesta

1. Conservar `/especializacion/` y reutilizar allí el contenido/componentes de la página actual. La ruta Astro nueva será, si se conserva, una redirección a la original, no una segunda página indexable.
2. Mantener los slugs originales de las fichas, incluso los poco descriptivos. La organización de carpetas internas no obliga a cambiar las URLs.
3. Mantener `/arteterapia-esencial/` como referencia del ciclo y `/ciclo-esencial-2024/` como archivo identificado. No sustituir una convocatoria histórica por otra sin dejar registro.
4. Proponer 301 de `/formacion-1/` a `/arteterapia-gestalt/`, por ser el destino que corresponde a la intención del enlace de portada.
5. Proponer 301 de `/antonio-castillo/` a `/antonio-castillo-2/`, que recibe el enlace actual del directorio. Contrastar tráfico/backlinks antes de fijarlo en producción; es preferible continuidad a embellecer el slug.
6. Conservar de momento `/monograficos/` e `/informacion-postgrado/` como información histórica. Sus similitudes no autorizan a borrar diferencias de fechas o contenido. Consolidar solo tras comparación editorial y asignar canónica adecuada a las versiones equivalentes.
7. Retirar del menú los tres `?page_id` rotos. No redirigir indiscriminadamente cualquier `?page_id` a la portada. Los IDs válidos se mapearán al contenido correspondiente con reglas del servidor/hosting.
8. Usar barra final para páginas canónicas, como el original, y normalizar variantes.

Rutas funcionales nuevas que podrían ser necesarias: `/buscar/`, una página 404 y páginas de privacidad/aviso legal con información real del titular. **No son páginas encontradas en el sitio original.**

## 3. Auditoría del repositorio Astro

### Estado y arquitectura

| Archivo / área | Estado observado | Decisión |
|---|---|---|
| `package.json` y lockfile | Astro 6.1.5; Tailwind y plugin Vite 4.2.2; Node mínimo 22.12.0; scripts dev/build/preview/astro | Conservar base y lockfile; no hacer una actualización mayor como requisito del rediseño |
| `astro.config.mjs` | Plugin de Tailwind; salida estática por defecto; sin site, sitemap ni adaptación de backend | Añadir configuración de dominio, rutas y SEO al implementar |
| `tsconfig.json` | Preset estricto de Astro | Conservar |
| `src/layouts/Layout.astro` | Documento HTML, metadatos básicos, navegación, footer, tokens, CSS global y JS, todo junto | Conservar el punto de entrada; extraer responsabilidades |
| `src/pages/index.astro` | Portada de unas 600 líneas con HTML y CSS global | Conservar estructura y recursos; dividir en secciones y estilos locales |
| `src/pages/formaciones/postgrado-corporal-teatro.astro` | Página de unas 700 líneas, arrays de docentes/talleres, secciones y CSS global | Conservar modelado y organización; compartir datos y restaurar ruta |
| `src/styles/global.css` | Solo importa Tailwind; no se importa desde las páginas o el layout revisados | Definir una sola entrada de estilos; decidir uso real de Tailwind |
| Componentes y colecciones | No existen carpetas de componentes, colecciones ni configuración de contenido | Crear únicamente abstracciones necesarias |
| `public/` | Solo favicon SVG e ICO; el SVG conserva el logotipo de Astro | Sustituir favicon con la marca; incorporar recursos propios |
| Imágenes y fuentes | Imágenes enlazadas directamente a WordPress; Cormorant Garamond, Jost y Caveat desde Google Fonts | Migrar imágenes localmente y racionalizar fuentes |
| README | Texto del starter minimal de Astro | Documentar edición de contenido, desarrollo, build y despliegue real |
| Editor y configuración local | `.vscode` contiene recomendaciones/lanzamiento; `.claude` contiene permisos locales | No trasladarlo a arquitectura o configuración del sitio |
| Tests, CI, hosting | No hay tests ni configuración de despliegue/CI en los archivos del proyecto revisados | Añadir comprobaciones proporcionadas al alcance de la migración |

No se encontró AGENTS.md en el repositorio ni en los tres directorios padre comprobados. Estado inicial de Git: portada modificada, layout y postgrado sin seguimiento, `.claude/` sin seguimiento. Se han respetado esos cambios.

### Qué conservaría

- Astro estático, TypeScript estricto y ausencia de un framework cliente innecesario.
- Layout compartido y props `title`/`description`.
- Orden de secciones de portada y las dos familias de ilustraciones con sus créditos.
- Organización del postgrado en programa, docentes, calendario, costes y contacto.
- Arrays para talleres y docentes, llevándolos a datos compartidos tipados.
- CSS Grid, Flexbox, `clamp()` y variables de espaciado/ancho.
- Separadores finos, composiciones abiertas y enlaces sencillos donde ya funcionan.

### Qué refactorizaría o sustituiría

**Problemas funcionales comprobados:**

1. El postgrado utiliza `.hero`, `.hero-bg` y `.hero-overlay` definidos únicamente en la portada. En carga directa, el fondo y la capa tienen altura calculada de **0 px**. Se reproduce un encabezado blanco sobre fondo claro. Mover lo compartido a su componente o sustituir por cabecera editorial propia.
2. Los enlaces `href="#"` disparan `document.querySelector('#')`, que produce una excepción real de JavaScript. Usar botones para desplegables y enlaces con destinos reales; simplificar el desplazamiento a anclas.
3. «Formación Arteterapia Gestalt» en la portada enlaza por error al postgrado corporal. Corregir a `/arteterapia-gestalt/`.
4. Los tres formularios de Astro carecen de integración de envío y los campos no tienen `name`; no equivalen a formularios operativos. Faltan etiquetas visibles/asociadas y estados de envío/error.
5. La galería y «Artistas, vida y obras» se mezclan en Astro: el segundo destino desaparece como enlace independiente. Restaurar ambos.
6. El logo completo ya incluye el nombre y se vuelve a escribir al lado. Además, el filtro CSS aplana los colores originales. Usar una sola versión de marca, legible y sin duplicación.

**Arquitectura, accesibilidad y estilo:**

- Extraer header, menú y footer del layout; llevar tokens/base a CSS global y estilos de secciones a sus componentes.
- Añadir `<main>`, enlace de salto y encabezados H2 reales: varios rótulos actuales son spans seguidos de H3.
- Menú móvil con `aria-expanded`, `aria-controls`, cierre con Escape y devolución de foco; desplegables operables por teclado/táctil. El código actual solo cambia clases y aria-label.
- Eliminar ocultación inicial `.reveal { opacity: 0 }`: sin JS desaparece buena parte del contenido visual. El contenido debe ser visible por defecto.
- Eliminar blur del header, ruido fijo, zoom del hero, rebote de flecha, entradas escalonadas y cambios de tracking al hover.
- Recuperar tamaño y contraste en navegación, textos auxiliares, formularios y footer. Hay numerosos tamaños de 0.55–0.8rem y opacidades muy bajas.
- Sustituir fondos CSS por `<img>`/`<picture>` para fotos de contenido y retratos; declarar dimensiones, alt y carga diferida donde proceda.
- Corregir desbordamientos reales en su origen; `overflow-x: hidden` no debe ocultar errores de composición.
- Separar contenido histórico y datos de convocatoria; no esconder el año ni presentar precios antiguos como vigentes.

### Verificación realizada

`npm run build` genera correctamente las **dos páginas** con Node 22.18.0. El primer intento falló dentro del sandbox; la ejecución permitida fuera de él pasó. No se identifica ese fallo inicial como un defecto del repositorio.

Se revisaron ambas páginas en el navegador local y se reprodujeron el fondo ausente del postgrado y la excepción de enlaces `#`. No se ha ejecutado una batería de accesibilidad ni pruebas de entrega de formularios. La emulación solicitada de 390 px no se aplicó efectivamente: el navegador siguió informando 1280 px. Por tanto, no se afirma validación visual móvil; sí se inspeccionaron los media queries. En el original se midió ancho de documento de 1318 px con viewport de 1280 px, coherente con el desplazamiento horizontal observado.

## 4. Dirección visual y sistema de diseño

### Identidad observada

La marca tiene una dimensión artística, expresiva y humana: pinturas y pinceles, ilustraciones de autor, retratos, cita manuscrita y contenido con una voz propia. La portada combina fotografía oscura con zonas blancas o beige muy suave. Hay turquesa, magenta y colores vivos aportados por las obras. Retratos e ilustraciones utilizan recortes circulares/ovalados.

Fuentes calculadas observadas: **Yesteryear** en el gran título de portada (105 px en la vista de escritorio inspeccionada), **Inter** en cuerpo y navegación, **Playfair Display** en algunos bloques; también aparecen títulos con la pila tipográfica del sistema. La mezcla actual no es completamente consistente.

Colores observados: blanco; cabeceras cercanas a `#101010`/`#111111`; texto `#444444`; turquesa de navegación lateral `#0BB4AA`; fondo de sección con `rgba(161,147,86,.17)`. No todo el color pertenece a una paleta CSS: gran parte procede de imágenes.

### Propuesta concreta

| Elemento | Regla propuesta |
|---|---|
| Base | Blanco y papel cálido muy ligero; negro suave y gris de lectura |
| Acento | Turquesa original en detalles; variante más oscura para texto y botones, comprobando contraste |
| Color artístico | Mantener los colores propios de ilustraciones/carteles; no aplicar filtros uniformes terracota |
| Tipografía principal | Inter local, 400 para texto y 500/600 para títulos y navegación |
| Acento tipográfico | Yesteryear local para una frase/título de marca; uso puntual y legible |
| Serif | Playfair Display solo si una cita o texto editorial lo justifica; no cargar tres familias por sistema |
| Escala inicial | Cuerpo 17–18 px, interlineado 1.6–1.7; auxiliar al menos 14 px; H1 interior 36–56 px; H2 28–40 px; título de portada fluido, sin ocupar la pantalla a costa del contenido |
| Anchos | Texto largo 62–70 caracteres; contenedor general aproximadamente 1160–1240 px; galerías más amplias cuando el contenido lo pida |
| Espaciado | Escala 4/8/12/16/24/32/48/64/96 px; bloques grandes 48–88 px en escritorio y 32–56 px en móvil |
| Bordes | Líneas finas; botones y campos con esquina recta o radio mínimo |
| Círculos | Conservarlos selectivamente en retratos o ilustraciones donde pertenecen al original; nunca como recorte indiscriminado de todas las obras |
| Composición | Ilustración con texto, fotografía con pie, bloques de prosa, listas de programa y calendarios legibles; no envolver cada sección en una tarjeta |
| Portada | Foto original de taller, logo y título con personalidad; jerarquía clara. Evitar el tratamiento de landing comercial de pantalla completa por defecto |
| Interiores | Título, introducción e imagen según contenido; no obligar a todas las páginas a tener un hero fotográfico |
| Movimiento | Solo estados funcionales discretos; respetar preferencia de movimiento reducido |
| Responsive | Una columna real en pantallas estrechas; 2–4 columnas según contenido; sin alturas rígidas ni recortes de texto; comprobar 360/390/768/1024/1440 px |

La terracota, salvia, Cormorant y Caveat del Astro son elecciones del ensayo actual, no rasgos que haya que tratar como identidad original. Conservaría la intención de mejorar el ritmo editorial, ajustando esos recursos para acercarlos a la marca.

## 5. Componentes y modelo de contenido

### Componentes globales

- **Layout + SEOHead:** documento, idioma, título, descripción, canónica, social y datos estructurados justificados.
- **SiteHeader / Navigation / MobileMenu:** una fuente de enlaces, marca y estados accesibles.
- **SiteFooter:** ubicación, contacto, navegación secundaria, búsqueda y enlaces legales disponibles.
- **PageHeading:** título e introducción; variante de portada expresiva, sin convertirla en cabecera obligatoria de interiores.
- **SectionHeading, Prose y Quote:** jerarquía, prosa y citas compartidas.
- **IllustratedLink:** imagen y texto enlazado para los accesos originales; diseño abierto.
- **Figure / Gallery:** imágenes con dimensiones, proporción, alt, crédito y pie.
- **PersonPreview / PersonLayout:** retratos del directorio y biografías completas.
- **CourseLayout / Schedule / EditionNotice:** programa, fechas, costes y aviso inequívoco de archivo.
- **ContactDetails / ContactForm / NewsletterForm:** datos centralizados y formularios separados por finalidad.
- **Search:** índice estático del contenido; ruta de resultados no indexable y compatibilidad con la búsqueda antigua.

### Datos

Usar colecciones locales para **personas**, **programas/ediciones** y **obras/fotografías**; Markdown para prosa, datos tipados para fechas, enlaces, autorías y relaciones. Las colecciones permiten compartir datos y validar su estructura durante la construcción. [Documentación de Astro](https://docs.astro.build/en/guides/content-collections/).

Cada edición tendrá estado explícito (`vigente`, `proxima`, `archivo`), periodo, fechas verificadas, información de inscripción y ruta pública. No derivar el estado únicamente del año del slug. Una persona podrá aparecer en el directorio, Nosotras y varios programas sin duplicar su biografía.

Los slugs heredados se generarán explícitamente; no se cambiarán para que coincidan con la organización interna de carpetas. Astro permite construir rutas desde parámetros definidos en tiempo de build. [Rutas de Astro](https://docs.astro.build/en/guides/routing/).

### Formularios y alojamiento

Mantener el sitio editorial estático. Incorporar envío mediante un endpoint de servidor compatible con el hosting o un servicio de formularios elegido para el proyecto. No hay evidencia suficiente para escoger ahora un proveedor concreto ni para suponer que la suscripción pública ya se integra con una plataforma de correo.

Antes de implementar esa conexión se necesitarán los datos del servicio/hosting y la configuración de newsletter. El diseño podrá avanzar con un contrato claro de campos, validación y estados; la publicación requerirá comprobar entrega a **elmardelaosapolar@gmail.com**. Separar solicitud de contacto y consentimiento de suscripción; preservar privacidad y baja según la configuración real.

## 6. Assets reutilizables

| Recurso | Uso y decisión |
|---|---|
| `2023/11/logoFull.png` | Logo completo original, 1345×287. Conservar colores y proporción; evitar nombre duplicado y filtros. Derivar favicon de una versión adecuada de la marca |
| `2024/10/cropped-12-scaled-2-scaled.jpg` | Fotografía de cabecera original, con silla y materiales. Candidata principal para continuidad de portada |
| `2023/11/Principal-o-fondos-web-3.jpg` | Foto de pinceles de la presentación original; Astro la utiliza como hero. Reutilizable, pero distinguir su papel original |
| `2023/11/para-usar-sin-ubicar-8.jpg` | Fondo CSS observado en portada; valorar según su función, no confundirlo con la fotografía del hero |
| `IMG_20231025_001803`, `IMG_20231023_173158`, `IMG_20231023_172917`, `IMG_20241010_022320` | Cuatro ilustraciones de accesos. Mantener crédito y enlace a Pinceladas Conscientes |
| `IMG_20231025_003411`, `003537`, `003727`, `003923` | Ilustraciones de propuestas. Mantener crédito y enlace a Julietta Morla |
| Retratos del equipo | Reutilizar variantes de resolución apropiada; misma persona y crédito en todas sus apariciones |
| Imágenes de talleres y galería | Reutilizar como documentación del proceso real; no sustituirlas por imágenes genéricas |
| Cartel `2026/06/47312-819x1024.jpg` y láminas de formación | Conservar como materiales visuales; contenido importante también en HTML |
| Obras de Artistas, vida y obras | Conservar autorías y contexto. Revisar procedencia y condiciones de reutilización, que el HTML público no acredita |
| Fuentes | Recuperar fuentes de identidad y sus licencias; alojar WOFF2 locales con pesos estrictamente necesarios |

El manifiesto registra **140 URLs de imágenes**, no 140 originales únicos garantizados: puede haber variantes de tamaño del mismo archivo. No se ha descargado toda la biblioteca multimedia ni verificado cada URL de imagen por HTTP. En implementación: descargar selección y originales disponibles, deduplicar, comprobar calidad, optimizar y registrar original → variante generada. Mantener servidas las URLs antiguas relevantes de uploads o redirigirlas al recurso equivalente; la migración no debe depender del WordPress que se retirará.

Las ilustraciones no deben recortarse como fotografías de stock. Para obras, usar encuadre completo salvo decisión editorial; para retratos, punto focal por persona. Las descripciones alt deben distinguir imagen informativa de decoración.

## 7. SEO y continuidad

### Problemas observados

- Las 42 páginas tienen canónica, pero no se han encontrado meta descriptions ni etiquetas Open Graph en sus HTML descargados.
- Hay títulos duplicados entre los ciclos y fichas de Antonio, además de títulos provisionales.
- El sitemap publica páginas de prueba o sin contenido.
- Numerosas imágenes carecen de texto alternativo y parte esencial del programa está en carteles.
- La navegación enlaza a 404 y a una plantilla de prueba.
- Hay contenido repetido del postgrado con diferencias temporales que hay que preservar antes de consolidar.
- Astro todavía no configura dominio/canónicas/sitemap/social y conserva favicon del starter.

### Reglas para la migración

1. Una correspondencia comprobable para cada URL: conservar, redirigir al equivalente o mantener estado HTTP justificado. Nunca redirigir todos los errores a Inicio.
2. Redirecciones permanentes reales en servidor/hosting y sin cadenas. Un meta refresh de una exportación estática no debe confundirse con un HTTP 301 verificado. También hacen falta reglas capaces de discriminar query strings.
3. Preservar textos, biografías, autorías y enlaces externos útiles; corregir erratas sin borrar contenido por simplificar el diseño.
4. Canonical absoluto, título y descripción propios, un H1 por página y H2/H3 coherentes. No canonicalizar indiscriminadamente todos los archivos hacia la edición actual: son contenidos temporalmente distintos.
5. Sitemap solo de URLs canónicas indexables. Los archivos útiles pueden indexarse; construcción y resultados de búsqueda no deben competir como contenido principal.
6. Mantener dominio HTTPS y normalización de host/barra final; preservar anclas y recursos que reciben enlaces.
7. Metadatos sociales y datos estructurados de organización/personas/cursos solo con datos reales. No inventar reseñas, acreditaciones, dirección de sede o eventos futuros.
8. Optimizar imágenes, evitar saltos de diseño con dimensiones declaradas, cargar prioritariamente solo la imagen principal y mantener contenido accesible sin JavaScript.
9. Confirmar que el staging no se indexa y que las restricciones del staging se retiran de producción al lanzar. No bloquear el rastreo de una URL cuya redirección se quiere que el buscador detecte.
10. Antes del corte, completar el inventario con Search Console, analítica y logs si están disponibles; después, revisar rastreo, errores y páginas indexadas. Mantener redirecciones al menos un año y preferiblemente de forma permanente. [Guía de migración de Google](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

No se ha accedido a Search Console, analítica ni administración de WordPress. El inventario es exhaustivo respecto al sitemap y enlaces descubiertos, no una garantía de que no existan páginas históricas huérfanas.

## 8. Orden recomendado de implementación

| Fase | Trabajo | Criterio de salida |
|---|---|---|
| 1. Congelar inventario y contenido | Incorporar decisiones confirmadas, correspondencias, archivo de ediciones y datos reales pendientes | Cada ruta tiene tratamiento; ninguna convocatoria histórica se presenta como vigente |
| 2. Preparar recursos | Descargar imágenes seleccionadas y fuentes; créditos, variantes y estrategia uploads | Recursos disponibles sin depender del WordPress antiguo |
| 3. Base compartida | Dividir Layout, definir tokens, tipografía, header/footer, navegación y SEO básico | Página interior y portada funcionan por carga directa, teclado y sin contenido oculto |
| 4. Página piloto: postgrado | Reutilizar arrays, estructura y recursos; implementar en `/especializacion/` como archivo 2024–2025 | Se valida prosa, retratos, programa, fechas, costes y CTAs en una página real |
| 5. Portada | Ajustar secuencia existente, recuperar identidad, conexiones correctas y dos accesos artísticos independientes | El recorrido presenta la escuela y sus propuestas sin enlaces provisionales |
| 6. Programas y acompañamiento | Arteterapia Gestalt, ciclo vigente, archivo y sesiones individuales | Carteles transcritos y datos temporales diferenciados |
| 7. Escuela y equipo | Nosotras, historia, directorio y 25 fichas personales | Biografías y enlaces conservados; duplicado de Antonio resuelto |
| 8. Arte y contenido residual | Galería, 38 referencias artísticas y tratamiento de páginas incompletas/históricas | Autorías, categorías, rutas y estados coherentes |
| 9. Funcionalidad | Formularios, newsletter, búsqueda, contenido legal disponible y reglas de redirección | Envío probado, errores accesibles y búsqueda útil; sin falsos éxitos |
| 10. Verificación y lanzamiento | Crawl comparativo, build, móvil real, teclado, SEO, recursos, redirecciones y rollback | Todas las URLs del inventario tienen respuesta prevista; autorización de lanzamiento y copia recuperable |

Se puede diseñar el contrato de formularios y confirmar el hosting desde el comienzo; la integración no debe descubrirse el día del lanzamiento. No introducir un CMS, librería de componentes o framework cliente sin una necesidad concreta.

### Comprobaciones finales de implementación

- Compilación reproducible con las versiones fijadas y validación de los datos de contenido.
- Cobertura de las 42 URLs originales y tratamiento de los tres enlaces rotos.
- Ningún `href="#"` provisional; enlaces internos y anclas válidos.
- Todas las páginas por carga directa, con/sin JS, teclado y tamaños 360–1440 px.
- Galerías y fotos sin recortes accidentales ni desplazamiento horizontal.
- Formularios: campos nombrados, etiquetas, validación de servidor, estados claros y entrega real; newsletter diferenciada del contacto.
- Canónicas, robots, sitemap, códigos HTTP, títulos, fechas y metadatos consistentes.
- Comprobación de contenido transferido, especialmente texto de carteles y biografías extensas.

## 9. Pendientes reales y límites

El correo y el criterio de archivo están resueltos. Se puede comenzar la fase de implementación cuando se autorice, sin replantear el proyecto desde cero.

Antes de publicar sí será necesario disponer de: fechas/datos completos de próximas convocatorias, sistema de envío/newsletter, acceso o detalles del hosting, información del titular para textos legales y, si existen, señales de tráfico para cerrar redirecciones ambiguas. Estos datos no son deducibles de forma fiable de las páginas públicas. El plan los mantiene como dependencias concretas, sin inventarlos.
