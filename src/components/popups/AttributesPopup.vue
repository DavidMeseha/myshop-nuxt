<template>
  <ProductAttributes
    :attributes="product?.productAttributes ?? []"
    :handleChange="handleAttributesChange"
    :customAttributes="customAttributes"
  />
  <Button buttonClass="w-full mt-4" @click="handleSubmit">{{
    t("addToCart")
  }}</Button>
</template>

<script setup lang="ts">
import { selectDefaultAttributes } from "~/lib/misc";
import useProductsRepo from "~/services/products.service";
import Button from "~/components/common/Button.vue";
import ProductAttributes from "~/components/ProductAttributes.vue";
import type { IProductAttribute } from "~/types";

const { productId, action } = defineProps({
  productId: { type: String, required: true },
  action: {
    type: Function as PropType<(attributes: IProductAttribute[]) => void>,
    required: true,
  },
});

const t = useTranslation();
const { getProductAttributes } = useProductsRepo();
const customAttributes = ref<IProductAttribute[]>([]);
const handleSubmit = () => action(customAttributes.value);

const { data: product } = useAsyncData(`product-attributes-${productId}`, () =>
  getProductAttributes(productId).then((res) => {
    if (res.productAttributes.length === 0) return res;
    customAttributes.value = selectDefaultAttributes(res.productAttributes);
  })
);

const handleAttributesChange = (attributeId: string, value: string[]) => {
  if (!product.value) return;
  let tempAttributes = [...customAttributes.value];
  const index = tempAttributes.findIndex((attr) => attr._id === attributeId);

  const originalAttribute = product.value.productAttributes.find(
    (attr) => attr._id === attributeId
  ) as IProductAttribute;
  const selectedValues = originalAttribute.values.filter((val) =>
    value.includes(val._id)
  ) as IProductAttribute[];

  tempAttributes[index] = { ...originalAttribute, values: selectedValues };

  customAttributes.value = [...tempAttributes];
};
</script>
