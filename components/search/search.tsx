import dynamic from 'next/dynamic';
import { Hits, SortBy, Configure } from 'react-instantsearch-hooks-web';
import { useMemo, useRef, useState } from 'react';
import useMediaQuery from 'hook/useMediaQuery';

const FilterView = dynamic(() => import('components/filter/FilterView'), {
  ssr: false
});

const Hit = dynamic(() => import('components/filter/Hit'), {
  ssr: false
});

interface Props {
  title: string;
  category: string;
  colors?: Array<{ label: string; value: string }>;
  categories?: Array<{ label: string; value: string }>;
}

export default function Search({ title, category, colors, categories }: Props) {
  const filter = useRef(null);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const matches = useMediaQuery(1024, filter, showFilter, setShowFilter);

  const filterView = useMemo(
    () => <FilterView categories={categories} colors={colors} />,
    []
  );

  return (
    <div className="container region-md">
      <div>
        <h1>{title}</h1>
        <div className="region-md">
          <div className="flex lg:justify-between gap-12" ref={filter}>
            <Configure filters={category} />
            <div className={matches ? '' : 'sr-only'}>{filterView}</div>
            <div className="w-full">
              <div className="flex justify-end items-center">
                <div className="block">
                  <button
                    className="button button-outline-small"
                    onClick={() => setShowFilter((e) => !e)}
                  >
                    {showFilter ? 'hide filter' : 'show filter'}
                  </button>
                </div>
                <SortBy
                  items={[
                    {
                      value: 'products',
                      label: 'Most popular'
                    },
                    {
                      value: `products_asc_price`,
                      label: 'Price Low to High'
                    },
                    {
                      value: `products_desc_price`,
                      label: 'Price High to Low'
                    }
                  ]}
                  classNames={{ root: 'm-3 w-fit' }}
                />
              </div>
              <Hits
                hitComponent={Hit}
                classNames={{
                  root: 'w-full mt-10',
                  list: 'auto-grid',
                  item: 'h-full'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
