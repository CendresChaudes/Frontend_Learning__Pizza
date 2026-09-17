import type { PropsWithChildren } from 'react';
import { ProvidersComposer } from '~shared/lib';
import { ErrorBoundaryProvider } from './ErrorBoundary.provider';

const providers = [ErrorBoundaryProvider];

type TProperties = Readonly<{
  children: PropsWithChildren['children'];
}>;

export function Providers(properties: TProperties): ReactJSX {
  const { children } = properties;

  return <ProvidersComposer providers={providers}>{children}</ProvidersComposer>;
}
