import { FormEvent } from 'react';
import { loadStripe, StripeElements } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  ElementsConsumer
} from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { ShippingAddressFormType } from 'lib/types';
import { Stripe } from '@stripe/stripe-js/types/stripe-js/stripe';
import type { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import type { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Props {
  checkoutToken?: CheckoutToken;
  nextStep: () => void;
  backStep: () => void;
  shippingData?: ShippingAddressFormType;
  timeout(): void;
  onCaptureCheckout(
    checkoutTokenId: string,
    newOrder: CheckoutCapture
  ): Promise<void>;
}

export default function PaymentForm({
  checkoutToken,
  shippingData,
  onCaptureCheckout,
  backStep,
  nextStep,
  timeout
}: Props) {
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    elements: StripeElements,
    stripe: Stripe
  ) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!
    });

    if (error)
      return toast.error(
        'An error has ocurred. Please, make sure to fill the number card field correctly.'
      );

    const {
      firstName,
      lastName,
      address,
      email,
      city,
      zip,
      region,
      countries
    } = shippingData!;

    const orderData = {
      line_items: checkoutToken?.live.line_items,
      customer: { firstname: firstName, lastname: lastName, email },
      shipping: {
        name: 'Primary',
        street: address,
        town_city: city,
        county_state: region,
        postal_zip_code: zip,
        country: countries
      },
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id
        }
      }
    };

    onCaptureCheckout(checkoutToken?.id || '', orderData);
    timeout();
    nextStep();
  };

  return (
    <>
      <h2>Payment Method</h2>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements!, stripe!)}>
              <CardElement className="h-10 border-b-2 border-green-900 my-10" />
              <div className="flex items-center justify-between">
                <button
                  className="button button-big"
                  onClick={backStep}
                  type="button"
                >
                  Back
                </button>
                <button
                  className="button button-big"
                  type="submit"
                  disabled={!stripe}
                >
                  Pay {checkoutToken?.live.subtotal.formatted_with_symbol}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}
