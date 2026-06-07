import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import UncontrolledFormAdvancedModal from '../../forms/UncontrolledFormAdvanced/UncontrolledFormAdvancedModal.tsx';
import {
  type FormSubmissionPayload,
  useFormStore,
} from '../../store/useFormStore.ts';

vi.mock('../../ui/Modal/Modal.tsx', () => ({
  default: ({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
  }) =>
    isOpen ? (
      <div>
        <span>{title}</span>
        {children}
        <button onClick={onClose}>Close modal</button>
      </div>
    ) : null,
}));

vi.mock(
  '../../forms/UncontrolledFormAdvanced/UncontrolledFormAdvanced.tsx',
  () => ({
    default: ({
      onSubmit,
    }: {
      onSubmit: (data: FormSubmissionPayload) => void;
    }) => (
      <button
        onClick={() => {
          onSubmit({
            name: 'Test',
            age: 20,
            email: 'test@test.com',
            gender: 'female',
            country: 'Canada',
            image: 'data:img',
          });
        }}
      >
        Submit form
      </button>
    ),
  })
);

describe('UncontrolledFormAdvancedModal', () => {
  it('should render nothing when isOpen is false', () => {
    render(<UncontrolledFormAdvancedModal isOpen={false} onClose={vi.fn()} />);

    expect(screen.queryByText(/uncontrolled form/i)).not.toBeInTheDocument();
  });

  it('should render the modal title when isOpen is true', () => {
    render(<UncontrolledFormAdvancedModal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText(/uncontrolled form/i)).toBeInTheDocument();
  });

  it('should call onClose when the modal close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<UncontrolledFormAdvancedModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: /close modal/i }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should add submission to store and call onClose on form submit', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<UncontrolledFormAdvancedModal isOpen={true} onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: /submit form/i }));

    expect(useFormStore.getState().successfulSubmissions).toHaveLength(1);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
