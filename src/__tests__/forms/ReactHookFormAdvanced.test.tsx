import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactHookFormAdvanced from '../../forms/ReactHookFormAdvanced/ReactHookFormAdvanced.tsx';
import { type FormSubmissionPayload } from '../../store/useFormStore.ts';

const mockBase64 = 'data:image/png;base64,xyz';

vi.mock('../../hooks/useImageToBase64/useImageToBase64.ts', () => ({
  useImageToBase64: () => ({
    convertFile: vi.fn().mockResolvedValue(mockBase64),
    isPending: false,
    error: null,
  }),
}));

const pngFile = new File(['data'], 'photo.png', { type: 'image/png' });

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^name/i), 'Bob');
  await user.type(screen.getByLabelText(/^age/i), '30');
  await user.type(screen.getByLabelText(/^email/i), 'bob@example.com');
  await user.click(screen.getByRole('radio', { name: 'Male' }));
  await user.type(screen.getByLabelText(/^country/i), 'Germany');
  await user.type(screen.getByLabelText(/^password$/i), 'Abcdefg1!');
  await user.type(screen.getByLabelText(/confirm password/i), 'Abcdefg1!');
  await user.upload(screen.getByLabelText(/photo/i), pngFile);
  await user.click(screen.getByLabelText(/terms and conditions/i));
}

describe('ReactHookFormAdvanced — live validation', () => {
  it('should have submit button disabled on first render (form is invalid)', () => {
    render(<ReactHookFormAdvanced onSubmit={vi.fn()} />);

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('should show live error when name starts with lowercase', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormAdvanced onSubmit={vi.fn()} />);
    await user.type(screen.getByLabelText(/^name/i), 'alice');

    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/first letter must be uppercase/i)
      ).toBeInTheDocument();
    });
  });

  it('should show live error when passwords do not match', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormAdvanced onSubmit={vi.fn()} />);
    await user.type(screen.getByLabelText(/^password$/i), 'Abcdefg1!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Other123!');

    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('should enable submit button when all fields are valid', async () => {
    const user = userEvent.setup();
    render(<ReactHookFormAdvanced onSubmit={vi.fn()} />);

    await fillValidForm(user);

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /submit/i })
      ).not.toBeDisabled();
    });
  });
});

describe('ReactHookFormAdvanced — submission', () => {
  it('should call onSubmit with correct payload', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ReactHookFormAdvanced onSubmit={onSubmit} />);
    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(
      () => {
        expect(onSubmit).toHaveBeenCalledOnce();
      },
      {
        timeout: 3000,
      }
    );
    const [payload] = onSubmit.mock.calls[0] as [FormSubmissionPayload];
    expect(payload.name).toBe('Bob');
    expect(payload.email).toBe('bob@example.com');
    expect(payload.image).toBe(mockBase64);
  });

  it('should reset form after successful submission (submit button becomes disabled again)', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ReactHookFormAdvanced onSubmit={onSubmit} />);
    await fillValidForm(user);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(
      () => {
        expect(onSubmit).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    });
  });
});
