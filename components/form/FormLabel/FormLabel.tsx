import { LabelHTMLAttributes } from 'react';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  label: string;
  require?: boolean;
}

export default function FormLabel({ id, label, require }: Props) {
  return (
    <label
      className="uppercase after:content-['\a'] after:whitespace-pre text-neutral-500 leading-6 text-sm tracking-wider"
      htmlFor={id}
    >
      {require && <span className="text-black font-bold">*</span>} {label}
    </label>
  );
}
