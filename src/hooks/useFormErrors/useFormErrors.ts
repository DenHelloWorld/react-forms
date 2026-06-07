import { useState } from 'react';
import { type ValidationError } from 'yup';

export const useFormErrors = <T extends Record<string, unknown>>(): {
  errors: Partial<Record<keyof T, string>>;
  parseYupErrors: (error: ValidationError) => void;
  setFieldError: (field: keyof T, message: string) => void;
  clearErrors: () => void;
} => {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const parseYupErrors = (error: ValidationError): void => {
    const fieldErrors: Partial<Record<keyof T, string>> = {};

    for (const inner of error.inner) {
      const field = inner.path;
      if (field && !(field in fieldErrors)) {
        fieldErrors[field as keyof T] = inner.message;
      }
    }

    if (error.inner.length === 0 && error.path !== undefined) {
      fieldErrors[error.path as keyof T] = error.message;
    }

    setErrors(fieldErrors);
  };

  const setFieldError = (field: keyof T, message: string): void => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const clearErrors = (): void => {
    setErrors({});
  };

  return { errors, parseYupErrors, setFieldError, clearErrors };
};
