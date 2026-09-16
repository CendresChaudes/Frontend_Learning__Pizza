import { lazy, type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const FatalErrorPage = lazy(() =>
  import('~pages/FatalError').then((module) => ({ default: module.FatalErrorPage })),
);

type TProperties = Readonly<{
  children: PropsWithChildren['children'];
}>;

export function ErrorBoundaryProvider(properties: TProperties): ReactJSX {
  const { children } = properties;

  return <ErrorBoundary fallback={<FatalErrorPage />}>{children}</ErrorBoundary>;
}
