<template>
  <SectionHeader :title="$t('featuredProducts')" />
  <HomeCarousel>
    <CarouselItem
      v-if="!!products?.data && status === 'success'"
      v-for="product in products.data"
      :key="product._id"
      class="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 flex justify-stretch items-stretch"
    >
      <ProductsProductCard :product="product" custom-class="h-full" />
    </CarouselItem>
    <CarouselItem
      v-else
      v-for="(_, index) in 5"
      :key="index"
      class="h-full basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
    >
      <LoadingUiProductCard />
    </CarouselItem>
  </HomeCarousel>
</template>

<script lang="ts" setup>
import SectionHeader from "~/components/common/SectionHeader.vue";
import { CarouselItem } from "~/components/ui/carousel";
import useProductsRepo from "~/services/products.service";
import HomeCarousel from "./HomeCarousel.vue";

const { homeFeedProducts } = useProductsRepo();

const { data: products, status } = await useAsyncData(
  "products",
  () => homeFeedProducts({ page: 1, limit: 5 }),
  { server: false }
);
</script>
