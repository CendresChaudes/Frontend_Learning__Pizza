import { createRoute } from 'mobx-route';

type TRoutes = 'BASE' | 'INTRO' | 'NOT_FOUND';

export const CAppRouting: Record<TRoutes, ReturnType<typeof createRoute>> = {
  BASE: createRoute('/', {
    beforeOpen: () => ({ url: '/intro', replace: true }),
  }),
  INTRO: createRoute(`/intro`),
  NOT_FOUND: createRoute(`/not-found`),
} as const;
