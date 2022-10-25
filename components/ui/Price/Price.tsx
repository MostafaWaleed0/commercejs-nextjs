export default function Price({ price }: { price: string | number }) {
  return (
    <span>
      $<bdi className="font-raisonne text-green-800">{price}</bdi>
    </span>
  );
}
