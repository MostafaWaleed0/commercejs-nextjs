import { SetStateAction, useEffect, useState } from 'react';
import { commerce } from 'lib/commerce';
import { useRouter } from 'next/router';
import { FormInput } from 'components/form';
import { checkoutValidate } from 'utils';
import { FormSelect } from 'components/form';
import { ShippingAddressFormType } from 'lib/types';
import type { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import type {
  LocaleListCountriesResponse,
  LocaleListSubdivisionsResponse
} from '@chec/commerce.js/features/services';

interface IErrors extends Partial<ShippingAddressFormType> {}

interface Props {
  checkoutToken: CheckoutToken;
  getShippingData(data: SetStateAction<ShippingAddressFormType>): void;
}

export default function ShippingAddressForm({
  checkoutToken,
  getShippingData
}: Props) {
  const router = useRouter();

  const [shippingCountries, setShippingCountries] = useState<
    LocaleListCountriesResponse['countries'] | {}
  >({});
  const [selectedCountry, setSelectedCountry] = useState('');

  async function fetchShippingCountries(checkoutTokenId: string) {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setSelectedCountry(Object.keys(countries)[0]);
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken?.id);
  }, []);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name
  }));

  const [shippingSubdivisions, setShippingSubdivisions] = useState<
    LocaleListSubdivisionsResponse['subdivisions'] | {}
  >({});
  const [selectedSubdivision, setSelectedSubdivision] = useState('');

  async function fetchShippingSubdivisions(countryCode: string) {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setSelectedSubdivision(Object.keys(subdivisions)[0]);
    setShippingSubdivisions(subdivisions);
  }

  useEffect(() => {
    selectedCountry && fetchShippingSubdivisions(selectedCountry);
  }, [selectedCountry]);

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({ id: code, label: name })
  );

  const [values, setValues] = useState<ShippingAddressFormType>({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    region: '',
    countries: '',
    zip: '',
    address: ''
  });

  useEffect(() => {
    return setValues({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      city: values.city,
      region: selectedSubdivision,
      countries: selectedCountry,
      zip: values.zip,
      address: values.address
    });
  }, [selectedSubdivision, selectedCountry]);

  const [errors, setErrors] = useState<IErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const errors = checkoutValidate(values);
    if (errors && Object.keys(errors).length > 0) {
      return setErrors(errors);
    }
    setErrors({});
    setLoading(true);
    getShippingData(values);
    setLoading(false);
  }

  async function handleChange(e: {
    target: {
      name: string;
      value: SetStateAction<string> | string;
    };
    preventDefault?: () => void;
  }) {
    e.preventDefault();
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }));
  }

  function handleSelectedCountry(e: {
    target: { name: string; value: SetStateAction<string> };
  }) {
    handleChange(e);
    setSelectedCountry(e.target.value);
  }

  function handleSelectedSubdivisions(e: {
    target: { name: string; value: SetStateAction<string> };
  }) {
    handleChange(e);
    setSelectedSubdivision(e.target.value);
  }

  return (
    <div className="space-y-10">
      <h2>Your Details</h2>
      <form className="space-y-10">
        <div className="grid grid-cols-2 gap-5">
          <FormInput
            value={values.firstName}
            type="text"
            id="firstName"
            label="first name"
            require={true}
            onChange={handleChange}
            error={!!errors.firstName}
            errorMessage={errors.firstName ? errors.firstName : ''}
            autoFocus
          />
          <FormInput
            value={values.lastName}
            type="text"
            id="lastName"
            label="last name"
            require={true}
            onChange={handleChange}
            error={!!errors.lastName}
            errorMessage={errors.lastName ? errors.lastName : ''}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <FormInput
            value={values.address}
            type="text"
            id="address"
            label="address"
            require={true}
            onChange={handleChange}
            error={!!errors.address}
            errorMessage={errors.address ? errors.address : ''}
          />
          <FormInput
            value={values.email}
            type="email"
            id="email"
            label="email address"
            require={true}
            onChange={handleChange}
            error={!!errors.email}
            errorMessage={errors.email ? errors.email : ''}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <FormInput
            value={values.city}
            type="text"
            id="city"
            label="city"
            require={true}
            onChange={handleChange}
            error={!!errors.city}
            errorMessage={errors.city ? errors.city : ''}
          />
          <FormInput
            value={values.zip}
            type="text"
            id="zip"
            label="zip"
            require={true}
            onChange={handleChange}
            error={!!errors.zip}
            errorMessage={errors.zip ? errors.zip : ''}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <FormSelect
            name="countries"
            label="countries"
            require={true}
            onChange={handleSelectedCountry}
            error={!!errors.countries}
            errorMessage={errors.countries ? errors.countries : ''}
            value={selectedCountry}
          >
            {countries.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </FormSelect>
          <FormSelect
            name="region"
            label="region"
            require={true}
            onChange={handleSelectedSubdivisions}
            error={!!errors.region}
            errorMessage={errors.region ? errors.region : ''}
            value={selectedSubdivision}
          >
            {subdivisions.map((option) => (
              <option key={option.id} value={option.label}>
                {option.label}
              </option>
            ))}
          </FormSelect>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="button button-big"
            onClick={() => router.push('/')}
          >
            back
          </button>
          <button
            className="button button-big"
            disabled={loading}
            onClick={handleSubmit}
          >
            next
          </button>
        </div>
      </form>
    </div>
  );
}
