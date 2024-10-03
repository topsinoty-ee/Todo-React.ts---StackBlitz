/**
 * Capitalizes the first letter of a given string.
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
