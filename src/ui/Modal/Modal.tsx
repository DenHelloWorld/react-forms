import { type ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from './useModal.ts';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const { mountNode, backdropRef, backdropProps } = useModal({
    isOpen,
    onClose,
    closeButtonRef,
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

  const focusCloseButton = () => closeButtonRef.current?.focus();

  return createPortal(
    <div
      ref={backdropRef}
      {...backdropProps}
      role="dialog"
      aria-modal="true"
      className="modal__backdrop"
    >
      <button
        type="button"
        tabIndex={0}
        onFocus={focusCloseButton}
        className="modal__sentinel"
        aria-hidden="true"
      />
      <div className="modal__container">
        <header className="modal__header">
          {title && <h2 className="modal__title">{title}</h2>}
          <button
            ref={closeButtonRef}
            aria-label="Close"
            onClick={onClose}
            className="modal__close-btn"
          >
            <svg
              className="modal__close-icon"
              fill="currentColor"
              role="presentation"
              aria-hidden="true"
            >
              <use href="/icons.svg#close" />
            </svg>
          </button>
        </header>
        <main className="modal__body" {...mainProps}>
          {children}
        </main>
      </div>
      <button
        type="button"
        tabIndex={0}
        onFocus={focusCloseButton}
        className="modal__sentinel"
        aria-hidden="true"
      />
    </div>,
    mountNode
  );
};

export default Modal;
