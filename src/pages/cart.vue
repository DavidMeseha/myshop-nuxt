<template>
  <div
    class="sticky z-20 flex items-center justify-between border-b bg-white pb-2 pt-2 md:top-[60px] md:mx-0"
  >
    <h1 class="hidden text-3xl font-bold md:block">{{ $t("yourCart") }}</h1>
    <Button
      class="mx-4 block w-full rounded-md bg-primary font-semibold text-white md:mx-0 md:w-auto"
      :isLoading="status === 'pending'"
    >
      <div class="flex w-full justify-between gap-8">
        <div>{{ $t("checkout") }}({{ data?.cartItems.length ?? 0 }})</div>
        <div>{{ data?.total }}$</div>
      </div>
    </Button>
  </div>

  <ProductsCartItem
    v-if="data"
    v-for="item in data.cartItems"
    :attributes="item.attributes"
    :canEdit="true"
    :key="item.product.seName"
    :product="item.product"
    :quantity="item.quantity"
  />
</template>
<script lang="ts" setup>
import useCheckoutRepo from "~/services/checkout.service";
import Button from "~/components/common/Button.vue";

const { checkoutData } = useCheckoutRepo();

const { data, status } = useAsyncData("checkoutCart", () => checkoutData(), {
  default: () => ({ cartItems: [], total: 0, addresses: [] }),
  server: false,
});
</script>
