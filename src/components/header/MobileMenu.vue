<template>
  <div
    class="fixed w-full bg-white h-screen transform transition-transform"
    :class="{ '-translate-x-full -ms-2': !isOpen, 'translate-x-0': isOpen }"
  >
    <div class="flex justify-between p-4 border-b">
      <span class="text-2xl font-bold">{{ t("mainMenu") }}</span>
      <button class="text-gray-600 hover:text-gray-900" @click="closeMenu">
        ✕
      </button>
    </div>
    <ul class="p-4 space-y-5">
      <li
        v-for="item in menuItems"
        :key="item.name"
        class="flex items-center space-x-4 group"
      >
        <Icon
          :name="item.icon"
          :class="[
            'text-xl',
            isActive(item.to) ? 'text-blue-500' : 'text-gray-700',
            'group-hover:text-primary'
          ]"
        ></Icon>
        <a
          :href="item.to"
          :class="[
            'text-xl font-medium',
            isActive(item.to) ? 'text-blue-500' : 'text-gray-700',
            'group-hover:text-primary'
          ]"
        >
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { mobileMenu } from "~/schemas/menus";

const t = useTranslation();
const isOpen = ref(false);
const route = useRoute();

const menuItems = mobileMenu(t);

function openMenu() {
  isOpen.value = true;
}

function closeMenu() {
  isOpen.value = false;
}

function isActive(path: string): boolean {
  return route.path === path;
}

defineExpose({ openMenu, closeMenu });
</script>
