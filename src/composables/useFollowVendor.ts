import useUserActionsRepo from "~/services/userActions.service";
import { useUserStore } from "~/stores/useUserStore";
import type { FetchError } from "~/types";

interface Props {
  vendorId: string;
  onSuccess?: (shouldFollow: boolean) => void;
  onError?: (shouldFollow: boolean) => void;
  onClick?: (shouldFollow: boolean) => void;
}

export default function usefollowVendor({
  vendorId,
  onSuccess,
  onError,
  onClick,
}: Props) {
  const { user } = useUserStore();
  const { followVendor, unfollowVendor } = useUserActionsRepo();
  const isLoading = ref(false);
  const timeoutId = ref<number | null>(null);
  const { $toast } = useNuxtApp();
  const t = useTranslation();

  const followMutation = async () => {
    isLoading.value = true;
    await followVendor(vendorId)
      .then((res) => {
        onSuccess?.(true);
      })
      .catch((err) => {
        if (err.response.status === 409) return onSuccess?.(true);
        onError?.(true);
      })
      .finally(() => (isLoading.value = false));
  };

  const unfollowMutation = async () => {
    isLoading.value = true;
    await unfollowVendor(vendorId)
      .then(() => {
        onSuccess?.(false);
      })
      .catch((err: FetchError) => {
        if (err.response.status === 409) return onSuccess?.(false);
        onError?.(false);
      })
      .finally(() => (isLoading.value = false));
  };

  // Main handler function
  const handleFollowToggle = (shouldFollow: boolean) => {
    if (!user) return;

    if (!user.isRegistered) {
      return $toast.warning(t("loginToPerformAction"), {
        action: {
          label: t("login"),
          onClick: () => navigateTo("/login"),
        },
      });
    }

    onClick?.(shouldFollow);

    if (timeoutId.value) {
      window.clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }

    timeoutId.value = window.setTimeout(() => {
      if (shouldFollow) return followMutation();
      unfollowMutation();
    }, 600);
  };

  return handleFollowToggle;
}
