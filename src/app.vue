<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
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
const head = useLocaleHead();
const htmlAttrs = computed(() => head.value.htmlAttrs!);
</script>
