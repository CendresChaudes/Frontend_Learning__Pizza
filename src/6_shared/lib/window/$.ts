export const $ = <T extends Element>(selector: string): Nullable<T> =>
  document.querySelector<T>(selector);
