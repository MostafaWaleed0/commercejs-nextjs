import { useState } from 'react';
import FormLabel from 'components/form/FormLabel';
import { ArrowDown } from 'components/icons';

interface Props {
  [x: string]: any;
  name: string;
  label: string;
  value: string;
  options: string[];
  error?: boolean;
  errorMessage?: string;
  variablePropName?: string;
  variablePropValue?: string;
}

export default function CustomFormSelect({
  name,
  label,
  value,
  error = false,
  options,
  require,
  errorMessage = '',
  variablePropName = 'aria-describedby',
  variablePropValue = `${name}_error`,
  ...props
}: Props) {
  const [isActive, setActive] = useState<boolean>(false);
  const toggle = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setActive((x) => !x);
  };

  const variableAttribute = { [variablePropName]: variablePropValue };

  return (
    <div>
      <FormLabel id="reason" label={label} require={require} />
      <button
        className="capitalize mt-3 py-4 text-black border-b-2 border-green-900 focus:border-green-500 w-full text-start"
        onClick={toggle}
        {...(error ? variableAttribute : '')}
      >
        {!value ? (
          <span className="flex justify-between items-center">
            choose option
            <ArrowDown className={`fill-current ${isActive && 'rotate-180'}`} />
          </span>
        ) : (
          value
        )}
      </button>
      {isActive ? (
        <ul
          className="border-x border-b border-green-600"
          aria-labelledby="reason"
          role="list"
        >
          {options.map((option) => (
            <li>
              <hr className="mx-4" />
              <button
                {...props}
                className="py-6 px-5 text-black hover:text-white hover:bg-green-600 focus-visible:text-white focus-visible:bg-green-600  w-full text-start"
                data-value={option}
                data-name={name}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error && (
        <p id={`${name}_error`} className="text-red-600 mt-3">
          * {errorMessage}
        </p>
      )}
    </div>
  );
}
