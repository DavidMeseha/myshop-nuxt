<template>
  <div data-testid="radio-group">
    <div class="mb-2 text-lg">{{ title }}</div>
    <div class="flex flex-wrap gap-4">
      <label
        v-for="option in options"
        :key="option.value"
        class="mb-2"
        :for="option.name"
      >
        <input
          v-bind="$attrs"
          :checked="checkedValue === option.value"
          class="me-2 border-primary-300 bg-primary-100 text-primary focus:ring-primary-100"
          type="radio"
          :id="option.name"
          :name="title"
          :value="option.value"
        />
        {{ option.name }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  checkedValue: String,
  options: Array as PropType<{ name: string; value: string }[]>,
});
</script>
