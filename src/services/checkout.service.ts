import type {
  IAddress,
  IFullProduct,
  IOrder,
  IProductAttribute,
} from "../types";
import {  useFetchApi } from "../lib/fetch";

export async function checkoutData() {
  return  useFetchApi<{
    total: number;
    cartItems: {
      product: IFullProduct;
      quantity: number;
      attributes: IProductAttribute[];
    }[];
    addresses: IAddress[];
  }>("/api/common/checkout", { method: "GET" }).then((res) => res.data.value);
}

export async function preperCardPayment() {
  return  useFetchApi<{ paymentSecret: string }>("/api/user/preperPayment", {
    method: "GET",
  });
}

export function placeOrder(form: {
  billingMethod: string;
  shippingAddressId: string;
}) {
  return  useFetchApi<IOrder>(`/api/user/order/submit`, {
    method: "POST",
    body: { ...form },
  });
}
