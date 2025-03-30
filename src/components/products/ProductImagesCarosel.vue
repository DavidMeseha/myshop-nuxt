<template>
  <div class="relative h-full" :style="{ height: `${height}px` }">
    <Carousel class="h-full w-full [&>div]:h-full" dir="ltr">
      <CarouselContent class="h-full">
        <CarouselItem
          v-for="img in images"
          :key="img._id"
          class="relative flex h-full items-center"
        >
          <img
            :alt="productName"
            class="h-full w-full object-contain"
            :src="img.imageUrl"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import type { IPicture } from "~/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

defineProps({
  images: Array as PropType<IPicture[]>,
  productName: String,
  height: Number,
});
</script>
