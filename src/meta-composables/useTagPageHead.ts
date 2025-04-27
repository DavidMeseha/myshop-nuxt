import type { ITag } from "~/types";
import { useBaseSeoHead } from "./useBasePageHead";

export default function useTagPageHead(tag: ITag | null) {
  useBaseSeoHead({
    title: tag ? `#${tag.name}` : "Products",
    description: tag
      ? `Browse ${tag.productCount} products tagged with #${tag.name}`
      : "Browse products by tag",
    keywords: tag
      ? [tag.name, "products", "shop", "tags"]
      : ["products", "shop", "tags"],
    type: "website",
  });
}
