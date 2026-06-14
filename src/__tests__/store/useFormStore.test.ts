import { describe, it, expect } from 'vitest';
import { useFormStore } from '../../store/useFormStore.ts';

describe('useFormStore', () => {
  it('should initialise with an empty submissions list', () => {
    const { successfulSubmissions } = useFormStore.getState();

    expect(successfulSubmissions).toHaveLength(0);
  });

  it('should initialise with a non-empty countries list', () => {
    const { countries } = useFormStore.getState();

    expect(countries.length).toBeGreaterThan(0);
    expect(countries[0]).toHaveProperty('name');
    expect(countries[0]).toHaveProperty('flag');
  });

  it('should append a new entry with id and createdAt on addSubmission', () => {
    const payload = {
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
      gender: 'female',
      country: 'Canada',
      image: 'data:image/png;base64,abc',
    };

    useFormStore.getState().addSubmission(payload);

    const { successfulSubmissions } = useFormStore.getState();
    expect(successfulSubmissions).toHaveLength(1);
    expect(successfulSubmissions[0]).toMatchObject(payload);
    expect(successfulSubmissions[0].id).toBeTruthy();
    expect(typeof successfulSubmissions[0].createdAt).toBe('number');
  });

  it('should accumulate multiple submissions', () => {
    const base = {
      name: 'Bob',
      age: 30,
      email: 'bob@test.com',
      gender: 'male',
      country: 'Germany',
      image: 'data:image/png;base64,xyz',
    };

    useFormStore.getState().addSubmission(base);
    useFormStore.getState().addSubmission({ ...base, name: 'Carol' });

    expect(useFormStore.getState().successfulSubmissions).toHaveLength(2);
  });
});
