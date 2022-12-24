import { Container } from 'components/common';
import { commerce } from 'lib/commerce';
import { InferGetStaticPropsType } from 'next';
import type { Params } from 'lib/types';

export async function getStaticPaths() {
  const { data: articles } = await commerce.products.list({
    category_slug: ['guides']
  });

  return {
    paths: articles.map((article) => ({
      params: {
        permalink: article.permalink
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }: Params) {
  const { permalink } = params;

  const article = await commerce.products.retrieve(permalink, {
    type: 'permalink'
  });

  return {
    props: {
      article
    }
  };
}

export default function GuidesPosts({
  article
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <article className="container region-md">
        <div className="post">
          <h1> {article.name}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: article.description }}
            className="post"
          ></div>
        </div>
      </article>
    </Container>
  );
}
