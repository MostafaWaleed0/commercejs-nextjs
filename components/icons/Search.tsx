export default function Search({ ...props }) {
  return (
    <svg
      focusable={false}
      aria-hidden={true}
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-full py-2"
      {...props}
    >
      <path d="M19.71,18.29,16,14.61A9,9,0,1,0,14.61,16l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,19.71,18.29ZM2,9a7,7,0,1,1,12,4.93h0s0,0,0,0A7,7,0,0,1,2,9Z"></path>
    </svg>
  );
}
