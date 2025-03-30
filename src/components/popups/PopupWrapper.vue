<template>
  <div
    v-if="popupStore.isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="popupStore.closePopup"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-4 max-w-md w-full relative"
      @click.stop
    >
      <div class="flex justify-end mb-2">
        <button
          class="text-gray-500 hover:text-gray-700"
          @click="popupStore.closePopup"
        >
          <Icon name="ic:round-close" class="w-8 h-8" />
        </button>
      </div>
      <component :is="popupStore.component" v-bind="popupStore.props" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePopupStore } from "~/stores/popupStore";

const popupStore = usePopupStore();
</script>
