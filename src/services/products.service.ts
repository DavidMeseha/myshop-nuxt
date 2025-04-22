import { useFetchApi } from "../lib/fetch";
import type {
  ICategory,
  IFullProduct,
  IProductAttribute,
  ITag,
  IVendor,
  Pagination,
} from "../types";

export function homeFeedProducts({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { $fetch } = useNuxtApp();
  return $fetch<{ data: IFullProduct[]; pages: Pagination }>(
    "/api/catalog/homefeed",
    {
      params: { page, limit },
    }
  );
}

export async function getProductDetails(id: string) {
  const { data } = await useFetchApi<IFullProduct>(
    `/api/catalog/product/${id}`
  );
  return data.value;
}

export async function getProductAttributes(id: string) {
  return await useFetchApi<{
    _id: string;
    productAttributes: IProductAttribute[];
    hasAttributes: boolean;
    seName: string;
    name: string;
  }>(`/api/product/attributes/${id}`);
}

export async function addReview(
  productId: string,
  form: { reviewText: string; rating: number }
) {
  const { data } = await useFetchApi(`/api/user/addReview/${productId}`, {
    method: "POST",
    body: form,
  });
  return data.value;
}

export async function getVendors(params: { page: number; limit: number }) {
  const { data } = await useFetchApi<{ data: IVendor[]; pages: Pagination }>(
    "/api/catalog/discover/vendors",
    { params }
  );
  return data.value;
}

export async function getCategories(params: { page: number }) {
  const { data } = await useFetchApi<{ data: ICategory[]; pages: Pagination }>(
    "/api/catalog/discover/categories",
    { params }
  );
  return data.value;
}

export async function getTags(params: { page: number; limit: number }) {
  return await useFetchApi<{ data: ITag[]; pages: Pagination }>(
    "/api/catalog/discover/tags",
    { params }
  );
}

export async function getProductsByCateory(
  categoryId: string,
  params: { page: number }
) {
  const { data } = await useFetchApi<{
    data: IFullProduct[];
    pages: Pagination;
  }>(`/api/catalog/CategoryProducts/${categoryId}`, { params });
  return data.value;
}

export async function getProductsByTag(
  tagId: string,
  params: { page: number }
) {
  const { $fetch } = useNuxtApp();
  return $fetch<{
    data: IFullProduct[];
    pages: Pagination;
  }>(`/api/Catalog/TagProducts/${tagId}`, { params });
}

export async function getProductsByVendor(
  vendorId: string,
  params: { page: number; limit: number }
) {
  const { data } = await useFetchApi<{
    data: IFullProduct[];
    pages: Pagination;
  }>(`/api/catalog/VendorProducts/${vendorId}`, { params });
  return data.value;
}

export async function getProductBySeName(seName: string) {
  const { $fetch } = useNuxtApp();
  return $fetch<IFullProduct>(`/api/product/details/${seName}`);
}

export async function getProductUserActions(seName: string) {
  const { $fetch } = useNuxtApp();
  return $fetch<{
    isLiked: boolean;
    isSaved: boolean;
    isInCart: boolean;
    isReviewed: boolean;
  }>(`/api/product/actions/${seName}`);
}

export function getTagInfo(seName: string) {
  const { $fetch } = useNuxtApp();
  return $fetch<ITag>(`/api/Catalog/tag/${seName}`);
}
