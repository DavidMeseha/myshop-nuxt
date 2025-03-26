import { useI18n } from "vue-i18n";
import type { Translation } from "~/types";

export function useTranslation() {
  const { t } = useI18n();

  // Strongly typed `t` function
  const typedT = <K extends keyof Translation>(key: K): string => {
    return t(key);
  };

  return { t: typedT };
}
