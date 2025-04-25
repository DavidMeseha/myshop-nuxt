import { defineNuxtPlugin } from "#app";
import { useUserStore } from "~/stores/useUserStore";
import { storeToRefs } from "pinia";
import useAuthRepo from "~/services/auth.service";

export default defineNuxtPlugin(() => {
  const userStore = useUserStore();
  const { refreshToken } = useAuthRepo();
  const { user } = storeToRefs(userStore);

  let refreshInterval: NodeJS.Timeout | null = null;

  const startRefreshInterval = () => {
    if (refreshInterval) clearInterval(refreshInterval);

    refreshInterval = setInterval(async () => {
      if (!user.value?.isRegistered) return;

      try {
        await refreshToken();
      } catch (error) {
        console.error("Failed to refresh token:", error);
        stopRefreshInterval();
      }
    }, 14 * 60 * 1000);
  };

  const stopRefreshInterval = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  };

  // Start the refresh interval if the user is registered
  if (user.value?.isRegistered) {
    startRefreshInterval();
  }

  // Watch for user login/logout
  watch(
    () => user.value?.isRegistered,
    (isRegistered) => {
      if (isRegistered) {
        startRefreshInterval();
      } else {
        stopRefreshInterval();
      }
    }
  );

  window.addEventListener("beforeunload", stopRefreshInterval);

  onUnmounted(() => {
    stopRefreshInterval();
    window.removeEventListener("beforeunload", stopRefreshInterval);
  });
});
