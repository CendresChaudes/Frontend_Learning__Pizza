import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';
import { Header } from '~widgets/Header';
import { SideNavigationMenu, type TNavigationItem } from '~widgets/SideNavigationMenu';
import { CAppRouting } from '~core/config';
import HomeIcon from './assets/home.icon.svg';
import MonitoringIcon from './assets/monitoring.icon.svg';

const itemIconClassName = 'flex size-8 items-center justify-center';

const items: TNavigationItem[] = [
  {
    label: 'Главная страница',
    icon: <HomeIcon className={itemIconClassName} />,
    route: CAppRouting.INTRO,
  },
  {
    label: 'Интеграции',
    icon: <MonitoringIcon className={itemIconClassName} />,
    route: CAppRouting.INTEGRATIONS,
  },
];

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
        <SideNavigationMenu items={items} />

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
