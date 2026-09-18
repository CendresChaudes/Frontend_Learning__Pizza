import { CAppRouting } from '~core/config';
import styles from './Header.component.m.css';

function Header(): ReactJSX {
  let title = 'Неизвестная страница';

  if (CAppRouting.AUTH.isOpened) {
    title = 'Авторизация';
  }

  return <div className={styles.root}>{title}</div>;
}

export { Header };
