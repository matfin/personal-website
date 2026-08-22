import { defineConfig, mergeConfig } from 'vite';
import { resolve } from 'node:path';

import viteConfig from './vite.config.ts';

const version = process.env.npm_package_version;

export default defineConfig(() => {
  return mergeConfig(viteConfig, {
    build: {
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          worker: resolve(import.meta.dirname, 'src/worker.ts'),
          swregister: resolve(import.meta.dirname, 'src/swregister.ts'),
        },
        output: {
          entryFileNames: () => {
            return `[name]-${version}.js`;
          },
          assetFileNames: () => {
            return `[name]-${version}.css`;
          },
        },
      },
    },
    publicDir: 'public',
  });
});
