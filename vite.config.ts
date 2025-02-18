import { defineConfig } from 'vite';
import tsconfigpaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [tsconfigpaths(), react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly' as const,
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
    IS_SSR: false,
  },
});
