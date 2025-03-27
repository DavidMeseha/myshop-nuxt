<template>
  <h2
    class="mb-6 flex w-full items-center gap-8 text-center text-2xl font-bold"
  >
    <hr class="w-full" />
    <span class="whitespace-nowrap">{{ title }}</span>
    <hr class="w-full" />
  </h2>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
});
</script>
