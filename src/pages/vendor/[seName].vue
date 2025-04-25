<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import ProductsGrid from "~/components/products/ProductsGrid.vue";
import useProductsRepo from "~/services/products.service";
import type { IFullProduct, Pagination } from "~/types";

const route = useRoute();
const t = useTranslation();
const seName = route.params.seName as string;
const { getVendorInfo, getProductsByVendor } = useProductsRepo();

const sentinel = ref<HTMLDivElement | null>(null);
const nextPage = ref(1);
const isLoadingMore = ref(false);
const hasMore = ref(true);
const products = ref<IFullProduct[]>([]);

const { data: vendor } = await useAsyncData(`vendor-${seName}`, () =>
  getVendorInfo(seName)
);

const follow = ref({
  state: vendor.value?.isFollowed ?? false,
  count: vendor.value?.followersCount ?? 0,
});

const followHandler = useFollowVendor({
  vendorId: vendor.value?._id ?? "",
  onClick: (shouldFollow) => {
    follow.value.state = shouldFollow;
    follow.value.count = follow.value.count + (shouldFollow ? 1 : -1);
  },
  onError: (shouldFollow) => {
    follow.value.state = !shouldFollow;
    follow.value.count = follow.value.count + (shouldFollow ? -1 : 1);
  },
});

const updatePaginationStates = (pages: Pagination) => {
  nextPage.value = nextPage.value + 1;
  hasMore.value = pages.hasNext;
  isLoadingMore.value = false;
};

const { status } = await useAsyncData(
  `products-${seName}`,
  () =>
    getProductsByVendor(vendor.value?._id ?? "", { page: 1, limit: 5 }).then(
      (res) => {
        products.value = res.data;
        updatePaginationStates(res.pages);
        return res;
      }
    ),
  { server: false }
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
    const newData = await getProductsByVendor(vendor.value?._id ?? "", {
      page: nextPage.value,
      limit: 5,
    });

    updatePaginationStates(newData.pages);
    products.value = [...products.value, ...(newData.data ?? [])];
  } finally {
    isLoadingMore.value = false;
  }
};
</script>

<template>
  <div class="py-4">
    <div
      class="flex w-full flex-row items-center justify-start px-4 md:mt-0"
      v-if="vendor"
    >
      <img
        :alt="vendor.name"
        class="h-[80px] w-[80px] rounded-md object-cover"
        :src="vendor.imageUrl"
      />

      <div class="ms-5">
        <div class="flex items-center gap-4">
          <h1 class="inline-block truncate text-2xl font-bold" dir="ltr">
            {{ vendor.name }}
          </h1>
          <RiVerifiedBadgeFill class="fill-primary" size="{25}" />
        </div>
        <Button
          class="item-center mt-3 block bg-primary px-8 py-1.5 text-[15px] font-semibold text-white"
          @click="() => followHandler(!follow.state)"
        >
          {{ follow.state ? $t("unfollow") : $t("follow") }}
        </Button>
      </div>
    </div>

    <div class="flex items-center py-4 text-center">
      <div class="min-w-[120px] flex-grow">
        <div class="font-bold">{{ follow.count }}</div>
        <div class="ps-1.5 text-[15px] font-light text-gray-500">
          {{ $t("profile.followers") }}
        </div>
      </div>
      <div class="bg-gray-200 h-6 w-0.5"></div>
      <div class="min-w-[120px] flex-grow">
        <div class="font-bold">{{ vendor?.productCount ?? 0 }}</div>
        <div class="ps-1.5 text-[15px] font-light text-gray-500">
          {{ $t("profile.products") }}
        </div>
      </div>
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
