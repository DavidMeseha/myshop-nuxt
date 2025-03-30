import { useFetchApi } from "../lib/fetch";

export async function getLikeIds() {
  const { data } = await  useFetchApi<string[]>("/api/common/likesId", {
    default: () => null,
  });
  return data.value ?? [];
}

export async function getSaveIds() {
  const { data } = await  useFetchApi<string[]>("/api/common/savesId", {
    default: () => null,
  });
  return data.value;
}

export async function getFollowIds() {
  const { data } = await  useFetchApi<string[]>("/api/common/followingIds", {
    default: () => null,
  });
  return data.value;
}

export async function getReviewIds() {
  const { data } = await  useFetchApi<string[]>("/api/common/reviewedIds", {
    default: () => null,
  });
  return data.value;
}

export async function getCartIds() {
  const { data } = await  useFetchApi<string[]>("/api/common/cart/ids", {
    default: () => null,
  });
  return data.value;
}
