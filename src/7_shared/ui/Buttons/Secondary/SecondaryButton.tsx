import { Button } from '@mantine/core';
import type { ComponentProps, PropsWithChildren } from 'react';
import styles from './SecondaryButton.module.css';

type TProperties = Pick<ComponentProps<'button'>, 'disabled'> & PropsWithChildren;

function SecondaryButton(properties: TProperties): ReactJSX {
  const { disabled: isDisabled = false, ...props } = properties;

  return (
    <Button
      className={styles.root}
      disabled={isDisabled}
      {...props}
    >
      Click me
    </Button>
  );
}

export { SecondaryButton };
