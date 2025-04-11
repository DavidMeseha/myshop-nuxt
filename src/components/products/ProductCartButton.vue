<template>
  <div aria-label="Like Product" class="fill-black text-center">
    <button
      class="block rounded-full bg-gray-200 p-2"
      :onClick="handleLikeAction"
    >
      <LoadingSpinner v-if="isLoading" size="25" />
      <Icon
        v-else
        name="material-symbols:shopping-cart"
        :class="[
          'transition-all hover:text-primary -mb-1.5',
          cart.state ? 'text-primary' : 'text-black',
        ]"
        size="25"
      />
    </button>
    <span class="text-blend text-sm font-semibold">{{ cart.count }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { IProductAttribute } from "~/types";
import LoadingSpinner from "../common/LoadingSpinner.vue";

const { isInCart, cartCount, product, attributes } = defineProps({
  isInCart: {
    type: Boolean,
    required: true,
  },
  cartCount: {
    type: Number,
    required: true,
  },
  product: {
    type: Object as () => IAddToCartProduct,
    required: true,
  },
  attributes: {
    type: Object as () => IProductAttribute[],
    required: true,
  },
});

const cart = ref({
  state: isInCart,
  count: cartCount,
});

const { handleAddToCart, isLoading } = useAddToCart({
  product,
  onSuccess: (shouldAdd) => {
    cart.value.state = shouldAdd;
    cart.value.count = cart.value.count + (shouldAdd ? 1 : -1);
  },
});

const handleLikeAction = () => handleAddToCart(!cart.value.state, attributes);
</script>
