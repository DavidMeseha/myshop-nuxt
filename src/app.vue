<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { checkTokenValidity, getGuestToken } from "./services/auth.service";

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
