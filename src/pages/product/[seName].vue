<template>
  <template v-if="product">
    <section class="bg-white pb-6 pt-4 antialiased">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div class="mx-auto max-w-md shrink-0 lg:max-w-md">
            <div class="sticky top-20">
              <ProductsProductImagesCarosel
                :height="500"
                :images="product.pictures"
                :productName="product.name"
              />
            </div>
          </div>

          <div class="mt-6 sm:mt-8 lg:mt-0">
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">
              {{ product.name }}
            </h1>
            <div class="mt-4 sm:flex sm:items-center sm:gap-4">
              <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {{ product.price.price }}$
              </p>

              <div class="mt-2 flex items-center gap-2 sm:mt-0">
                <p
                  class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                >
                  ({{ rate }})
                </p>
              </div>
            </div>

            <div class="mt-6">
              <ProductAttributes
                :customAttributes="customAttributes"
                :handleChange="handleAttributesChange"
                :attributes="product.productAttributes"
              />
            </div>

            <div class="mt-6 flex items-center gap-4 sm:mt-8" v-if="!actions">
              Loading actions ... .
            </div>
            <div v-else class="mt-6 flex items-center gap-4 sm:mt-8">
              <ProductsProductLikeButton
                :isLiked="actions.isLiked"
                :likesCount="product.likes"
                :productId="product._id"
              />
              <ProductsProductSaveButton
                :isSaved="actions.isSaved"
                :productId="product._id"
                :savedCount="product.saves"
              />
              <ProductsProductCartButton
                :attributes="customAttributes"
                :isInCart="actions.isInCart"
                :cartCount="product.carts"
                :product="product"
              />
            </div>

            <hr class="my-6 border-gray-200 md:my-8" />

            <p class="mb-6 text-gray-500">{{ product.fullDescription }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>

<script setup lang="ts">
import { selectDefaultAttributes } from "~/lib/misc";
import useProductPageHead from "~/meta-composables/useProductPageHead";
import useProductsRepo from "~/services/products.service";
import type { IProductAttribute } from "~/types";

const route = useRoute();
const seName = route.params.seName as string;
const { getProductBySeName, getProductUserActions } = useProductsRepo();

const { data: product } = await useAsyncData(`product-${seName}`, () =>
  getProductBySeName(seName)
);

const { data: actions } = await useAsyncData(
  `product-actions-${seName}`,
  () => getProductUserActions(seName),
  { server: false }
);

const customAttributes = ref<IProductAttribute[]>(
  product.value ? selectDefaultAttributes(product.value.productAttributes) : []
);

const rate = computed(() =>
  product.value
    ? (
        product.value.productReviewOverview.ratingSum /
        product.value.productReviewOverview.totalReviews
      ).toFixed(1)
    : "0"
);

const isReviewed = ref(!!product.value?.isReviewed);

const handleAttributesChange = (attributeId: string, value: string[]) => {
  if (!product.value) return;
  let tempAttributes = [...customAttributes.value];
  const index = tempAttributes.findIndex((attr) => attr._id === attributeId);

  const originalAttribute = product.value.productAttributes.find(
    (attr) => attr._id === attributeId
  ) as IProductAttribute;
  const selectedValues = originalAttribute.values.filter((val) =>
    value.includes(val._id)
  ) as IProductAttribute[];

  tempAttributes[index] = { ...originalAttribute, values: selectedValues };

  customAttributes.value = [...tempAttributes];
};

useProductPageHead(product.value);
</script>
