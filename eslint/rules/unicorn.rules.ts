import { FlatConfig } from 'typescript-eslint';

export const unicornRules: FlatConfig.Rules = {
  'unicorn/filename-case': [
    'error',
    {
      cases: {
        camelCase: true,
        pascalCase: true,
      },
      ignore: [
        '__tests__',
        '1_app',
        '2_pages',
        '3_widgets',
        '4_features',
        '5_entities',
        '6_core',
        '7_shared',
        '8_global',
      ],
    },
  ],
  'unicorn/import-style': 'warn',
  'unicorn/no-array-callback-reference': 'off',
  'unicorn/no-null': 'off',
  'unicorn/prevent-abbreviations': 'warn',
  'unicorn/prefer-global-this': 'off',
} as const;
