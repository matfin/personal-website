import { defineConfig, mergeConfig } from 'vite';
import { resolve } from 'node:path';

import viteConfig from './vite.config';

export default defineConfig(() => {
  return mergeConfig(viteConfig, {
    build: {
      rollupOptions: {
        input: {
          prerender: resolve(__dirname, 'src/ssg/prerender.ts'),
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
