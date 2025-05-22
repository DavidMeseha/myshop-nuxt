import { useUserStore } from "~/stores/useUserStore";
import type { FetchError, IFullProduct, IProductAttribute } from "~/types";
import { usePopupStore } from "~/stores/popupStore";
import AttributesPopup from "~/components/popups/AttributesPopup.vue";
import useUserActionsRepo from "~/services/userActions.service";

export type IAddToCartProduct = Pick<
  IFullProduct,
  "_id" | "name" | "productAttributes" | "seName" | "hasAttributes"
>;
interface CartHookProps {
  product: IAddToCartProduct;
  onSuccess?: (added: boolean) => void;
}

interface CartMutationProps {
  attributes: IProductAttribute[];
  quantity: number;
}

export default function useAddToCart({ product, onSuccess }: CartHookProps) {
  const { user, setCartItems } = useUserStore();
  const { openPopup, closePopup } = usePopupStore();
  const { addToCart, removeFromCart } = useUserActionsRepo();
  const isLoading = ref(false);

  const openAttributePopup = () => {
    openPopup(AttributesPopup, {
      productId: product.seName,
      action: (attributes: IProductAttribute[]) =>
        addToCartMutation({ attributes, quantity: 1 }),
    });
  };

  const addToCartMutation = async ({
    attributes,
    quantity,
  }: CartMutationProps) => {
    closePopup();
    isLoading.value = true;
    await addToCart(product._id, attributes, quantity)
      .then(() => {
        setCartItems();
        onSuccess?.(true);
      })
      .catch((err) => {
        if (err.response.status === 409) onSuccess?.(true);
      })
      .finally(() => (isLoading.value = false));
  };

  const removeFromCartMutation = async () => {
    isLoading.value = true;
    await removeFromCart(product._id)
      .then((res) => {
        onSuccess?.(false);
        setCartItems();
      })
      .catch((err: FetchError) => {
        if (err.response.status === 409) onSuccess?.(false);
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  // Helper function to handle product attributes
  const handleProductAttributes = (
    quantity: number,
    attributes?: IProductAttribute[]
  ) => {
    if (!attributes) return openAttributePopup();
    addToCartMutation({ attributes, quantity });
  };

  // Main handler function
  const handleAddToCart = (
    shouldAdd: boolean,
    selectedAttributes?: IProductAttribute[],
    quantity: number = 1
  ) => {
    if (!user) return;
    if (isLoading.value) return;

    if (shouldAdd) {
      if (product.hasAttributes)
        return handleProductAttributes(quantity, selectedAttributes);

      return addToCartMutation({ attributes: [], quantity });
    }

    removeFromCartMutation();
  };

  return { handleAddToCart, isLoading };
}
