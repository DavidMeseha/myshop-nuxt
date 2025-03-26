<template>
  <div class="space-y-2">
    <div class="flex space-x-2">
      <select
        class="w-1/3 rounded-md border bg-background px-3 py-2 text-sm"
        v-model="localDayOfBirth"
      >
        <option v-for="day in daysInMonth" :key="day" :value="day">
          {{ day }}
        </option>
      </select>
      <select
        class="w-1/3 rounded-md border bg-background px-3 py-2 text-sm"
        v-model="localMonthOfBirth"
      >
        <option v-for="month in 12" :key="month" :value="month">
          {{ month }}
        </option>
      </select>
      <select
        class="w-1/3 rounded-md border bg-background px-3 py-2 text-sm"
        v-model="localYearOfBirth"
      >
        <option v-for="year in birthYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

const emit = defineEmits([
  "update:dayOfBirth",
  "update:monthOfBirth",
  "update:yearOfBirth",
]);

const { dayOfBirth, monthOfBirth, yearOfBirth } = defineProps({
  dayOfBirth: {
    type: String,
    default: () => new Date().getDate().toString(),
  },
  monthOfBirth: {
    type: String,
    default: () => (new Date().getMonth() + 1).toString(),
  },
  yearOfBirth: {
    type: String,
    default: () => new Date().getFullYear().toString(),
  },
});

const localDayOfBirth = ref(dayOfBirth);
const localMonthOfBirth = ref(monthOfBirth);
const localYearOfBirth = ref(yearOfBirth);

watch(
  [localDayOfBirth, localMonthOfBirth, localYearOfBirth],
  ([newDay, newMonth, newYear]) => {
    emit("update:dayOfBirth", newDay);
    emit("update:monthOfBirth", newMonth);
    emit("update:yearOfBirth", newYear);
  }
);

const birthYears = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);

const daysInMonth = computed(() => {
  const year = parseInt(localYearOfBirth.value);
  const month = parseInt(localMonthOfBirth.value);
  return new Date(year, month, 0).getDate();
});

// Ensure localDayOfBirth is valid when month or year changes
watch([localMonthOfBirth, localYearOfBirth], () => {
  if (parseInt(localDayOfBirth.value) > daysInMonth.value) {
    localDayOfBirth.value = daysInMonth.value.toString();
  }
});
</script>
