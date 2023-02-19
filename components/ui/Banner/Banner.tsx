import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface Props {
  title: string;
  image: string;
  children?: ReactNode;
}

export default function Banner({ title, image, children }: Props) {
  const router = useRouter();
  const char = router.pathname[0];

  return (
    <section className="min-h-[20rem] relative flex overlay">
      <article className="w-full md:w-3/5 m-auto py-14 space-y-6 font-raisonne text-white container">
        <span className="font-bold capitalize">
          {router.pathname.replaceAll(char, '/ ')}
        </span>
        <h1 className="max-w-[20ch]">{title}</h1>
        {children}
      </article>
      <div className="absolute -z-10 w-full h-full ">
        <Image
          src={`/static/images/${image}`}
          className="object-cover w-full h-full object-[66%,35%]"
          fill
          alt={''}
        />
      </div>
    </section>
  );
}
