import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.m.css';

type TProperties = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

function Button(properties: TProperties): ReactJSX {
  const { children, type = 'button', disabled, ...rest } = properties;

  return (
    <button
      className={styles.root}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export { Button };
