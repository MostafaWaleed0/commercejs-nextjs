import type { ProductVariantGroup } from '@chec/commerce.js/types/product-variant-group';

interface Props {
  variants: ProductVariantGroup[];
  onSelectOption(variant: string, option: string): void;
  selectedOptions: {};
  [x: string]: Object;
}

export default function ProductOptions({
  variants,
  onSelectOption,
  selectedOptions,
  ...passthrough
}: Props) {
  return (
    <div {...passthrough} className="space-y-12">
      {variants.map((variant) => {
        if (variant.name === 'size')
          return (
            <div key={variant.id} className="space-y-4">
              <h3 className="text-2xl italic">{variant.name}:</h3>
              <ul
                className={`grid ${
                  variant.name.length > 2 ? 'grid-cols-2' : 'grid-cols-3'
                } gap-2`}
                role="list"
                aria-label="Sizes Tabs"
              >
                {variant.options.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      className={`button h-12 w-full py-2 px-1 ring-1 cursor-pointer ${
                        selectedOptions[variant.id] &&
                        selectedOptions[variant.id] === option.id
                          ? 'ring-black'
                          : 'ring-gray-200'
                      }`}
                      aria-selected={
                        selectedOptions[variant.id] &&
                        selectedOptions[variant.id] === option.id
                          ? true
                          : false
                      }
                      onClick={() => onSelectOption(variant.id, option.id)}
                    >
                      {option.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
      })}

      {variants.map((variant) => {
        if (variant.name === 'color')
          return (
            <div key={variant.id} className="space-y-4">
              <h3 className="text-2xl italic">{variant.name}:</h3>
              <ul
                className="flex items-center justify-start flex-shrink-0 gap-2"
                aria-label="Colors Tabs"
                role="list"
              >
                {variant.options.map((option) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      className={`w-11 h-11 mr-3 cursor-pointer ring-2 ring-offset-4 rounded-full ${
                        selectedOptions[variant.id] &&
                        selectedOptions[variant.id] === option.id
                          ? 'ring-black'
                          : 'ring-gray-200'
                      }`}
                      aria-selected={
                        selectedOptions[variant.id] &&
                        selectedOptions[variant.id] === option.id
                          ? true
                          : false
                      }
                      style={{ backgroundColor: option.name }}
                      onClick={() => onSelectOption(variant.id, option.id)}
                    >
                      <span className="sr-only">{option.name} color</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
      })}
    </div>
  );
}
