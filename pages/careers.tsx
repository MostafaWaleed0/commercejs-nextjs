import Link from 'next/link';
import { Container } from 'components/common';
import { Banner, Collapse } from 'components/ui';

export default function Careers() {
  return (
    <Container>
      <Banner
        title="careers"
        image="about-us/houseplants-that-are-good-for-your-health-00-intro-1440x810.jpg"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          quia iste ducimus ullam minima doloribus explicabo laboriosam at
          voluptas reiciendis tenetur, esse sapiente, repudiandae voluptatum cum
          voluptatibus et suscipit eaque!
        </p>
        <Link href="" className="button button-big">
          open position
        </Link>
      </Banner>
      <article className="container region flex flex-col md:flex-row justify-between">
        <div className="w-full mb-10 md:mb-0">
          <h2>frequently asked questions</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="w-full">
          <Collapse
            title="how do I know if my application was received?"
            order={1}
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
          />
          <Collapse
            title="do you offer internships?"
            order={2}
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
          />
          <Collapse
            title="how long does the order take?"
            order={3}
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
          />
        </div>
      </article>
    </Container>
  );
}
