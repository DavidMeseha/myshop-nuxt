import type { IFullProduct } from "../types";
import {  useFetchApi } from "../lib/fetch";

const createProduct = async (product: IFullProduct) => {
  return  useFetchApi("/products", {
    method: "POST",
    body: { product: { ...product } },
  });
};

export default createProduct;
