import { setLastPageBeforSignUp } from "~/lib/localestorageAPI";

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const localPath = useLocalePath();
    const excludedPages = [localPath("/login"), localPath("/register")];
    if (!excludedPages.includes(to.path)) {
      setLastPageBeforSignUp(to.fullPath);
    }
  }
});
