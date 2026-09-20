import type { KeyboardEvent } from 'react';

export const preventInputEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};
