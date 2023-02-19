import { FormLabel } from 'components/form';
import { ReactNode } from 'react';

interface Props {
  [x: string]: any;
  name: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
  variablePropName?: string;
  variablePropValue?: string;
  children?: ReactNode;
}

export default function FormSelect({
  name,
  label,
  error = false,
  require,
  errorMessage = '',
  variablePropName = 'aria-describedby',
  variablePropValue = `${name}_error`,
  children,
  ...props
}: Props) {
  return (
    <div>
      <FormLabel id="reason" label={label} require={require} />
      <select
        className="w-full mt-1 py-2 border-b-2 border-green-900 outline-none focus:border-green-500"
        name={name}
        {...props}
      >
        {children}
      </select>

      {error && (
        <p id={`${name}_error`} className="text-red-600 mt-3">
          * {errorMessage}
        </p>
      )}
    </div>
  );
}
