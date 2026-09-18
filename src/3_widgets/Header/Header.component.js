import { jsx as _jsx } from 'react/jsx-runtime';
import { CAppRouting } from '~core/config';
import styles from './Header.component.m.css';
function Header() {
  let title = 'Неизвестная страница';
  if (CAppRouting.INTRO.isOpened) {
    title = 'Авторизация';
  }
  return _jsx('div', { className: styles.root, children: title });
}
export { Header };
