# Publicaciones con Sanity

La web sigue siendo estática. Las publicaciones se crean en un panel (Sanity Studio) integrado en **laosapolar.es/admin**.
Al publicar, Sanity avisa a Vercel y este vuelve a construir la web (1–2 minutos).

```
Cliente publica en /admin ──► Sanity guarda el contenido ──► webhook ──► Vercel Deploy Hook ──► build nuevo
```

## Qué se genera

| Ruta | Contenido |
| --- | --- |
| `/admin` | Panel de edición (no indexado, `Disallow` en robots.txt) |
| `/<sección>/<dirección>/` | Página de cada publicación, con el mismo diseño que las páginas migradas |
| `/<sección>/` | Listado de publicaciones de la sección (solo si tiene alguna) |

Las secciones están en `src/sanity/sections.ts` (Formaciones, Ciclo Esencial, Sesiones individuales, Arte).
Cada publicación con «Mostrar en el menú» aparece en el desplegable de su sección, junto a «Ver todas las publicaciones».
También se añaden al sitemap y al buscador.

Sin `PUBLIC_SANITY_PROJECT_ID` la web se construye igual que antes (sin `/admin` ni publicaciones).
Si Sanity no responde durante un build, el build falla y Vercel mantiene la versión anterior publicada.

## Puesta en marcha (una sola vez)

1. **Crear el proyecto** en [sanity.io/manage](https://www.sanity.io/manage) (plan gratuito). Dataset `production`, visibilidad **pública** (las publicaciones son contenido público; así no hace falta token).
2. **Variables de entorno**
   - Local: copia `.env.example` a `.env` y rellena `PUBLIC_SANITY_PROJECT_ID`.
   - Vercel: *Settings → Environment Variables* → `PUBLIC_SANITY_PROJECT_ID` y `PUBLIC_SANITY_DATASET=production` (Production y Preview).
3. **CORS** en Sanity (*API → CORS origins*), marcando *Allow credentials*:
   - `http://localhost:4321`
   - `https://laosapolar.es` (y `https://www.laosapolar.es` si se usa)
4. **Reconstrucción automática**
   - Vercel: *Settings → Git → Deploy Hooks* → crear uno para la rama `main` y copiar la URL.
   - Sanity: *API → Webhooks → Create webhook*
     - URL: la del Deploy Hook · Método: `POST` · Dataset: `production`
     - Trigger on: *Create*, *Update*, *Delete*
     - Filter: `_type == "publicacion"`
     - *Trigger on drafts*: desactivado (los borradores no reconstruyen la web)
5. **Dar acceso al cliente**: *Members → Invite* con rol **Editor**. Entrará en `/admin` con su cuenta de Google o email.
6. Haz push a `main` para desplegar con las variables nuevas.

## Guía para el cliente

1. Entra en **laosapolar.es/admin** e inicia sesión.
2. Elige la sección a la izquierda (por ejemplo *Formaciones*) y pulsa **+** (crear).
3. Rellena:
   - **Título** y pulsa **Generate** en *Dirección web*.
   - **Fecha**, **Resumen** (una o dos frases) e **Imagen principal**.
   - **Contenido**: escribe como en un procesador de textos. Con el botón **+** del editor puedes insertar imágenes.
   - Opciones: *Mostrar en el menú*, *Mostrar formulario «Escríbenos»*, *Edición anterior (archivo)*.
4. Pulsa **Publicar** (abajo a la derecha). En 1–2 minutos estará en la web.

Para editar o borrar una publicación, ábrela, cambia lo que quieras y vuelve a **Publicar**, o usa el menú **⋯ → Eliminar**.
Mientras no pulses *Publicar*, los cambios se guardan como borrador y no se ven en la web.

## Desarrollo

- `npm run dev` y abre `http://localhost:4321/admin`.
- `astro.config.mjs` incluye un pequeño plugin que corrige un fallo de `@sanity/astro` en Windows en modo dev; se puede quitar cuando lo arreglen.
- `npx sanity schema validate` comprueba el esquema (usa `PUBLIC_SANITY_PROJECT_ID` del entorno).
