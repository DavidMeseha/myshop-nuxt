import type { IFullProduct } from "~/types";

export default function useProductPageHead(product: IFullProduct | null) {
  const route = useRoute();

  return useHead(() => ({
    title: product?.name ?? "Product",
    meta: [
      { name: "description", content: product?.shortDescription ?? "" },
      { property: "og:title", content: product?.name ?? "Product" },
      {
        property: "og:description",
        content: product?.shortDescription ?? "",
      },
      {
        property: "og:image",
        content: product?.pictures[0]?.imageUrl ?? "",
      },
      { property: "og:type", content: "product" },
      {
        property: "og:price:amount",
        content: product?.price.price.toString() ?? "",
      },
      { property: "og:price:currency", content: "USD" },
      { name: "twitter:card", content: "product" },
      { name: "twitter:title", content: product?.name ?? "Product" },
      {
        name: "twitter:description",
        content: product?.shortDescription ?? "",
      },
      {
        name: "twitter:image",
        content: product?.pictures[0]?.imageUrl ?? "",
      },
    ],
    link: [{ rel: "canonical", href: `${route.path}` }],
  }));
}
