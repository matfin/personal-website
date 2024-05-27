import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsconfigpaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => {
  return {
    plugins: [tsconfigpaths(), react()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          worker: resolve(__dirname, 'src/worker.ts'),
          swregister: resolve(__dirname, 'src/swregister.ts'),
        },
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
    ssr: {
      noExternal: ['react-helmet-async', 'styled-components'],
    },
    define: {
      CANONICAL_URL: JSON.stringify(
        process.env.CANONICAL_URL ?? 'http://localhost:3000',
      ),
      CONTENT_BASE: JSON.stringify('./pages'),
      PWA_CACHE_NAME: JSON.stringify(
        `${process.env.npm_package_name}:${process.env.npm_package_version}`,
      ),
    },
    publicDir: isSsrBuild ? false : 'public',
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest-setup.js'],
      globals: true,
      coverage: {
        exclude: [
          'prerender.ts',
          '.eslintrc.cjs',
          'stylelint.config.js',
          'dev-dist',
          'src/ssg',
          'src/entry-client.tsx',
          'src/entry-static.tsx',
          'src/app/services/state/store.ts',
          'src/testutils/index.tsx',
          '**/index.ts',
          '**/*.css.tsx',
        ],
        thresholds: 100,
        reportOnFailure: true,
      },
    },
  };
});
