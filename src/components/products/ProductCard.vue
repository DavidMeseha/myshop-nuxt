<script setup lang="ts">
import { cn } from "~/lib/utils";
import ProductImagesCarosel from "./ProductImagesCarosel.vue";
import type { IFullProduct } from "~/types";
import useAddToCart from "~/composables/useAddToCart";
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";
import useLikeProduct from "../../composables/useLikeProduct";

const { product } = defineProps({
  product: { type: Object as () => IFullProduct, required: true },
  canAddReview: Boolean,
  customClass: String,
});

const localePath = useLocalePath();

const cart = ref({ state: product.isInCart, count: product.carts });
const like = ref({ state: product.isLiked, count: product.likes });
const save = ref({ state: product.isSaved, count: product.saves });
const rate =
  (
    product.productReviewOverview.ratingSum /
    product.productReviewOverview.totalReviews
  ).toFixed(1) ?? 0;

const { handleAddToCart, isLoading } = useAddToCart({
  product,
  onSuccess: (shouldAdd) => {
    cart.value.state = shouldAdd;
    cart.value.count = cart.value.count + (shouldAdd ? 1 : -1);
  },
});

const likeHandler = useLikeProduct({
  productId: product._id,
  onClick: (shouldLike) => {
    like.value.state = shouldLike;
    like.value.count = like.value.count + (shouldLike ? 1 : -1);
  },
  onError: (shouldLike) => {
    like.value.state = !shouldLike;
    like.value.count = like.value.count + (shouldLike ? -1 : 1);
  },
});

const saveHandler = useSaveProduct({
  productId: product._id,
  onClick: (shouldSave) => {
    save.value.state = shouldSave;
    save.value.count = save.value.count + (shouldSave ? 1 : -1);
  },
  onError: (shouldSave) => {
    save.value.state = !shouldSave;
    save.value.count = save.value.count + (shouldSave ? -1 : 1);
  },
});
</script>

<template>
  <div
    :class="
      cn(
        'relative flex w-full flex-col justify-between overflow-hidden rounded-sm border bg-white',
        customClass
      )
    "
  >
    <div>
      <ProductImagesCarosel
        :height="200"
        :images="product.pictures"
        :productName="product.name"
      />

      <div class="mt-2 flex flex-col gap-1 px-2 sm:px-4">
        <NuxtLink
          class="font-semibold text-gray-800 hover:underline"
          :href="localePath(`/product/${product.seName}`)"
        >
          <span :title="product.name">{{ product.name }}</span>
        </NuxtLink>
        <p v-if="product.vendor.name" class="-mt-1 text-sm text-gray-400">
          sold by:
          <NuxtLink
            class="hover:text-primary"
            :href="localePath(`/vendor/${product.vendor.seName}`)"
          >
            {{ product.vendor.name }}
          </NuxtLink>
        </p>
        <span class="font-semibold text-gray-800"
          >{{ product.price.price }}$</span
        >
        <div
          class="absolute top-3 start-3 flex items-center bg-slate-100 w-fit pe-3 py-1 rounded-full"
        >
          <Icon name="ic:baseline-star" class="w-8 text-yellow-500" />
          <span class="text-slate-500 text-xs">{{ rate }}</span>
        </div>
      </div>
    </div>

    <!-- Product Actions -->
    <div class="mt-4 flex border-t border-gray-200">
      <button
        aria-label="Add to cart"
        :class="`basis-1/3 rounded-none border-e fill-black p-1 ${
          cart.state ? 'bg-green-200' : 'bg-white'
        }`"
        :disabled="false"
        @click="handleAddToCart(!cart.state)"
      >
        <div class="flex items-center justify-center gap-1">
          <LoadingSpinner v-if="isLoading" size="18" />
          <template v-else>
            <Icon name="ic:outline-shopping-cart" size="20" />
            <span class="hidden text-sm sm:inline">{{ cart.count }}</span>
          </template>
        </div>
      </button>
      <button
        aria-label="like product"
        :class="`basis-1/3 rounded-none border-e fill-black p-1 ${
          like.state ? 'bg-red-200' : 'bg-white'
        }`"
        @click="likeHandler(!like.state)"
      >
        <div class="flex items-center justify-center gap-1">
          <Icon name="ic:outline-favorite-border" size="20" />
          <span class="hidden text-sm sm:inline">{{ like.count }}</span>
        </div>
      </button>
      <button
        aria-label="save product"
        :class="`basis-1/3 rounded-none fill-black p-1 ${
          save.state ? 'bg-yellow-200' : 'bg-white'
        }`"
        @click="saveHandler(!save.state)"
      >
        <div class="flex items-center justify-center gap-1 text-black">
          <Icon name="ic:outline-bookmark-add" size="20" />
          <span class="hidden text-sm sm:inline">{{ save.count }}</span>
        </div>
      </button>
    </div>
  </div>
</template>
