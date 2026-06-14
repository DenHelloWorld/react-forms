import * as yup from 'yup';
import { GENDERS } from '../consts/genders.ts';

const isValidEmail = (email: string): boolean => {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (local.length === 0) return false;
  if (domain.length === 0) return false;
  if (!domain.includes('.')) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  return true;
};

export const basicFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .test('uppercase', 'First letter must be uppercase', (val) =>
      val ? /^\p{Lu}/u.test(val) : false
    ),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .integer('Age must be an integer')
    .min(0, 'Age cannot be negative')
    .max(150, 'Age cannot exceed 150'),
  email: yup
    .string()
    .required('Email is required')
    .test('email-format', 'Invalid email format', (val) =>
      val ? isValidEmail(val) : false
    ),
  gender: yup
    .mixed<(typeof GENDERS)[keyof typeof GENDERS]>()
    .oneOf(Object.values(GENDERS), 'Please select a gender')
    .required('Please select a gender'),
  terms: yup
    .boolean()
    .required()
    .oneOf([true], 'You must accept the Terms and Conditions'),
});

type BasicFormField = keyof yup.InferType<typeof basicFormSchema>;

export const BASIC_FIELD_KEYS: BasicFormField[] = [
  'name',
  'age',
  'email',
  'gender',
  'terms',
];

export const setAsNumber = (v: unknown): number | undefined => {
  if (typeof v !== 'string' || v === '') return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
};

export const getString = (value: FormDataEntryValue | null): string =>
  typeof value === 'string' ? value : '';
