import { memo, ReactNode, useState } from 'react';
import { Plus, Minus } from 'components/icons';

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
        {isActive ? <Plus /> : <Minus />}
      </h3>
      <div className={isActive ? 'mt-7' : 'invisible h-0'}> {children}</div>
    </div>
  );
});
