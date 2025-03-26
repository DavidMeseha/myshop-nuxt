<template>
  <nav
    class="sticky top-0 z-40 flex w-full justify-between border-b bg-white p-2 md:hidden"
  >
    <button
      class="p-0"
      @click="mobileMenuRef.openMenu()"
      aria-label="Open Main Menu"
    >
      <Icon class="text-black" name="heroicons:bars-3-20-solid" size="25" />
    </button>
    <h1 class="text-xl font-bold">{{ t(currentTitle) }}</h1>
    <button class="p-0" aria-label="Open Search Page">
      <Icon
        class="text-black"
        name="heroicons:magnifying-glass-20-solid"
        size="20"
      />
    </button>

    <MobileMenu ref="mobileMenuRef" />
  </nav>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import useTranslation from "../../composables/useTranslation";
import type { TranslationKey } from "~/types";
import MobileMenu from "~/components/header/MobileMenu.vue";

const route = useRoute();
const mobileMenuRef = ref();
const t = useTranslation();

const titles: { [key: string]: TranslationKey } = {
  "/user/orders": "profile.ordersHistory",
  "/user/me": "profile",
  "/user/following": "profile.following",
  "/user/changepassword": "profile.changePassword",
  "/user/addresses": "profile.addresses",
  "/user/cart": "profile.cart",
  "/user/order-details": "profile.orderDetails",
  "/user/reviews": "profile.yourReviews",
  "/user/checkout": "checkout",
  "/user/order-success": "checkout.orderPlacedSuccessfully",
  "/cart": "cart",
  "/discover/categories": "discover",
  "/discover/tags": "discover",
  "/discover/vendors": "discover",
  "/": "home",
};

const currentTitle = computed(() => {
  return titles[route.path as keyof typeof titles] || "home";
});
</script>
