import eslint from '@eslint/js';
import { ESLint, Linter } from 'eslint';
import { importX } from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tsDocPlugin from 'eslint-plugin-tsdoc';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import { parser as tsEslintParser } from 'typescript-eslint';
import { importXRules } from '../rules/importX.rules';
import { noRestrictedSyntaxRule } from '../rules/noRestrictedSyntax.rule';
import { noUnusedVarsRule } from '../rules/noUnusedVars.rule';
import { unicornRules } from '../rules/unicorn.rules';

export const eslintTsConfig: Linter.Config = {
  files: ['**/*.{ts,tsx}'],
  ignores: ['**/node_modules/**', '**/dist/**'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.node,
      ...globals.browser,
    },
    parser: tsEslintParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    prettier: prettierPlugin,
    react: reactPlugin,
    'react-hooks': reactHooksPlugin as unknown as ESLint.Plugin,
    'react-refresh': reactRefreshPlugin,
    tsdoc: tsDocPlugin,
    importX,
    unicorn: unicornPlugin,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...eslint.configs.recommended.rules,
    ...importXRules,
    ...unicornRules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...noRestrictedSyntaxRule,
    ...noUnusedVarsRule,
    'prettier/prettier': 'error',
    'no-undef': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    'no-throw-literal': 'error',
    'preserve-caught-error': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/set-state-in-effect': 'off',
    'tsdoc/syntax': 'error',
    'tsdoc-escape-right-brace': 'off',
  },
};
