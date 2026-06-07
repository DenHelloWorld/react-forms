import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import type * as ReactDomModule from 'react-dom';
import { PortalContext } from '../../contexts/PortalContext/PortalContext.tsx';
import Modal from '../../ui/Modal/Modal.tsx';

vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof ReactDomModule>();
  return { ...actual, createPortal: (children: ReactNode) => children };
});

const renderModal = (props: {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
}) => {
  const onClose = props.onClose ?? vi.fn();
  return render(
    <PortalContext.Provider value={document.body}>
      <Modal isOpen={props.isOpen} onClose={onClose} title={props.title}>
        <p>Modal content</p>
      </Modal>
    </PortalContext.Provider>
  );
};

describe('Modal', () => {
  it('should render nothing when isOpen is false', () => {
    renderModal({ isOpen: false });

    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('should render children inside a dialog when open', () => {
    renderModal({ isOpen: true });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should have aria-modal="true"', () => {
    renderModal({ isOpen: true });

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('should display the title when provided', () => {
    renderModal({ isOpen: true, title: 'Test Title' });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderModal({ isOpen: true, onClose });

    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should call onClose when ESC key is pressed on the backdrop', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderModal({ isOpen: true, onClose });

    screen.getByRole('dialog').focus();
    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should focus the close button on open', () => {
    renderModal({ isOpen: true });

    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();
  });

  it('should render nothing and warn when no PortalContext is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>Content</p>
      </Modal>
    );

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('PortalContext')
    );

    warnSpy.mockRestore();
  });
});
