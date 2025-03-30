import { defineStore } from "pinia";
import { ref, defineComponent } from "vue";

export const usePopupStore = defineStore("popup", () => {
  const isOpen = ref(false);
  const component = ref<ReturnType<typeof defineComponent> | null>(null); // Accept Vue components
  const props = ref<Record<string, any>>({});

  const openPopup = (popupComponent: ReturnType<typeof defineComponent>, popupProps: Record<string, any> = {}) => {
    component.value = popupComponent;
    props.value = popupProps;
    isOpen.value = true;
  };

  const closePopup = () => {
    isOpen.value = false;
    component.value = null;
    props.value = {};
  };

  return { isOpen, component, props, openPopup, closePopup };
});
