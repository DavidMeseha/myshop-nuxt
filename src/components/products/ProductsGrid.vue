<template>
  <div
    class="relative grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
  >
    <ProductsProductCard
      v-for="product in products"
      :key="product._id"
      :product="product"
    />
    <LoadingUiProductCard
      v-if="isLoading"
      v-for="(_, index) in limit"
      :key="index"
    />
  </div>
</template>

<script setup lang="ts">
import type { IFullProduct } from "~/types";

defineProps({
  isLoading: Boolean,
  products: {
    type: Array as PropType<IFullProduct[]>,
    default: () => [],
  },
  limit: Number,
});
</script>
