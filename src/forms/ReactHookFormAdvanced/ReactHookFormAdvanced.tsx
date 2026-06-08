import { Controller } from 'react-hook-form';
import { type FormSubmissionPayload } from '../../store/useFormStore.ts';
import Checkbox from '../../ui/Checkbox/Checkbox.tsx';
import Radio from '../../ui/Radio/Radio.tsx';
import PasswordStrength from '../../ui/PasswordStrength/PasswordStrength.tsx';
import PasswordInput from '../../ui/PasswordInput/PasswordInput.tsx';
import { createAdvancedFieldIds } from '../advanced-form-schema.ts';
import { setAsNumber } from '../basic-form-schema.ts';
import { GENDERS } from '../../consts/genders.const.ts';
import { useAdvancedForm } from './useAdvancedForm.ts';
import FormField from '../FormField.tsx';
import '../form.css';

interface ReactHookFormAdvancedProps {
  onSubmit: (data: FormSubmissionPayload) => void;
}

const FIELD_IDS = createAdvancedFieldIds('rhf-adv');

const ReactHookFormAdvanced = ({ onSubmit }: ReactHookFormAdvancedProps) => {
  const {
    register,
    control,
    errors,
    isValid,
    strength,
    countries,
    onHandleSubmit,
    handleImageChange,
  } = useAdvancedForm(onSubmit);

  return (
    <form onSubmit={onHandleSubmit} className="form" noValidate>
      <div className="form__fields">
        <FormField
          id={FIELD_IDS.name}
          label="Name"
          error={errors.name?.message}
        >
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
        </FormField>

        <FormField id={FIELD_IDS.age} label="Age" error={errors.age?.message}>
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
        </FormField>

        <FormField
          id={FIELD_IDS.email}
          label="Email"
          error={errors.email?.message}
        >
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
        </FormField>

        <fieldset
          className="form__field form__field--radio"
          aria-invalid={!!errors.gender}
          aria-describedby={
            errors.gender ? `${FIELD_IDS.gender}-error` : undefined
          }
        >
          <legend className="form__label">Gender</legend>
          <div className="form__radio-group">
            {Object.values(GENDERS).map((gender) => (
              <label
                key={gender}
                htmlFor={`${FIELD_IDS.gender}-${gender}`}
                className="form__radio-label"
              >
                <Radio
                  id={`${FIELD_IDS.gender}-${gender}`}
                  value={gender}
                  {...register('gender')}
                />
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

        <FormField
          id={FIELD_IDS.country}
          label="Country"
          error={errors.country?.message}
        >
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
        </FormField>

        <FormField
          id={FIELD_IDS.password}
          label="Password"
          error={errors.password?.message}
        >
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
          <PasswordStrength rules={strength} />
        </FormField>

        <FormField
          id={FIELD_IDS.confirmPassword}
          label="Confirm Password"
          error={errors.confirmPassword?.message}
        >
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
        </FormField>

        <FormField
          id={FIELD_IDS.image}
          label="Photo (JPG/PNG, max 2MB)"
          error={errors.image?.message ?? ''}
        >
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
        </FormField>

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
