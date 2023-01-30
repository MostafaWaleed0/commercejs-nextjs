import dynamic from 'next/dynamic';
import { Container } from 'components/common';

const ContactForm = dynamic(() => import('components/ContactForm'), {
  ssr: false
});

const Banner = dynamic(() => import('components/ui/Banner'), { ssr: false });

export default function Contact() {
  return (
    <Container>
      <Banner title="We would love hearing from you." image="contact.jpg">
        <p className="text-lg w-3/4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
          recusandae exercitationem totam, eum quisquam.
        </p>
      </Banner>
      <article className="container region flex justify-between flex-col lg:flex-row gap-20">
        <div className="space-y-8 lg:w-2/5">
          <h2> Get in touch.</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
            reiciendis quam expedita exercitationem voluptatum eveniet impedit
            distinctio? Nemo atque eveniet debitis! Eveniet nisi dolores quaerat
            corrupti similique consectetur cupiditate mollitia!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
            reiciendis quam expedita exercitationem voluptatum eveniet impedit
            distinctio? Nemo atque eveniet debitis! Eveniet nisi dolores quaerat
            corrupti similique consectetur cupiditate mollitia!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
            reiciendis quam expedita exercitationem voluptatum eveniet impedit
            distinctio? Nemo atque eveniet debitis! Eveniet nisi dolores quaerat
            corrupti similique consectetur cupiditate mollitia!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
            reiciendis quam expedita exercitationem voluptatum eveniet impedit
            distinctio? Nemo atque eveniet debitis! Eveniet nisi dolores quaerat
            corrupti similique consectetur cupiditate mollitia!
          </p>
        </div>
        <div className="lg:w-6/12 space-y-12">
          <h3>contact information</h3>
          <ContactForm />
        </div>
      </article>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2seg!4v1664579344934!5m2!1sen!2seg"
        height="550"
        className="w-full"
        style={{ border: '0;' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
        sandbox="allow-scripts"
      />
    </Container>
  );
}
