import { fetchApi } from "../lib/fetch";
import type {
  IAddress,
  IFullProduct,
  IOrder,
  IProductReview,
  IVendor,
  Pagination,
  UserInfoForm,
  UserProfile,
} from "../types";

export async function userAdresses() {
  const { data } = await fetchApi<IAddress[]>("/api/user/addresses");
  return data.value;
}

export async function newAddress(address: {
  city: string;
  country: string;
  address: string;
}) {
  const { data } = await fetchApi("/api/user/addresses/add", {
    method: "POST",
    body: address,
  });
  return data.value;
}

export async function deleteAddress(id: string) {
  const { data } = await fetchApi(`/api/user/address/delete/${id}`, {
    method: "DELETE",
  });
  return data.value;
}

export async function updateAddress(address: {
  _id: string;
  city: string;
  country: string;
  address: string;
}) {
  const { data } = await fetchApi(`/api/user/addresses/edit/${address._id}`, {
    method: "PUT",
    body: {
      city: address.city,
      country: address.country,
      address: address.address,
    },
  });
  return data.value;
}

export async function citiesInCountry(countryId: string) {
  const { data } = await fetchApi<
    { name: string; code: string; _id: string }[]
  >(`/api/common/cities/${countryId}`);
  return data.value;
}

export async function getSavedProducts() {
  const { data } = await fetchApi<IFullProduct[]>("/api/user/savedProducts");
  return data.value;
}

export async function getCartProducts() {
  const { data } = await fetchApi<IFullProduct[]>("/api/common/cart");
  return data.value;
}

export async function getUserInfo() {
  const { data } = await fetchApi<UserProfile>("/api/user/info");
  return data.value;
}

export async function updateUserInfo(userInfo: UserInfoForm) {
  const { data } = await fetchApi("/api/user/info", {
    method: "PUT",
    body: userInfo,
  });
  return data.value;
}

export async function getFollowingVendors() {
  const { data } = await fetchApi<IVendor[]>("/api/user/followingVendors");
  return data.value;
}

export async function getOrder(id: string) {
  const { data } = await fetchApi<IOrder>(`/api/user/order/${id}`);
  return data.value;
}

export async function getOrders() {
  const { data } = await fetchApi<IOrder[]>("/api/user/orders");
  return data.value;
}

export async function getUserReviews(params: { page: number }) {
  const { data } = await fetchApi<{
    data: IProductReview[];
    pages: Pagination;
  }>("/api/user/reviews", { params });
  return data.value;
}
