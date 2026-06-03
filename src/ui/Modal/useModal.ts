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
}: {
  isOpen: boolean;
  onClose: () => void;
}): {
  mountNode: HTMLElement | null;
  backdropRef: RefObject<HTMLDivElement | null>;
  backdropProps: {
    role: 'button';
    tabIndex: number;
    onClick: (e: MouseEvent<HTMLElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  };
} => {
  const mountNode = useContext(PortalContext);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const mouse = useClickableBlock({ onClick: onClose });
  const keyboard = useClickableBlock({
    onClick: onClose,
    allowedKeys: [KEYBOARD_KEYS.ESC, KEYBOARD_KEYS.ESCAPE],
  });

  useEffect(() => {
    if (isOpen && backdropRef.current) {
      backdropRef.current.focus();
    }
  }, [isOpen]);

  return {
    mountNode,
    backdropRef,
    backdropProps: {
      role: mouse.role,
      tabIndex: mouse.tabIndex,
      onClick: mouse.onClick,
      onKeyDown: keyboard.onKeyDown,
    },
  };
};
