import type { KEYBOARD_KEYS } from '../../consts/keyboard-keys.const.ts';
import { type KeyboardEvent, type MouseEvent, useCallback } from 'react';

type KeyboardKey = (typeof KEYBOARD_KEYS)[keyof typeof KEYBOARD_KEYS];

interface ClickableReturnProps {
  role: 'button';
  tabIndex: number;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
}

interface ClickableConfig {
  onClick?: (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  allowedKeys?: KeyboardKey[];
  stopPropagation?: boolean;
}

export const useClickableBlock = ({
  onClick,
  allowedKeys = [],
  stopPropagation = false,
}: ClickableConfig): ClickableReturnProps => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (e.target !== e.currentTarget) return;

      if (stopPropagation) {
        e.stopPropagation();
      }

      if (!onClick) return;

      if (e.button === 0) {
        onClick(e);
      }

      e.stopPropagation();
    },
    [onClick, stopPropagation]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (
        allowedKeys.length > 0 &&
        allowedKeys.includes(e.key as KeyboardKey) &&
        onClick
      ) {
        onClick(e);
        return;
      }
    },
    [onClick, allowedKeys]
  );

  return {
    role: 'button',
    tabIndex: 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
};
