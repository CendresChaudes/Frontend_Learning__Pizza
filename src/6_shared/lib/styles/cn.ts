import { clsx, type ClassValue } from 'clsx';

/**
 * Merges class names via `clsx`.
 * @param classes - class names, conditions, or arrays thereof.
 * @returns the resulting class name string.
 */
export function cn(...classes: ClassValue[]): string {
  return clsx(classes);
}
