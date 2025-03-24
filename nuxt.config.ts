// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  ],

  i18n: {
    langDir: "locales",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
        dir: "ltr",
      },
      {
        code: "ar",
        name: "العربية",
        file: "ar.json",
        dir: "rtl",
      },
      {
        code: "fr",
        name: "Français",
        file: "fr.json",
        dir: "ltr",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASEURL || "http://localhost:3000",
    },
  },
  css: ["./src/assets/css/globals.css"],
  tailwindcss: {
    cssPath: "~/assets/css/globals.css",
    configPath: "tailwind.config.ts",
    exposeConfig: true,
    viewer: true,
  },
  typescript: {
    typeCheck: true,
  },
});
