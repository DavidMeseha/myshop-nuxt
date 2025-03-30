<template>
  <SectionHeader title="Featured Products" />
  <HomeCarousel>
    <CarouselItem
      v-for="product in products?.data"
      :key="product._id"
      class="h-full basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
    >
      <ProductCard :product="product" />
    </CarouselItem>
  </HomeCarousel>
</template>

<script lang="ts" setup>
import SectionHeader from "~/components/common/SectionHeader.vue";
import { CarouselItem } from "~/components/ui/carousel";
import { homeFeedProducts } from "~/services/products.service";
import HomeCarousel from "./HomeCarousel.vue";
import ProductCard from "./ProductCard.vue";

const { data: products, status } = await useAsyncData(
  "products",
  () => homeFeedProducts({ page: 1, limit: 5 }),
  { server: false }
);

console.log(products.value?.data);
</script>
