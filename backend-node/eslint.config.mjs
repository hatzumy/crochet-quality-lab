import js from '@eslint/js';
import globals from 'globals';
import pluginSecurity from 'eslint-plugin-security';

export default [
  // 1. Archivos que NO queremos que ESLint toque (Equivalente al antiguo .eslintignore)
  {
    ignores: ['node_modules/', 'dist/', 'build/', '.snyk']
  },
  
  // 2. Configuración base
  js.configs.recommended,
  pluginSecurity.configs.recommended,
  
  {
    files: ['**/*.js', '**/*.mjs'], // Aplicar a todos los archivos JS
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
      
      // Calidad de código para QA
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-console': 'warn',
      'eqeqeq': ['error', 'always'],
      
      // Prevención de errores en MongoDB/Node
      'security/detect-object-injection': 'off', // Lo apagamos si usamos validación como Zod
      'no-var': 'error', // Prohibido usar 'var' en 2026, solo 'let' o 'const'
      'prefer-const': 'error', // Si la variable no cambia, debe ser const
    },
  },
];