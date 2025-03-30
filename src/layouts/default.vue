<template>
  <Header />
  <HeaderMobileHeader />
  <main
    class="relative mx-0 mb-14 max-w-screen-xl pb-6 md:mx-auto md:px-4 px-0"
  >
    <slot />
  </main>
  <PopupWrapper />
</template>

<script lang="ts" setup>
import PopupWrapper from "~/components/popups/PopupWrapper.vue";
import Header from "../components/header/index.vue";
import HeaderMobileHeader from "../components/header/MobileHeader.vue";
</script>
