import { CartItem } from 'components/cart';
import { Container } from 'components/common';
import { useCartContext } from 'context/cart';
import Link from 'next/link';

export default function Cart() {
  const { line_items, subtotal, total_unique_items } = useCartContext();
  const isEmpty = line_items.length === 0;

  return (
    <Container>
      <div className="container py-20 h-full">
        {!isEmpty && <h1>Your Cart</h1>}
        <div className="flex justify-between align-start flex-col lg:flex-row mt-12 gap-12">
          <div className="space-y-10 w-full">
            {line_items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          {isEmpty ? (
            <p className="text-5xl min-w-[calc(100%+-48px)] text-center">
              Your cart is empty.
            </p>
          ) : (
            <div className="w-full lg:w-2/5 px-5 py-10 bg-green-900 text-white divide-y-2 divide-white h-fit space-y-3 rounded-2xl">
              <div className="py-3">
                <h3 className="uppercase">chart totals</h3>
                <div className="flex justify-between items-center leading-10 capitalize">
                  subtotals: ( {total_unique_items}
                  {total_unique_items === 1 ? ' item' : ' items'} )
                  <span>{subtotal?.formatted_with_symbol}</span>
                </div>
                <div className="flex justify-between items-center leading-10 capitalize">
                  shipping: <span className="font-bold">free</span>
                </div>
              </div>
              <div className="flex justify-between items-center leading-10 capitalize text-lg md:text-xl py-4 font-bold">
                Total: <span>{subtotal?.formatted_with_symbol}</span>
              </div>
              <div>
                <Link
                  href="/checkout"
                  type="button"
                  className="button bg-white text-green-900  w-full text-lg md:text-xl"
                >
                  check out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
