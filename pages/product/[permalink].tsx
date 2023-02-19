import { Container } from 'components/common';
import { ProductDetails, ProductSlider } from 'components/product';
import { commerce } from 'lib/commerce';
import type { Params } from 'lib/types';
import type { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

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

export async function getStaticProps({ params }: Params) {
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
