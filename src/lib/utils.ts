import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes.
 *
 * This function uses `clsx` to conditionally combine class names and `twMerge`
 * to ensure that Tailwind CSS classes are merged correctly, allowing for the
 * elimination of conflicting classes.
 *
 * @param {...string[]} classNames - The array of product attributes.
 * @returns {string} a string of classNames after merging process.
 */
export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}
