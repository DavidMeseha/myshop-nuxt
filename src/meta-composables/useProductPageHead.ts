import type { IFullProduct } from "~/types";
import { useBaseSeoHead } from "./useBasePageHead";

export default function useProductPageHead(product: IFullProduct | null) {
  useBaseSeoHead({
    title: product?.name ?? "Product",
    description: product?.shortDescription ?? "",
    keywords: product
      ? [product.name, product.category?.name, "shop", "product"]
      : ["product", "shop"],
    image: product?.pictures[0]?.imageUrl,
    type: "product",
    noindex: !product,
    currency: "USD",
    price: product?.price.price.toString(),
  });
}
