import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '../../pages/HomePage/HomePage.tsx';

vi.mock(
  '../../forms/ReactHookFormAdvanced/ReactHookFormAdvancedModal.tsx',
  () => ({
    default: ({ isOpen }: { isOpen: boolean }) =>
      isOpen ? <div>RHF Modal</div> : null,
  })
);

vi.mock(
  '../../forms/UncontrolledFormAdvanced/UncontrolledFormAdvancedModal.tsx',
  () => ({
    default: ({ isOpen }: { isOpen: boolean }) =>
      isOpen ? <div>UC Modal</div> : null,
  })
);

vi.mock('../../components/SubmissionList/SubmissionList.tsx', () => ({
  default: () => <div />,
}));

describe('HomePage', () => {
  it('should render the page title and both open buttons', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: /react forms/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /uncontrolled form/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /react hook form/i })
    ).toBeInTheDocument();
  });

  it('should open the uncontrolled form modal when its button is clicked', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.click(
      screen.getByRole('button', { name: /uncontrolled form/i })
    );

    expect(screen.getByText('UC Modal')).toBeInTheDocument();
  });

  it('should open the react hook form modal when its button is clicked', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await user.click(screen.getByRole('button', { name: /react hook form/i }));

    expect(screen.getByText('RHF Modal')).toBeInTheDocument();
  });
});
