import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { ShippingAddressForm } from 'components/checkout';
import { PaymentForm } from 'components/checkout';
import { useCartContext } from 'context/cart';
import { commerce } from 'lib/commerce';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import { ShippingAddressFormType } from 'lib/types';
import { Circle } from 'components/icons';

export default function CheckoutView() {
  const { id, setCart } = useCartContext();
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken>();
  const [shippingData, setShippingData] = useState<ShippingAddressFormType>();
  const [activeStep, setActiveStep] = useState(1);
  const [order, setOrder] = useState<CheckoutCaptureResponse>();
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

  async function generateToken() {
    try {
      const token = await commerce.checkout.generateToken(id, {
        type: 'cart'
      });

      setCheckoutToken(token);
    } catch (error) {
      error;
    }
  }

  async function refreshCart() {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  async function onCaptureCheckout(
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ) {
    try {
      const incomingOrder: CheckoutCaptureResponse | undefined =
        await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      error;
    }
  }

  function getShippingData(data: SetStateAction<ShippingAddressFormType>) {
    setShippingData(data);
    nextStep();
  }

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <h2>Thank you for your purchase, {order.customer.firstname}</h2>
          <p>Order ref: {order.customer_reference}</p>
          <br />
          <button type="button" onClick={() => router.push('/')}>
            Back to Home
          </button>
        </div>
      </>
    ) : isFinished ? (
      <>
        <div>
          <h2>Thank you for your purchase, {shippingData.firstName}!</h2>
          <p>Order ref: </p>
          <br />
          <button type="button" onClick={() => router.push('/')}>
            Back to Home
          </button>
        </div>
      </>
    ) : (
      <button type="button" className="button button-big" disabled>
        <Circle />
        Processing...
      </button>
    );

  useEffect(() => {
    generateToken();
  }, [id]);

  function timeout() {
    setTimeout(() => {
      setIsFinished(true);
      refreshCart();
    }, 7000);
  }

  const CheckoutStep = () => {
    switch (activeStep) {
      case 2:
        return (
          <PaymentForm
            checkoutToken={checkoutToken}
            shippingData={shippingData}
            onCaptureCheckout={onCaptureCheckout}
            backStep={backStep}
            nextStep={nextStep}
            timeout={timeout}
          />
        );

      case 3:
        return <Confirmation />;

      default:
        return (
          <ShippingAddressForm
            checkoutToken={checkoutToken}
            getShippingData={getShippingData}
          />
        );
    }
  };

  return (
    <div>
      <div className={`${activeStep === 3 && 'hidden'}`}>
        <span className="font-bold">Checkout</span>
        <span className="mx-2"> &gt; </span>
        <span className={`${activeStep === 2 && 'font-bold'}`}>
          Payment Method
        </span>
      </div>
      <CheckoutStep />
    </div>
  );
}
