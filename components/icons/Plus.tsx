export default function Plus({ ...props }) {
  return (
    <svg
      focusable={false}
      aria-hidden={true}
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path d="M19 13H5v-2h14v2z" fill="currentColor"></path>
      <path d="M0 0h24v24H0z" fill="none"></path>
    </svg>
  );
}
