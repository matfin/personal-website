module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
  ],
  overrides: [
    {
      files: ['**/*.css.tsx'],
      customSyntax: '@stylelint/postcss-css-in-js',
      rules: {
        'function-no-unknown': null,
      },
    },
  ],
};
