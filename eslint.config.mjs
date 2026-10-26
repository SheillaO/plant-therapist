import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: { 'prefer-const': 'error' },
  },
  {
    files: ['src/**/*.js', 'drizzle.config.js'],
    languageOptions: { globals: globals.node, sourceType: 'commonjs' },
  },
  {
    files: ['public/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
]);
