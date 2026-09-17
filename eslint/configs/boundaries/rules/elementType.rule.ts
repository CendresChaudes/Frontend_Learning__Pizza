import { type Rules } from 'eslint-plugin-boundaries';
import { LAYER_CAPTURES, LAYERS } from '../constants';

const SLICE_LAYERS = [LAYERS.PAGES, LAYERS.WIDGETS, LAYERS.MODULES] as const;

const crossSlicePolicies = SLICE_LAYERS.map((layer) => ({
  from: layer,
  disallow: [layer],
  message: `Запрещён кросс-импорт между ${layer}: "{{from.element.captured.slice}}" <- "{{to.element.captured.slice}}"`,
}));

const getCrossSlicePolicyError = (layer: Values<typeof LAYERS>): string =>
  `Запрещён кросс-импорт между ${layer}: "{{from.element.captured.slice}}" <- "{{to.element.captured.slice}}"`;

export const elementTypesRule = {
  'boundaries/element-types': [
    'error',
    {
      default: 'allow',
      message:
        'Запрещенный импорт "${file.type}" <- "${dependency.type}". Верный флоу: global -> shared -> core -> entities -> features -> widgets -> pages -> app',
      rules: [
        ...crossSlicePolicies,
        {
          from: LAYERS.GLOBAL,
          disallow: [
            LAYERS.SHARED,
            LAYERS.CORE,
            LAYERS.MODULES,
            LAYERS.WIDGETS,
            LAYERS.PAGES,
            LAYERS.APP,
          ],
        },
        {
          from: LAYERS.SHARED,
          disallow: [
            LAYERS.CORE,
            LAYERS.MODULES,
            LAYERS.WIDGETS,
            LAYERS.PAGES,
            LAYERS.APP,
          ],
        },
        {
          from: LAYERS.CORE,
          disallow: [LAYERS.MODULES, LAYERS.WIDGETS, LAYERS.PAGES, LAYERS.APP],
        },
        { from: LAYERS.MODULES, disallow: [LAYERS.WIDGETS, LAYERS.PAGES, LAYERS.APP] },
        {
          from: LAYERS.MODULES,
          message: getCrossSlicePolicyError(LAYERS.MODULES),
          disallow: [
            [
              LAYERS.MODULES,
              {
                entity: `!${LAYER_CAPTURES[LAYERS.MODULES]}`,
              },
            ],
          ],
        },
        { from: LAYERS.WIDGETS, disallow: [LAYERS.PAGES, LAYERS.APP] },
        {
          from: LAYERS.WIDGETS,
          message: getCrossSlicePolicyError(LAYERS.WIDGETS),
          disallow: [
            [
              LAYERS.WIDGETS,
              {
                entity: `!${LAYER_CAPTURES[LAYERS.WIDGETS]}`,
              },
            ],
          ],
        },
        { from: LAYERS.PAGES, disallow: [LAYERS.APP] },
        {
          from: LAYERS.PAGES,
          message: getCrossSlicePolicyError(LAYERS.PAGES),
          disallow: [
            [
              LAYERS.PAGES,
              {
                entity: `!${LAYER_CAPTURES[LAYERS.PAGES]}`,
              },
            ],
          ],
        },
        { from: LAYERS.APP, disallow: [] },
      ],
    },
  ],
} satisfies Rules;
