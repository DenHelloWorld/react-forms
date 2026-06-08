import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UncontrolledFormAdvanced from '../../forms/UncontrolledFormAdvanced/UncontrolledFormAdvanced.tsx';
import { type FormSubmissionPayload } from '../../store/useFormStore.ts';
import * as schemaModule from '../../forms/advanced-form-schema.ts';

const mockBase64 = 'data:image/png;base64,abc';

vi.mock('../../hooks/useImageToBase64/useImageToBase64.ts', () => ({
  useImageToBase64: () => ({
    convertFile: vi.fn().mockResolvedValue(mockBase64),
    isPending: false,
    error: null,
  }),
}));

describe('UncontrolledFormAdvanced — rendering', () => {
  it('should render all required fields and submit button', () => {
    render(<UncontrolledFormAdvanced onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /gender/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/photo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms and conditions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should NOT have submit button disabled (uncontrolled — no live validation)', () => {
    render(<UncontrolledFormAdvanced onSubmit={vi.fn()} />);

    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });
});

describe('UncontrolledFormAdvanced — validation on submit', () => {
  it('should show required-field errors when submitted empty', async () => {
    const user = userEvent.setup();
    render(<UncontrolledFormAdvanced onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Age is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('should show error when name starts with lowercase', async () => {
    const user = userEvent.setup();
    render(<UncontrolledFormAdvanced onSubmit={vi.fn()} />);
    await user.type(screen.getByLabelText(/^name/i), 'alice');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/first letter must be uppercase/i)
      ).toBeInTheDocument();
    });
  });

  it('should show error for mismatched passwords', async () => {
    const user = userEvent.setup();
    render(<UncontrolledFormAdvanced onSubmit={vi.fn()} />);
    await user.type(screen.getByLabelText(/^password$/i), 'Abcdefg1!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Different1!');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });
});

describe('UncontrolledFormAdvanced — successful submission', () => {
  it('should call onSubmit with correct data when validation passes', async () => {
    const pngFileForSubmit = new File(['data'], 'photo.png', {
      type: 'image/png',
    });
    const validData = {
      name: 'Alice',
      age: 25,
      email: 'alice@example.com',
      gender: 'Female' as const,
      terms: true as const,
      country: 'Canada',
      password: 'Abcdefg1!',
      confirmPassword: 'Abcdefg1!',
      image: pngFileForSubmit,
    };
    vi.spyOn(schemaModule, 'createAdvancedFormSchema').mockReturnValueOnce({
      validate: vi.fn().mockResolvedValueOnce(validData),
    } as unknown as ReturnType<typeof schemaModule.createAdvancedFormSchema>);
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<UncontrolledFormAdvanced onSubmit={onSubmit} />);

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
    expect(payload.name).toBe('Alice');
    expect(payload.age).toBe(25);
    expect(payload.email).toBe('alice@example.com');
    expect(payload.image).toBe(mockBase64);
  });
});
