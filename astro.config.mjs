// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// @sanity/astro (solo en `astro dev`) genera en Windows alias que acaban en "\package.json"
// porque limpia la ruta con una barra "/". Se corrige aquí hasta que lo arreglen.
/** @type {import('vite').Plugin} */
const fixSanityAliasOnWindows = {
    name: 'fix-sanity-alias-windows',
    enforce: 'post',
    config(config) {
        const alias = config.resolve?.alias;
        if (!Array.isArray(alias)) return;
        for (const entry of alias) {
            if (typeof entry.replacement === 'string') entry.replacement = entry.replacement.replace(/[\\/]package\.json$/, '');
        }
    },
};

// https://astro.build/config
export default defineConfig({
    site: 'https://laosapolar.es',
    // El panel de edición (Sanity Studio) vive en /admin. Sin projectId la web se construye sin él.
    integrations: PUBLIC_SANITY_PROJECT_ID ? [
        sanity({
            projectId: PUBLIC_SANITY_PROJECT_ID,
            dataset: PUBLIC_SANITY_DATASET || 'production',
            useCdn: false,
            studioBasePath: '/admin',
        }),
        react(),
    ] : [],
    vite: { plugins: [fixSanityAliasOnWindows] },
});
