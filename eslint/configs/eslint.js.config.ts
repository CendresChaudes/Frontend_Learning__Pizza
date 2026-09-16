import { configs as eslintConfigs } from '@eslint/js';
import { Linter } from 'eslint';
import { importX } from 'eslint-plugin-import-x';
import * as prettierPlugin from 'eslint-plugin-prettier';
import unicornPlugin from 'eslint-plugin-unicorn';
import * as globals from 'globals';
import { importXRules } from '../rules/importX.rules';
import { unicornRules } from '../rules/unicorn.rules';

export const eslintJsConfig: Linter.Config = {
  files: ['**/*.{js,mjs,cjs}'],
  ignores: ['node_modules/**', 'dist/**'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: globals.browser,
  },
  plugins: {
    prettier: prettierPlugin,
    importX,
    unicorn: unicornPlugin,
  },
  rules: {
    ...eslintConfigs.recommended.rules,
    ...importXRules,
    ...unicornRules,
    'prettier/prettier': 'error',
  },
};
