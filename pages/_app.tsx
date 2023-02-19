import 'styles/global.css';
// import * as gtag from 'lib/gtag';
import { AppProps } from 'next/app';
import { UIProvider } from 'context/ui';
import { CartProvider } from 'context/cart';
import algoliasearch from 'algoliasearch/lite';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { useCallback } from 'react';

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
);

export default function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   const handleRouteChange = (url) => {
  //     gtag.pageview(url);
  //   };

  //   router.events.on('routeChangeComplete', handleRouteChange);

  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

  const handleToggleDismissToast = useCallback(
    (id: string) => () => toast.dismiss(id),
    []
  );

  return (
    <InstantSearch searchClient={algoliaClient} indexName="products">
      <Toaster
        position="bottom-center"
        containerClassName="w-4xl"
        containerStyle={{}}
        toastOptions={{
          className: 'h-fit min-w-[35%]',
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
                    onClick={handleToggleDismissToast(t.id)}
                    type="button"
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
          <Component {...pageProps} />
        </UIProvider>
      </CartProvider>
    </InstantSearch>
  );
}
