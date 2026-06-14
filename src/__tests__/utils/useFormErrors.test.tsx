import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as yup from 'yup';
import { useFormErrors } from '../../hooks/useFormErrors/useFormErrors.ts';

type Fields = {
  [key: string]: unknown;
  name: string;
  email: string;
};

describe('useFormErrors', () => {
  it('should start with no errors', () => {
    const { result } = renderHook(() => useFormErrors<Fields>());

    expect(result.current.errors).toEqual({});
  });

  it('should set a single field error with setFieldError', () => {
    const { result } = renderHook(() => useFormErrors<Fields>());

    act(() => {
      result.current.setFieldError('name', 'Required');
    });

    expect(result.current.errors.name).toBe('Required');
  });

  it('should reset all errors with clearErrors', () => {
    const { result } = renderHook(() => useFormErrors<Fields>());
    act(() => {
      result.current.setFieldError('name', 'Required');
    });

    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors).toEqual({});
  });

  it('should extract inner field errors with parseYupErrors', async () => {
    const schema = yup.object({
      name: yup.string().required('Name required'),
      email: yup.string().required('Email required'),
    });
    let validationError: yup.ValidationError;
    try {
      await schema.validate({}, { abortEarly: false });
    } catch (e) {
      validationError = e as yup.ValidationError;
    }
    const { result } = renderHook(() => useFormErrors<Fields>());

    act(() => {
      result.current.parseYupErrors(validationError!);
    });

    expect(result.current.errors.name).toBe('Name required');
    expect(result.current.errors.email).toBe('Email required');
  });

  it('should handle a single-field error (no inner) with parseYupErrors', async () => {
    const schema = yup.string().required('Required field');
    let validationError: yup.ValidationError;
    try {
      await schema.validate(undefined);
    } catch (e) {
      validationError = e as yup.ValidationError;
    }
    const { result } = renderHook(() => useFormErrors<Fields>());

    act(() => {
      result.current.parseYupErrors(validationError!);
    });

    expect(Object.values(result.current.errors)).toContain('Required field');
  });
});
