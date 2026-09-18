import { RouteView, RouteViewGroup } from 'mobx-route/react';
import { lazy, Suspense } from 'react';
import { DefaultFallbackSkeleton, RootLayout } from '~app/ui';
import { IntroPageSkeleton } from '~pages/Intro';
import { CAppRouting } from '~core/config';

const WithSuspense = (
  Component: React.ComponentType<unknown>,
  fallback: React.ReactNode,
): ReactJSX => (
  <Suspense fallback={fallback}>
    <Component />
  </Suspense>
);

const IntroPage = lazy(() =>
  import('~pages/Intro').then((module) => ({
    default: module.IntroPage,
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
      layout={RootLayout}
      otherwise={CAppRouting.NOT_FOUND}
      suspense
    >
      <RouteView route={CAppRouting.BASE} />

      <RouteView route={CAppRouting.INTRO}>
        {WithSuspense(IntroPage, <IntroPageSkeleton />)}
      </RouteView>

      <RouteView route={CAppRouting.NOT_FOUND}>
        {WithSuspense(NotFoundErrorPage, <>Загрузка...</>)}
      </RouteView>
    </RouteViewGroup>
  );
}

export { AppRouting };
