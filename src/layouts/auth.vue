<template>
  <NuxtLayout>
    <div class="flex justify-center pt-20">
      <div
        class="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm"
      >
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
export default {
  name: "AuthLayout",
};
</script>
