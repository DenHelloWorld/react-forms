import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.tsx';

vi.mock(
  '../forms/ReactHookFormAdvanced/ReactHookFormAdvancedModal.tsx',
  () => ({ default: () => null })
);
vi.mock(
  '../forms/UncontrolledFormAdvanced/UncontrolledFormAdvancedModal.tsx',
  () => ({ default: () => null })
);
vi.mock('../components/SubmissionList/SubmissionList.tsx', () => ({
  default: () => null,
}));

describe('App', () => {
  it('should render the home page', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /react forms/i })
    ).toBeInTheDocument();
  });
});
