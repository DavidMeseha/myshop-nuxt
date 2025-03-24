<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
import { checkTokenValidity, getGuestToken } from "./services/auth.service";
import { useI18n } from "vue-i18n";

const head = useLocaleHead({
  addDirAttribute: true, // Adds dir
  addSeoAttributes: true, // Adds lang
});
const htmlAttrs = computed(() => head.value.htmlAttrs!);

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  const userStore = useUserStore();

  if (!token) {
    const res = await getGuestToken();
    if (res.value) localStorage.setItem("token", res.value.token);
  } else {
    const res = await checkTokenValidity();
    if (res.value) userStore.setUser(res.value);
  }
}
</script>

<style>
@import "./assets/css/globals.css";
</style>
