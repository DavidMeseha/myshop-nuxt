import { setLastPageBeforSignUp } from "~/lib/localestorageAPI";

export default defineNuxtRouteMiddleware((to) => {
  const { isClient } = useNuxtApp();
  if (isClient) {
    const excludedPages = ["/login", "/register"];
    if (!excludedPages.includes(to.path)) {
      setLastPageBeforSignUp(to.fullPath);
    }
  }
});
