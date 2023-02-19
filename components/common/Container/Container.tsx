import { Footer, Header } from 'components/common';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Container(props) {
  const router = useRouter();
  const { children, ...customMeta } = props;

  const prop = {
    title: '',
    description: ``,
    image: '"',
    type: 'website',
    ...customMeta
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{prop.title}</title>
        <meta content={prop.description} name="description" />
        <link rel="canonical" href={`https://www..${router.asPath}`} />
      </Head>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
