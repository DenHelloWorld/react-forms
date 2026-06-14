import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { MouseEvent, KeyboardEvent } from 'react';
import {
  useClickableBlock,
  type KeyboardKey,
} from '../../hooks/useClickableBlock/useClickableBlock.ts';

afterEach(() => {
  vi.restoreAllMocks();
});

const TestBlock = ({
  onClick,
  allowedKeys,
  stopPropagation,
}: {
  onClick?: (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  allowedKeys?: KeyboardKey[];
  stopPropagation?: boolean;
}) => {
  const props = useClickableBlock({ onClick, allowedKeys, stopPropagation });
  return (
    <div data-testid="block" {...props}>
      <span data-testid="child">child</span>
    </div>
  );
};

describe('useClickableBlock', () => {
  it('should call onClick when the block itself is left-clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<TestBlock onClick={onClick} />);

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should not call onClick when a child element is clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<TestBlock onClick={onClick} />);

    await user.click(screen.getByTestId('child'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when a non-left mouse button is used', () => {
    const onClick = vi.fn();
    render(<TestBlock onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'), { button: 2 });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should call stopPropagation when configured', () => {
    const onClick = vi.fn();
    const stopPropagationSpy = vi.spyOn(Event.prototype, 'stopPropagation');
    render(<TestBlock onClick={onClick} stopPropagation={true} />);

    fireEvent.click(screen.getByRole('button'), { bubbles: true });

    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('should not call onClick when no onClick handler is provided', async () => {
    const user = userEvent.setup();
    render(<TestBlock />);

    await user.click(screen.getByTestId('block'));

    expect(screen.getByTestId('block')).toBeInTheDocument();
  });

  it('should call onClick when an allowed key is pressed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<TestBlock onClick={onClick} allowedKeys={['Enter']} />);
    screen.getByRole('button').focus();

    await user.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should not call onClick when a non-allowed key is pressed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<TestBlock onClick={onClick} allowedKeys={['Enter']} />);
    screen.getByRole('button').focus();

    await user.keyboard('{Space}');

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not add role or tabIndex when no onClick is provided', () => {
    render(<TestBlock />);

    expect(screen.getByTestId('block')).not.toHaveAttribute('role');
    expect(screen.getByTestId('block')).not.toHaveAttribute('tabindex');
  });

  it('should add role="button" and tabIndex when onClick is provided', () => {
    render(<TestBlock onClick={vi.fn()} />);

    expect(screen.getByRole('button')).toHaveAttribute('role', 'button');
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
  });
});
