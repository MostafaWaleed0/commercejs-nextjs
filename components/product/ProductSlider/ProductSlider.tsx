import Image from 'next/image';
import { useState } from 'react';
import type { Product } from '@chec/commerce.js/types/product';

interface Props {
  product: Product;
}

export default function ProductSlider({ product }: Props) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const handleCurrentSlide = (e: number) => setCurrentSlide(e);

  return (
    <div className="sticky top-0 w-full lg:w-3/5 lg:pb-8">
      <div className="flex lg:self-start lg:justify-end">
        <ul
          role="list"
          className="flex flex-col gap-2 w-1/5 lg:h-full overflow-auto"
        >
          {product.assets?.map((image, i) => (
            <li
              key={image.url}
              className={`grid mb-3 h-fit border-2 focus-visible:border-green-900 outline-none cursor-pointer ${
                currentSlide === i ? 'border-green-900' : 'border-white'
              }`}
              onClick={() => handleCurrentSlide(i)}
              onKeyDown={() => handleCurrentSlide(i)}
              tabIndex={0}
              aria-label={`Appearance ${i + 1}`}
            >
              <Image src={image.url} width={200} height={300} />
            </li>
          ))}
        </ul>
        <div className="lg:w-5/6 pl-6">
          <div className="h-[95vh] w-full">
            {product.assets?.map((image, i) => {
              return (
                <div
                  key={image.url}
                  className={`justify-center ${
                    currentSlide === i ? 'flex' : 'hidden'
                  }`}
                >
                  <Image src={image.url} width={700} height={850} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
