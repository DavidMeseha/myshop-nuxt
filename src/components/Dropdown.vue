<template>
  <div class="relative">
    <button
      class="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
      :class="buttonClass"
      @click="isOpen = !isOpen"
    >
      <slot name="trigger"></slot>
      <Icon class="h-4 w-4" :name="isOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" />
    </button>

    <div
      class="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border bg-white shadow-lg overflow-clip"
      v-if="isOpen"
    >
      <div>
        <slot :close="closeDropdown"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  buttonClass: {
    type: String,
    default: ""
  }
});

const isOpen = ref(false);

const closeDropdown = () => {
  isOpen.value = false;
};
</script>
