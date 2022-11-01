import CheckoutView from 'components/checkout/CheckoutView/CheckoutView';
import Container from 'components/common/Container';

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
