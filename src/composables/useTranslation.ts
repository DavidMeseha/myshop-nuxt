import { useI18n } from "vue-i18n";
import type { Translation } from "~/types";

export default function useTranslation() {
  const { t } = useI18n();

  // Strongly typed translation function
  const typedT = <K extends keyof Translation>(key: K): string => {
    return t(key);
  };

  return typedT;
}
