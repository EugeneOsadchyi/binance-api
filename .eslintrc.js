/* eslint-disable @typescript-eslint/no-unused-vars */

const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  'env': {
    'es2022': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'array-bracket-spacing': [ERROR, 'never'],
    'comma-dangle': [ERROR, 'always-multiline'],
    'indent': [ERROR, 2, { 'ArrayExpression': 1, 'ImportDeclaration': 1, 'SwitchCase': 1 }],
    'linebreak-style': [ERROR, 'unix'],
    'no-empty': [ERROR, { 'allowEmptyCatch': true }],
    'no-trailing-spaces': ERROR,
    'object-curly-newline': [WARN, { 'consistent': true, 'multiline': true, 'minProperties': 4 }],
    'object-curly-spacing': [ERROR, 'always'],
    'object-property-newline': [ERROR, { 'allowAllPropertiesOnSameLine': true }],
    'quotes': [ERROR, 'single'],
    '@typescript-eslint/semi': [ERROR, 'always'],
    '@typescript-eslint/no-unused-vars': [WARN, { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
    '@typescript-eslint/no-explicit-any': [WARN, { 'ignoreRestArgs': true }],
  },
};
