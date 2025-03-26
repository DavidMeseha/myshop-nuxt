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

        <Skeletor
          height="40"
          width="120"
          class="rounded-sm"
          v-if="!user"
          as="div"
        />

        <NuxtLink
          class="rounded-sm bg-primary px-6 py-2 whitespace-nowrap text-center text-white"
          :to="localePath('/login')"
          v-if="user && !user.isRegistered"
        >
          {{ t("login") }}
        </NuxtLink>

        <div v-if="user && user.isRegistered">
          <HeaderUserAvatar />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import NavMenu from "./NavMenu.vue";
import { useUserStore } from "~/stores/useUserStore";
import { storeToRefs } from "pinia";
import { useTranslation } from "../../composables/useTranslation";
import { Skeletor } from "vue-skeletor";
import LanguageSwitcher from "../LanguageSwitcher.vue";

const { t } = useTranslation();
const localePath = useLocalePath();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
