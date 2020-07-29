/*
 *       prevent duplicate code in the same file
 * MANUAL CHECK  prevent typo (US and AU supported Dictionary)
 * MANUAL CHECK  prevent incorrect use of Array.map instead of Array.forEach
 * MANUAL CHECK  prevent committing commented code
 * MANUAL CHECK  prevent crazy long field nullity check
 * MANUAL CHECK  prevent more than 4 checks in each if
 * MANUAL CHECK  prevent use of XMLHttpRequest
 * MANUAL CHECK  prevent then() in async method (await should be used)
 * MANUAL CHECK  prevent usage of literal numbers without assigning them into a named variable.
 * MANUAL CHECK  prevent writing regex without storing them in const named variables
 * MANUAL CHECK  prevent naming callback methods starting with "on"
 * MANUAL CHECK  prevent setting variable on "this" without defining them as private fields  in classes
 * */
module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    // "no-empty": "error", enabled by "extends": "eslint:recommended"
    // "no-unused-vars": "error", enabled by "extends": "eslint:recommended"
    // "no-invalid-regexp": "error", enabled by "extends": "eslint:recommended"
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-return-await': 'error',
    'no-throw-literal': 'error',
    'no-await-in-loop': 'error',
    'no-duplicate-imports': 'error',
    eqeqeq: ['error', 'smart'],
    'max-lines-per-function': ['error', 40],
    'max-depth': ['error', 4],
    'max-lines': ['error', 300],
    'react/no-deprecated': 'error',
    'react/prop-types': 'off',
    'linebreak-style': 0,
    'prettier/prettier': 'error',
    complexity: ['error', { max: 5 }],
  },
  globals: {
    fetch: false,
    localStorage: true,
    document: true,
    window: true,
    process: true,
  },
};
