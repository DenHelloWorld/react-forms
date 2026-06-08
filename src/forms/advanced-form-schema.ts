import * as yup from 'yup';
import { basicFormSchema, BASIC_FIELD_KEYS } from './basic-form-schema.ts';

interface Country {
  name: string;
}

const matchesPassword = (
  value: string | undefined,
  ctx: yup.TestContext
): boolean => {
  const parent = ctx.parent as Record<string, unknown>;
  const password = typeof parent.password === 'string' ? parent.password : '';
  return value === password;
};

export const createAdvancedFormSchema = (countries: Country[]) =>
  basicFormSchema.concat(
    yup.object({
      country: yup
        .string()
        .required('Country is required')
        .transform((val: string) => {
          if (!val) return val;
          const match = countries.find(
            (c) => c.name.toLowerCase() === val.trim().toLowerCase()
          );
          return match ? match.name : val;
        })
        .test(
          'valid-country',
          'Please select a valid country from the list',
          (val) => {
            if (!val) return false;
            return countries.some((c) => c.name === val);
          }
        ),
      password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long'),
      confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .test('passwords-match', 'Passwords do not match', matchesPassword),
      image: yup
        .mixed<File>()
        .required('Image is required')
        .test(
          'is-file',
          'Image is required',
          (val) => val instanceof File && val.size > 0
        )
        .test('file-size', 'Max file size is 2MB', (val) =>
          val instanceof File ? val.size <= 2 * 1024 * 1024 : false
        )
        .test(
          'file-type',
          'Only .jpg, .jpeg and .png formats are supported',
          (val) =>
            val instanceof File
              ? ['image/jpeg', 'image/png'].includes(val.type)
              : false
        ),
    })
  );

export type AdvancedFormData = yup.InferType<
  ReturnType<typeof createAdvancedFormSchema>
>;

type AdvancedFormField = keyof AdvancedFormData;

export const ADVANCED_FIELD_KEYS: AdvancedFormField[] = [
  ...BASIC_FIELD_KEYS,
  'country',
  'password',
  'confirmPassword',
  'image',
];

export const createAdvancedFieldIds = (
  prefix: string
): Record<AdvancedFormField, string> =>
  Object.fromEntries(
    ADVANCED_FIELD_KEYS.map((key) => [key, `${prefix}-${key}`])
  ) as Record<AdvancedFormField, string>;
