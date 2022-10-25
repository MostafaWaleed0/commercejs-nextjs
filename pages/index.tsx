import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { commerce } from 'lib/commerce';
import { Container } from 'components/common';
import { useUI } from 'context/ui';

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={70}
                height={70}
                fill="currentColor"
                className="mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826zM8 1a1 1 0 0 0-.998 1.03l.01.091c.012.077.029.176.054.296.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a4.997 4.997 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1zM2 9l.03-.002.091-.01a4.99 4.99 0 0 0 .296-.054c.241-.049.542-.122.887-.213a60.59 60.59 0 0 0 2.314-.676L5.762 8l-.144-.045a60.59 60.59 0 0 0-2.314-.676 16.705 16.705 0 0 0-.887-.213 4.99 4.99 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2zm7 5-.002-.03a5.005 5.005 0 0 0-.064-.386 16.398 16.398 0 0 0-.213-.888 60.582 60.582 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a4.996 4.996 0 0 0-.064.386L7 14a1 1 0 1 0 2 0zm-5.696-2.134.025-.017a5.001 5.001 0 0 0 .303-.248c.184-.164.408-.377.661-.629A60.614 60.614 0 0 0 5.96 9.23l.103-.111-.147.033a60.88 60.88 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5.063 5.063 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027c.01-.02.021-.048.036-.084a5.09 5.09 0 0 0 .102-.283c.078-.233.165-.53.258-.874a60.6 60.6 0 0 0 .572-2.343l.033-.147-.11.102a60.848 60.848 0 0 0-1.743 1.667 17.07 17.07 0 0 0-.629.66 5.06 5.06 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366zm9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a4.951 4.951 0 0 0-.303.248 16.69 16.69 0 0 0-.661.629A60.72 60.72 0 0 0 10.04 6.77l-.102.111.147-.033a60.6 60.6 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a4.993 4.993 0 0 0 .367-.138.53.53 0 0 0 .027-.014zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027c-.01.02-.021.048-.036.084a5.09 5.09 0 0 0-.102.283c-.078.233-.165.53-.258.875a60.62 60.62 0 0 0-.572 2.342l-.033.147.11-.102a60.848 60.848 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5.001 5.001 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366zM14 9a1 1 0 0 0 0-2l-.03.002a4.996 4.996 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a4.996 4.996 0 0 0 .386.064L14 9zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035c.072.03.166.064.283.103.233.078.53.165.874.258a60.88 60.88 0 0 0 2.343.572l.147.033-.103-.111a60.584 60.584 0 0 0-1.666-1.742 16.705 16.705 0 0 0-.66-.629 4.996 4.996 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366zm2.196-1.196.017.025a4.996 4.996 0 0 0 .248.303c.164.184.377.408.629.661A60.597 60.597 0 0 0 6.77 5.96l.111.102-.033-.147a60.602 60.602 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5.006 5.006 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1zm9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a60.619 60.619 0 0 0-2.342-.572l-.147-.033.102.111a60.73 60.73 0 0 0 1.667 1.742c.253.252.477.465.66.629a4.946 4.946 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366zm-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5.065 5.065 0 0 0-.248-.303 16.705 16.705 0 0 0-.629-.661A60.462 60.462 0 0 0 9.23 10.04l-.111-.102.033.147a60.6 60.6 0 0 0 .572 2.342c.093.345.18.642.258.875a4.985 4.985 0 0 0 .138.367.575.575 0 0 0 .014.027zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              </svg>
              <p className="p-1 md:p-7 max-w-[72ch]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                iste eligendi quo nulla repellat id dolorem accusantium, sint,
                numquam, molestiae temporibus! Obcaecati saepe quae dolor
                veritatis culpa aliquam esse facilis.
              </p>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={70}
                height={70}
                fill="currentColor"
                className="mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M2.95.4a1 1 0 0 1 .8-.4h8.5a1 1 0 0 1 .8.4l2.85 3.8a.5.5 0 0 1 .1.3V15a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4.5a.5.5 0 0 1 .1-.3L2.95.4ZM7.5 1H3.75L1.5 4h6V1Zm1 0v3h6l-2.25-3H8.5ZM15 5H1v10h14V5Z" />
              </svg>
              <p className="p-1 md:p-7 max-w-[72ch]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                iste eligendi quo nulla repellat id dolorem accusantium, sint,
                numquam, molestiae temporibus! Obcaecati saepe quae dolor
                veritatis culpa aliquam esse facilis.
              </p>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={70}
                height={70}
                fill="currentColor"
                className="mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
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
            <Link href="/plants">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  focusable="false"
                >
                  <g clip-path="url(#clip0_114_108)">
                    <path
                      d="M12.7011 3.92782C14.3858 3.92628 16.0332 4.42447 17.4348 5.35935C18.8364 6.29424 19.9292 7.62382 20.575 9.17991C21.2208 10.736 21.3906 12.4486 21.0628 14.1012C20.7351 15.7538 19.9246 17.2721 18.7338 18.4639C17.543 19.6558 16.0255 20.4677 14.3732 20.7969C12.721 21.1262 11.0081 20.958 9.45147 20.3136C7.8948 19.6692 6.56422 18.5776 5.62805 17.1769C4.69188 15.7762 4.19219 14.1293 4.19219 12.4445C4.20241 10.1902 5.10191 8.03107 6.69521 6.43632C8.2885 4.84157 10.4468 3.94009 12.7011 3.92782ZM12.7011 2.33337C10.7013 2.33337 8.74641 2.92638 7.08365 4.0374C5.42089 5.14843 4.12492 6.72757 3.35963 8.57513C2.59435 10.4227 2.39411 12.4557 2.78425 14.4171C3.17439 16.3784 4.13738 18.1801 5.55145 19.5941C6.96551 21.0082 8.76714 21.9712 10.7285 22.3613C12.6899 22.7515 14.7229 22.5512 16.5704 21.7859C18.418 21.0206 19.9971 19.7247 21.1082 18.0619C22.2192 16.3992 22.8122 14.4443 22.8122 12.4445C22.8122 9.76285 21.7469 7.19105 19.8507 5.29485C17.9545 3.39865 15.3827 2.33337 12.7011 2.33337Z"
                      fill="white"
                    />
                    <path
                      d="M27.2222 25.8922L21.49 20.1211L20.3856 21.2178L26.1178 26.9889C26.1898 27.0614 26.2754 27.119 26.3697 27.1585C26.4639 27.1979 26.5651 27.2184 26.6673 27.2187C26.7695 27.2191 26.8707 27.1993 26.9653 27.1606C27.0598 27.1218 27.1458 27.0648 27.2183 26.9928C27.2909 26.9208 27.3485 26.8352 27.3879 26.7409C27.4274 26.6466 27.4479 26.5455 27.4482 26.4433C27.4486 26.3411 27.4288 26.2398 27.39 26.1453C27.3513 26.0507 27.2942 25.9647 27.2222 25.8922Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_114_108">
                      <rect width="28" height="28" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </button>
          </div>
        </div>
        <section className="container region space-y-14">
          <header className="flex justify-between	items-center">
            <h2>plant stands</h2>
            <Link href="/products">
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
