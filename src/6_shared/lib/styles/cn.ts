import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Объединяет классы через `clsx` и разрешает конфликты Tailwind-утилит через `tailwind-merge`.
 * @param classes - список классов, условий или массивов.
 * @returns итоговая строка классов без конфликтующих утилит.
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}
