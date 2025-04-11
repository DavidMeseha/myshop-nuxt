<template>
  <div aria-label="Like Product" class="fill-black text-center">
    <button
      class="block rounded-full bg-gray-200 p-2"
      :onClick="handleLikeAction"
    >
      <Icon
        name="material-symbols:favorite-rounded"
        :class="[
          'transition-all hover:text-primary -mb-1.5',
          like.state ? 'text-primary' : 'text-black',
        ]"
        size="25"
      />
    </button>
    <span class="text-blend text-sm font-semibold">{{ like.count }}</span>
  </div>
</template>

<script lang="ts" setup>
const { isLiked, likesCount, productId } = defineProps({
  isLiked: {
    type: Boolean,
    required: true,
  },
  likesCount: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
});

const like = ref({
  state: isLiked,
  count: likesCount,
});

const likeHandler = useLikeProduct({
  productId: productId,
  onClick: (shouldLike) => {
    like.value.state = shouldLike;
    like.value.count = like.value.count + (shouldLike ? 1 : -1);
  },
  onError: (shouldLike) => {
    like.value.state = !shouldLike;
    like.value.count = like.value.count + (shouldLike ? -1 : 1);
  },
});

const handleLikeAction = () => likeHandler(!like.value.state);
</script>
