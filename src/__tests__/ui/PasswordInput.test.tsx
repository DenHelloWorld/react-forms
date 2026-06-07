import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordInput from '../../ui/PasswordInput/PasswordInput.tsx';

describe('PasswordInput', () => {
  it('should render with password type by default', () => {
    render(<PasswordInput aria-label="password" />);

    expect(screen.getByLabelText('password')).toHaveAttribute(
      'type',
      'password'
    );
  });

  it('should switch to text type when show password is clicked', async () => {
    const user = userEvent.setup();
    render(<PasswordInput aria-label="password" />);

    await user.click(screen.getByRole('button', { name: /show password/i }));

    expect(screen.getByLabelText('password')).toHaveAttribute('type', 'text');
  });

  it('should switch back to password type when hide password is clicked', async () => {
    const user = userEvent.setup();
    render(<PasswordInput aria-label="password" />);
    await user.click(screen.getByRole('button', { name: /show password/i }));

    await user.click(screen.getByRole('button', { name: /hide password/i }));

    expect(screen.getByLabelText('password')).toHaveAttribute(
      'type',
      'password'
    );
  });
});
