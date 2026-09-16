import { Button } from '@mantine/core';
import type { ComponentProps, PropsWithChildren } from 'react';
import styles from './TertiaryButton.module.css';

type TProperties = Pick<ComponentProps<'button'>, 'disabled'> & PropsWithChildren;

function TertiaryButton(properties: TProperties): ReactJSX {
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

export { TertiaryButton };
