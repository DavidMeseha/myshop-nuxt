<template>
  <div data-testid="checkbox-group">
    <div class="mb-2 text-lg">{{ title }}</div>
    <div class="flex flex-wrap gap-4">
      <label
        v-for="option in options"
        :key="option.value"
        class="mb-2"
        :for="option.name"
      >
        <input
          :checked="values.includes(option.value)"
          class="me-2 border-primary-300 bg-primary-100 text-primary focus:ring-primary-100"
          type="checkbox"
          :id="option.name"
          :name="title"
          :value="option.value"
          @change="
            onChange(option.value, ($event.target as HTMLInputElement)?.checked)
          "
        />
        {{ option.name }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { values } = defineProps({
  title: String,
  values: { type: Array as PropType<string[]>, required: true },
  options: {
    type: Array as PropType<{ name: string; value: string }[]>,
    required: true,
  },
});

const emit = defineEmits(["update:values"]);

function onChange(value: string, isChecked: boolean) {
  const updatedValues = isChecked
    ? [...values, value]
    : values.filter((v) => v !== value);
  emit("update:values", updatedValues);
}
</script>
