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
import { checkTokenValidity, getGuestToken } from "~/services/auth.service";
import { setToken } from "./lib/localestorageAPI";
import { useUserStore } from "./stores/useUserStore";

const head = useLocaleHead();
const htmlAttrs = computed(() => head.value.htmlAttrs!);

const userStore = useUserStore();

onMounted(async () => {
  try {
    const res = await checkTokenValidity();

    if (res) {
      userStore.setUser(res);
    }
  } catch (error) {
    try {
      const guestRes = await getGuestToken();
      if (guestRes) {
        setToken(guestRes.token);
        userStore.setUser(guestRes.user);
      }
    } catch (guestError) {
      console.error("Failed to fetch guest token:", guestError);
    }
  }
});
</script>

<style>
@import "./assets/css/globals.css";
</style>
