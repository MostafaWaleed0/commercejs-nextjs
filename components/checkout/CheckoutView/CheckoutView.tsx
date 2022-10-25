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
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
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
