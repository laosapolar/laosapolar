import fs from 'node:fs';
const base='docs/auditoria/';
const pages=JSON.parse(fs.readFileSync(base+'inventario.json','utf8'));
const notes={
 inicio:'Portada: fotografía de taller, presentación, 4 accesos ilustrados, cita, 4 propuestas, suscripción, accesos a galería/artistas y contacto. Reutilizar estructura de index.astro.',
 'arteterapia-esencial':'Presentación del Ciclo Esencial; 8 talleres y referencia a junio de 2027, sin año inicial explícito. Mantener como presentación/convocatoria más reciente, sin inventar fechas.',
 'espacio-individual':'Acompañamiento: introducción, profesionales y contacto. Conservar ruta.',
 especializacion:'Postgrado 2024–2025: programa, docentes, calendario, precios y contacto. Reutilizar el Astro existente en /especializacion/; marcar edición archivada.',
 'arteterapia-gestalt':'Formación: cartel de septiembre de 2026 y 7 láminas informativas. Transcribir a HTML; mantener carteles como complemento.',
 'educacion-emocional-sanitaria':'Únicamente «Página en actualización». Mantener URL con estado claro y contacto; no inventar programa. Excluir del sitemap mientras siga vacía.',
 'ciclo-esencial-2024':'Contenido de noviembre 2025–junio 2026 y fotos 2023/2024, pese al slug 2024. Conservar URL como archivo y distinguir ediciones.',
 eventos:'Página en construcción sin contenido. Mantener acceso con estado claro y noindex hasta disponer de contenido; retirar del menú activo.',
 monograficos:'Repite casi todo el postgrado con un encabezado de intensivo. Conservar provisionalmente como archivo; consolidar solo si se confirma equivalencia editorial completa.',
 nosotras:'Presentación conjunta de Rocío y Natalia; retratos y biografías separadas. Conservar voz y estructura editorial.',
 'la-osa-polar':'Historia del cuento y del proyecto, filosofía de la escuela y enfoque social/humanista. Conservar prosa, corregir erratas sin sustituir la voz.',
 colaboraciones:'Directorio de 25 personas, fotos enlazadas y nombres. Generar desde una colección compartida con sus fichas.',
 'ejemplo-colaborador':'Ficha real de Natalia Daimiel. El slug parece de prueba, pero el contenido es público y está enlazado. Conservar.',
 'formacion-1':'Plantilla pública con texto de edición y Nombre Apellido; recibe el enlace de formación desde la portada. Propuesta: 301 a /arteterapia-gestalt/ y corregir ese enlace.',
 'informacion-postgrado':'Versión anterior del postgrado, con fechas y horarios diferentes. Mantener como archivo de información preliminar; no fusionar sin preservar las diferencias.',
 galeria:'11 fotografías de talleres/procesos con muy poco texto. Conservar como galería documental, diferenciada del catálogo de artistas.',
 'antonio-castillo':'Biografía idéntica a /antonio-castillo-2/. Propuesta: 301 hacia la ruta -2, que es la actualmente enlazada desde el directorio; revisar señales de tráfico antes de publicar.',
 'antonio-castillo-2':'Biografía de Antonio Castillo; actualmente enlazada por el directorio. Candidata a canónica del duplicado.',
 'elena-garcia':'La persona se presenta como Elena Ferrández. Mantener slug existente y usar el nombre visible correcto.',
 'artistas-vida-y-obras':'38 imágenes en 8 disciplinas; escritura y teatro en construcción. Conservar autorías, categorías y obras sin inventar fichas biográficas que no existen.',
 'alejandro-rodriguez':'Ficha larga con trayectoria profesional, formación y actividades. Requiere plantilla de biografía extensa, no recorte a una tarjeta.',
 'page-68':'404 actual. «Formaciones» es una etiqueta de navegación, no una página pública operativa. Sustituir el enlace por un desplegable accesible; sin redirección arbitraria.',
 'page-62':'404 actual. «Arte» es una etiqueta de navegación sin página operativa. Sustituir por desplegable hacia Galería y Artistas.',
 'page-82':'404 actual; submenú Arte. Retirar enlace; conservar respuesta 404 salvo que aparezca contenido histórico que justifique una equivalencia.'
};
let routes='# Inventario completo de rutas\n\nFecha: 15 de septiembre de 2026. Fuente: sitemap público, enlaces HTML y respuestas HTTP. 42 rutas del sitemap responden 200; las 3 URLs con page_id del menú responden 404.\n\n| URL original | HTTP | Correspondencia Astro actual | Tratamiento propuesto |\n|---|---|---|---|\n';
for(const p of pages){
 const route=new URL(p.url).pathname+new URL(p.url).search;
 const astro=p.file==='inicio'?'/':p.file==='especializacion'?'/formaciones/postgrado-corporal-teatro':'No existe';
 routes+=`| [${route}](${p.url}) | ${p.file.startsWith('page-')?'404':'200'} | ${astro} | ${notes[p.file]||'Ficha personal: retrato y biografía. Conservar la URL y migrar a plantilla compartida.'} |\n`;
}
routes+='\n## Rutas funcionales y técnicas\n\n- `/?s=consulta`: buscador WordPress expuesto por formularios GET en footer y barra lateral. Mantener función de búsqueda con índice local de páginas; resolver la query original sin mostrar silenciosamente la portada. No indexar resultados internos.\n- `/#content` y `/#top` (y equivalentes en interiores): conservar anclas de acceso al contenido y principio. `/#nosotras`, `/#propuestas`, `/#galeria`, `/#contacto` son anclas ya presentes en Astro, no páginas originales independientes.\n- `/nosotras` sin barra: variante enlazada por el footer; normalizar a `/nosotras/`.\n- `/robots.txt`, `/wp-sitemap.xml`, `/wp-sitemap-posts-page-1.xml`: sustituir el contenido técnico al migrar y conservar compatibilidad del sitemap antiguo.\n- `/wp-content/uploads/...`: rutas públicas de imágenes que no deben desaparecer al retirar WordPress; manifiesto en assets.json.\n- `/feed/`, `/comments/feed/`, `/wp-json/`, oEmbed y XML-RPC: endpoints WordPress presentes en metadatos, no páginas editoriales. No copiarlos como páginas; decidir compatibilidad de feeds según uso, retirar referencias técnicas obsoletas.\n- Otros `?page_id=N` de páginas publicadas: extraídos del HTML en alias-wordpress.json; probar y resolver con reglas de hosting en la migración. Solo los tres del menú se han verificado directamente en esta fase.\n\nEl sitemap y los enlaces se han cruzado sin descubrir más páginas editoriales distintas. Esto no demuestra que no existan URLs huérfanas fuera del sitemap o enlaces externos históricos: completar con Search Console y logs antes del lanzamiento.\n';
fs.writeFileSync(base+'RUTAS.md',routes);
const assets=new Map();const aliases=[];
for(const p of pages){
 for(const im of p.images){if(!im.url.includes('/uploads/'))continue;const a=assets.get(im.url)||{url:im.url,width:im.width,height:im.height,alt:im.alt,srcset:im.srcset,pages:[]};a.pages.push(p.url);assets.set(im.url,a);}
 const html=fs.readFileSync(base+'original/'+p.file+'.html','utf8');
 const id=html.match(/wp-json\/wp\/v2\/pages\/(\d+)/)?.[1];if(id)aliases.push({source:`/?page_id=${id}`,destination:new URL(p.url).pathname,verification:'ID observado en HTML; respuesta del alias no comprobada'});
}
fs.writeFileSync(base+'assets.json',JSON.stringify([...assets.values()],null,2));
fs.writeFileSync(base+'alias-wordpress.json',JSON.stringify(aliases,null,2));
let content='# Fichas de contenido original\n\nInventario de estructura, bloques de texto HTML, recursos y enlaces por página. Los carteles con texto incrustado no se transcriben automáticamente. Las observaciones visuales y su tratamiento están en el plan principal.\n';
for(const p of pages){
 const internal=[...new Set(p.links.map(l=>l.url).filter(u=>u.startsWith('https://laosapolar.es/')&&!u.includes('#')&&!u.includes('/wp-content/')))];
 content+=`\n## ${p.title}\n\nURL: ${p.url}\n\n${notes[p.file]||'Retrato y biografía individual; conservar las referencias y la trayectoria completa.'}\n\n- Canónica: ${p.canonical||'No presente'}\n- Encabezados del contenido: ${p.headings.filter(h=>!['ENCUÉNTRANOS','Encuéntranos','ENLACES','BÚSQUEDA'].includes(h.text)).map(h=>h.level+' '+h.text).join(' → ')}\n- Imágenes incluyendo logo y utilidades: ${p.images.length}\n- Formularios: ${p.forms.map(f=>f.id||'búsqueda sin id').join(', ')}\n\n### Texto HTML\n\n${p.contentBlocks.map(b=>`**${b.tag}** ${b.text}`).join('\n\n')}\n\n### Enlaces internos (incluye navegación global)\n\n${internal.map(u=>'- '+u).join('\n')}\n\n### Imágenes\n\n${p.images.map(i=>`- ${i.url} (${i.width}×${i.height}; alt: ${i.alt||'vacío'})`).join('\n')}\n`;
}
fs.writeFileSync(base+'CONTENIDO.md',content);
console.log({pages:pages.length,images:assets.size,aliases:aliases.length});
