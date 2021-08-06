module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    'camelcase': 0
  },
  overrides: [
    {
      files: ['*.spec.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src', 'server'],
      },
      webpack: {
        config: 'webpack.common.js'
      }
    }
  }
};
