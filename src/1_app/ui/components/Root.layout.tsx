import { observer } from 'mobx-react-lite';
import type { PropsWithChildren } from 'react';
import { Header } from '~widgets/Header';
import { CAppRouting } from '~core/config';
import styles from './Root.layout.module.css';

type TProperties = PropsWithChildren;

function RootLayoutContent(properties: TProperties): ReactJSX {
  const { children } = properties;

  let title = 'Страница не найдена';

  if (CAppRouting.INTRO.isOpened) {
    title = 'Главная страница';
  }

  return (
    <div className={styles.root}>
      <div className={styles.shell}>
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
