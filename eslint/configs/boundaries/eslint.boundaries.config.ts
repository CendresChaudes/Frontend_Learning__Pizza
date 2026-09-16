import boundariesPlugin, {
  type Config as BoundariesConfig,
  type Rules,
} from 'eslint-plugin-boundaries';
import { importX } from 'eslint-plugin-import-x';
import { elements } from './elements';
import { elementTypesRule } from './rules/elementType.rule';
import { entryPointRule } from './rules/entryPoint.rule';
import { noRestrictedImportsRule } from './rules/noRestrictedImports.rule';

const rules = {
  ...elementTypesRule,
  ...entryPointRule,
  ...noRestrictedImportsRule,
} satisfies Rules;

export const eslintBoundariesConfig: BoundariesConfig = {
  plugins: {
    boundaries: boundariesPlugin,
    'import-x': importX,
  },
  settings: {
    'boundaries/elements': elements,
    // @ts-expect-error: 'import/resolver' is not part of the typed boundaries settings
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules,
};
