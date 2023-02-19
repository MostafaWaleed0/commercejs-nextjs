import { CheckoutView } from 'components/checkout';
import { Container } from 'components/common';

export default function Checkout() {
  return (
    <Container title="">
      <div className="container region">
        <div className="lg:px-36">
          <CheckoutView />
        </div>
      </div>
    </Container>
  );
}
