import { RouteView, RouteViewGroup } from 'mobx-route/react';
import { lazy, Suspense } from 'react';
import { DefaultFallbackSkeleton, RootLayout } from '~app/ui';
import { IntegrationsPageSkeleton } from '~pages/Integrations';
import { IntroPage } from '~pages/Intro';
import { CAppRouting } from '~core/config';

const WithSuspense = (
  Component: React.ComponentType<unknown>,
  fallback: React.ReactNode,
): ReactJSX => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
);

const NotFoundErrorPage = lazy(() =>
  import('~pages/NotFoundError').then((module) => ({
    default: module.NotFoundErrorPage,
  })),
);

const IntegrationsPage = lazy(() =>
  import('~pages/Integrations').then((module) => ({
    default: module.IntegrationsPage,
  })),
);

function AppRouting(): ReactJSX {
  return (
    <RouteViewGroup
      layout={RootLayout}
      fallback={<DefaultFallbackSkeleton />}
      otherwise={CAppRouting.NOT_FOUND}
      suspense
    >
      <RouteView route={CAppRouting.BASE} />

      <RouteView
        route={CAppRouting.INTRO}
        view={IntroPage}
      />

      <RouteView route={CAppRouting.INTEGRATIONS}>
        {WithSuspense(IntegrationsPage, <IntegrationsPageSkeleton />)}
      </RouteView>

      <RouteView
        route={CAppRouting.NOT_FOUND}
        view={NotFoundErrorPage}
      />
    </RouteViewGroup>
  );
}

export { AppRouting };
