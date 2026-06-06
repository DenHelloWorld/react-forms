import {
  type RefObject,
  useContext,
  useEffect,
  useRef,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';
import { KEYBOARD_KEYS } from '../../consts/keyboard-keys.const.ts';
import { PortalContext } from '../../contexts/PortalContext/PortalContext.tsx';

export const useModal = ({
  isOpen,
  onClose,
  closeButtonRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLElement | null>;
}): {
  mountNode: HTMLElement | null;
  backdropRef: RefObject<HTMLDivElement | null>;
  backdropProps: {
    role: 'button';
    tabIndex: number;
    onMouseDown: (e: MouseEvent<HTMLElement>) => void;
    onClick: (e: MouseEvent<HTMLElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  };
} => {
  const mountNode = useContext(PortalContext);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const mouseDownInsideRef = useRef(false);

  const { onClick, onKeyDown } = useClickableBlock({
    onClick: onClose,
    allowedKeys: [KEYBOARD_KEYS.ESCAPE, KEYBOARD_KEYS.ESC],
  });

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      closeButtonRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen, closeButtonRef]);

  return {
    mountNode,
    backdropRef,
    backdropProps: {
      role: 'button',
      tabIndex: -1,
      onMouseDown: (e: MouseEvent<HTMLElement>) => {
        mouseDownInsideRef.current = e.target !== e.currentTarget;
      },
      onClick: (e: MouseEvent<HTMLElement>) => {
        if (mouseDownInsideRef.current) {
          mouseDownInsideRef.current = false;
          return;
        }
        onClick(e);
      },
      onKeyDown,
    },
  };
};
