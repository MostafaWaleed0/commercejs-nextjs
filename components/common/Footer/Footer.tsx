import Link from 'next/link';
import { FormInput } from 'components/form';

export default function Footer() {
  return (
    <footer
      className="py-24 bg-green-900 text-white container"
      role="contentinfo"
    >
      <div className="container">
        <div className="flex items-start flex-wrap justify-between capitalize">
          <nav
            className="flex items-start justify-between capitalize gap-20"
            aria-label="secondary"
            tabIndex={-1}
          >
            <div className="space-y-5 pb-10 pr-4 lg:p-0">
              <h3 className="text-xl">company</h3>
              <ul className="space-y-4 text-sm" role="list">
                <li>
                  <Link href="/">
                    <a>about</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>careers</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>our guarantee</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-5 pb-10 pr-4 lg:p-0">
              <h3 className="text-xl">support</h3>
              <ul className="space-y-4 text-sm" role="list">
                <li>
                  <Link href="/contact">
                    <a>contact</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>FAQs</a>
                  </Link>
                </li>
                <li>
                  <a href="">Returns and Delivery</a>
                </li>
              </ul>
            </div>
            <div className="space-y-5 pb-10 pr-4 lg:p-0">
              <h3 className="text-xl">terms</h3>
              <ul className="space-y-4 text-sm" role="list">
                <li>
                  <Link href="/">
                    <a>Terms of Service</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Privacy Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Cookies</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="space-y-9">
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
              <button className="button bg-white text-green-900 h-full rounded px-7">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
