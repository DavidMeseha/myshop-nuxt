import { fetchApi } from "../lib/fetch";
import type {
  ICategory,
  IFullProduct,
  IProductAttribute,
  ITag,
  IVendor,
  Pagination,
} from "../types";

export async function homeFeedProducts({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { data } = await fetchApi<{ data: IFullProduct[]; pages: Pagination }>(
    "/api/catalog/homefeed",
    {
      params: { page, limit },
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
  return data.value;
}

export async function getProductDetails(id: string) {
  const { data } = await fetchApi<IFullProduct>(`/api/catalog/product/${id}`);
  return data.value;
}

export async function getProductAttributes(id: string) {
  const { data } = await fetchApi<{
    _id: string;
    productAttributes: IProductAttribute[];
    hasAttributes: boolean;
    seName: string;
    name: string;
  }>(`/api/product/attributes/${id}`);
  return data.value;
}

export async function addReview(
  productId: string,
  form: { reviewText: string; rating: number }
) {
  const { data } = await fetchApi(`/api/user/addReview/${productId}`, {
    method: "POST",
    body: form,
  });
  return data.value;
}

export async function getVendors(params: { page: number; limit: number }) {
  const { data } = await fetchApi<{ data: IVendor[]; pages: Pagination }>(
    "/api/catalog/discover/vendors",
    { params }
  );
  return data.value;
}

export async function getCategories(params: { page: number }) {
  const { data } = await fetchApi<{ data: ICategory[]; pages: Pagination }>(
    "/api/catalog/discover/categories",
    { params }
  );
  return data.value;
}

export async function getTags(params: { page: number; limit: number }) {
  const { data } = await fetchApi<{ data: ITag[]; pages: Pagination }>(
    "/api/catalog/discover/tags",
    { params }
  );
  return data.value;
}

export async function getProductsByCateory(
  categoryId: string,
  params: { page: number }
) {
  const { data } = await fetchApi<{ data: IFullProduct[]; pages: Pagination }>(
    `/api/catalog/CategoryProducts/${categoryId}`,
    { params }
  );
  return data.value;
}

export async function getProductsByTag(
  tagId: string,
  params: { page: number }
) {
  const { data } = await fetchApi<{ data: IFullProduct[]; pages: Pagination }>(
    `/api/Catalog/TagProducts/${tagId}`,
    { params }
  );
  return data.value;
}

export async function getProductsByVendor(
  vendorId: string,
  params: { page: number; limit: number }
) {
  const { data } = await fetchApi<{ data: IFullProduct[]; pages: Pagination }>(
    `/api/catalog/VendorProducts/${vendorId}`,
    { params }
  );
  return data.value;
}
