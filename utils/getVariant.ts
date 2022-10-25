import type { Product } from '@chec/commerce.js/types/product';

interface Props {
  product: Product;
}

export const options = ({ product }: Props) => ({
  ...product.variant_groups?.reduce(
    (acc, variant) => ({
      ...acc,
      [variant.id]: variant.options[0].id
    }),
    {}
  )
});
