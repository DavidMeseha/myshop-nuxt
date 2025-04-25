import { useUserStore } from "~/stores/useUserStore";
import { removeToken, setToken } from "~/lib/localestorageAPI";
import useAuthRepo from "~/services/auth.service";
import { useRouter } from "vue-router";

export default function useLogout() {
  const userStore = useUserStore();
  const { getGuestToken } = useAuthRepo();
  const router = useRouter();
  const localPath = useLocalePath();

  const logout = async () => {
    try {
      removeToken();

      const guestRes = await getGuestToken();
      if (guestRes) {
        setToken(guestRes.token);
        userStore.setUser(guestRes.user);
        userStore.setCartItems();
        router.push(localPath("/login"));
      }
    } catch (error) {
      const { $toast } = useNuxtApp();
      $toast.error(
        "Failed to log out and fetch guest token some actions my fail"
      );
    }
  };

  return logout;
}
