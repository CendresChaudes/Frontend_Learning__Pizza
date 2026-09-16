import { FlatConfig } from 'typescript-eslint';

export const importXRules: FlatConfig.Rules = {
  'import-x/no-duplicates': 'error',
  'import-x/order': [
    'error',
    {
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      'newlines-between': 'never',
      pathGroupsExcludedImportTypes: ['builtin'],
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      pathGroups: [
        {
          pattern: '~generated/**',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '~msw/**',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '~app/**',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '~pages/**',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '~widgets/**',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '~features/**',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '~entities/**',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '~core/**',
          group: 'internal',
          position: 'before',
        },
        {
          pattern: '~shared/**',
          group: 'internal',
          position: 'before',
        },
      ],
    },
  ],
} as const;
