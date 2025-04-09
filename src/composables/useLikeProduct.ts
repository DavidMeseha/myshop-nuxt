import { likeProduct, unLikeProduct } from "~/services/userActions.service";
import { useUserStore } from "~/stores/useUserStore";
import type { FetchError } from "~/types";

interface Props {
  productId: string;
  onSuccess?: (shouldLike: boolean) => void;
  onError?: (shouldLike: boolean) => void;
  onClick?: (shouldLike: boolean) => void;
}

export default function useLikeProduct({
  productId,
  onSuccess,
  onError,
  onClick,
}: Props) {
  const { user } = useUserStore();
  const isLoading = ref(false);
  const timeoutId = ref<number | null>(null);
  const { $toast } = useNuxtApp();

  const likeMutation = async () => {
    isLoading.value = true;
    await likeProduct(productId)
      .then((res) => {
        onSuccess?.(true);
      })
      .catch((err) => {
        if (err.response.status === 409) return onSuccess?.(true);
        onError?.(true);
      })
      .finally(() => (isLoading.value = false));
  };

  const unlikeMutation = async () => {
    isLoading.value = true;
    await unLikeProduct(productId)
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
  const handleLikeToggle = (shouldLike: boolean) => {
    if (!user) return;

    if (!user.isRegistered)
      return $toast.error("Please login to like products");

    onClick?.(shouldLike);

    if (timeoutId.value) {
      window.clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }

    timeoutId.value = window.setTimeout(() => {
      if (shouldLike) return likeMutation();
      unlikeMutation();
    }, 600);
  };

  return handleLikeToggle;
}
