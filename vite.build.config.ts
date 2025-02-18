import { type ConfigEnv, defineConfig, mergeConfig } from 'vite';
import { resolve } from 'node:path';

import viteConfig from './vite.config';

const version = process.env.npm_package_version;

export default defineConfig(({ isSsrBuild }: ConfigEnv) => {
  return mergeConfig(viteConfig, {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          worker: resolve(__dirname, 'src/worker.ts'),
          swregister: resolve(__dirname, 'src/swregister.ts'),
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
    define: {
      IS_SSR: isSsrBuild,
    },
    publicDir: 'public',
  });
});
