<template>
  <SectionHeader title="Featured Products" />
  <HomeCarousel>
    <CarouselItem
      v-for="product in products?.data"
      :key="product._id"
      class="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
    >
      <div class="text-center p-4 border rounded-md h-full">
        <img
          :src="product.pictures[0].imageUrl"
          :alt="product.name"
          class="w-full h-40 object-contain rounded-md lg:h-48"
        />
        <h3 class="mt-2 text-lg font-medium">{{ product.name }}</h3>
        <p class="text-sm text-gray-500">{{ product.price }}</p>
      </div>
    </CarouselItem>
  </HomeCarousel>
</template>

<script lang="ts" setup>
import SectionHeader from "~/components/common/SectionHeader.vue";
import { CarouselItem } from "~/components/ui/carousel";
import { homeFeedProducts } from "~/services/products.service";
import HomeCarousel from "./HomeCarousel.vue";

const { data: products } = await homeFeedProducts({ page: 1, limit: 5 });
</script>
