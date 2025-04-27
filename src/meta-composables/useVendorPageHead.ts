import type { IVendor } from "~/types";
import { useBaseSeoHead } from "./useBasePageHead";

export default function useVendorPageHead(vendor: IVendor | null) {
  useBaseSeoHead({
    title: vendor?.name ?? "Vendor",
    description: vendor
      ? `Browse ${vendor.productCount} products sold by ${vendor.name}`
      : "Browse products by vendor",
    keywords: vendor
      ? [vendor.name, "products", "shop", "vendors"]
      : ["products", "shop", "vendors"],
    image: vendor?.imageUrl,
    type: "website",
  });
}
