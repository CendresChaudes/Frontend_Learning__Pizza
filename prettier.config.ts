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
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: 'src/1_app/ui/styles/global/vendor/tailwind.global.css',
  tailwindFunctions: ['cn', 'cva'],
  overrides: [
    {
      files: ['**/*.css'],
      options: {
        singleQuote: false,
      },
    },
  ],
} satisfies PrettierConfig;
