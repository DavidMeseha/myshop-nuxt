import type { IProductAttribute } from "../types";

export default function useUserActionsRepo() {
  const { $fetch } = useNuxtApp();

  async function removeFromCart(id: string) {
    return await $fetch(`/api/common/cart/remove/${id}`, {
      method: "DELETE",
    });
  }

  async function addToCart(
    id: string,
    attributes: IProductAttribute[],
    quantity: number
  ) {
    return await $fetch(`/api/common/cart/add/${id}`, {
      method: "POST",
      body: { attributes, quantity },
    });
  }

  async function likeProduct(id: string) {
    return await $fetch(`/api/user/likeProduct/${id}`, {
      method: "POST",
    });
  }

  async function unLikeProduct(id: string) {
    return await $fetch(`/api/user/unlikeProduct/${id}`, {
      method: "POST",
    });
  }

  async function followVendor(id: string) {
    return $fetch(`/api/user/followVendor/${id}`, {
      method: "POST",
    });
  }

  async function unfollowVendor(id: string) {
    return $fetch(`/api/user/unfollowVendor/${id}`, {
      method: "POST",
    });
  }

  async function saveProduct(id: string) {
    return await $fetch(`/api/user/saveProduct/${id}`, {
      method: "POST",
    });
  }

  async function unsaveProduct(id: string) {
    return await $fetch(`/api/user/unsaveProduct/${id}`, {
      method: "POST",
    });
  }

  return {
    removeFromCart,
    addToCart,
    likeProduct,
    unLikeProduct,
    followVendor,
    unfollowVendor,
    saveProduct,
    unsaveProduct,
  };
}
