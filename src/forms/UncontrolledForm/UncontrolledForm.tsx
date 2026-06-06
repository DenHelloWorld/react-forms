import { type SyntheticEvent } from 'react';
import { type FormSubmissionPayload } from '../../store/useFormStore.ts';
import {
  basicFormSchema,
  createFieldIds,
  getString,
  type BasicFormData,
} from '../basic-form-schema.ts';
import Radio from '../../ui/Radio/Radio.tsx';
import Checkbox from '../../ui/Checkbox/Checkbox.tsx';
import { GENDERS } from '../../consts/genders.const.ts';
import { useFormErrors } from '../../hooks/useFormErrors/useFormErrors.ts';
import '../../forms/form.css';

interface UncontrolledFormProps {
  onSubmit: (data: FormSubmissionPayload) => void;
}

const FIELD_IDS = createFieldIds('uc');

const UncontrolledForm = ({ onSubmit }: UncontrolledFormProps) => {
  const { errors, parseYupErrors, clearErrors } =
    useFormErrors<BasicFormData>();

  const onHandleSubmit = async (
    e: SyntheticEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const ageRaw = formData.get('age');

    const data = {
      name: getString(formData.get('name')),
      age:
        typeof ageRaw === 'string' && ageRaw !== ''
          ? Number(ageRaw)
          : undefined,
      email: getString(formData.get('email')),
      gender: getString(formData.get('gender')),
      terms: formData.has('terms'),
    };

    let validData: BasicFormData;
    try {
      validData = await basicFormSchema.validate(data, { abortEarly: false });
    } catch (err) {
      const { ValidationError } = await import('yup');
      if (err instanceof ValidationError) parseYupErrors(err);
      return;
    }

    onSubmit({
      name: validData.name,
      age: validData.age,
      email: validData.email,
      gender: validData.gender,
      country: '',
      image: '',
    });

    clearErrors();
    form.reset();
  };

  return (
    <form
      onSubmit={(e) => {
        void onHandleSubmit(e);
      }}
      className="form"
      noValidate
    >
      <div className="form__fields">
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
            aria-describedby={
              errors.name ? `${FIELD_IDS.name}-error` : undefined
            }
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
            <Checkbox
              id={FIELD_IDS.terms}
              name="terms"
              aria-invalid={!!errors.terms}
              aria-describedby={
                errors.terms ? `${FIELD_IDS.terms}-error` : undefined
              }
            />
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
      </div>

      <div className="form__actions">
        <button type="submit" className="btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
