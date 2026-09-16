import { Button } from '@mantine/core';
import type { ComponentProps, PropsWithChildren } from 'react';
import styles from './DangerousButton.module.css';

type TProperties = Pick<ComponentProps<'button'>, 'disabled'> & PropsWithChildren;

function DangerousButton(properties: TProperties): ReactJSX {
  const { disabled: isDisabled = false, ...props } = properties;

  return (
    <Button
      className={styles.root}
      color="blue"
      variant="filled"
      disabled={isDisabled}
      {...props}
    >
      Click me
    </Button>
  );
}

export { DangerousButton };
