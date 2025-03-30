import { defineNuxtPlugin } from "#app";
import { checkTokenValidity, getGuestToken } from "~/services/auth.service";
import { setToken } from "~/lib/localestorageAPI";
import { useUserStore } from "~/stores/useUserStore";

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();

  try {
    const res = await checkTokenValidity();
    if (res) userStore.setUser(res);
  } catch (error) {
    try {
      const guestRes = await getGuestToken();
      if (guestRes) {
        setToken(guestRes.token);
        userStore.setUser(guestRes.user);
      }
    } catch (guestError) {
      console.error("Failed to fetch guest token:", guestError);
    }
  } finally {
    userStore.setCartItems();
  }
});
