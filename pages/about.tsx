import { Container } from 'components/common';
import { Facebook, Mail, Twitter } from 'components/icons';
import { Banner } from 'components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

  const showMoreItems = () => setLimit(limit + 5);

  return (
    <Container>
      <Banner
        title="Plants increase happiness"
        image="about-us/pexels-sohail-nachiti-807598.jpg"
      />
      <article className="container region flex flex-col md:flex-row justify-center items-center gap-16">
        <div>
          <Image
            src="/static/images/about-us/face.jpg"
            className="rounded-2xl"
            width={450}
            height={450}
            alt="Company owner"
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
            alt="Home delivery of plants"
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
            alt={''}
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
              return index < limit ? (
                <li className="bg-green-50 text-center px-6 py-10 rounded-3xl font-raisonne space-y-4">
                  <Image
                    src={`/static/images/about-us/${item.image}`}
                    className="rounded-full object-cover mx-auto"
                    width={120}
                    height={120}
                    alt={''}
                  />
                  <span className="block">{item.job}</span>
                  <h3>{item.name}</h3>
                  <ul
                    className="flex justify-center items-center gap-5 text-orange-600"
                    role="list"
                  >
                    <li>
                      <Link href={item.social_media.facebook}>
                        <Facebook />
                      </Link>
                    </li>
                    <li>
                      <Link href={item.social_media.twitter}>
                        <Twitter />
                      </Link>
                    </li>
                    <li>
                      <Link href={item.social_media.mail}>
                        <Mail />
                      </Link>
                    </li>
                  </ul>
                  <p className="px-6 text-gray-700">{item.description}</p>
                </li>
              ) : null;
            })}
          </ol>
          <div className="text-center">
            <button
              className="button button-big"
              onClick={showMoreItems}
              type="button"
            >
              show more
            </button>
          </div>
        </div>
      </article>
    </Container>
  );
}
