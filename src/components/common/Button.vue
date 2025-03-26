<template>
  <button
    :class="
      cn(
        'text-sm font-medium relative flex justify-center items-center px-4 py-2 rounded-md bg-primary text-primary-foreground',
        { 'opacity-50 cursor-not-allowed': loading },
        buttonClass
      )
    "
    :disabled="loading || disabled"
  >
    <span :class="cn('flex items-center', { invisible: loading })">
      <slot />
    </span>
    <LoadingSpinner v-if="loading" :fill="spinnerFill" :is-overlay="true" />
  </button>
</template>

<script lang="ts" setup>
import LoadingSpinner from "./LoadingSpinner.vue";
import { cn } from "~/lib/utils";

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  buttonClass: {
    type: String,
    default: "",
  },
  spinnerFill: {
    type: String,
    default: "currentColor",
  },
  type: {
    type: String,
    default: "button",
  },
});
</script>
