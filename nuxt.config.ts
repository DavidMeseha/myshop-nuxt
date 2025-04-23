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
  ],
  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        language: "en-US",
        name: "English",
        file: "en.json",
        dir: "ltr",
      },
      {
        code: "ar",
        iso: "ar-SA",
        language: "ar-SA",
        name: "العربية",
        file: "ar.json",
        dir: "rtl",
      },
      {
        code: "fr",
        iso: "fr-FR",
        language: "fr-FR",
        name: "Français",
        file: "fr.json",
        dir: "ltr",
      },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
    strategy: "prefix",
    baseUrl: process.env.PUBLIC_URL || "http://localhost:3000",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
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
