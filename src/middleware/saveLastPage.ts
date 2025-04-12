import { setLastPageBeforSignUp } from "~/lib/localestorageAPI";

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const excludedPages = ["/login", "/register"];
    if (!excludedPages.includes(to.path)) {
      setLastPageBeforSignUp(to.fullPath);
    }
  }
});
