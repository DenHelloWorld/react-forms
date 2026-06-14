import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';
import { useFormStore } from '../store/useFormStore.ts';

beforeEach(() => {
  useFormStore.setState({ successfulSubmissions: [] });
});
