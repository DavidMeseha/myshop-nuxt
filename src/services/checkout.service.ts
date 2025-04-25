import type {
  IAddress,
  IFullProduct,
  IOrder,
  IProductAttribute,
} from "../types";

export default function useCheckoutRepo() {
  const { $fetch } = useNuxtApp();

  async function checkoutData() {
    return $fetch<{
      total: number;
      cartItems: {
        product: IFullProduct;
        quantity: number;
        attributes: IProductAttribute[];
      }[];
      addresses: IAddress[];
    }>("/api/common/checkout", { method: "GET" });
  }

  async function preperCardPayment() {
    return $fetch<{ paymentSecret: string }>("/api/user/preperPayment", {
      method: "GET",
    });
  }

  function placeOrder(form: {
    billingMethod: string;
    shippingAddressId: string;
  }) {
    return $fetch<IOrder>(`/api/user/order/submit`, {
      method: "POST",
      body: { ...form },
    });
  }

  return {
    checkoutData,
    preperCardPayment,
    placeOrder,
  };
}
