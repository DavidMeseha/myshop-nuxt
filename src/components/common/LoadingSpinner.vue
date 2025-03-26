<template>
  <div
    class="flex justify-center items-center w-full loading-spinner"
    :class="[
      isOverlay ? 'absolute inset-0 z-50' : '',
      containerClass
    ]"
  >
    <svg
      class="animate-spin"
      :style="{ width: `${size}px`, height: `${size}px` }"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        :fill="fill"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isOverlay: {
    type: Boolean,
    default: false,
  },
  fill: {
    type: String,
    default: "currentColor",
  },
  size: {
    type: Number,
    default: 22,
  },
  containerClass: {
    type: String,
    default: "",
  },
});
</script>
