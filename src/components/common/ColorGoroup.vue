<template>
  <div class="mb-2 text-lg">{{ title }}</div>
  <div class="flex flex-wrap">
    <div class="mb-2" v-for="(option, index) in options" :key="index">
      <label :for="option.name" :title="option.name">
        <input
          v-bind="$attrs"
          :checked="value === option.value"
          class="me-2 h-6 w-6 rounded"
          :style="{ backgroundColor: option.color }"
          type="radio"
          :id="title"
          :name="option.name"
          :value="option.value"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  value: String,
  options: Array as PropType<{ name: string; value: string; color: string }[]>,
});
</script>
