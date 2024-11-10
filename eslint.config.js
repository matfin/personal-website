import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';
import pluginJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReactAllConfig from 'eslint-plugin-react/configs/all.js';
import pluginReactRecommendedConfig from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
  allConfig: pluginJs.configs.all,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      react: pluginReactRecommendedConfig.plugins.react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
    // ...compat.extends(pluginJs.configs.recommended.rules),
    // ...compat.extends('eslint:recommended'),
    // extends: ['eslint:recommended'],
    // extends: [
    //   'eslint:recommended',
    //   pluginJs.configs.recommended,
    //   pluginReactAllConfig.extends,
    //   pluginReactRecommendedConfig.extends,
    //   'plugin:@typescript-eslint/recommended',
    // ],
  },
  {
    ignores: ['coverage/', 'dist/'],
  },
];
