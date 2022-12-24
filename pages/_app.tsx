import 'styles/global.css';
// import * as gtag from 'lib/gtag';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { UIProvider } from 'context/ui';
import { CartProvider } from 'context/cart';
import { ThemeProvider } from 'next-themes';
import algoliasearch from 'algoliasearch/lite';
import { SessionProvider } from 'next-auth/react';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);

export default function MyApp({
  Component,
  pageProps,
  router
}: AppProps<{
  session: Session;
}>) {
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     gtag.pageview(url);
  //   };

  //   router.events.on('routeChangeComplete', handleRouteChange);

  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <InstantSearch searchClient={algoliaClient} indexName="products">
      <Toaster
        position="bottom-center"
        containerClassName="w-4xl"
        containerStyle={{}}
        toastOptions={{
          className: 'min-w-[33rem] h-20',
          duration: 3000
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    className="pl-3 border-l border-neutral-300 text-xl"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    X
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <CartProvider>
        <UIProvider>
          <SessionProvider session={pageProps.session}>
            <ThemeProvider defaultTheme="light">
              <Component {...pageProps} />
            </ThemeProvider>
          </SessionProvider>
        </UIProvider>
      </CartProvider>
    </InstantSearch>
  );
}
