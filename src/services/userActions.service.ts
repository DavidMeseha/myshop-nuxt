import type { IProductAttribute } from "../types";
import { fetchApi } from "../lib/fetch";

export async function removeFromCart(id: string) {
  const { data } = await fetchApi(`/api/common/cart/remove/${id}`, {
    method: "DELETE",
  });
  return data.value;
}

export async function addToCart(
  id: string,
  attributes: IProductAttribute[],
  quantity: number
) {
  const { data } = await fetchApi(`/api/common/cart/add/${id}`, {
    method: "POST",
    body: { attributes, quantity },
  });
  return data.value;
}

export async function likeProduct(id: string) {
  const { data } = await fetchApi(`/api/user/likeProduct/${id}`, {
    method: "POST",
  });
  return data.value;
}

export async function unLikeProduct(id: string) {
  const { data } = await fetchApi(`/api/user/unlikeProduct/${id}`, {
    method: "POST",
  });
  return data.value;
}

export async function followVendor(id: string) {
  const { data } = await fetchApi(`/api/user/followVendor/${id}`, {
    method: "POST",
  });
  return data.value;
}

export async function unfollowVendor(id: string) {
  const { data } = await fetchApi(`/api/user/unfollowVendor/${id}`, {
    method: "POST",
  });
  return data.value;
}

export async function saveProduct(id: string) {
  const { data } = await fetchApi(`/api/user/saveProduct/${id}`, {
    method: "POST",
  });
  return data.value;
}

export async function unsaveProduct(id: string) {
  const { data } = await fetchApi(`/api/user/unsaveProduct/${id}`, {
    method: "POST",
  });
  return data.value;
}
