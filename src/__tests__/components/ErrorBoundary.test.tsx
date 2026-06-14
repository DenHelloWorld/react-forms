import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary.tsx';

const throwState = { current: true };

const FlakyComponent = () => {
  if (throwState.current) throw new Error('Test error message');
  return <div>Recovered</div>;
};

const StableComponent = () => <div>Normal content</div>;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render children normally when no error occurs', () => {
    render(
      <ErrorBoundary>
        <StableComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('should render error UI when a child throws', () => {
    throwState.current = true;
    render(
      <ErrorBoundary>
        <FlakyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should recover and render children after Try again is clicked', async () => {
    throwState.current = true;
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <FlakyComponent />
      </ErrorBoundary>
    );
    throwState.current = false;

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(screen.getByText('Recovered')).toBeInTheDocument();
  });
});
