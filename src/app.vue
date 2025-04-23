<template>
  <Html>
    <Body>
      <NuxtLoadingIndicator color="#3A3DF0" :height="6" class="z-50" />
      <NuxtLayout>
        <NuxtPage />
        <ClientOnly>
          <Toaster
            position="top-right"
            :expand="true"
            :richColors="true"
            :toastOptions="{
              actionButtonStyle: {
                backgroundColor: '#3A3DF0',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '4px',
              },
            }"
          />
        </ClientOnly>
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
import { Toaster } from 'vue-sonner';

const i18nHead = useLocaleHead();

useHead(() => ({
  htmlAttrs: { ...i18nHead.value.htmlAttrs },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}));
</script>
