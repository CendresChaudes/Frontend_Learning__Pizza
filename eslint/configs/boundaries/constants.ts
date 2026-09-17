export const LAYERS = {
  APP: 'app',
  PAGES: 'pages',
  WIDGETS: 'widgets',
  MODULES: 'modules',
  CORE: 'core',
  SHARED: 'shared',
  GLOBAL: 'global',
} as const;

const SEGMENT = 'segment';

export const LAYER_CAPTURES = {
  [LAYERS.APP]: SEGMENT,
  [LAYERS.PAGES]: 'page',
  [LAYERS.WIDGETS]: 'widget',
  [LAYERS.MODULES]: 'module',
  [LAYERS.CORE]: SEGMENT,
  [LAYERS.SHARED]: SEGMENT,
  [LAYERS.GLOBAL]: SEGMENT,
} as const;
