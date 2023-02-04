import Image from 'next/image';
import { Price } from 'components/ui';
import { toast } from 'react-hot-toast';
import { commerce } from 'lib/commerce';
import { useCartContext } from 'context/cart';
import type { LineItem } from '@chec/commerce.js/types/line-item';
import type { Cart } from '@chec/commerce.js/types/cart';
import { XCircle, ArrowLeft, ArrowRight } from 'components/icons';

interface CartType {
  cart: Cart;
}

export default function CartItem({
  id,
  name,
  quantity,
  line_total,
  selected_options,
  image
}: LineItem) {
  const { setCart } = useCartContext();
  const hasVariants = selected_options.length >= 1;

  const handleUpdateCart = ({ cart }: CartType) => {
    setCart(cart);
    return cart;
  };

  const handleRemoveItem = () =>
    commerce.cart
      .remove(id)
      .then(handleUpdateCart)
      .then(({ subtotal }) =>
        toast(
          `${name} has been removed from your cart. Your new subtotal is now ${subtotal.formatted_with_symbol}`
        )
      );

  const decrementQuantity = () =>
    quantity > 1
      ? commerce.cart
          .update(id, { quantity: quantity - 1 })
          .then(handleUpdateCart)
          .then(({ subtotal }) =>
            toast(
              `1 "${name}" has been removed from your cart. Your new subtotal is now ${subtotal.formatted_with_symbol}`
            )
          )
      : handleRemoveItem();

  const incrementQuantity = () =>
    commerce.cart
      .update(id, { quantity: quantity + 1 })
      .then(handleUpdateCart)
      .then(({ subtotal }) =>
        toast(
          `Another "${name}" has been added to your cart. Your new subtotal is now ${subtotal.formatted_with_symbol}`
        )
      );

  return (
    <div className="py-3 md:py-4 lg:py-5 flex items-center space-x-3 md:space-x-4 border-b border-black relative">
      <button
        onClick={handleRemoveItem}
        className="p-2 lg:p-4 border-2 border-green-900 hover:bg-green-900 hover:text-white focus-visible:bg-green-900 focus-visible:text-white rounded-full hidden md:inline-block"
        aria-label="Remove product"
        type="button"
      >
        <XCircle />
      </button>
      <div>
        <Image
          src={image?.url || '/static/images/placeholder-image.bmp'}
          width={190}
          height={190}
          className="rounded-2xl object-cover"
          unoptimized
          alt={name}
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-end flex-grow space-y-1 md:space-y-0 md:space-x-3">
        <div className="md:flex-grow">
          <h3 className="font-serif font-normal text-xl md:text-2xl italic">
            {name}
          </h3>
          {hasVariants && (
            <div className="flex items-center gap-3 md:text-lg text-md font-raisonne capitalize leading-10 md:mt-3">
              {selected_options.map(
                (item) =>
                  item.group_name === 'size' && (
                    <div className="flex items-center">
                      size:<span className="ml-1">{item.option_name}</span>
                    </div>
                  )
              )}
              {selected_options.map(
                (item) =>
                  item.group_name === 'color' && (
                    <div className="flex items-center">
                      <span>color:</span>
                      <div
                        className="w-6 h-6 border-2 border-neutral-300 rounded-full ml-1"
                        style={{ backgroundColor: item.option_name }}
                      >
                        <span className="sr-only">{item.option_name}</span>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
        <div className="flex items-start md:items-end justify-between flex-grow space-y-1 md:space-y-0">
          <div className="w-full flex items-center justify-between space-y-1 md:space-y-0 space-x-2">
            <div className="rounded-sm p-2 inline-flex items-center border-2 border-green-900">
              <button
                onClick={decrementQuantity}
                className="inline-flex items-center justify-center text-2xl focus:outline-none transition"
                type="button"
              >
                <ArrowLeft />
              </button>
              <span className="px-6 md:text-xl font-bold text-green-900">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="inline-flex items-center justify-center text-2xl focus:outline-none transition"
                type="button"
              >
                <ArrowRight />
              </button>
            </div>
            <div className="md:text-2xl text-lg">
              <Price price={line_total.raw} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
