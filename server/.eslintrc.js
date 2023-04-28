module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ['google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'require-jsdoc': 'off',
    'max-len': ['error', { code: 120 }],
    'new-cap': 'off',
    'object-curly-spacing': 'off',
    indent: 'off',
    'valid-jsdoc': 'off',
    'operator-linebreak': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts'],
    },
  ],
};
