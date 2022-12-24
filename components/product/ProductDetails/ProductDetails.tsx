import { toast } from 'react-hot-toast';
import { commerce } from 'lib/commerce';
import { getPrice, options } from 'utils';
import { useCartContext } from 'context/cart';
import { useEffect, useState } from 'react';
import { Collapse, Price } from 'components/ui';
import { ProductOptions } from 'components/product';
import type { Product } from '@chec/commerce.js/types/product';

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const { setCart } = useCartContext();

  const variantsImages = () => ({
    ...product.assets?.reduce(
      (acc, assets) => ({
        ...acc,
        [assets.id]: assets.url
      }),
      {}
    )
  });

  const [selectedOptions, setSelectedOptions] = useState(options({ product }));
  const [variantsImage, setVariantsImage] = useState(variantsImages);

  useEffect(() => {
    setVariantsImage(variantsImages);
    setSelectedOptions(options({ product }));
  }, [product.permalink]);

  const handleSelectOption = (variantId: string, optionId: string) =>
    setSelectedOptions({
      ...selectedOptions,
      [variantId]: optionId
    });

  const handleAddToCart = () =>
    commerce.cart
      .add(product.id, 1, selectedOptions)
      .then(({ cart }) => {
        setCart(cart);
        return cart;
      })
      .then(({ subtotal }) =>
        toast.success(
          `${product.name} is now in your cart. Your subtotal is now ${subtotal.formatted_with_symbol}. Click to view what's in your cart.`
        )
      )
      .catch(() => {
        toast.error('Please try again.');
      });

  return (
    <article className="space-y-12 w-full lg:w-2/5 flex flex-col">
      <header className="space-y-3">
        <h2>{product.name}</h2>
        <span className="text-3xl block text-green-900">
          <Price price={getPrice({ selectedOptions, product })} />
        </span>
      </header>
      <hr className="border-green-900" />
      <div className="space-y-7">
        <ProductOptions
          className="mb-3"
          variants={product.variant_groups}
          onSelectOption={handleSelectOption}
          selectedOptions={selectedOptions}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          className="button button-big w-full"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
      <div>
        {product.description && (
          <Collapse
            order={1}
            title="description"
            description={product.description}
          />
        )}
        <Collapse
          order={product.description ? 2 : 1}
          title="shipping details"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos amet placeat perspiciatis ea eaque, perferendis officia nobis reiciendis quae corporis qui sequi porro deserunt optio quibusdam recusandae laboriosam a distinctio?"
        />
      </div>
    </article>
  );
}
