import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from './useModal.ts';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const { mountNode, backdropRef, backdropProps } = useModal({
    isOpen,
    onClose,
  });

  const mainProps = useClickableBlock({
    stopPropagation: true,
  });

  if (!isOpen) return null;

  if (!mountNode) {
    console.warn(
      'PortalContext not found! Wrap the application in ModalPortalProvider.'
    );
    return null;
  }

  return createPortal(
    <div
      ref={backdropRef}
      {...backdropProps}
      role="dialog"
      aria-modal="true"
      className="modal__backdrop"
    >
      <div className="modal__container">
        <header className="modal__header">
          <button
            aria-label="Close"
            onClick={onClose}
            className="modal__close-btn"
          >
            <svg
              className="modal__close-icon"
              role="presentation"
              aria-hidden="true"
            >
              <use href="/icons.svg#close" />
            </svg>
          </button>
        </header>
        <main {...mainProps}>{children}</main>
      </div>
    </div>,
    mountNode
  );
};

export default Modal;
