module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
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
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'camelcase': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'] }],
    'import/extensions': [1, { 'extensions': ['.js', '.jsx',  '.ts', '.tsx', '.json']}],
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    'react/jsx-one-expression-per-line': 0
  },
  settings: {
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
