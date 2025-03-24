<template>
  <Header />
  <HeaderMobileHeader />
  <main className="relative mx-0 mb-14 max-w-screen-xl pb-6 md:mx-auto md:px-4">
    <slot />
  </main>
</template>

<script setup>
import Header from "../components/header/Header.vue";
import HeaderMobileHeader from "../components/header/MobileHeader.vue";
</script>
