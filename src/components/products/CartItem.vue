<template>
  <li
    :class="`${!isInCart && canEdit && 'opacity-50'} list-none border-b px-4`"
  >
    <div class="flex items-center justify-between py-2">
      <div class="flex w-full items-center gap-3">
        <img
          :alt="product.name"
          class="h-14 w-14 rounded-md object-contain"
          :src="product.pictures[0].imageUrl"
        />
        <div>
          <p class="font-bold">{{ product.name }}</p>
          <p class="text-sm text-gray-400">
            {{ product.price.price }}$ . quantity: {{ quantity }}
          </p>
        </div>
      </div>
      <button class="relative" @click="showDetails = !showDetails">
        <Icon
          name="material-symbols-light:arrow-forward-ios-rounded"
          size="20"
          class="rotate-90"
          v-if="canEdit"
        />
        <p v-else>{{ quantity * product.price.price }}$</p>
      </button>
    </div>

    <div
      v-if="canEdit"
      :class="`px-1 transition-all ${
        showDetails ? 'max-h-[300vh] overflow-auto' : 'max-h-0 overflow-hidden'
      }`"
    >
      <div v-for="attribute in attributes" class="mb-2" :key="attribute._id">
        {{ attribute.name }}:
        {{ attribute.values.map((value) => value.name + ", ") }}
      </div>

      <div class="mb-4 flex justify-end">
        <button class="bg-gray-200 rounded-md px-4 py-2">
          <!-- {{ showDetails ? $t("hide") : $t("show") }} -->
          {{ $t("remove") }}
        </button>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { IFullProduct, IProductAttribute } from "~/types";

const { product } = defineProps({
  attributes: {
    type: Array as PropType<IProductAttribute[]>,
    default: () => [],
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
  product: {
    type: Object as PropType<IFullProduct>,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const showDetails = ref(false);
const isInCart = ref(product.isInCart);
</script>
