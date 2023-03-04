import { Bag, List, Logo, Search } from 'components/icons';
import { useCartContext } from 'context/cart';
import { useUI } from 'context/ui';
import useMediaQuery from 'hook/useMediaQuery';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef, useState } from 'react';

const Autocomplete = dynamic(() => import('components/filter/Autocomplete'), {
  ssr: false
});

export default function Header() {
  const dialog = useRef(null);
  const [toggle, setToggle] = useState(false);
  const { total_unique_items } = useCartContext();
  const { displaySearch, openSearch, closeSearch } = useUI();
  const matchesSearch = useMediaQuery(0, dialog, displaySearch, openSearch);

  const handleToggle = () => setToggle((x) => !x);

  return (
    <header
      role="banner"
      className="py-3 h-fit w-full z-10 flex items-center justify-center shadow-md relative"
    >
      <div className="container">
        <div className="flex flex-col">
          <div className="flex items-center	justify-between gap-2">
            <Link href="/" aria-label="Plant Life">
              <Logo />
            </Link>
            <nav
              aria-label="primary"
              tabIndex={-1}
              className={`${
                toggle ? '' : 'hidden'
              }  lg:block absolute top-full right-0 z-100 lg:static p-3 lg:p-0 lg:bg-white bg-green-900`}
            >
              <ul
                className="flex flex-col lg:flex-row gap-5 text-white lg:text-green-900"
                role="list"
              >
                <li className="m-3">
                  <Link href="/categories/plants">plants</Link>
                </li>
                <li className="m-3">
                  <Link href="/categories/plant-care">tools</Link>
                </li>
                <li className="m-3">
                  <Link href="/guides">guides</Link>
                </li>
              </ul>
            </nav>
            <div className="flex justify-end items-center">
              <button
                aria-label="Open search"
                className="flex items-center justify-start p-3 lg:px-5 h-10 w-fit lg:w-72 focus:outline-none rounded-full border border-green-900"
                title="Open search"
                type="button"
                onClick={openSearch}
              >
                <div className="flex-0 h-10 py-1">
                  <Search />
                </div>
                <div className="hidden lg:block">
                  <div className="hidden sm:block mx-5">Search the....</div>
                </div>
              </button>
              <div>
                {matchesSearch && (
                  <Autocomplete handleClose={closeSearch} ref={dialog} />
                )}
              </div>
              <Link href="/cart" className="relative ml-6" aria-label="">
                <span
                  className="absolute -top-2.5 -right-2.5 text-xsm rounded-full bg-green-900 w-6 h-6 text-white grid place-items-center ring-4 ring-white"
                  aria-hidden
                >
                  {total_unique_items}
                </span>
                <Bag />
              </Link>
              <div className="flex justify-end items-center lg:hidden">
                <button
                  type="button"
                  onClick={handleToggle}
                  aria-label="Toggle menu"
                >
                  <a className="relative ml-6" aria-label="">
                    <List />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
