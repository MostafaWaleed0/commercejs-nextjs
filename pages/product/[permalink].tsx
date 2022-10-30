import type { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { commerce } from 'lib/commerce';
import dynamic from 'next/dynamic';
import { Container } from 'components/common';

const ProductDetails = dynamic(
  () => import('components/product/ProductDetails'),
  { ssr: false }
);

const ProductSlider = dynamic(
  () => import('components/product/ProductSlider'),
  { ssr: false }
);

export async function getStaticProps({ params }) {
  const { permalink } = params;

  const product = await commerce.products.retrieve(permalink, {
    type: 'permalink'
  });

  return {
    props: {
      product
    }
  };
}

export async function getStaticPaths() {
  const { data: products } = await commerce.products.list();

  return {
    paths: products.map((product) => ({
      params: {
        permalink: product.permalink
      }
    })),
    fallback: false
  };
}

export default function Permalink({
  product
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <Container>
      <div className="container py-20">
        <div className="flex flex-col justify-center items-start lg:flex-row gap-5 xl:gap-10 relative">
          <ProductSlider product={product} />
          <ProductDetails product={product} />
        </div>
      </div>
    </Container>
  );
}
