import { useState, type SyntheticEvent, type ChangeEvent } from 'react';
import {
  type FormSubmissionPayload,
  useFormStore,
} from '../../store/useFormStore.ts';
import {
  advancedFormSchema,
  createAdvancedFieldIds,
  type AdvancedFormData,
} from '../advanced-form-schema.ts';
import { getString } from '../basic-form-schema.ts';
import { useFormErrors } from '../../hooks/useFormErrors/useFormErrors.ts';
import Radio from '../../ui/Radio/Radio.tsx';
import Checkbox from '../../ui/Checkbox/Checkbox.tsx';
import PasswordStrength from '../../ui/PasswordStrength/PasswordStrength.tsx';
import PasswordInput from '../../ui/PasswordInput/PasswordInput.tsx';
import { GENDERS } from '../../consts/genders.const.ts';
import { usePasswordStrength } from '../../hooks/usePasswordStrength/usePasswordStrength.ts';
import { useImageToBase64 } from '../../hooks/useImageToBase64/useImageToBase64.ts';
import '../form.css';

interface UncontrolledFormAdvancedProps {
  onSubmit: (data: FormSubmissionPayload) => void;
}

const FIELD_IDS = createAdvancedFieldIds('uc-adv');

const UncontrolledFormAdvanced = ({
  onSubmit,
}: UncontrolledFormAdvancedProps) => {
  const countries = useFormStore((state) => state.countries);
  const { convertFile } = useImageToBase64();

  const { errors, parseYupErrors, clearErrors } =
    useFormErrors<AdvancedFormData>();
  const [passwordValue, setPasswordValue] = useState('');

  const strength = usePasswordStrength(passwordValue);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const onHandleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
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
      country: getString(formData.get('country')),
      password: getString(formData.get('password')),
      confirmPassword: getString(formData.get('confirmPassword')),
      image: (() => {
        const f = formData.get('image');
        return f instanceof File ? f : undefined;
      })(),
    };

    let validData: AdvancedFormData;
    try {
      validData = await advancedFormSchema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const { ValidationError } = await import('yup');
      if (err instanceof ValidationError) parseYupErrors(err);
      return;
    }

    const image = await convertFile(validData.image);

    onSubmit({
      name: validData.name,
      age: validData.age,
      email: validData.email,
      gender: validData.gender,
      country: validData.country,
      image,
    });

    clearErrors();
    setPasswordValue('');
    form.reset();
  };

  const fieldClass = (field: keyof AdvancedFormData) =>
    `form__input${errors[field] ? ' form__input--error' : ''}`;

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
            className={fieldClass('name')}
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
            className={fieldClass('age')}
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
            className={fieldClass('email')}
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

        <div className="form__field">
          <label htmlFor={FIELD_IDS.country} className="form__label">
            Country
          </label>
          <input
            id={FIELD_IDS.country}
            name="country"
            type="text"
            list="uc-countries-list"
            autoComplete="off"
            aria-invalid={!!errors.country}
            aria-describedby={
              errors.country ? `${FIELD_IDS.country}-error` : undefined
            }
            className={fieldClass('country')}
          />
          <datalist id="uc-countries-list">
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.flag} {c.name}
              </option>
            ))}
          </datalist>
          <p
            id={`${FIELD_IDS.country}-error`}
            className={`form__error${errors.country ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.country}
          </p>
        </div>

        <div className="form__field">
          <label htmlFor={FIELD_IDS.password} className="form__label">
            Password
          </label>
          <PasswordInput
            id={FIELD_IDS.password}
            name="password"
            autoComplete="new-password"
            onChange={handlePasswordChange}
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? `${FIELD_IDS.password}-error` : undefined
            }
            className={fieldClass('password')}
          />
          <PasswordStrength rules={strength} />
          <p
            id={`${FIELD_IDS.password}-error`}
            className={`form__error${errors.password ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.password}
          </p>
        </div>

        <div className="form__field">
          <label htmlFor={FIELD_IDS.confirmPassword} className="form__label">
            Confirm Password
          </label>
          <PasswordInput
            id={FIELD_IDS.confirmPassword}
            name="confirmPassword"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword
                ? `${FIELD_IDS.confirmPassword}-error`
                : undefined
            }
            className={fieldClass('confirmPassword')}
          />
          <p
            id={`${FIELD_IDS.confirmPassword}-error`}
            className={`form__error${errors.confirmPassword ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.confirmPassword}
          </p>
        </div>

        <div className="form__field">
          <label htmlFor={FIELD_IDS.image} className="form__label">
            Photo (JPG/PNG, max 2MB)
          </label>
          <input
            id={FIELD_IDS.image}
            name="image"
            type="file"
            accept="image/jpeg,image/png"
            aria-invalid={!!errors.image}
            aria-describedby={
              errors.image ? `${FIELD_IDS.image}-error` : undefined
            }
            className={fieldClass('image')}
          />
          <p
            id={`${FIELD_IDS.image}-error`}
            className={`form__error${errors.image ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.image}
          </p>
        </div>

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

export default UncontrolledFormAdvanced;
