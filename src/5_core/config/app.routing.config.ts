import { createRoute } from 'mobx-route';

type TRoutes = 'BASE' | 'AUTH' | 'NOT_FOUND';

export const CAppRouting: Record<TRoutes, ReturnType<typeof createRoute>> = {
  BASE: createRoute('/', {
    beforeOpen: () => ({ url: '/auth', replace: true }),
  }),
  AUTH: createRoute(`/auth`),
  NOT_FOUND: createRoute(`/not-found`),
} as const;
