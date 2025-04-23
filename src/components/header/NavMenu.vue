<template>
  <ul class="flex items-center gap-8 font-semibold text-md">
    <li :key="item.path" v-for="item in navItems">
      <NuxtLink
        class="hover:text-primary"
        :class="{ 'text-primary': isCurrentPath(item.to) }"
        :to="localPath(item.to)"
      >
        {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/useUserStore";
import { storeToRefs } from "pinia";

const t = useTranslation();
const userStore = useUserStore();
const { cartItems } = storeToRefs(userStore);

const route = useRoute();
const localPath = useLocalePath();

const navItems = computed(() => [
  {
    name: t("home"),
    to: "/",
  },
  // {
  //   name: t("feeds"),
  //   to: "/feeds",
  // },
  {
    name: t("profile"),
    to: `/user/me`,
  },
  {
    name: `${t(`cart`)}  (${cartItems.value.length})`,
    to: `/cart`,
  },
]);

const isCurrentPath = (path) => {
  const localizedPath = localPath(path);
  if (localizedPath === "/") {
    return route.path === localizedPath;
  }
  return route.path.startsWith(localizedPath);
};
</script>
