import type { KEYBOARD_KEYS } from '../../consts/keyboard-keys.ts';
import { type KeyboardEvent, type MouseEvent, useCallback } from 'react';

export type KeyboardKey = (typeof KEYBOARD_KEYS)[keyof typeof KEYBOARD_KEYS];

type ClickableReturnProps = {
  role?: 'button';
  tabIndex?: number;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
};

type ClickableConfig = {
  onClick?: (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  allowedKeys?: KeyboardKey[];
  stopPropagation?: boolean;
};

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
        e.stopPropagation();
        onClick(e);
        return;
      }
    },
    [onClick, allowedKeys]
  );

  return {
    ...(onClick ? { role: 'button', tabIndex: 0 } : {}),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
};
