module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true,
    jest: true,
  },
  'extends': [
    'eslint:recommended',
  ],
  parserOptions: {
    'ecmaVersion': 8,
  },
  rules: {
    'no-console': 'warn',
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
  },
};
