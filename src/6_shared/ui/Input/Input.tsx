import type { InputHTMLAttributes } from 'react';
import styles from './Input.m.css';

type TProperties = InputHTMLAttributes<HTMLInputElement>;

function Input(properties: TProperties): ReactJSX {
  const { disabled, ...rest } = properties;

  return (
    <input
      className={styles.root}
      disabled={disabled}
      {...rest}
    />
  );
}

export { Input };
