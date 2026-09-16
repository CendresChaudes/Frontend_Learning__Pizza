import { Linter } from 'eslint';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import { eslintBoundariesConfig } from './eslint/configs/boundaries/eslint.boundaries.config';
import { eslintJsConfig } from './eslint/configs/eslint.js.config';
import { eslintMdConfig } from './eslint/configs/eslint.md.config';
import { eslintTestsConfig } from './eslint/configs/eslint.tests.config';
import { eslintTsConfig } from './eslint/configs/eslint.ts.config';

const ignorePathsConfig: Linter.Config = {
  ignores: ['.cursor/**', '.helm/**', 'dist/**', 'generated/**', 'node_modules/**'],
};

const dtsConfig: Linter.Config = {
  files: ['**/*.d.ts'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};

export default tseslint.config(
  ignorePathsConfig,
  ...tseslint.configs.recommended,
  prettierConfig,
  eslintBoundariesConfig,
  eslintJsConfig,
  eslintTsConfig,
  dtsConfig,
  eslintMdConfig,
  ...eslintTestsConfig,
);
