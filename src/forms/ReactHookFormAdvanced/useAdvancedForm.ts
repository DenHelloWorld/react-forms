import {
  useMemo,
  useEffect,
  type ChangeEvent,
  type BaseSyntheticEvent,
} from 'react';
import {
  type Control,
  type FieldErrors,
  useForm,
  type UseFormRegister,
  useWatch,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createAdvancedFormSchema,
  type AdvancedFormData,
} from '../advanced-form-schema.ts';
import {
  useFormStore,
  type FormSubmissionPayload,
  type CountryObject,
} from '../../store/useFormStore.ts';
import {
  type PasswordRuleResult,
  usePasswordStrength,
} from '../../hooks/usePasswordStrength/usePasswordStrength.ts';
import { useImageToBase64 } from '../../hooks/useImageToBase64/useImageToBase64.ts';

export const useAdvancedForm = (
  onSubmit: (data: FormSubmissionPayload) => void
): {
  register: UseFormRegister<AdvancedFormData>;
  control: Control<AdvancedFormData>;
  errors: FieldErrors<AdvancedFormData>;
  isValid: boolean;
  strength: PasswordRuleResult[];
  countries: CountryObject[];
  onHandleSubmit: (e: BaseSyntheticEvent) => void;
  handleImageChange: (
    onChange: (file: File | null) => void
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
} => {
  const countries = useFormStore((state) => state.countries);
  const { convertFile } = useImageToBase64();
  const schema = useMemo(
    () => createAdvancedFormSchema(countries),
    [countries]
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<AdvancedFormData>({
    resolver: yupResolver(schema),
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
    if (confirmPassword) void trigger('confirmPassword');
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

  return {
    register,
    control,
    errors,
    isValid,
    strength,
    countries,
    onHandleSubmit,
    handleImageChange,
  };
};
