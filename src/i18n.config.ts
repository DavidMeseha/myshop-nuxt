export default async () => ({
  legacy: false,
  locale: "en",
  messages: {
    en: JSON.parse(JSON.stringify(await import("./locales/en.json"))),
    ar: JSON.parse(JSON.stringify(await import("./locales/ar.json"))),
    fr: JSON.parse(JSON.stringify(await import("./locales/fr.json"))),
  },
});
