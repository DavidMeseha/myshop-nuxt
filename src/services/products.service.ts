import type {
  ICategory,
  IFullProduct,
  IProductAttribute,
  ITag,
  IVendor,
  Pagination,
} from "../types";

export default function useProductsRepo() {
  const { $fetch } = useNuxtApp();

  function homeFeedProducts({ page, limit }: { page: number; limit: number }) {
    return $fetch<{ data: IFullProduct[]; pages: Pagination }>(
      "/api/catalog/homefeed",
      {
        params: { page, limit },
      }
    );
  }

  async function getProductDetails(id: string) {
    return $fetch<IFullProduct>(`/api/catalog/product/${id}`);
  }

  async function getProductAttributes(id: string) {
    return $fetch<{
      _id: string;
      productAttributes: IProductAttribute[];
      hasAttributes: boolean;
      seName: string;
      name: string;
    }>(`/api/product/attributes/${id}`);
  }

  async function addReview(
    productId: string,
    form: { reviewText: string; rating: number }
  ) {
    return $fetch(`/api/user/addReview/${productId}`, {
      method: "POST",
      body: form,
    });
  }

  async function getVendors(params: { page: number; limit: number }) {
    return $fetch<{ data: IVendor[]; pages: Pagination }>(
      "/api/catalog/discover/vendors",
      { params }
    );
  }

  async function getCategories(params: { page: number }) {
    return $fetch<{
      data: ICategory[];
      pages: Pagination;
    }>("/api/catalog/discover/categories", { params });
  }

  async function getTags(params: { page: number; limit: number }) {
    return $fetch<{ data: ITag[]; pages: Pagination }>(
      "/api/catalog/discover/tags",
      { params }
    );
  }

  async function getProductsByCateory(
    categoryId: string,
    params: { page: number }
  ) {
    return $fetch<{
      data: IFullProduct[];
      pages: Pagination;
    }>(`/api/catalog/CategoryProducts/${categoryId}`, { params });
  }

  async function getProductsByTag(tagId: string, params: { page: number }) {
    return $fetch<{
      data: IFullProduct[];
      pages: Pagination;
    }>(`/api/Catalog/TagProducts/${tagId}`, { params });
  }

  async function getProductsByVendor(
    vendorId: string,
    params: { page: number; limit: number }
  ) {
    return $fetch<{
      data: IFullProduct[];
      pages: Pagination;
    }>(`/api/catalog/VendorProducts/${vendorId}`, { params });
  }

  async function getProductBySeName(seName: string) {
    return $fetch<IFullProduct>(`/api/product/details/${seName}`);
  }

  async function getProductUserActions(seName: string) {
    return $fetch<{
      isLiked: boolean;
      isSaved: boolean;
      isInCart: boolean;
      isReviewed: boolean;
    }>(`/api/product/actions/${seName}`);
  }

  function getTagInfo(seName: string) {
    return $fetch<ITag>(`/api/Catalog/tag/${seName}`);
  }

  return {
    homeFeedProducts,
    getProductDetails,
    getProductAttributes,
    addReview,
    getVendors,
    getCategories,
    getTags,
    getProductsByCateory,
    getProductsByTag,
    getProductsByVendor,
    getProductBySeName,
    getProductUserActions,
    getTagInfo,
  };
}
