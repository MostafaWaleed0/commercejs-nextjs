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
    <div className="w-full lg:w-3/5 lg:pb-8">
      <div className="flex flex-col-reverse md:flex-row lg:self-start lg:justify-end">
        <ul
          role="list"
          className="flex flex-row md:flex-col  gap-2 w-1/5 lg:h-full overflow-auto"
        >
          {product.assets?.map((image, i) => (
            <li
              key={image.url}
              className={`w-7 h-7 md:h-fit md:w-fit rounded-full md:rounded-none mt-5 md:mt-0 md:mb-3 border-2 focus-visible:border-green-900 outline-none cursor-pointer ${
                currentSlide === i ? 'border-green-900' : 'border-neutral-300'
              }`}
            >
              <button
                type="button"
                onClick={() => handleCurrentSlide(i)}
                aria-label={`Appearance ${i + 1}`}
                className="w-full h-full grid"
              >
                <div className="hidden md:grid">
                  <Image
                    src={image.url}
                    width={200}
                    height={300}
                    alt={product.name}
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
        <div className="lg:w-5/6 pl-0 md:pl-6">
          <div className="w-full">
            {product.assets?.map((image, i) => {
              return (
                <div
                  key={image.url}
                  className={`justify-center ${
                    currentSlide === i ? 'flex' : 'hidden'
                  }`}
                >
                  <Image
                    src={image.url}
                    width={700}
                    height={850}
                    alt={product.name}
                    className="h-fit"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
