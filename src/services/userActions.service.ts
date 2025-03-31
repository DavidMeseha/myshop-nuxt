import type { IProductAttribute } from "../types";
import { useFetchApi } from "../lib/fetch";

export async function removeFromCart(id: string) {
  const { $fetch } = useNuxtApp();
  return await $fetch(`/api/common/cart/remove/${id}`, {
    method: "DELETE",
  });
}

export async function addToCart(
  id: string,
  attributes: IProductAttribute[],
  quantity: number
) {
  const { $fetch } = useNuxtApp();
  return await $fetch(`/api/common/cart/add/${id}`, {
    method: "POST",
    body: { attributes, quantity },
  });
}

export async function likeProduct(id: string) {
  const { $fetch } = useNuxtApp();
  return await $fetch(`/api/user/likeProduct/${id}`, {
    method: "POST",
  });
}

export async function unLikeProduct(id: string) {
  const { $fetch } = useNuxtApp();
  return await $fetch(`/api/user/unlikeProduct/${id}`, {
    method: "POST",
  });
}

export async function followVendor(id: string) {
  const { data } = await useFetchApi(`/api/user/followVendor/${id}`, {
    method: "POST",
  });
  return data.value;
}

export async function unfollowVendor(id: string) {
  const { data } = await useFetchApi(`/api/user/unfollowVendor/${id}`, {
    method: "POST",
  });
  return data.value;
}

export async function saveProduct(id: string) {
  const { $fetch } = useNuxtApp();
  return await $fetch(`/api/user/saveProduct/${id}`, {
    method: "POST",
  });
}

export async function unsaveProduct(id: string) {
  const { $fetch } = useNuxtApp();
  return await $fetch(`/api/user/unsaveProduct/${id}`, {
    method: "POST",
  });
}
