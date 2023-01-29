import ProductCard from 'components/product/ProductCard';
import type { Product } from '@chec/commerce.js/types/product';

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <ul
      role="list"
      className="auto-grid"
      style={{ '--auto-grid-min-size': '17rem' }}
    >
      {products.map((product) => (
        <ProductCard product={product} key={product.name} />
      ))}
    </ul>
  );
}
