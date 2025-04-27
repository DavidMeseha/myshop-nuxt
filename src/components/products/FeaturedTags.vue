<template>
  <Carousel class="w-full px-10" dir="ltr" :opts="{ align: 'start' }">
    <CarouselContent>
      <CarouselItem
        v-if="status === 'success' && !!tags?.data"
        v-for="tag in tags?.data"
        :key="tag._id"
        class="basis-auto"
      >
        <NuxtLink
          class="flex items-center rounded-full border px-4 py-2 transition-colors hover:bg-slate-100"
          :href="localPath(`/tag/${tag.seName}`)"
        >
          <Icon name="mdi-pound" size="30" />
          <div class="text-sm font-bold">
            <p>{{ tag.name }}</p>
            <p class="w-max text-xs text-gray-400">
              {{ tag.productCount }} products
            </p>
          </div>
        </NuxtLink>
      </CarouselItem>
      <CarouselItem
        v-else
        v-for="(_, index) in 8"
        :key="index"
        class="basis-auto"
      >
        <div class="rounded-full w-40 h-[54px]">
          <Skeletor />
        </div>
      </CarouselItem>
    </CarouselContent>

    <CarouselPrevious
      class="start-0 border bg-transparent p-2 text-black hover:border-slate-400 disabled:opacity-50 hover:bg-slate-100"
      variant="default"
    />
    <CarouselNext
      class="end-0 border bg-transparent p-2 text-black hover:border-slate-400 disabled:opacity-50 hover:bg-slate-100"
      variant="default"
    />
  </Carousel>
</template>

<script lang="ts" setup>
import {
  CarouselItem,
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";
import useProductsRepo from "~/services/products.service";
import { Skeletor } from "vue-skeletor";

const { getTags } = useProductsRepo();

const localPath = useLocalePath();
const { data: tags, status } = useAsyncData(
  "featuredTags",
  () => getTags({ page: 1, limit: 10 }),
  {
    default: () => ({
      data: [],
    }),
    server: false,
  }
);
</script>
