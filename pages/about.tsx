import Link from 'next/link';
import Image from 'next/image';
import { Container } from 'components/common';
import { useState } from 'react';
import { Banner } from 'components/ui';

const list = [
  {
    id: 1,
    image: 'face.jpg',
    job: 'Founder',
    name: 'Layla',
    social_media: {
      mail: '/',
      facebook: '/',
      twitter: '/'
    },
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit'
  },
  {
    id: 2,
    image: 'face-2.jpg',
    job: 'CEO',
    name: 'Layla',
    social_media: {
      mail: '/',
      facebook: '/',
      twitter: '/'
    },
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit'
  },
  {
    id: 3,
    image: 'face-3.jpg',
    job: 'Designer',
    name: 'Quinten Verschure',
    social_media: {
      mail: '/',
      facebook: '/',
      twitter: '/'
    },
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit'
  },
  {
    id: 4,
    image: 'face-3.jpg',
    job: 'Developer',
    name: 'Ross Geller',
    social_media: {
      mail: '/',
      facebook: '/',
      twitter: '/'
    },
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit'
  },
  {
    id: 5,
    image: 'face-3.jpg',
    job: 'Developer',
    name: 'Ross Geller',
    social_media: {
      mail: '/',
      facebook: '/',
      twitter: '/'
    },
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit'
  }
];

export default function About() {
  const [limit, setLimit] = useState(4);

  function showMoreItems() {
    setLimit(limit + 5);
  }

  return (
    <Container>
      <Banner
        title="Plants increase happiness"
        image="pexels-sohail-nachiti-807598.jpg"
      />
      <article className="container region flex flex-col md:flex-row justify-center items-center gap-16">
        <div>
          <Image
            src="/static/images/about-us/face.jpg"
            className="rounded-2xl"
            width={450}
            height={450}
          />
        </div>
        <div className="w-full md:w-4/12 space-y-4">
          <h2>The story of plant life</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            quod. Similique, beatae deserunt provident, tempora natus ducimus
            iure voluptatibus vero aut blanditiis necessitatibus aperiam
            consectetur, tempore delectus cumque iusto reiciendis!
          </p>
        </div>
      </article>
      <article className="container flex flex-col-reverse md:flex-row justify-center items-center gap-16">
        <div className="w-full md:w-4/12 space-y-4">
          <h2>Shipped to your door</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            quod. Similique, beatae deserunt provident, tempora natus ducimus
            iure voluptatibus vero aut blanditiis necessitatibus aperiam
            consectetur, tempore delectus cumque iusto reiciendis!
          </p>
        </div>
        <div className="w-fit">
          <Image
            src="/static/images/about-us/best_plant_delivery_services-650x433.jpg"
            className="rounded-2xl"
            width={450}
            height={450}
          />
        </div>
      </article>
      <article className="container region flex flex-col md:flex-row justify-center items-center gap-16">
        <div className="w-fit">
          <Image
            src="/static/images/about-us/clx090118countryinthecity-01-1550676937.jpg"
            className="rounded-2xl object-cover"
            width={450}
            height={450}
          />
        </div>
        <div className="w-full md:w-4/12 space-y-4">
          <h2>our experiences</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            quod. Similique, beatae deserunt provident, tempora natus ducimus
            iure voluptatibus vero aut blanditiis necessitatibus aperiam
            consectetur, tempore delectus cumque iusto reiciendis!
          </p>
        </div>
      </article>
      <article className="container pb-40">
        <div>
          <h2 className="text-center">our team</h2>
          <ol
            className="auto-grid mx-auto py-20"
            role="list"
            style={{ '--auto-grid-min-size': '26rem' }}
          >
            {list.map((item, index) => {
              if (index < limit)
                return (
                  <li className="bg-green-50 text-center px-6 py-10 rounded-3xl font-raisonne space-y-4">
                    <Image
                      src={`/static/images/about-us/${item.image}`}
                      className="rounded-full object-cover"
                      width={120}
                      height={120}
                    />
                    <span className="block ">{item.job}</span>
                    <h3>{item.name}</h3>
                    <ul
                      className="flex justify-center items-center gap-5 text-orange-600"
                      role="list"
                    >
                      <li>
                        <Link href={item.social_media.facebook}>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={item.social_media.twitter}>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                            </svg>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={item.social_media.mail}>
                          <a>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                            </svg>
                          </a>
                        </Link>
                      </li>
                    </ul>
                    <p className="px-6 text-gray-700">{item.description}</p>
                  </li>
                );
            })}
          </ol>
          <div className="text-center">
            <button className="button button-big" onClick={showMoreItems}>
              show more
            </button>
          </div>
        </div>
      </article>
    </Container>
  );
}
