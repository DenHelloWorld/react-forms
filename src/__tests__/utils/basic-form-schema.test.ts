import { describe, it, expect } from 'vitest';
import type * as yup from 'yup';
import {
  basicFormSchema,
  setAsNumber,
  getString,
} from '../../forms/basic-form-schema.ts';

describe('setAsNumber', () => {
  it('should convert a numeric string to a number', () => {
    const result = setAsNumber('25');

    expect(result).toBe(25);
  });

  it('should return undefined for an empty string', () => {
    const result = setAsNumber('');

    expect(result).toBeUndefined();
  });

  it('should return undefined for a non-numeric string', () => {
    const result = setAsNumber('abc');

    expect(result).toBeUndefined();
  });

  it('should return undefined for non-string values', () => {
    const result = setAsNumber(42);

    expect(result).toBeUndefined();
  });
});

describe('getString', () => {
  it('should return the string as-is', () => {
    const result = getString('hello');

    expect(result).toBe('hello');
  });

  it('should return empty string for null', () => {
    const result = getString(null);

    expect(result).toBe('');
  });

  it('should return empty string for a File value', () => {
    const result = getString(new File([], 'img.png'));

    expect(result).toBe('');
  });
});

describe('basicFormSchema email validation', () => {
  const emailSchema = basicFormSchema.pick(['email']) as yup.ObjectSchema<{
    email: string;
  }>;
  const validate = (email: string) => emailSchema.isValidSync({ email });

  it('should accept a valid email', () => {
    const isValid = validate('user@example.com');

    expect(isValid).toBe(true);
  });

  it('should reject email without @', () => {
    const isValid = validate('userexample.com');

    expect(isValid).toBe(false);
  });

  it('should reject email with empty local part', () => {
    const isValid = validate('@example.com');

    expect(isValid).toBe(false);
  });

  it('should reject domain without a dot', () => {
    const isValid = validate('user@localhost');

    expect(isValid).toBe(false);
  });

  it('should reject multiple @ signs', () => {
    const isValid = validate('a@b@c.com');

    expect(isValid).toBe(false);
  });
});

describe('basicFormSchema name validation', () => {
  const nameSchema = basicFormSchema.pick(['name']) as yup.ObjectSchema<{
    name: string;
  }>;
  const validate = (name: string) => nameSchema.isValidSync({ name });

  it('should accept a name starting with uppercase', () => {
    const isValid = validate('Alice');

    expect(isValid).toBe(true);
  });

  it('should reject a name starting with lowercase', () => {
    const isValid = validate('alice');

    expect(isValid).toBe(false);
  });
});

describe('basicFormSchema age validation', () => {
  const ageSchema = basicFormSchema.pick(['age']) as yup.ObjectSchema<{
    age: number;
  }>;
  const validate = (age: number) => ageSchema.isValidSync({ age });

  it('should accept zero', () => {
    const isValid = validate(0);

    expect(isValid).toBe(true);
  });

  it('should reject negative age', () => {
    const isValid = validate(-1);

    expect(isValid).toBe(false);
  });

  it('should reject age above 150', () => {
    const isValid = validate(151);

    expect(isValid).toBe(false);
  });
});
