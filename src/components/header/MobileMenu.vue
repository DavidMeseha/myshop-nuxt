<template>
  <div class="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity" @click="close" v-if="isOpen">
    <div
      class="fixed inset-y-0 left-0 w-64 transform bg-white shadow-xl transition-transform"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      @click.stop
    >
      <div class="flex h-[60px] items-center justify-between border-b px-4">
        <h2 class="text-lg font-semibold">{{ $t("menu") }}</h2>
        <button class="p-2" @click="close">
          <Icon class="text-black" name="heroicons:x-mark-20-solid" size="24" />
        </button>
      </div>

      <nav class="p-4">
        <ul class="space-y-4">
          <li :key="item.to" v-for="item in navItems">
            <NuxtLink
              class="flex items-center text-gray-600 hover:text-primary"
              :class="{ 'text-primary': isCurrentPath(item.to) }"
              :to="item.to"
              @click="close"
            >
              <Icon class="mr-3" :name="item.icon" size="20" />
              {{ $t(item.name) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const route = useRoute();

const navItems = [
  { name: "home", to: "/", icon: "heroicons:home" },
  { name: "feeds", to: "/feeds", icon: "heroicons:newspaper" },
  { name: "profile", to: "/user/me", icon: "heroicons:user" },
  { name: "cart", to: "/cart", icon: "heroicons:shopping-cart" }
];

const close = () => {
  emit("close");
};

const isCurrentPath = (path: string) => {
  if (path === "/") {
    return route.path === path;
  }
  return route.path.startsWith(path);
};
</script>

<style scoped>
.translate-x-0 {
  transform: translateX(0);
}
.-translate-x-full {
  transform: translateX(-100%);
}
</style>
