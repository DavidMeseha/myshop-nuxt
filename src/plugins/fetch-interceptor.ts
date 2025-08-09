export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  // Extend $fetch globally
  const customFetch = $fetch.create({
    baseURL: runtimeConfig.public.apiBaseUrl,
    onRequest({ options }) {
      // Add Authorization token to headers if available
      const token = import.meta.client ? localStorage.getItem("token") : "";
      if (token) {
        options.headers.append("Authorization", `Bearer ${token}`);
      }
    },
    onResponseError({ response }) {
      console.error("Response error:", response._data || response.statusText);
      // Handle errors globally
      if (response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        // Redirect to login page
        const router = useRouter();
        router.push("/login");
      } else if (response.status >= 500) {
        console.error("Server error:", response._data || response.statusText);
      }

      throw new Error("errror");
    },

    onRequestError({ error }) {
      console.error("Request error:", error);
      console.log(error);
      showError(
        "My api server pill needs to be paied, be patiant and try again later, thanks for understanding!"
      );
    },
  });

  // Provide the custom fetch instance globally
  return {
    provide: {
      fetch: customFetch,
    },
  };
});
