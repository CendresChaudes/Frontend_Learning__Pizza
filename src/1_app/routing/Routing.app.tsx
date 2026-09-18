import { RouteView, RouteViewGroup } from 'mobx-route/react';
import { lazy, Suspense } from 'react';
import { DefaultFallbackSkeleton } from '~app/ui';
import { AuthPageSkeleton } from '~pages/Auth';
import { CAppRouting } from '~core/config';

const WithSuspense = (
  Component: React.ComponentType<unknown>,
  fallback: React.ReactNode,
): ReactJSX => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
);

const AuthPage = lazy(() =>
  import('~pages/Auth').then((module) => ({
    default: module.AuthPage,
  })),
);

const NotFoundErrorPage = lazy(() =>
  import('~pages/NotFoundError').then((module) => ({
    default: module.NotFoundErrorPage,
  })),
);

function AppRouting(): ReactJSX {
  return (
    <RouteViewGroup
      fallback={<DefaultFallbackSkeleton />}
      otherwise={CAppRouting.NOT_FOUND}
      suspense
    >
      <RouteView route={CAppRouting.BASE} />

      <RouteView route={CAppRouting.AUTH}>
        {WithSuspense(AuthPage, <AuthPageSkeleton />)}
      </RouteView>

      <RouteView route={CAppRouting.NOT_FOUND}>
        {WithSuspense(NotFoundErrorPage, <>Загрузка...</>)}
      </RouteView>
    </RouteViewGroup>
  );
}

export { AppRouting };
