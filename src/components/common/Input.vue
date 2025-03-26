<template>
  <div class="base-input">
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none',
        error ? 'border-red-500' : 'border-gray-300',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
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
defineProps({
  id: { type: String, required: false },
  label: { type: String, required: false },
  type: { type: String, default: "text" },
  modelValue: { type: [String, Number], required: true },
  placeholder: { type: String, required: false },
  disabled: { type: Boolean, default: false },
  error: { type: String, required: false },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
}
</style>
