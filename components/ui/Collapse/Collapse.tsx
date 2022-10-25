import { memo, useState } from 'react';
import convertToText from 'utils/convertToText';

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
        {isActive ? (
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <path d="M19 13H5v-2h14v2z" fill="currentColor"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        ) : (
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <path
              d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              fill="currentColor"
            ></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        )}
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
