import type { PropsWithChildren } from 'react';
import { ProvidersComposer } from '~shared/lib';
import { ErrorBoundaryProvider } from './ErrorBoundary.provider';
import { MantineProvider } from './Mantine.provider';

type TProperties = Readonly<{
  children: PropsWithChildren['children'];
}>;

export function Providers(properties: TProperties): ReactJSX {
  const { children } = properties;

  return (
    <ProvidersComposer providers={[ErrorBoundaryProvider, MantineProvider]}>
      {children}
    </ProvidersComposer>
  );
}
