import { memo, useState } from 'react';
import convertToText from 'utils/convertToText';
import { Plus, Minus } from 'components/icons';

interface Props {
  order: number;
  description: string;
  title: string;
}

export default memo(function Collapse({ order, description, title }: Props) {
  const [isActive, setActive] = useState(false);
  const toggle = () => setActive((x) => !x);

  return (
    <div className="py-4 border-t border-green-900">
      <h3 className="w-full flex items-center justify-between">
        <button
          className="w-full h-full  capitalize font-semibold text-xl text-start font-raisonne"
          aria-expanded={isActive ? true : false}
          onClick={toggle}
          aria-controls={`accordion-panel-${order}`}
          id={`accordion-header-${order}`}
        >
          {title}
        </button>
        {isActive ? <Plus /> : <Minus />}
      </h3>
      {isActive && (
        <section
          className="py-4"
          id={`accordion-panel-${order}`}
          aria-labelledby={`accordion-header-${order}`}
        >
          <p>{convertToText(description)}</p>
        </section>
      )}
    </div>
  );
});
