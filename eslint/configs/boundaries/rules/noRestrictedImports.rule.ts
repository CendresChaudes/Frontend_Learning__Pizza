import { Rules } from 'eslint-plugin-boundaries';

export const noRestrictedImportsRule = {
  // @ts-expect-error: custom rule definition is not covered by the Rules type
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          regex: '(^|/)domain/',
          message: 'Сегмент domain не должен импортировать ничего',
        },
      ],
    },
  ],
} satisfies Rules;
