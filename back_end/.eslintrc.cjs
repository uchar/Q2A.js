module.exports = {
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  env: {
    'jest/globals': true,
  },
  plugins: ['prettier', 'jest'],
  parserOptions: {
    ecmaFeatures: {
      modules: true,
    },
  },
  rules: {
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-return-await': 'error',
    'no-throw-literal': 'error',
    'no-await-in-loop': 'error',
    'no-duplicate-imports': 'error',
    eqeqeq: ['error', 'smart'],
    'max-depth': ['error', 4],
    'prettier/prettier': 'error',
    'linebreak-style': 0,
    'jest/expect-expect': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    complexity: ['error', { max: 5 }],
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      excludedFiles: '*.test.js',
      rules: {
        'max-lines-per-function': ['error', 50],
      },
    },
    {
      files: ['*.js'],
      excludedFiles: '*.test.js',
      rules: {
        'max-lines-per-function': ['error', 300],
      },
    },
  ],
  globals: {
    fetch: false,
  },
};
