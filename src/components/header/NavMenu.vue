<template>
  <ul class="flex items-center gap-8 font-semibold text-md">
    <li :key="item.path" v-for="item in navItems">
      <NuxtLink class="hover:text-primary" :class="{ 'text-primary': isCurrentPath(item.to) }" :to="item.to">
        {{ $t(item.name) }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const navItems = [
  {
    name: "home",
    to: "/"
  },
  {
    name: "feeds",
    to: "/feeds"
  },
  {
    name: "profile",
    to: `/user/me`
  },
  {
    name: "cart",
    to: `/cart`
  }
];

const isCurrentPath = (path) => {
  if (path === "/") {
    return route.path === path;
  }
  return route.path.startsWith(path);
};
</script>
