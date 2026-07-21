import { clsx } from 'clsx';

/**
 * Merge conditional class names. Thin wrapper so components don't import clsx directly
 * and so we have a single place to swap in tailwind-merge later if class conflicts appear.
 */
export function cn(...inputs) {
  return clsx(inputs);
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function truncate(text, max = 110) {
  if (!text || text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}
