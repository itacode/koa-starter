import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig({
  files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
  ],
});
