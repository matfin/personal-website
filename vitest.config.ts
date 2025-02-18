import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest-setup.js'],
      globals: true,
      coverage: {
        exclude: [
          'global.d.ts',
          'vite.*.ts',
          'vitest.*.ts',
          '**/index.ts',
          'src/ssg/**',
          'dist/**',
          'scripts/**',
          'src/testutils/**',
          'src/entry.tsx',
          'src/swregister.ts',
          'src/worker.ts',
          'src/vite-env.d.ts',
          'src/app/services/state/store.ts',
        ],
        thresholds: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
        reportOnFailure: true,
      },
    },
  }),
);
