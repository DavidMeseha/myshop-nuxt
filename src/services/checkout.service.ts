import type {
  IAddress,
  IFullProduct,
  IOrder,
  IProductAttribute,
} from "../types";
import { fetchApi } from "../lib/fetch";

export async function checkoutData() {
  return fetchApi<{
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
  return fetchApi<{ paymentSecret: string }>("/api/user/preperPayment", {
    method: "GET",
  });
}

export function placeOrder(form: {
  billingMethod: string;
  shippingAddressId: string;
}) {
  return fetchApi<IOrder>(`/api/user/order/submit`, {
    method: "POST",
    body: { ...form },
  });
}
