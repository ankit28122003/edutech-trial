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


export function getEnrolledCount(course) {
  // Deterministic pseudo enrollment number derived from review count, so cards look
  // realistic without needing a real "enrolledCount" field until the backend adds one.
  return Math.round((course.reviewCount || 100) * 11.4 + 500);
}


export function getNextScheduleDate(course) {
  // Deterministic pseudo "next cohort" date derived from the course id, so it stays
  // stable across re-renders instead of changing randomly on every load.
  const seed = course.id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const daysAhead = 5 + (seed % 21); // lands 5-25 days from today
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}