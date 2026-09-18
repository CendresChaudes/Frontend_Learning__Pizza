import { Linter } from 'eslint';

/** Only files inside `domain/` — consumers may import from domain. */
export const domainNoRestrictedImportsConfig: Linter.Config = {
  files: ['src/**/domain/**/*.{ts,tsx}'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            regex: '^(?!\\./)',
            message:
              'Сегмент domain не должен импортировать ничего — только соседние файлы этого сегмента',
          },
        ],
      },
    ],
  },
};
