<template>
  <div
    v-if="popupStore.isOpen"
    class="fixed top-0 left-0 overflow-auto bg-black bg-opacity-50 z-50 w-screen h-screen"
    @click="popupStore.closePopup"
  >
    <div class="h-full w-full overflow-auto">
      <div
        className="flex min-h-screen items-end justify-center pt-40 md:items-center md:py-8"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePopupStore } from "~/stores/popupStore";

const popupStore = usePopupStore();
</script>
