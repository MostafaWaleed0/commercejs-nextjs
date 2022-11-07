import { EMAIL, PHONE } from './validate';

export const contactValidate = ({
  firstName,
  lastName,
  email,
  phone,
  reason,
  details
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  details: string;
}) => {
  const errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    reason?: string;
    details?: string;
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

  if (!phone || phone.trim() === '') {
    errors.phone = 'Phone number is required';
  } else if (!PHONE.test(phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (!reason || reason.trim() === '') {
    errors.reason = 'Reason for contact is required';
  }

  if (details.length > 1000) {
    errors.details = "Your details can't be more than 1000 characters";
  }

  return errors;
};
