import { Button } from '@mantine/core';
import type { ComponentProps, PropsWithChildren } from 'react';
import styles from './PrimaryButton.module.css';

type TProperties = Pick<ComponentProps<'button'>, 'disabled'> & PropsWithChildren;

function PrimaryButton(properties: TProperties): ReactJSX {
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

export { PrimaryButton };
