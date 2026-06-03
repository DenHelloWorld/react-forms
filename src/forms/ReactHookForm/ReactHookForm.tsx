import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '../../store/useFormStore.ts';
import Checkbox from '../../ui/Checkbox/Checkbox.tsx';
import Radio from '../../ui/Radio/Radio.tsx';
import {
  basicFormSchema,
  createFieldIds,
  type BasicFormData,
} from '../basic-form-schema.ts';
import { GENDERS } from '../../consts/genders.const.ts';
import '../../forms/form.css';
import { type BaseSyntheticEvent } from 'react';

interface ReactHookFormProps {
  onSuccess: () => void;
}

const FIELD_IDS = createFieldIds('rhf');

const ReactHookForm = ({ onSuccess }: ReactHookFormProps) => {
  const addSubmission = useFormStore((state) => state.addSubmission);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<BasicFormData>({
    resolver: zodResolver(basicFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      terms: false,
    },
  });

  const onValid: SubmitHandler<BasicFormData> = (data) => {
    addSubmission({
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      country: '',
      image: '',
    });

    reset();
    onSuccess();
  };

  const onSubmit = (e: BaseSyntheticEvent) => {
    void handleSubmit(onValid)(e);
  };

  const fieldError = (field: keyof BasicFormData) => ({
    className: `form__input${errors[field] ? ' form__input--error' : ''}`,
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `${FIELD_IDS[field]}-error` : undefined,
  });

  const setAsNumber = (v: unknown): number | undefined =>
    v === '' ? undefined : Number(v);

  return (
    <form onSubmit={onSubmit} className="form" noValidate>
      <div className="form__field">
        <label htmlFor={FIELD_IDS.name} className="form__label">
          Name
        </label>
        <input
          id={FIELD_IDS.name}
          type="text"
          autoComplete="name"
          {...fieldError('name')}
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
          {...fieldError('age')}
          {...register('age', { setValueAs: setAsNumber })}
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
          {...fieldError('email')}
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

      <button type="submit" className="btn form__submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default ReactHookForm;
