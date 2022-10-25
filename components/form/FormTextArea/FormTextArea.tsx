import { TextareaHTMLAttributes } from 'react';
import FormLabel from 'components/form/FormLabel';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  [x: string]: any;
  id: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
  variablePropName?: string;
  variablePropValue?: string;
}

export default function FormTextArea({
  id,
  label,
  error = false,
  errorMessage = '',
  variablePropName = `aria-describedby`,
  variablePropValue = `${id}_error`,
  ...props
}: Props) {
  const variableAttribute = { [variablePropName]: variablePropValue };

  return (
    <>
      <FormLabel id={id} label={label} />
      <textarea
        {...props}
        name={id}
        id={id}
        rows={10}
        spellCheck="false"
        autoComplete="off"
        className="mt-2 p-2 border-2 border-green-900 w-full outline-none focus:border-green-500"
        {...(error ? variableAttribute : '')}
      ></textarea>
      {error && (
        <p id={`${id}_error`} className="text-red-600 mt-3">
          *{errorMessage}
        </p>
      )}
    </>
  );
}
