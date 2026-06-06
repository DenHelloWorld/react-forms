import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { type FormSubmissionPayload } from '../../store/useFormStore.ts';
import Checkbox from '../../ui/Checkbox/Checkbox.tsx';
import Radio from '../../ui/Radio/Radio.tsx';
import PasswordStrength from '../../ui/PasswordStrength/PasswordStrength.tsx';
import PasswordInput from '../../ui/PasswordInput/PasswordInput.tsx';
import {
  advancedFormSchema,
  createAdvancedFieldIds,
  type AdvancedFormData,
} from '../advanced-form-schema.ts';
import { setAsNumber } from '../basic-form-schema.ts';
import { GENDERS } from '../../consts/genders.const.ts';
import { usePasswordStrength } from '../../hooks/usePasswordStrength/usePasswordStrength.ts';
import { useImageToBase64 } from '../../hooks/useImageToBase64/useImageToBase64.ts';
import { useFormStore } from '../../store/useFormStore.ts';
import '../form.css';
import { useEffect, type BaseSyntheticEvent, type ChangeEvent } from 'react';

interface ReactHookFormAdvancedProps {
  onSubmit: (data: FormSubmissionPayload) => void;
}

const FIELD_IDS = createAdvancedFieldIds('rhf-adv');

const ReactHookFormAdvanced = ({ onSubmit }: ReactHookFormAdvancedProps) => {
  const countries = useFormStore((state) => state.countries);
  const { convertFile } = useImageToBase64();

  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<AdvancedFormData>({
    resolver: yupResolver(advancedFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      terms: false,
      country: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = useWatch({ control, name: 'password', defaultValue: '' });
  const confirmPassword = useWatch({
    control,
    name: 'confirmPassword',
    defaultValue: '',
  });
  const strength = usePasswordStrength(password);

  useEffect(() => {
    if (confirmPassword) {
      void trigger('confirmPassword');
    }
  }, [confirmPassword, password, trigger]);

  const onValid = async (data: AdvancedFormData) => {
    const image = await convertFile(data.image);

    onSubmit({
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      country: data.country,
      image,
    });

    reset();
  };

  const onHandleSubmit = (e: BaseSyntheticEvent) => {
    void handleSubmit(onValid)(e);
  };

  const handleImageChange =
    (onChange: (file: File | null) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.files?.[0] ?? null);
    };

  return (
    <form onSubmit={onHandleSubmit} className="form" noValidate>
      <div className="form__fields">
        <div className="form__field">
          <label htmlFor={FIELD_IDS.name} className="form__label">
            Name
          </label>
          <input
            id={FIELD_IDS.name}
            type="text"
            autoComplete="name"
            className={`form__input${errors.name ? ' form__input--error' : ''}`}
            aria-invalid={!!errors.name}
            aria-describedby={
              errors.name ? `${FIELD_IDS.name}-error` : undefined
            }
            {...register('name')}
          />
          <p
            id={`${FIELD_IDS.name}-error`}
            className={`form__error${errors.name ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.name?.message}
          </p>
        </div>

        <div className="form__field">
          <label htmlFor={FIELD_IDS.age} className="form__label">
            Age
          </label>
          <input
            id={FIELD_IDS.age}
            type="number"
            min="0"
            className={`form__input${errors.age ? ' form__input--error' : ''}`}
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? `${FIELD_IDS.age}-error` : undefined}
            {...register('age', {
              setValueAs: setAsNumber as (v: unknown) => unknown,
            })}
          />
          <p
            id={`${FIELD_IDS.age}-error`}
            className={`form__error${errors.age ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.age?.message}
          </p>
        </div>

        <div className="form__field">
          <label htmlFor={FIELD_IDS.email} className="form__label">
            Email
          </label>
          <input
            id={FIELD_IDS.email}
            type="email"
            autoComplete="email"
            className={`form__input${errors.email ? ' form__input--error' : ''}`}
            aria-invalid={!!errors.email}
            aria-describedby={
              errors.email ? `${FIELD_IDS.email}-error` : undefined
            }
            {...register('email')}
          />
          <p
            id={`${FIELD_IDS.email}-error`}
            className={`form__error${errors.email ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.email?.message}
          </p>
        </div>

        <fieldset className="form__field form__field--radio">
          <legend className="form__label">Gender</legend>
          <div className="form__radio-group">
            {Object.values(GENDERS).map((gender) => (
              <label key={gender} className="form__radio-label">
                <Radio value={gender} {...register('gender')} />
                {gender}
              </label>
            ))}
          </div>
          <p
            id={`${FIELD_IDS.gender}-error`}
            className={`form__error${errors.gender ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.gender?.message}
          </p>
        </fieldset>

        <div className="form__field">
          <label htmlFor={FIELD_IDS.country} className="form__label">
            Country
          </label>
          <input
            id={FIELD_IDS.country}
            type="text"
            list="countries-list"
            autoComplete="off"
            className={`form__input${errors.country ? ' form__input--error' : ''}`}
            aria-invalid={!!errors.country}
            aria-describedby={
              errors.country ? `${FIELD_IDS.country}-error` : undefined
            }
            {...register('country')}
          />
          <datalist id="countries-list">
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
            {errors.country?.message}
          </p>
        </div>

        <div className="form__field">
          <label htmlFor={FIELD_IDS.password} className="form__label">
            Password
          </label>
          <PasswordInput
            id={FIELD_IDS.password}
            autoComplete="new-password"
            className={`form__input${errors.password ? ' form__input--error' : ''}`}
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? `${FIELD_IDS.password}-error` : undefined
            }
            {...register('password')}
          />
          <PasswordStrength strength={strength} />
          <p
            id={`${FIELD_IDS.password}-error`}
            className={`form__error${errors.password ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.password?.message}
          </p>
        </div>

        <div className="form__field">
          <label htmlFor={FIELD_IDS.confirmPassword} className="form__label">
            Confirm Password
          </label>
          <PasswordInput
            id={FIELD_IDS.confirmPassword}
            autoComplete="new-password"
            className={`form__input${errors.confirmPassword ? ' form__input--error' : ''}`}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword
                ? `${FIELD_IDS.confirmPassword}-error`
                : undefined
            }
            {...register('confirmPassword')}
          />
          <p
            id={`${FIELD_IDS.confirmPassword}-error`}
            className={`form__error${errors.confirmPassword ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.confirmPassword?.message}
          </p>
        </div>

        <div className="form__field">
          <label htmlFor={FIELD_IDS.image} className="form__label">
            Photo (JPG/PNG, max 2MB)
          </label>
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, ref } }) => (
              <input
                id={FIELD_IDS.image}
                ref={ref}
                type="file"
                accept="image/jpeg,image/png"
                className={`form__input${errors.image ? ' form__input--error' : ''}`}
                aria-invalid={!!errors.image}
                aria-describedby={
                  errors.image ? `${FIELD_IDS.image}-error` : undefined
                }
                onChange={handleImageChange(onChange)}
              />
            )}
          />
          <p
            id={`${FIELD_IDS.image}-error`}
            className={`form__error${errors.image ? ' form__error--visible' : ''}`}
            role="alert"
          >
            {errors.image?.message ?? ''}
          </p>
        </div>

        <div className="form__field form__field--checkbox">
          <div className="inline-flex items-center gap-2">
            <Controller
              control={control}
              name="terms"
              render={({ field }) => (
                <Checkbox
                  id={FIELD_IDS.terms}
                  name={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                  aria-invalid={!!errors.terms}
                  aria-describedby={
                    errors.terms ? `${FIELD_IDS.terms}-error` : undefined
                  }
                />
              )}
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
            {errors.terms?.message}
          </p>
        </div>
      </div>

      <div className="form__actions">
        <button type="submit" className="btn" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReactHookFormAdvanced;
