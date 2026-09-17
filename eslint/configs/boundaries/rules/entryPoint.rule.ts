import { type Rules } from 'eslint-plugin-boundaries';
import { LAYERS } from '../constants';

export const entryPointRule = {
  'boundaries/entry-point': [
    2,
    {
      default: 'disallow',
      rules: [
        {
          target: [
            LAYERS.SHARED,
            LAYERS.CORE,
            LAYERS.MODULES,
            LAYERS.WIDGETS,
            LAYERS.PAGES,
            LAYERS.APP,
          ],
          allow: ['index.(ts|tsx)'],
        },
      ],
    },
  ],
} satisfies Rules;
