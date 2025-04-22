import type { ITag } from "~/types";

export default function useTagPageHead(tag: ITag | null) {
  useHead(() => ({
    title: tag ? `#${tag.name} - Products` : "Products",
    meta: [
      {
        name: "description",
        content: tag
          ? `Browse ${tag.productCount} products tagged with #${tag.name}`
          : "Browse products by tag",
      },
      {
        property: "og:title",
        content: tag ? `#${tag.name} - Products` : "Products",
      },
      {
        property: "og:description",
        content: tag
          ? `Browse ${tag.productCount} products tagged with #${tag.name}`
          : "Browse products by tag",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "keywords",
        content: tag
          ? `${tag.name}, products, shop, tags`
          : "products, shop, tags",
      },
    ],
  }));
}
