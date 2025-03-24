<template>
  <header
    class="sticky top-0 z-40 hidden h-[60px] w-full items-center border-b bg-white md:flex"
  >
    <div
      class="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-6 pe-8 ps-4"
    >
      <NuxtLink
        class="flex items-center gap-2"
        :to="localePath('/')"
        aria-label="to Home Page"
      >
        <Icon class="text-3xl" name="mdi:shopping" />
        <span class="hidden text-2xl font-bold lg:inline">TechShop</span>
      </NuxtLink>

      <nav>
        <NavMenu />
      </nav>

      <div class="flex w-64 items-center justify-end gap-3">
        <button class="me-2 border-e pe-4 text-black" aria-label="Open Search">
          <Icon name="ri:search-line" size="24" />
        </button>

        <LanguageSwitcher />

        <NuxtLink
          class="rounded-sm bg-primary px-6 py-2 whitespace-nowrap text-center text-white"
          :to="localePath('/login')"
          v-if="!isRegistered"
        >
          {{ t("login") }}
        </NuxtLink>

        <div
          class="rounded-sm px-6 py-2 whitespace-nowrap text-center text-primary"
          v-if="isRegistered"
        >
          {{ userName ?? t("guest") }}
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import NavMenu from "./NavMenu.vue";
import { useUserStore } from "../../stores/useUserStore";

const { t } = useI18n();
const localePath = useLocalePath();
const store = useUserStore();

const userName = store.getUserName;
const isRegistered = store.isRegistered;
</script>
