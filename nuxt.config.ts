// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: true,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  srcDir: "src/",
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "shadcn-nuxt",
    "motion-v/nuxt",
  ],
  i18n: {
    locales: [
      { code: "en", name: "English", file: "en.json", dir: "ltr" },
      { code: "ar", name: "العربية", file: "ar.json", dir: "rtl" },
      { code: "fr", name: "Français", file: "fr.json", dir: "ltr" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASEURL,
    },
  },
  css: [
    "@/assets/css/globals.css",
    "vue-skeletor/dist/vue-skeletor.css",
    "vue3-carousel/carousel.css",
  ],
  tailwindcss: {
    cssPath: "@/assets/css/globals.css",
    configPath: "tailwind.config.ts",
    exposeConfig: true,
    viewer: true,
  },
  typescript: { strict: true },
  routeRules: {
    "/**": { appMiddleware: "save-last-page" },
  },
});
