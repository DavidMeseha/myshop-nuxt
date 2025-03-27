<template>
  <Carousel class="relative w-full md:px-10" :opts="{ align: 'start' }">
    <div class="mx-auto w-20">
      <CarouselPrevious
        class="static start-0 border bg-transparent p-2 text-black hover:border-slate-400 disabled:opacity-50 md:absolute hover:bg-slate-100"
        variant="default"
      />
      <CarouselNext
        class="static end-0 ms-4 border bg-transparent p-2 text-black hover:border-slate-400 disabled:opacity-50 md:absolute hover:bg-slate-100"
        variant="default"
      />
    </div>
    <CarouselContent class="items-stretch">
      <slot />
    </CarouselContent>
  </Carousel>
</template>

<script lang="ts" setup>
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
</script>
