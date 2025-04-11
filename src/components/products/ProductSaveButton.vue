<template>
  <div aria-label="Like Product" class="fill-black text-center">
    <button
      class="block rounded-full bg-gray-200 p-2"
      :onClick="handleLikeAction"
    >
      <Icon
        name="material-symbols:bookmark-rounded"
        :class="[
          'transition-all hover:text-primary -mb-1.5',
          save.state ? 'text-primary' : 'text-black',
        ]"
        size="25"
      />
    </button>
    <span class="text-blend text-sm font-semibold">{{ save.count }}</span>
  </div>
</template>

<script lang="ts" setup>
const { isSaved, savedCount, productId } = defineProps({
  isSaved: {
    type: Boolean,
    required: true,
  },
  savedCount: {
    type: Number,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
});

const save = ref({
  state: isSaved,
  count: savedCount,
});

const saveHandler = useSaveProduct({
  productId: productId,
  onClick: (shouldSave) => {
    save.value.state = shouldSave;
    save.value.count = save.value.count + (shouldSave ? 1 : -1);
  },
  onError: (shouldSave) => {
    save.value.state = !shouldSave;
    save.value.count = save.value.count + (shouldSave ? -1 : 1);
  },
});

const handleLikeAction = () => saveHandler(!save.value.state);
</script>
