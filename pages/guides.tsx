import Image from 'next/image';
import { Container } from 'components/common';
import { commerce } from 'lib/commerce';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

export async function getStaticProps() {
  const { data: articles } = await commerce.products.list({
    category_slug: ['guides']
  });

  return {
    props: {
      articles
    }
  };
}

const placeholderImage = '/static/images/placeholder-image.jpg';

export default function GuidesPage({
  articles
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div className="container region-md space-y-10">
        <h2>all articles</h2>
        <ol className="auto-grid" role="list">
          {articles.map((article) => (
            <Link href={`guides/${article.permalink}`} key={article.permalink}>
              <li>
                <Image
                  src={article.image?.url || placeholderImage}
                  width={300}
                  height={300}
                  className="object-cover"
                  alt={''}
                />
                <h3>{article.name}</h3>
              </li>
            </Link>
          ))}
        </ol>
      </div>
    </Container>
  );
}
