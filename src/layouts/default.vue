<template>
  <Header />
  <HeaderMobileHeader />
  <main
    class="relative mx-0 mb-14 max-w-screen-xl pb-6 md:mx-auto md:px-4 px-0"
  >
    <slot />
  </main>
</template>

<script lang="ts" setup>
import Header from "../components/header/Header.vue";
import HeaderMobileHeader from "../components/header/MobileHeader.vue";
</script>
