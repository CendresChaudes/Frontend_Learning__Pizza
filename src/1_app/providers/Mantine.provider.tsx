import { createTheme, MantineProvider as MantineProviderFromLib } from '@mantine/core';
import type { PropsWithChildren } from 'react';

const theme = createTheme({
  autoContrast: false,
  fontFamily: 'Grtsk Peta, sans-serif',
});

type TProperties = PropsWithChildren;

function MantineProvider(properties: TProperties): ReactJSX {
  const { children } = properties;

  return <MantineProviderFromLib theme={theme}>{children}</MantineProviderFromLib>;
}

export { MantineProvider };
