import { Rules } from 'eslint-plugin-boundaries';
import { LAYER_CAPTURES, LAYERS } from '../constants';

const SLICE_LAYERS = [
  LAYERS.PAGES,
  LAYERS.WIDGETS,
  LAYERS.FEATURES,
  LAYERS.ENTITIES,
] as const;

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
            LAYERS.ENTITIES,
            LAYERS.FEATURES,
            LAYERS.WIDGETS,
            LAYERS.PAGES,
            LAYERS.APP,
          ],
        },
        {
          from: LAYERS.SHARED,
          disallow: [
            LAYERS.CORE,
            LAYERS.ENTITIES,
            LAYERS.FEATURES,
            LAYERS.WIDGETS,
            LAYERS.PAGES,
            LAYERS.APP,
          ],
        },
        {
          from: LAYERS.CORE,
          disallow: [
            LAYERS.ENTITIES,
            LAYERS.FEATURES,
            LAYERS.WIDGETS,
            LAYERS.PAGES,
            LAYERS.APP,
          ],
        },
        {
          from: LAYERS.ENTITIES,
          disallow: [LAYERS.FEATURES, LAYERS.WIDGETS, LAYERS.PAGES, LAYERS.APP],
        },
        {
          from: LAYERS.ENTITIES,
          message: getCrossSlicePolicyError(LAYERS.ENTITIES),
          disallow: [
            LAYERS.ENTITIES,
            {
              entity: `!${LAYER_CAPTURES[LAYERS.ENTITIES]}`,
            },
          ],
        },
        { from: LAYERS.FEATURES, disallow: [LAYERS.WIDGETS, LAYERS.PAGES, LAYERS.APP] },
        {
          from: LAYERS.FEATURES,
          message: getCrossSlicePolicyError(LAYERS.FEATURES),
          disallow: [
            [
              LAYERS.FEATURES,
              {
                entity: `!${LAYER_CAPTURES[LAYERS.FEATURES]}`,
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
