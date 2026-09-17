import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';
import { Header } from '~widgets/Header';
import { CAppRouting } from '~core/config';

type TProperties = PropsWithChildren;

function RootLayoutContent(properties: TProperties): ReactJSX {
  const { children } = properties;

  let title = 'Страница не найдена';

  if (CAppRouting.INTRO.isOpened) {
    title = 'Главная страница';
  } else if (CAppRouting.INTEGRATIONS.isOpened) {
    title = 'Интеграции';
  }

  return (
    <div className="min-h-screen">
      <div className="grid h-screen grid-cols-[auto_1fr]">
        <div>
          <Header title={title} />

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

const RootLayout = observer(RootLayoutContent);

export { RootLayout };
