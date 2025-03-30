<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
    <Body>
      <NuxtLoadingIndicator color="#3A3DF0" :height="6" class="z-50" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
const head = useLocaleHead();
const htmlAttrs = computed(() => head.value.htmlAttrs!);
</script>
