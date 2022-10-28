import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { commerce } from 'lib/commerce';
import { Container } from 'components/common';
import { useUI } from 'context/ui';
import { Flower, Box, Cart, Search } from 'components/icons';

const ProductList = dynamic(() => import('components/product/ProductList'), {
  ssr: false
});

export async function getStaticProps() {
  const { data: products_plants } = await commerce.products.list({
    limit: 6,
    category_slug: ['plants']
  });
  const { data: products_equipment } = await commerce.products.list({
    limit: 6,
    category_slug: ['plant-care']
  });

  return {
    props: {
      products_equipment,
      products_plants
    }
  };
}

export default function Home({
  products_plants,
  products_equipment
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { openSearch } = useUI();

  return (
    <Suspense fallback={null}>
      <Container>
        <section className="h-[35rem] md:h-[50rem] relative flex overlay">
          <article className="m-auto container space-y-6">
            <h1 className="text-white">Plants increase happiness</h1>
            <p className="text-white md:text-xl text-md max-w-[72ch]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
              impedit quod porro optio, blanditiis non possimus eum saepe
              corrupti maiores obcaecati rerum?
            </p>
            <Link href="categories/plants">
              <a className="button button-big bg-white text-green-800">
                Shop all plants
              </a>
            </Link>
          </article>
          <div className="absolute -z-10 w-full h-full">
            <Image
              src="/static/images/scott-webb-oRWRlTgBrPo-unsplash.jpg"
              className="w-full h-full object-cover object-[20%_75%]"
              layout="fill"
            />
          </div>
        </section>
        <article className="container region-t space-y-20 text-center">
          <h2>why plant life?</h2>
          <ul
            className="auto-grid"
            style={{ '--auto-grid-min-size': 'min(55vw, 29rem)' }}
          >
            <li>
              <Flower />
              <p className="p-1 md:p-7 max-w-[72ch]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                iste eligendi quo nulla repellat id dolorem accusantium, sint,
                numquam, molestiae temporibus! Obcaecati saepe quae dolor
                veritatis culpa aliquam esse facilis.
              </p>
            </li>
            <li>
              <Box />
              <p className="p-1 md:p-7 max-w-[72ch]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                iste eligendi quo nulla repellat id dolorem accusantium, sint,
                numquam, molestiae temporibus! Obcaecati saepe quae dolor
                veritatis culpa aliquam esse facilis.
              </p>
            </li>
            <li>
              <Cart />
              <p className="p-1 md:p-7 max-w-[72ch]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                iste eligendi quo nulla repellat id dolorem accusantium, sint,
                numquam, molestiae temporibus! Obcaecati saepe quae dolor
                veritatis culpa aliquam esse facilis.
              </p>
            </li>
          </ul>
        </article>
        <section className="container region space-y-14">
          <header className="flex justify-between	items-center">
            <h2>featured</h2>
            <Link href="/categories/plants">
              <a className="">view all</a>
            </Link>
          </header>
          <ProductList products={products_plants} />
        </section>
        <div className="region bg-green-50 ">
          <div className="container">
            <button
              className="w-full h-16 flex justify-center items-center"
              onClick={openSearch}
              title="Open search"
              type="button"
              aria-label="Open search"
            >
              <div className="w-full h-full p-5 outline-none border-2 border-green-900 placeholder:text-green-900 text-green-900 mr-4">
                <div className="hidden sm:block mx-5 w-fit">Search the....</div>
                <div className="block sm:hidden mx-5 w-fit">Search</div>
              </div>
              <div className="bg-green-900 p-4" aria-label="search">
                <Search className="text-white py-2 h-full" width={16} />
              </div>
            </button>
          </div>
        </div>
        <section className="container region space-y-14">
          <header className="flex justify-between	items-center">
            <h2>plant care</h2>
            <Link href="/categories/plant-care">
              <a className="">view all</a>
            </Link>
          </header>
          <ProductList products={products_equipment} />
        </section>
        <section>
          <div className="grid grid-cols-12 lg:grid-rows-1 grid-rows-2">
            <div className="order-last col-span-12 md:order-first md:col-span-6 bg-green-50">
              <div className="p-11 lg:py-48 lg:p-24 md:p-16 m-auto max-w-3xl text-left">
                <h2>sign up for our rewards program</h2>
                <p className="my-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Totam veniam voluptas ipsa rem nulla asperiores architecto
                  corrupti cumque! Ea molestias saepe voluptates impedit rem
                  adipisci tempora ab illum fugiat expedita.
                </p>
                <Link href="/rewards">
                  <a className="button button-big"> Learn More</a>
                </Link>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 relative">
              <Image
                src="/static/images/Bathroom_Sinks.jpg"
                height={100}
                layout="fill"
                alt="Plants and mirrors"
                title="Plants and mirrors"
              />
            </div>
          </div>
        </section>
        <article className="container region space-y-16 ">
          <h2 className="text-center">What people are saying</h2>
          <ul
            className="auto-grid text-center text-lg"
            style={{ '--auto-grid-min-size': 'min(60vw, 29rem)' }}
          >
            <li>
              <figure className="space-y-4 p-7">
                <blockquote>
                  <p>
                    "I've ordered from a lot of plant stores, but this is the
                    finest one! The delivery of my plants was quite quick. plant
                    life answered my question immediately away, and they were
                    really friendly"
                  </p>
                </blockquote>
                <figcaption className="font-bold">John Wick</figcaption>
              </figure>
            </li>
            <li>
              <figure className="space-y-4 p-7">
                <blockquote>
                  <p>
                    "I've ordered from a lot of plant stores, but this is the
                    finest one! The delivery of my plants was quite quick. plant
                    life answered my question immediately away, and they were
                    really friendly"
                  </p>
                </blockquote>
                <figcaption className="font-bold">John Wick</figcaption>
              </figure>
            </li>
            <li>
              <figure className="space-y-4 p-7">
                <blockquote>
                  <p>
                    "I've ordered from a lot of plant stores, but this is the
                    finest one! The delivery of my plants was quite quick. plant
                    life answered my question immediately away, and they were
                    really friendly"
                  </p>
                </blockquote>
                <figcaption className="font-bold">John Wick</figcaption>
              </figure>
            </li>
          </ul>
        </article>
      </Container>
    </Suspense>
  );
}
