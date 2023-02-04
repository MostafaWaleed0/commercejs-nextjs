import Link from 'next/link';
import algoliasearch from 'algoliasearch/lite';
import type { Product } from '@chec/commerce.js/types/product';
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { getPrice, options } from 'utils';
import { Price } from 'components/ui';
import { Hit } from '@algolia/client-search';
import Image from 'next/image';

const searchClient = algoliasearch(
  'J455L6ETKV',
  'ea8bf2afc284976d99b30677da5e3478'
);

interface Props {
  handleClose: () => void;
  ref: MutableRefObject<null>;
}

type AutocompleteItem = Hit<{
  categories: string[];
  description: string;
  image: string;
  name: string;
  price: number;
}>;

export default function Autocomplete({ handleClose, ref }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        placeholder: 'search',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources({ query }) {
          return [
            {
              sourceId: 'products',
              getItems() {
                return getAlgoliaResults<AutocompleteItem>({
                  searchClient,
                  queries: [
                    {
                      indexName: 'products',
                      query
                    }
                  ]
                });
              }
            }
          ];
        }
      }),
    []
  );

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current
  });

  return (
    <dialog
      className="fixed inset-0 z-[100] h-full w-full p-0 xl:pt-16 xl:pb-32 xl:px-4 bg-white/50"
      open
      ref={ref}
    >
      <div className="flex justify-center items-start w-full">
        <form
          ref={formRef}
          className="w-full xl:w-[1040px] flex justify-center flex-col"
          {...formProps}
        >
          <div
            className="flex px-7 w-full h-20 border-2 border-green-900  xl:rounded-full bg-white"
            // ref={ref}
          >
            <input
              ref={inputRef}
              className="h-full w-full focus:outline-none xl:rounded-full"
              {...inputProps}
            />
            <button className="button" onClick={handleClose} type="button">
              cancel
            </button>
          </div>

          {autocompleteState.isOpen && (
            <div className="">
              <div
                className="bg-green-900 flex justify-start items-center flex-col p-10 rounded-xl mt-10 overflow-hidden max-h-[45rem]"
                ref={panelRef}
                {...autocomplete.getPanelProps()}
              >
                {autocompleteState.collections.map((collection, index) => {
                  const { items } = collection;
                  return (
                    <section
                      key={`section-${index}`}
                      className="h-fit w-full overflow-auto"
                    >
                      {items.length > 0 && (
                        <ul
                          {...autocomplete.getListProps()}
                          className="grid gap-5 mr-6"
                        >
                          {items.map((item) => (
                            <ProductItem key={item.id} item={item} />
                          ))}
                        </ul>
                      )}
                    </section>
                  );
                })}
              </div>
            </div>
          )}
        </form>
      </div>
    </dialog>
  );
}

interface ProductItemType {
  item: Product;
}

function ProductItem({ item }: ProductItemType) {
  const [selectedOptions, setSelectedOptions] = useState(
    options({ product: item })
  );

  useEffect(() => {
    setSelectedOptions(options({ product: item }));
  }, [item.permalink]);

  return (
    <li className="rounded-md bg-white p-3 text-green-900 ">
      <Link
        href={`/product/${item.permalink}`}
        className="flex justify-between items-center"
      >
        <div className="rounded-md overflow-hidden">
          <Image src={item.image?.url} alt={item.name} width={90} height={90} />
        </div>
        <div className="w-56">
          <div className="text-2xl">{item.name}</div>
          <div className="flex items-center">
            <span className="text-lg mr-3">
              <Price price={getPrice({ selectedOptions, product: item })} />
            </span>
            <div className="flex items-center gap-2 ">
              {item.variant_groups.map(
                (variant_group) =>
                  variant_group.name === 'color' &&
                  variant_group.options.map((options) => (
                    <div
                      key={options.name}
                      className="rounded-full border border-gray-300 flex items-center justify-center p-1 w-5 h-5"
                      style={{ backgroundColor: `${options.name}` }}
                    ></div>
                  ))
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
