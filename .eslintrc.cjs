module.exports = {
  extends: [
    'eslint:all', 
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    indent: [ "error", 2 ],
    "object-curly-spacing": [ "error", "always" ],
    "quote-props": [ "error", "as-needed" ],
    "function-call-argument-newline": [ "error", "never" ],
    "function-paren-newline": [ "error", "consistent" ],
    "object-curly-newline": [ "error", {"multiline": true} ],
    "max-len": "off",
    'one-var': 'off',
  },
  root: true,
};
