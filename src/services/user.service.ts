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

export default function useUserRepo() {
  const { $fetch } = useNuxtApp();

  async function userAdresses() {
    return $fetch<IAddress[]>("/api/user/addresses");
  }

  async function newAddress(address: {
    city: string;
    country: string;
    address: string;
  }) {
    return $fetch("/api/user/addresses/add", {
      method: "POST",
      body: address,
    });
  }

  async function deleteAddress(id: string) {
    return $fetch(`/api/user/address/delete/${id}`, {
      method: "DELETE",
    });
  }

  async function updateAddress(address: {
    _id: string;
    city: string;
    country: string;
    address: string;
  }) {
    return $fetch(`/api/user/addresses/edit/${address._id}`, {
      method: "PUT",
      body: {
        city: address.city,
        country: address.country,
        address: address.address,
      },
    });
  }

  async function citiesInCountry(countryId: string) {
    return $fetch<{ name: string; code: string; _id: string }[]>(
      `/api/common/cities/${countryId}`
    );
  }

  async function getSavedProducts() {
    return $fetch<IFullProduct[]>("/api/user/savedProducts");
  }

  async function getCartProducts() {
    return $fetch<IFullProduct[]>("/api/common/cart");
  }

  async function getUserInfo() {
    return $fetch<UserProfile>("/api/user/info");
  }

  async function updateUserInfo(userInfo: UserInfoForm) {
    return $fetch("/api/user/info", {
      method: "PUT",
      body: userInfo,
    });
  }

  async function getFollowingVendors() {
    return $fetch<IVendor[]>("/api/user/followingVendors");
  }

  async function getOrder(id: string) {
    return $fetch<IOrder>(`/api/user/order/${id}`);
  }

  async function getOrders() {
    return $fetch<IOrder[]>("/api/user/orders");
  }

  async function getUserReviews(params: { page: number }) {
    return $fetch<{
      data: IProductReview[];
      pages: Pagination;
    }>("/api/user/reviews", { params });
  }

  return {
    userAdresses,
    newAddress,
    deleteAddress,
    updateAddress,
    citiesInCountry,
    getSavedProducts,
    getCartProducts,
    getUserInfo,
    updateUserInfo,
    getFollowingVendors,
    getOrder,
    getOrders,
    getUserReviews,
  };
}
