import { useState } from 'react';
import FormLabel from 'components/form/FormLabel';

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
            <svg
              width="12"
              height="12"
              viewBox="0 0 30 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`fill-current ${isActive && 'rotate-180'}`}
            >
              <path
                d="M14.9999 13.9375C14.4374 13.9375 13.8749 13.75 13.4061 13.3281L0.8436 1.51562C0.515475 1.1875 0.515475 0.671875 0.796725 0.34375C1.12485 0.0156247 1.64048 0.0156254 1.9686 0.296875L14.5311 12.1094C14.7655 12.3438 15.1874 12.3438 15.4686 12.1094L28.0311 0.296875C28.3592 -0.0312496 28.8748 0.0156247 29.203 0.34375C29.5311 0.671875 29.4842 1.1875 29.1561 1.51562L16.5936 13.2813C16.1249 13.7031 15.5624 13.9375 14.9999 13.9375Z"
                fill="#2D2A24"
              ></path>
            </svg>
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
