const EFormat = {
  Webp: {
    CLASS: 'webp',
    IMAGE: 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA', // prettier-ignore
  },
  Avif: {
    CLASS: 'avif',
    IMAGE: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUEAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAF0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgS0AAAAAABNjb2xybmNseAACAAIAAIAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAGVtZGF0EgAKBzgAPtAgIAkyUBAAAPWc41TP///4gHBX9H8XVK7gGeDllq8TYARA+8Tfsv7L+zPE24eIoIzE0WhHbrqcrTK9VEgEG/hwgB5rdCbvP8g3KYPdV88CvPJnptgQ', // prettier-ignore
  },
} as const;

const isBrowserSupportAlreadyTested = (format: string): Nullable<boolean> => {
  if (window.sessionStorage) {
    const test = window.sessionStorage.getItem(`${format}Support`);

    if (test === 'false' || test === 'true') {
      return test === 'true';
    }
  }

  return null;
};

const addClass = (format: string, support: boolean): void => {
  if (support) {
    const root = document.documentElement;

    if (root.classList) {
      root.classList.add(format === 'webp' ? EFormat.Webp.CLASS : EFormat.Avif.CLASS);
    } else {
      root.className += ` ${format}` === 'webp' ? EFormat.Webp.CLASS : EFormat.Avif.CLASS;
    }

    window.sessionStorage.setItem(`${format}Support`, 'true');
  } else {
    window.sessionStorage.setItem(`${format}Support`, 'false');
  }
};

const testBrowserSupport = (
  format: string,
  imageSource: string,
  callback: typeof addClass,
): void => {
  const isTested = isBrowserSupportAlreadyTested(format);

  if (isTested === null) {
    const image = new Image();

    image.addEventListener(
      'load',
      // eslint-disable-next-line unicorn/prefer-add-event-listener
      (image.onerror = function (): void {
        callback(format, image.height === 2);
      }),
    );

    image.src = imageSource;

    return;
  }

  addClass(format, isTested);
};

export const isAvifWebpBrowserSupport = (): void => {
  testBrowserSupport('webp', EFormat.Webp.IMAGE, addClass);
  testBrowserSupport('avif', EFormat.Avif.IMAGE, addClass);
};
