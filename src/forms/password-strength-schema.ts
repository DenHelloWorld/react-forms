import * as yup from 'yup';

export type PasswordRule = {
  key: string;
  label: string;
  schema: yup.StringSchema;
};

export const passwordStrengthRules: PasswordRule[] = [
  {
    key: 'hasCount',
    label: 'At least 8 characters',
    schema: yup.string().min(8),
  },
  {
    key: 'hasUpper',
    label: '1 uppercase English letter',
    schema: yup.string().matches(/[A-Z]/),
  },
  {
    key: 'hasLower',
    label: '1 lowercase English letter',
    schema: yup.string().matches(/[a-z]/),
  },
  {
    key: 'hasNumber',
    label: '1 number',
    schema: yup.string().matches(/[0-9]/),
  },
  {
    key: 'hasSpecial',
    label: '1 special character',
    schema: yup.string().matches(/[^A-Za-z0-9]/),
  },
];
