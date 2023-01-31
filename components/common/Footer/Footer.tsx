import Link from 'next/link';
import { FormInput } from 'components/form';

export default function Footer() {
  return (
    <footer
      className="py-24 bg-green-900 text-white container"
      role="contentinfo"
    >
      <div className="container">
        <div className="flex items-start flex-col lg:flex-row gap-5 justify-between capitalize">
          <nav
            className="flex items-start justify-between flex-wrap capitalize gap-20"
            aria-label="secondary"
            tabIndex={-1}
          >
            <div className="space-y-5 pb-10 pr-4 lg:p-0">
              <h3 className="text-xl">company</h3>
              <ul className="space-y-4 text-sm" role="list">
                <li>
                  <Link href="/about">about</Link>
                </li>
                <li>
                  <Link href="/careers">careers</Link>
                </li>
                <li>
                  <Link href="/">our guarantee</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-5 pb-10 pr-4 lg:p-0">
              <h3 className="text-xl">support</h3>
              <ul className="space-y-4 text-sm" role="list">
                <li>
                  <Link href="/contact">contact</Link>
                </li>
                <li>
                  <Link href="/">FAQs</Link>
                </li>
                <li>
                  <Link href="/">Returns and Delivery</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-5 pb-10 pr-4 lg:p-0">
              <h3 className="text-xl">terms</h3>
              <ul className="space-y-4 text-sm" role="list">
                <li>
                  <Link href="/">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/">Cookies</Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="space-y-9 max-w-full">
            <h3>subscribe to get latest updates</h3>
            <form
              className="flex items-end justify-end h-16 border border-white rounded overflow-hidden"
              action=""
            >
              <FormInput
                type="email"
                id={''}
                label={''}
                className="bg-transparent  outline-none py-5 px-6 h-16 w-96"
                aria-label="email"
              />
              <button
                className="button bg-white text-green-900 h-full rounded px-7"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
