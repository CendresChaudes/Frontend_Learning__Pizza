import { Linter } from 'eslint';
import playwright from 'eslint-plugin-playwright';
import globals from 'globals';

export const eslintTestsConfig: Linter.Config[] = [
  {
    files: ['**/__tests__/**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.vitest,
        ...globals.browser,
      },
    },
  },
  {
    files: ['e2e/**/*.test.ts'],
    ...playwright.configs['flat/recommended'],
  },
];
