<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import ProductsGrid from "~/components/products/ProductsGrid.vue";
import useTagPageHead from "~/meta-composables/useTagPageHead";
import useProductsRepo from "~/services/products.service";
import type { IFullProduct, Pagination } from "~/types";

const route = useRoute();
const seName = route.params.seName as string;
const { getTagInfo, getProductsByTag } = useProductsRepo();

const sentinel = ref<HTMLDivElement | null>(null);
const nextPage = ref(1);
const isLoadingMore = ref(false);
const hasMore = ref(true);
const products = ref<IFullProduct[]>([]);

const { data: tag } = await useAsyncData(`tag-${seName}`, () =>
  getTagInfo(seName)
);

const updatePaginationStates = (pages: Pagination) => {
  nextPage.value = nextPage.value + 1;
  hasMore.value = pages.hasNext;
  isLoadingMore.value = false;
};

const { status } = await useAsyncData(`products-${seName}`, () =>
  getProductsByTag(tag.value?._id ?? "", { page: 1 }).then((res) => {
    products.value = res.data;
    updatePaginationStates(res.pages);
    return res;
  })
);

const isLoading = computed(() => {
  return status.value === "pending" || isLoadingMore.value;
});

useIntersectionObserver(sentinel, ([{ isIntersecting }]) => {
  if (isIntersecting && hasMore.value && isLoading.value) {
    loadMore();
  }

  nextTick(() => {
    if (!isLoading.value && hasMore.value && isIntersecting) {
      loadMore();
    }
  });
});

const loadMore = async () => {
  if (isLoading.value || !hasMore.value) return;

  isLoadingMore.value = true;

  try {
    const newData = await getProductsByTag(tag.value?._id ?? "", {
      page: nextPage.value,
    });

    updatePaginationStates(newData.pages);
    products.value = [...products.value, ...(newData.data ?? [])];
  } finally {
    isLoadingMore.value = false;
  }
};

useTagPageHead(tag.value);
</script>

<template>
  <div class="py-4">
    <div
      class="mb-2 ms-2 flex w-full flex-row items-center justify-between px-4 md:mt-0"
      v-if="tag"
    >
      <h1 class="inline-block truncate text-[30px] font-bold" dir="ltr">
        #{{ tag.name }}
      </h1>
      <p dir="ltr">
        <span class="font-bold">{{ tag.productCount }}</span> products
      </p>
    </div>

    <div class="my-6 border-t" />

    <div
      v-if="products && !(products.length > 0)"
      class="py-14 text-center text-gray-400"
    >
      {{ $t("profile.noProducts") }}
    </div>

    <ProductsGrid
      :isLoading="isLoading"
      :limit="5"
      :products="products ?? []"
    />
    <div ref="sentinel" class="h-4" />
  </div>
</template>
