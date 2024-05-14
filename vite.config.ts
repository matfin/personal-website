import { defineConfig } from 'vite';
import tsconfigpaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => {
  return {
    plugins: [tsconfigpaths(), react()],
    ssr: {
      noExternal: ['react-helmet-async', 'styled-components'],
    },
    define: {
      CANONICAL_URL: JSON.stringify(
        process.env.CANONICAL_URL ?? 'http://localhost:3000',
      ),
      CONTENT_BASE: JSON.stringify('./pages'),
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
