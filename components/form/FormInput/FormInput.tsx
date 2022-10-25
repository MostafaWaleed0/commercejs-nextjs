import { InputHTMLAttributes } from 'react';
import FormLabel from 'components/form/FormLabel';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  [x: string]: any;
  type: string;
  id: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
  variablePropName?: string;
  variablePropValue?: string;
}

export default function FormInput({
  type,
  id,
  label,
  error = false,
  require,
  errorMessage = '',
  variablePropName = 'aria-describedby',
  variablePropValue = `${id}_error`,
  ...props
}: Props) {
  const variableAttribute = { [variablePropName]: variablePropValue };
  return (
    <div>
      <FormLabel id={id} label={label} require={require} />
      <input
        type={type}
        name={id}
        id={id}
        autoComplete="off"
        spellCheck="false"
        aria-required="true"
        className="mt-1 py-2 border-b-2 border-green-900 w-full outline-none focus:border-green-500"
        {...(error ? variableAttribute : '')}
        {...props}
      />
      {error && (
        <p id={`${id}_error`} className="text-red-600 mt-3">
          * {errorMessage}
        </p>
      )}
    </div>
  );
}
