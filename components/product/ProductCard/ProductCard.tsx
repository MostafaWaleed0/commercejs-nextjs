import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Price } from 'components/ui';
import { getPrice, options } from 'utils';
import type { Product } from '@chec/commerce.js/types/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [selectedOptions, setSelectedOptions] = useState(options({ product }));

  useEffect(() => {
    setSelectedOptions(options({ product }));
  }, [product.permalink]);

  return (
    <li key={product.id} className="h-full">
      <Link
        href={`/product/${product.permalink}`}
        className="p-4 font-raisonne hover:-translate-y-5 focus-visible:-translate-y-5 transition-transform bg-white rounded-3xl shadow-[0px_8px_16px_rgba(15,15,15,0.2)] overflow-hidden h-full"
      >
        <Image
          alt={product.name || 'Product Image'}
          src={product.image?.url || '/static/images/placeholder-image.bmp'}
          width={270}
          height={360}
          className="rounded-3xl object-content"
          quality="85"
        />
        <div className="space-y-8 mt-2">
          <div className="flex justify-between items-center font-bold">
            <h3 className="text-base font-raisonne line-clamp-2 w-56">
              {product.name}
            </h3>
            <Price price={getPrice({ selectedOptions, product })} />
          </div>
          <div className="flex justify items-end gap-2">
            {product.variant_groups.map((variant_group) => {
              if (variant_group.name === 'color')
                return variant_group.options.map((options) => (
                  <div
                    className="rounded-full border border-gray-300 flex items-center justify-center p-1 w-6 h-6"
                    style={{ backgroundColor: `${options.name}` }}
                  ></div>
                ));
            })}
          </div>
        </div>
      </Link>
    </li>
  );
}
