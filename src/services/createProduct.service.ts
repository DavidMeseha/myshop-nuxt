import type { IFullProduct } from "../types";
import { fetchApi } from "../lib/fetch";

const createProduct = async (product: IFullProduct) => {
  return fetchApi("/products", {
    method: "POST",
    body: { product: { ...product } },
  });
};

export default createProduct;
