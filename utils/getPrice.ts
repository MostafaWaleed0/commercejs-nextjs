import { Product } from '@chec/commerce.js/types/product';

interface Props {
  selectedOptions: {};
  product: Product;
}

export const getPrice = ({ selectedOptions, product }: Props) => {
  const base = product.price.raw;
  const variant_groups = product.variant_groups;
  const selectedOption = selectedOptions;

  if (!selectedOption || typeof selectedOption !== 'object') return base;
  const options = Object.entries(selectedOption);

  return (
    base +
    options.reduce((acc, [variant, option]) => {
      const variantDetail = variant_groups.find(
        (candidate) => candidate.id === variant
      );

      if (!variantDetail) return acc;

      const optionDetail = variantDetail.options.find(
        (candidate) => candidate.id === option
      );

      if (!optionDetail) return acc;

      return acc + optionDetail.price.raw;
    }, 0)
  );
};
