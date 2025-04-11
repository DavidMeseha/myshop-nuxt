import { useI18n } from "vue-i18n";
import type { Translation } from "~/types";

/**
 * A composable that provides strongly typed translations using vue-i18n
 *
 * @example
 * ```ts
 * const t = useTranslation();
 * const message = t('common.hello'); // Will only accept keys that exist in Translation type
 * ```
 *
 * @returns A typed translation function that ensures type safety for translation keys
 * @throws Will throw a type error if the key doesn't exist in the Translation type
 */
export default function useTranslation() {
  const { t } = useI18n();

  /**
   * Translates a given key to the current locale's corresponding string
   *
   * @template K - The key type extending keyof Translation
   * @param {K} key - The translation key to lookup
   * @returns {string} The translated string for the current locale
   */
  const typedT = <K extends keyof Translation>(key: K): string => t(key);

  return typedT;
}
