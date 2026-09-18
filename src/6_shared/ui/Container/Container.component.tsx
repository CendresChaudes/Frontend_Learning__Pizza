import type { PropsWithChildren } from 'react';
import styles from './Container.component.m.css';

type TProperties = PropsWithChildren;

function Container(properties: TProperties): ReactJSX {
  const { children } = properties;

  return <div className={styles.root}>{children}</div>;
}

export { Container };
