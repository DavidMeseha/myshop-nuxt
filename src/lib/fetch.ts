import type { UseFetchOptions } from "nuxt/app";

export const fetchApi = <T>(url: string, options: UseFetchOptions<T> = {}) => {
  const config = useRuntimeConfig();
  const token = process.client ? localStorage.getItem("token") : "";

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBaseUrl as string,
    key: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
    },
    ...options,
  };

  return useFetch(url, defaults);
};
