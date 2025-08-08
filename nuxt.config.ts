import federation from "@originjs/vite-plugin-federation";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [
      federation({
        name: 'nuxt_mfe',
        filename: 'remoteEntry.js',
        exposes: {
          './FeaturedTags': './src/components/products/FeaturedTags.vue'
        },
        shared: []
      })
    ],
    build: {
      target: 'esnext',
      minify: false, // Keep false during debugging
      cssCodeSplit: false,
      rollupOptions: {
        // THE CRITICAL SOLUTION:
        output: {
          // APPROACH 1 (Recommended):
          inlineDynamicImports: true,
          manualChunks: undefined, // Must be undefined when inlineDynamicImports is true
          
          // OR APPROACH 2 (Alternative):
          // inlineDynamicImports: false,
          // manualChunks: () => 'all',
          
          // REQUIRED FOR BOTH APPROACHES:
          preserveModules: false,
          hoistTransitiveImports: false,
          generatedCode: 'es2015'
        },
        treeshake: false // Disable for component stability
      }
    }
  },

  experimental: {
    payloadExtraction: false,
    externalVue: false // Important for Vue bundling
  },

  build: {
    minify: 'terser',
    sourcemap: false // Recommended for debugging
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    }
  },

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
  typescript: { strict: true,
    shim: false,
   },
  routeRules: {
    "/**": { appMiddleware: "save-last-page" },
  },
  app: {
    head: {
      title: "TechShop",
      charset: "utf-16",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
});
