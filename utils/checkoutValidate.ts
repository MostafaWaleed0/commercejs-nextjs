import { EMAIL, ZIP } from './validate';

export const checkoutValidate = ({
  firstName,
  lastName,
  email,
  address,
  zip,
  countries,
  city,
  region
}: {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  zip: string;
  countries: string;
  city: string;
  region: string;
}) => {
  const errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    city?: string;
    countries?: string;
    region?: string;
    zip?: string;
  } = {};

  if (!firstName || firstName.trim() === '') {
    errors.firstName = 'First name is required';
  }

  if (!lastName || lastName.trim() === '') {
    errors.lastName = 'Last name is required';
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!EMAIL.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!address || address.trim() === '') {
    errors.address = 'Address is required';
  }

  if (!city || city.trim() === '') {
    errors.city = 'Town / City is required';
  }

  if (!zip || zip.trim() === '') {
    errors.zip = 'ZIP / Postcode is required';
  } else if (!ZIP.test(zip)) {
    errors.zip = 'Invalid zip';
  }

  if (!countries || countries.trim() === '') {
    errors.countries = 'Country is required';
  }

  if (!region || region.trim() === '') {
    errors.region = 'Region is required';
  }

  return errors;
};
