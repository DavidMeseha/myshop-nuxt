import { defineNuxtPlugin } from "#app";
import { useUserStore } from "~/stores/useUserStore";
import { storeToRefs } from "pinia";
import { refreshToken } from "~/services/auth.service";

export default defineNuxtPlugin(() => {
  let refreshInterval: NodeJS.Timeout | null = null;

  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);

  if (user.value?.isRegistered) {
    refreshInterval = setInterval(() => {
      refreshToken().catch((error) => {
        console.error("Failed to refresh token:", error);
      });
    }, 15 * 60 * 1000); // 15 minutes
  }

  window.addEventListener("beforeunload", () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
  });
});
