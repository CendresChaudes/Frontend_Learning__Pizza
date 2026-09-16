import { Providers } from '~app/providers';
import { AppRouting } from '~app/routing';

function AppEntry(): ReactJSX {
  return (
    <Providers>
      <AppRouting />
    </Providers>
  );
}

export { AppEntry };
