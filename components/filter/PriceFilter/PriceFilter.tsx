import { useCallback } from 'react';
import { useNumericMenu } from 'react-instantsearch-hooks-web';

type NumericMenuItem = {
  value: string;
  label: string;
  isRefined: boolean;
};

export default function PriceFilter() {
  const { items, refine } = useNumericMenu({
    attribute: 'price.raw',
    items: [
      { label: 'All' },
      { label: 'Under 50$', end: 50 },
      { label: '$50-$100', start: 50, end: 100 },
      { label: '$100-$150', start: 100, end: 150 },
      { label: '$150-$200', start: 150, end: 200 },
      { label: '$200 & Above', start: 200 }
    ]
  });

  const handleRefine = useCallback((value: string) => () => refine(value), []);

  return (
    <div>
      <ul>
        {items.map((item: NumericMenuItem) => (
          <li key={item.value}>
            <label className="inline-flex items-center justify-start">
              <input
                className="w-7 h-7 accent-green-600"
                type="checkbox"
                checked={item.isRefined}
                onClick={handleRefine(item.value)}
              />
              <span className="inline-block tracking-widest capitalize ml-2">
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
