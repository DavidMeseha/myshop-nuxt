<template>
  <div class="relative md:my-6">
    <h1
      class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center p-6 text-2xl font-bold text-primary-foreground sm:items-start sm:justify-start sm:text-start sm:text-5xl"
      dir="ltr"
    >
      <span>Tomorrow&apos;s Tech,</span>
      <span class="mt-2 block"> Today&apos;s Prices</span>
    </h1>
    <img
      alt="Hero"
      class="mb-6 max-h-96 w-full object-cover object-left-top md:rounded-lg"
      src="/assets/images/home-panner.jpg"
    />
  </div>

  <div class="space-y-6">
    <section class="px-2 md:px-0">
      <FeaturedTags />
    </section>

    <section class="px-2 md:px-0">
      <FeaturedProducts />
    </section>
  </div>
</template>

<script setup lang="ts">
import FeaturedProducts from "~/components/products/FeaturedProducts.vue";
import FeaturedTags from "~/components/products/FeaturedTags.vue";
</script>
