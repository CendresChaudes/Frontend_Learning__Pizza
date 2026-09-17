import { createRoute } from 'mobx-route';

type TRoutes = 'BASE' | 'INTRO' | 'INTEGRATIONS' | 'NOT_FOUND';

export const CAppRouting: Record<TRoutes, ReturnType<typeof createRoute>> = {
  BASE: createRoute('/', {
    beforeOpen: () => ({ url: '/intro', replace: true }),
  }),
  INTRO: createRoute(`/intro`),
  INTEGRATIONS: createRoute(`/integrations`),
  NOT_FOUND: createRoute(`/not-found`),
} as const;
