import { z } from 'zod';
import { GENDERS } from '../consts/genders.const.ts';

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

export const basicFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .regex(/^\p{Lu}/u, 'First letter must be uppercase'),
  age: z
    .number({ message: 'Age must be a number' })
    .refine((age) => !Number.isNaN(age), 'Age must be a number')
    .int('Age must be an integer')
    .nonnegative('Age cannot be negative')
    .max(150, 'Age cannot exceed 150'),
  email: z.string().refine(isValidEmail, 'Invalid email format'),
  gender: z.enum([GENDERS.MALE, GENDERS.FEMALE, GENDERS.OTHER], {
    message: 'Please select a gender',
  }),
  terms: z
    .boolean()
    .refine((terms) => terms, 'You must accept the Terms and Conditions'),
});

export type BasicFormData = z.infer<typeof basicFormSchema>;

type BasicFormField = keyof BasicFormData;

const FIELD_KEYS: BasicFormField[] = [
  'name',
  'age',
  'email',
  'gender',
  'terms',
];

export const createFieldIds = (
  prefix: string
): Record<BasicFormField, string> =>
  Object.fromEntries(
    FIELD_KEYS.map((key) => [key, `${prefix}-${key}`])
  ) as Record<BasicFormField, string>;
