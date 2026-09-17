import type { Config as PrettierConfig } from 'prettier';

export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  printWidth: 90,
  endOfLine: 'lf',
  bracketSameLine: false,
  singleAttributePerLine: true,
  overrides: [
    {
      files: ['**/*.css'],
      options: {
        singleQuote: false,
      },
    },
  ],
} satisfies PrettierConfig;
