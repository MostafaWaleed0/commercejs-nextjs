import { commerce } from 'lib/commerce';
import Search from 'components/search';
import { Container } from 'components/common';
import { Category } from '@chec/commerce.js/types/category';

export async function getStaticProps({ params }) {
  const { slug } = params;

  const category = await commerce.categories.retrieve(slug, {
    type: 'slug'
  });

  return {
    props: {
      category
    }
  };
}

export async function getStaticPaths() {
  const { data: categories } = await commerce.categories.list();

  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug
      }
    })),

    fallback: false
  };
}

interface Props {
  category: Category;
}

export default function CategoryPage({ category }: Props) {
  return (
    <Container>
      {category.slug === 'plant-care' ? (
        <Search
          title="tools"
          category="categories.slug:plant-care"
          colors={[
            { label: 'white', value: 'white' },
            { label: 'indianred', value: 'indianred' }
          ]}
          categories={[
            { label: 'potting supplies', value: 'potting supplies' },
            { label: 'planters', value: 'planters' },
            { label: 'plant stands', value: 'plant stands' }
          ]}
        />
      ) : (
        <Search
          title="plants"
          category="categories.slug:plants"
          colors={[
            { label: 'white', value: 'white' },
            { label: 'black', value: 'black' },
            { label: 'indianred', value: 'indianred' }
          ]}
          categories={[
            { label: 'Best For Beginners', value: 'Best For Beginners' },
            { label: 'Pet-Friendly Plants', value: 'Pet-Friendly Plants' },
            { label: 'Low-Light Tolerant', value: 'Low-Light Tolerant' },
            { label: 'Large Plants', value: 'Large Plants' }
          ]}
        />
      )}
    </Container>
  );
}
