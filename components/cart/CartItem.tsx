import Image from 'next/image';
import { Price } from 'components/ui';
import { toast } from 'react-hot-toast';
import { commerce } from 'lib/commerce';
import { useCartContext } from 'context/cart';
import type { LineItem } from '@chec/commerce.js/types/line-item';
import type { Cart } from '@chec/commerce.js/types/cart';

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

  function handleUpdateCart({ cart }: CartType) {
    setCart(cart);
    return cart;
  }

  function handleRemoveItem() {
    commerce.cart
      .remove(id)
      .then(handleUpdateCart)
      .then(({ subtotal }) =>
        toast(
          `${name} has been removed from your cart. Your new subtotal is now ${subtotal.formatted_with_symbol}`
        )
      );
  }

  function decrementQuantity() {
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
  }

  function incrementQuantity() {
    commerce.cart
      .update(id, { quantity: quantity + 1 })
      .then(handleUpdateCart)
      .then(({ subtotal }) =>
        toast(
          `Another "${name}" has been added to your cart. Your new subtotal is now ${subtotal.formatted_with_symbol}`
        )
      );
  }

  return (
    <div className="py-3 md:py-4 lg:py-5 flex items-center space-x-3 md:space-x-4 border-b border-black relative">
      <button
        onClick={handleRemoveItem}
        className="p-2 lg:p-4 border-2 border-green-900 hover:bg-green-900 hover:text-white focus-visible:bg-green-900 focus-visible:text-white rounded-full hidden md:inline-block"
        aria-label="Remove product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
      <div>
        <Image
          src={image.url}
          width={190}
          height={190}
          className="rounded-2xl object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-end flex-grow space-y-1 md:space-y-0 md:space-x-3">
        <div className="md:flex-grow">
          <h3 className="font-serif font-normal text-xl md:text-2xl italic">
            {name}
          </h3>
          {hasVariants && (
            <div className="flex items-center gap-3 md:text-lg text-md font-raisonne capitalize leading-10 md:mt-3">
              {selected_options.map((item) => {
                if (item.group_name === 'size')
                  return (
                    <div className="flex items-center">
                      size:<span className="ml-1">{item.option_name}</span>
                    </div>
                  );
              })}
              {selected_options.map((item) => {
                if (item.group_name === 'color')
                  return (
                    <div className="flex items-center">
                      <span>color:</span>
                      <div
                        className="w-6 h-6 border-2 border-neutral-300 rounded-full ml-1"
                        style={{ backgroundColor: item.option_name }}
                      >
                        <span className="sr-only">{item.option_name}</span>
                      </div>
                    </div>
                  );
              })}
            </div>
          )}
        </div>
        <div className="flex items-start md:items-end justify-between flex-grow space-y-1 md:space-y-0">
          <div className="w-full flex items-center justify-between space-y-1 md:space-y-0 space-x-2">
            <div className="rounded-sm p-2 inline-flex items-center border-2 border-green-900">
              <button
                onClick={decrementQuantity}
                className="inline-flex items-center justify-center text-2xl focus:outline-none transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="-64 0 512 512"
                  className="fill-green-900"
                >
                  <path d="M365.46 357.74L147.04 255.89l218.47-101.88c16.02-7.47 22.95-26.51 15.48-42.53l-13.52-29C360 66.46 340.96 59.53 324.94 67L18.48 209.91a32.014 32.014 0 0 0-18.48 29v34.24c0 12.44 7.21 23.75 18.48 29l306.31 142.83c16.06 7.49 35.15.54 42.64-15.52l13.56-29.08c7.49-16.06.54-35.15-15.53-42.64z" />
                </svg>
              </button>
              <span className="px-6 md:text-xl font-bold text-green-900">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="inline-flex items-center justify-center text-2xl focus:outline-none transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="-64 0 512 512"
                  className="fill-green-900"
                >
                  <path d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z" />
                </svg>
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
