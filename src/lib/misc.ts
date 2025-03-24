import type { IProductAttribute, Language } from "../types";

export const languages: Language[] = ["en", "ar", "fr"];

/**
 * Sets the default attributes by limiting the values to the first one.
 * @param {IProductAttribute[]} attributes - The array of product attributes.
 * @returns {IProductAttribute[]} The array of product attributes with selected values.
 */
export const selectDefaultAttributes = (
  attributes: IProductAttribute[]
): IProductAttribute[] => {
  return attributes.map((attr) => ({ ...attr, values: [attr.values[0]] }));
};

/**
 * Manipulates a description text by splitting it if it exceeds a certain length.
 * @param {string} text - The description text to manipulate.
 * @returns {[string, string]} An array containing the [first part(length: 170), the remaining of the text] respectively.
 */
export function manipulateDescription(text: string) {
  if (!text) return ["", ""];
  if (text.length < 170) return [text, ""];
  return [text.slice(0, 170), text.slice(170)];
}

/**
 * Replaces the language in the pathname with a new language.
 * @param {Language} newLang - The new language to set in the pathname.
 * @param {string} pathname - The original pathname to modify.
 * @returns {string} The modified pathname with the new language.
 */
export function replacePathnameLang(newLang: Language, pathname: string) {
  const pathnameLang = languages.find(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );
  if (pathnameLang) return pathname.replace(pathnameLang, newLang);
  else return `/${newLang + pathname}`;
}

/**
 * Retrieves the language from the pathname.
 * @param {string} pathname - The pathname to check for language.
 * @returns {Language | undefined} The language found in the pathname, or undefined if none.
 */
export function getPathnameLang(pathname: string) {
  return languages.find(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );
}
