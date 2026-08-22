import { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vite';

import viteConfig from './vite.config.ts';

export default defineConfig(() => {
  return mergeConfig(viteConfig, {
    build: {
      rollupOptions: {
        input: {
          prerender: resolve(import.meta.dirname, 'src/ssg/prerender.ts'),
        },
        output: {
          entryFileNames: () => {
            return '[name].js';
          },
        },
      },
    },
    publicDir: false,
  });
});
