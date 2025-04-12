<template>
  <template v-for="(attr, index) in attributes" :key="attr._id">
    <div class="border p-4 my-2 rounded-md">
      <FormTextInput
        v-if="attr.attributeControlType === 'Textbox'"
        :label="attr.name"
        type="text"
        value="{customAttributes[index].values[0]._id}"
      />

      <Dropdown
        button-class="bg-transparent border w-full justify-between"
        v-else-if="attr.attributeControlType === 'DropdownList'"
      >
        <template #trigger>
          <span>{{ customAttributes?.[index]?.values[0].name ?? "" }}</span>
        </template>

        <template #default="{ close }">
          <button
            class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            :key="value._id"
            @click="
              () => {
                handleChange(attr._id, [value._id]);
                close();
              }
            "
            v-for="value in attr.values"
          >
            {{ value.name }}
          </button>
        </template>
      </Dropdown>

      <CheckboxGroup
        v-else-if="attr.attributeControlType === 'Checkboxes'"
        :options="
          attr.values.map((item) => ({ name: item.name, value: item._id }))
        "
        :title="attr.name"
        :values="
          customAttributes?.[index]?.values
            ? customAttributes[index].values.map((attr) => attr._id)
            : ['']
        "
        @update:values="(values: string[]) => handleChange(attr._id, values)"
      />

      <RadioGroup
        v-else-if="attr.attributeControlType === 'RadioList'"
        :checkedValue="customAttributes?.[index]?.values[0]._id ?? ''"
        :options="
          attr.values.map((item) => ({ name: item.name, value: item._id }))
        "
        :title="attr.name"
        @change="handleChange(attr._id, $event.target.value)"
      />

      <ColorGoroup
        v-else-if="attr.attributeControlType === 'Color'"
        :title="attr.name"
        :value="customAttributes?.[index]?.values[0]._id ?? ''"
        :options="
          attr.values.map((item) => ({
            name: item.name,
            value: item._id,
            color: item.colorRgb ?? '#fff',
          }))
        "
        :id="attr.name"
        @change="handleChange(attr._id, $event.target.value)"
      />
    </div>
  </template>
</template>

<script lang="ts" setup>
import type { IProductAttribute } from "~/types";
import ColorGoroup from "./common/ColorGoroup.vue";
import RadioGroup from "./common/RadioGroup.vue";
import FormTextInput from "./common/FormTextInput.vue";
import CheckboxGroup from "./common/CheckboxGroup.vue";
import Dropdown from "./common/Dropdown.vue";

defineProps({
  customAttributes: Array as PropType<IProductAttribute[]>,
  attributes: Array as PropType<IProductAttribute[]>,
  handleChange: {
    type: Function as PropType<(id: string, values: any) => void>,
    required: true,
  },
});
</script>
