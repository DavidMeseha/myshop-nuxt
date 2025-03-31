<script setup lang="ts">
import { Skeletor } from "vue-skeletor";
</script>

<template>
  <div
    class="flex w-full flex-col justify-between overflow-hidden rounded-sm border bg-white"
  >
    <div>
      <div class="p-2">
        <Skeletor height="176" />
      </div>
      <div class="mt-2 flex flex-col gap-1 px-2">
        <Skeletor />
        <Skeletor width="120" />
        <Skeletor width="50" />
        <Skeletor height="20" width="100" />
      </div>
    </div>

    <div class="mt-4 flex border-t border-gray-200">
      <div
        v-for="(_, index) in 3"
        :key="index"
        class="basis-1/3 rounded-none border-e fill-black p-1"
      >
        <Skeletor />
      </div>
    </div>
  </div>
</template>
