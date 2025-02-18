import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import tsconfigpaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => {
  const version = process.env.npm_package_version;

  return {
    plugins: [tsconfigpaths(), react()],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          worker: resolve(__dirname, 'src/worker.ts'),
          swregister: resolve(__dirname, 'src/swregister.ts'),
        },
        output: {
          entryFileNames: (entry) => {
            if (['main', 'swregister'].includes(entry.name)) {
              return `[name]-${version}.js`;
            }

            return '[name].js';
          },
          assetFileNames: (asset) => {
            if (asset.name?.endsWith('.css')) {
              return `[name]-${version}[extname]`;
            }

            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    define: {
      CANONICAL_URL: JSON.stringify(
        process.env.CANONICAL_URL ?? 'http://localhost:3000',
      ),
      CONTENT_BASE: JSON.stringify('./pages'),
      PWA_CACHE_NAME: JSON.stringify(
        `${process.env.npm_package_name}:${process.env.npm_package_version}`,
      ),
      ASSET_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    publicDir: isSsrBuild ? false : 'public',
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest-setup.js'],
      globals: true,
      coverage: {
        exclude: [
          'src/ssg/prerender.ts',
          'stylelint.config.js',
          'src/ssg',
          'src/swregister.ts',
          'src/worker.ts',
          'src/entry-client.tsx',
          'src/ssg/entry-static.tsx',
          'src/app/services/state/store.ts',
          'src/testutils/index.tsx',
          '**/index.ts',
          '/dist/**',
        ],
        thresholds: 100,
        reportOnFailure: true,
      },
    },
  };
});
