import { memo, ReactNode, useState } from 'react';

interface Props {
  title: string;
  border?: boolean;
  children?: ReactNode;
}

export default memo(function Dropdown({
  title,
  border = true,
  children
}: Props) {
  const [isActive, setActive] = useState(false);
  const toggle = () => setActive((x) => !x);

  return (
    <div className={`py-4 ${border && 'border-b-2 border-white'}`}>
      <h3 className="w-full flex items-center justify-between font-poppins">
        <button
          className="w-full h-full  capitalize font-semibold text-xl text-start"
          aria-expanded={isActive ? true : false}
          onClick={toggle}
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
      <div className={isActive ? 'mt-7' : 'invisible h-0'}> {children}</div>
    </div>
  );
});
