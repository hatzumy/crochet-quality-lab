import js from '@eslint/js';
import globals from 'globals';
import pluginSecurity from 'eslint-plugin-security';

export default [
  {
    // Ignorar carpetas de todos los mini-proyectos
    ignores: ['node_modules/', '**/node_modules/', 'venv/', 'dist/', '.snyk']
  },
  js.configs.recommended,
  pluginSecurity.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'semi': ['error', 'always'],
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-console': 'warn',
      'eqeqeq': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'security/detect-object-injection': 'off',
    },
  },
];