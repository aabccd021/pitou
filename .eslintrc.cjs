module.exports = {
  extends: [
    'eslint:all', 
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'only-warn'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    indent: 'off',
    'object-curly-spacing': [ 'error', 'always' ],
    'quote-props': [ 'error', 'as-needed' ],
    'function-call-argument-newline': [ 'error', 'never' ],
    'function-paren-newline': [ 'error', 'consistent' ],
    'object-curly-newline': [ 'error', { 'minProperties': 1 } ],
    'max-len': 'off',
    'max-lines': 'off',
    'one-var': 'off',
    'sort-keys': 'off',
    'no-undefined': 'off',
    'array-bracket-newline': [ 'error', {'multiline': true, 'minItems': 1}],
    'capitalized-comments': 'off',
    'line-comment-position': 'off',
    'no-inline-comments': 'off',
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    'quotes': 'off',
    'sort-imports': 'off',
    '@typescript-eslint/block-spacing': 'error',
    '@typescript-eslint/brace-style': 'error',
    '@typescript-eslint/comma-dangle': 'error',
    '@typescript-eslint/comma-spacing': 'error',
    '@typescript-eslint/default-param-last': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/func-call-spacing': 'error',
    '@typescript-eslint/indent': [ 'error', 2 ],
    '@typescript-eslint/init-declarations': 'error',
    '@typescript-eslint/key-spacing': 'error',
    '@typescript-eslint/keyword-spacing': 'error',
    '@typescript-eslint/lines-around-comment': 'error',
    '@typescript-eslint/lines-between-class-members': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-extra-parens': 'error',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-magic-numbers': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-restricted-imports': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/object-curly-spacing': 'error',
    '@typescript-eslint/padding-line-between-statements': 'error',
    '@typescript-eslint/quotes': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/space-before-blocks': 'error',
    '@typescript-eslint/space-before-function-paren': 'error',
    '@typescript-eslint/space-infix-ops': 'error'
  },
  root: true,
};
