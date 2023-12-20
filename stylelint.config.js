module.exports = {
  // extends: ['stylelint-config-standard', 'stylelint-config-styled-components'],
  extends: ['stylelint-config-standard'],
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
