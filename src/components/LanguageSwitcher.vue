<template>
  <Dropdown button-class="bg-transparent">
    <template #trigger>
      <span class="uppercase">{{ locale }}</span>
    </template>

    <template #default="{ close }">
      <button
        class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
        :class="{ 'bg-gray-50': locale === lang.code }"
        :key="lang.code"
        @click="switchLanguage(lang.code, close)"
        v-for="lang in locales"
      >
        {{ lang.name }}
      </button>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import type { Language } from "../types";
import Dropdown from "./common/Dropdown.vue";

const { locale, locales } = useI18n();
const switchPath = useSwitchLocalePath();
const router = useRouter();

const switchLanguage = async (lang: string, close: () => void) => {
  const path = switchPath(lang as Language);
  if (path) await router.push(path);
  close();
};

defineExpose({
  locale,
  locales,
  switchLanguage,
});
</script>
