import { Dropdown } from 'components/ui';
import PriceFilter from 'components/filter/PriceFilter';
import {
  ClearRefinements,
  RefinementList
} from 'react-instantsearch-hooks-web';

const staticSizes = [
  { label: 'small', value: 'small' },
  { label: 'medium', value: 'medium' },
  { label: 'large', value: 'large' }
];

interface Props {
  colors?: Array<{ label: string; value: string }>;
  categories?: Array<{ label: string; value: string }>;
}

export default function FilterView({ colors, categories }: Props) {
  return (
    <aside>
      <div className="bg-green-900 text-white fixed left-0 top-0 lg:translate-x-0 lg:static lg:shadow-xl w-80 h-full lg:h-fit p-10 z-20 lg:rounded-3xl">
        {categories && (
          <Dropdown title="category">
            <RefinementList
              attribute="categories.name"
              classNames={{
                checkbox: 'w-7 h-7 accent-green-600',
                label: 'w-full inline-flex items-center justify-start',
                labelText:
                  'inline-block font-raisonne tracking-widest capitalize ml-2',
                count: 'hidden'
              }}
              transformItems={(items) => {
                return categories.map((category) => ({
                  ...category,
                  ...items.find((item) => item.value === category.value)
                }));
              }}
            />
          </Dropdown>
        )}
        {colors && (
          <Dropdown title="color">
            <RefinementList
              attribute="variant_groups.options.name"
              classNames={{
                checkbox: 'w-7 h-7 accent-green-600',
                label: 'w-full inline-flex items-center justify-start',
                labelText:
                  'inline-block font-raisonne tracking-widest capitalize ml-2',
                count: 'hidden',
                showMore: 'font-bold hover:underline'
              }}
              sortBy={['count:desc', 'name:asc']}
              transformItems={(items) => {
                return colors.map((color) => ({
                  ...color,
                  ...items.find((item) => item.value === color.value)
                }));
              }}
            />
          </Dropdown>
        )}
        <Dropdown title="size">
          <RefinementList
            attribute="variant_groups.options.name"
            classNames={{
              checkbox: 'w-7 h-7 accent-green-600',
              label: 'w-full inline-flex items-center justify-start',
              labelText:
                'inline-block font-raisonne tracking-widest capitalize ml-2',
              count: 'hidden',
              showMore: 'font-bold hover:underline'
            }}
            sortBy={['count:desc', 'name:asc']}
            transformItems={(items) => {
              return staticSizes.map((staticSize) => ({
                ...staticSize,
                ...items.find((item) => item.value === staticSize.value)
              }));
            }}
          />
        </Dropdown>
        <Dropdown title="price" border={false}>
          <PriceFilter />
        </Dropdown>
      </div>
      <ClearRefinements
        className="button border-2 w-full mt-4 py-4 rounded-full border-green-900"
        title="clear"
      />
    </aside>
  );
}
