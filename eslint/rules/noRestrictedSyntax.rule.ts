import { FlatConfig } from 'typescript-eslint';

export const noRestrictedSyntaxRule: FlatConfig.Rules = {
  'no-restricted-syntax': [
    'error',
    {
      selector:
        'MemberExpression[object.meta.name="import"][object.property.name="meta"][property.name="env"]',
      message:
        'Запрещен прямой импорт import.meta.env — используй ~core/config/CAppGeneral',
    },
    {
      selector: 'MemberExpression[object.name="process"][property.name="env"]',
      message: 'Запрещён доступ к process.env — используй /environment.ts',
    },
  ],
};
