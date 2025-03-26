<template>
  <div class="me-4 flex items-center">
    <div class="relative">
      <button
        class="mt-1 rounded-full border border-primary-300 outline outline-0 outline-primary-300 transition-[outline] hover:outline hover:outline-4"
        @click="toggleMenu"
      >
        <img
          class="h-[35px] w-[35px] rounded-full"
          :src="user.imageUrl"
          width="45"
          height="45"
        />
      </button>

      <ul
        v-if="showMenu"
        class="absolute end-0 top-12 w-[200px] rounded-lg border bg-white shadow-xl"
      >
        <li
          v-for="(item, index) in menu"
          :key="index"
          class="block hover:bg-gray-100"
        >
          <NuxtLink
            class="flex w-full gap-2 px-2 py-3"
            :to="localPath(item.to)"
          >
            <Icon :name="item.icon" size="22" />
            <span class="text-sm font-semibold">{{ item.name }}</span>
          </NuxtLink>
        </li>
        <li class="block hover:bg-gray-100">
          <a class="flex w-full border-t px-2 py-3 gap-2" @click="handleLogout">
            <Icon size="20" name="ci:circle-warning" />
            <span class="text-sm font-semibold">{{ t("logout") }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { headerProfileMenu } from "~/schemas/menus";
import { useUserStore } from "~/stores/useUserStore";
import useTranslation from "~/composables/useTranslation";
import useLogout from "~/composables/useLogout";

const localPath = useLocalePath();
const t = useTranslation();

const showMenu = ref(false);
const menu = computed(() => headerProfileMenu(t));

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const logout = useLogout();
const handleLogout = async () => {
  await logout();
  showMenu.value = false;
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>
