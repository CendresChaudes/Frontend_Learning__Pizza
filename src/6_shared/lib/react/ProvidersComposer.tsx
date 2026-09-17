import type { ComponentType, ReactNode } from 'react';

type TProvider = ComponentType<{ children: ReactNode }>;

type TProperties = {
  providers: ReadonlyArray<TProvider>;
  children: ReactNode;
};

export function ProvidersComposer(properties: TProperties): ReactNode {
  const { providers, children } = properties;

  return providers.reduceRight<ReactNode>(
    (node, Provider) => <Provider>{node}</Provider>,
    children,
  );
}
