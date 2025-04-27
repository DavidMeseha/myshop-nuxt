interface SeoMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  price?: string;
  currency?: string;
}

export function useBaseSeoHead(meta: SeoMeta) {
  const route = useRoute();
  const config = useRuntimeConfig();
  const baseUrl = config.public.siteUrl || "http://localhost:3000";
  const currentUrl = `${baseUrl}${route.path}`;

  useHead({
    title: meta.title,
    titleTemplate: (title) => (title ? `${title} | TechShop` : "TechShop"),
    meta: [
      // Basic SEO
      { name: "description", content: meta.description },
      { name: "keywords", content: meta.keywords?.join(", ") },

      // Open Graph
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: meta.type || "website" },
      { property: "og:url", content: currentUrl },
      { property: "og:image", content: meta.image },
      { property: "og:site_name", content: "TechShop" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: meta.title },
      { name: "twitter:description", content: meta.description },
      { name: "twitter:image", content: meta.image },

      // Robots
      {
        name: "robots",
        content: meta.noindex ? "noindex, nofollow" : "index, follow",
      },
      {
        property: "og:price:amount",
        content: meta.price?.toString(),
      },
      { property: "og:price:currency", content: meta.currency },
    ].filter((meta) => meta.content), // Remove empty meta tags
    link: [{ rel: "canonical", href: currentUrl }],
  });
}
