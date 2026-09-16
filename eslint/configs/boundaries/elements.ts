import { LAYER_CAPTURES, LAYERS } from './constants';

export const elements = Object.values(LAYERS).map((type, index) => {
  const folder = `./src/${index + 1}_${type}`;

  if (Object.values(LAYERS).includes(type)) {
    return {
      type,
      pattern: `${folder}/*`,
      capture: [LAYER_CAPTURES[type]],
    };
  }

  return { type, pattern: folder };
});
