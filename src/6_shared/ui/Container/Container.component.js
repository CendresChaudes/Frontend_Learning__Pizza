import { jsx as _jsx } from 'react/jsx-runtime';
import styles from './Container.component.m.css';
function Container(properties) {
  const { children } = properties;
  return _jsx('div', { className: styles.root, children: children });
}
export { Container };
