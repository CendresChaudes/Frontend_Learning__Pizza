import { Linter } from 'eslint';
import markdownlintPlugin from 'eslint-plugin-markdownlint';
import markdownlintParser from 'eslint-plugin-markdownlint/parser';

export const eslintMdConfig: Linter.Config = {
  files: ['**/*.{md,mdx}'],
  plugins: {
    markdownlint: markdownlintPlugin,
  },
  languageOptions: {
    parser: markdownlintParser,
  },
  rules: {
    ...markdownlintPlugin.configs.recommended.rules,
    'markdownlint/md013': 'off',
    'markdownlint/md033': 'off',
    'markdownlint/md037': 'off',
    'markdownlint/md041': 'off',
  },
};
