// import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { contactValidate } from 'utils';
import FormTextArea from 'components/form/FormTextArea';
import FormInput from 'components/form/FormInput';
import CustomFormSelect from 'components/form/CustomFormSelect';

interface IValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reason: string;
  details: string;
}

interface IErrors extends Partial<IValues> {}

export default function ContactForm() {
  const [values, setValues] = useState<IValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
    details: ''
  });

  const [errors, setErrors] = useState<IErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const errors = contactValidate(values);
    if (errors && Object.keys(errors).length > 0) {
      return setErrors(errors);
    }
    setErrors({});
    setLoading(true);

    // emailjs
    //   .sendForm(
    //     process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    //     process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    //     form.current,
    //     process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    //   )
    //   .then(() => {
    //     return setValues({
    //       firstName: '',
    //       lastName: '',
    //       email: '',
    //       phone: '',
    //       reason: '',
    //       details: ''
    //     });
    //   });

    // setLoading(false);
  }

  async function handleChange(e: {
    preventDefault: () => void;
    target: {
      name: string;
      getAttribute: (arg: string) => any;
      value: string;
    };
  }) {
    e.preventDefault();
    if (!e.target.name) {
      setValues((prevInput) => ({
        ...prevInput,
        [e.target.getAttribute('data-name')]:
          e.target.getAttribute('data-value')
      }));
    } else {
      setValues((prevInput) => ({
        ...prevInput,
        [e.target.name]: e.target.value
      }));
    }
  }

  return (
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
          value={values.email}
          type="email"
          id="email"
          label="email address"
          require={true}
          onChange={handleChange}
          error={!!errors.email}
          errorMessage={errors.email ? errors.email : ''}
        />
        <FormInput
          value={values.phone}
          type="text"
          id="phone"
          label="phone number"
          require={true}
          onChange={handleChange}
          error={!!errors.phone}
          errorMessage={errors.phone ? errors.phone : ''}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <CustomFormSelect
          value={values.reason}
          name="reason"
          label="reason for contact"
          require={true}
          options={[
            'Order status',
            'Update shipping address',
            'Change or cancel order',
            'Damaged plant',
            'Damaged planter',
            'Missing item',
            'Incorrect item',
            'Multiple order issues',
            'Subscription help',
            'Plant care advice',
            'Product question',
            'Store information',
            'Workshop question',
            'Partnership request',
            'Other'
          ]}
          onClick={handleChange}
          error={!!errors.reason}
          errorMessage={errors.reason ? errors.reason : ''}
        />
      </div>
      <div>
        <FormTextArea
          value={values.details}
          id="details"
          label="add any details or information"
          onChange={handleChange}
          error={!!errors.details}
          errorMessage={errors.details ? errors.details : ''}
        />
      </div>
      <div>
        <button
          className="button button-big w-full"
          disabled={loading}
          onClick={handleSubmit}
        >
          send
        </button>
      </div>
    </form>
  );
}
