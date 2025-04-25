import useUserActionsRepo from "~/services/userActions.service";
import { useUserStore } from "~/stores/useUserStore";
import type { FetchError } from "~/types";

interface Props {
  productId: string;
  onSuccess?: (shouldSave: boolean) => void;
  onError?: (shouldSave: boolean) => void;
  onClick?: (shouldSave: boolean) => void;
}

export default function usesaveProduct({
  productId,
  onSuccess,
  onError,
  onClick,
}: Props) {
  const { user } = useUserStore();
  const { saveProduct, unsaveProduct } = useUserActionsRepo();
  const isLoading = ref(false);
  const timeoutId = ref<number | null>(null);
  const { $toast } = useNuxtApp();
  const t = useTranslation();

  const saveMutation = async () => {
    isLoading.value = true;
    await saveProduct(productId)
      .then(() => {
        onSuccess?.(true);
      })
      .catch((err) => {
        if (err.response.status === 409) return onSuccess?.(true);
        onError?.(true);
      })
      .finally(() => (isLoading.value = false));
  };

  const unsaveMutation = async () => {
    isLoading.value = true;
    await unsaveProduct(productId)
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
  const handleSaveToggle = (shouldSave: boolean) => {
    if (!user) return;

    if (!user.isRegistered) {
      return $toast.warning(t("loginToPerformAction"), {
        action: {
          label: t("login"),
          onClick: () => navigateTo("/login"),
        },
      });
    }

    onClick?.(shouldSave);

    if (timeoutId.value) {
      window.clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }

    timeoutId.value = window.setTimeout(() => {
      if (shouldSave) return saveMutation();
      unsaveMutation();
    }, 600);
  };

  return handleSaveToggle;
}
