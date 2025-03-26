<template>
  <ul class="flex items-center gap-8 font-semibold text-md">
    <li :key="item.path" v-for="item in navItems">
      <NuxtLink
        class="hover:text-primary"
        :class="{ 'text-primary': isCurrentPath(item.to) }"
        :to="localPath(item.to)"
      >
        {{ $t(item.name) }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const localPath = useLocalePath();

const navItems = [
  {
    name: "home",
    to: "/",
  },
  {
    name: "feeds",
    to: "/feeds",
  },
  {
    name: "profile",
    to: `/user/me`,
  },
  {
    name: "cart",
    to: `/cart`,
  },
];

const isCurrentPath = (path) => {
  const localizedPath = localPath(path);
  if (localizedPath === "/") {
    return route.path === localizedPath;
  }
  return route.path.startsWith(localizedPath);
};
</script>
