<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <input
      v-bind="props"
      :id="id"
      :class="[
        'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed',
        error ? 'border-red-500' : 'border-gray-300',
      ]"
      @input="
        emit(
          'update:modelValue',
          ($event.target as HTMLInputElement)?.value || ''
        )
      "
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from "vue";

defineProps({
  id: { type: String, required: false },
  label: { type: String, required: false },
  error: { type: String, required: false },
  props: Object as PropType<InputHTMLAttributes>,
});

const emit = defineEmits(["update:modelValue"]);
</script>
