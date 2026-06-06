import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { type FormSubmissionPayload } from '../../store/useFormStore.ts';
import Checkbox from '../../ui/Checkbox/Checkbox.tsx';
import Radio from '../../ui/Radio/Radio.tsx';
import {
  basicFormSchema,
  createFieldIds,
  setAsNumber,
  type BasicFormData,
} from '../basic-form-schema.ts';
import { GENDERS } from '../../consts/genders.const.ts';
import '../../forms/form.css';
import { type BaseSyntheticEvent } from 'react';

interface ReactHookFormProps {
  onSubmit: (data: FormSubmissionPayload) => void;
}

const FIELD_IDS = createFieldIds('rhf');

const ReactHookForm = ({ onSubmit }: ReactHookFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<BasicFormData>({
    resolver: yupResolver(basicFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      terms: false,
    },
  });

  const onValid = (data: BasicFormData) => {
    onSubmit({
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      country: '',
      image: '',
    });

    reset();
  };

  const onHandleSubmit = (e: BaseSyntheticEvent) => {
    void handleSubmit(onValid)(e);
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

export default ReactHookForm;
