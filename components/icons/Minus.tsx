export default function Minus({ ...props }) {
  return (
    <svg
      focusable={false}
      aria-hidden={true}
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"></path>
      <path d="M0 0h24v24H0z" fill="none"></path>
    </svg>
  );
}
