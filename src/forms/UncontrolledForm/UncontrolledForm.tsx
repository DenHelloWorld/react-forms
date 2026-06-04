import { useState, type SyntheticEvent } from 'react';
import { type FormSubmissionPayload } from '../../store/useFormStore.ts';
import {
  basicFormSchema,
  createFieldIds,
  type BasicFormData,
} from '../basic-form-schema.ts';
import Radio from '../../ui/Radio/Radio.tsx';
import Checkbox from '../../ui/Checkbox/Checkbox.tsx';
import { GENDERS } from '../../consts/genders.const.ts';
import '../../forms/form.css';

interface UncontrolledFormProps {
  onSubmit: (data: FormSubmissionPayload) => void;
}

const FIELD_IDS = createFieldIds('uc');

const UncontrolledForm = ({ onSubmit }: UncontrolledFormProps) => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof BasicFormData, string>>
  >({});

  const onHandleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const age = formData.get('age');
    const nameRaw = formData.get('name');
    const emailRaw = formData.get('email');
    const genderRaw = formData.get('gender');

    const data = {
      name: typeof nameRaw === 'string' ? nameRaw : '',
      age: typeof age === 'string' && age !== '' ? Number(age) : undefined,
      email: typeof emailRaw === 'string' ? emailRaw : '',
      gender: typeof genderRaw === 'string' ? genderRaw : '',
      terms: formData.has('terms'),
    };

    const result = basicFormSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BasicFormData, string>> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === 'string') {
          fieldErrors[field as keyof BasicFormData] ??= issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    onSubmit({
      name: result.data.name,
      age: result.data.age,
      email: result.data.email,
      gender: result.data.gender,
      country: '',
      image: '',
    });

    setErrors({});
    form.reset();
  };

  return (
    <form onSubmit={onHandleSubmit} className="form" noValidate>
      <div className="form__field">
        <label htmlFor={FIELD_IDS.name} className="form__label">
          Name
        </label>
        <input
          id={FIELD_IDS.name}
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${FIELD_IDS.name}-error` : undefined}
          className={`form__input${errors.name ? ' form__input--error' : ''}`}
        />
        <p
          id={`${FIELD_IDS.name}-error`}
          className={`form__error${errors.name ? ' form__error--visible' : ''}`}
          role="alert"
        >
          {errors.name}
        </p>
      </div>

      <div className="form__field">
        <label htmlFor={FIELD_IDS.age} className="form__label">
          Age
        </label>
        <input
          id={FIELD_IDS.age}
          name="age"
          type="number"
          min="0"
          aria-invalid={!!errors.age}
          aria-describedby={errors.age ? `${FIELD_IDS.age}-error` : undefined}
          className={`form__input${errors.age ? ' form__input--error' : ''}`}
        />
        <p
          id={`${FIELD_IDS.age}-error`}
          className={`form__error${errors.age ? ' form__error--visible' : ''}`}
          role="alert"
        >
          {errors.age}
        </p>
      </div>

      <div className="form__field">
        <label htmlFor={FIELD_IDS.email} className="form__label">
          Email
        </label>
        <input
          id={FIELD_IDS.email}
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={
            errors.email ? `${FIELD_IDS.email}-error` : undefined
          }
          className={`form__input${errors.email ? ' form__input--error' : ''}`}
        />
        <p
          id={`${FIELD_IDS.email}-error`}
          className={`form__error${errors.email ? ' form__error--visible' : ''}`}
          role="alert"
        >
          {errors.email}
        </p>
      </div>

      <fieldset className="form__field form__field--radio">
        <legend className="form__label">Gender</legend>
        <div className="form__radio-group">
          {Object.values(GENDERS).map((g) => (
            <label key={g} className="form__radio-label">
              <Radio name="gender" value={g} />
              {g}
            </label>
          ))}
        </div>
        <p
          id={`${FIELD_IDS.gender}-error`}
          className={`form__error${errors.gender ? ' form__error--visible' : ''}`}
          role="alert"
        >
          {errors.gender}
        </p>
      </fieldset>

      <div className="form__field form__field--checkbox">
        <div className="inline-flex items-center gap-2">
          <Checkbox id={FIELD_IDS.terms} name="terms" />
          <label
            htmlFor={FIELD_IDS.terms}
            className="form__label--checkbox-text cursor-pointer"
          >
            I accept the Terms and Conditions
          </label>
        </div>
        <p
          id={`${FIELD_IDS.terms}-error`}
          className={`form__error${errors.terms ? ' form__error--visible' : ''}`}
          role="alert"
        >
          {errors.terms}
        </p>
      </div>

      <button type="submit" className="btn form__submit">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
