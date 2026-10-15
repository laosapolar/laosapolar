import { defineCliConfig } from 'sanity/cli';

// Para comandos como `npx sanity cors add` o `npx sanity dataset export`.
export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  },
});
