const EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PHONE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g;
const ZIP = /^\d{5}[-\s]?(?:\d{4})?$/i;

export { ZIP, PHONE, EMAIL };
