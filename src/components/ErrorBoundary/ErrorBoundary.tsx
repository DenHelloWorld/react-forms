import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  private readonly handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__card">
            <svg
              className="error-boundary__icon"
              role="presentation"
              aria-hidden="true"
            >
              <use href="/icons.svg#search-off" />
            </svg>
            <h1 className="error-boundary__title">Something went wrong</h1>
            <p className="error-boundary__message">
              An unexpected error occurred. Please try again.
            </p>
            {this.state.error && (
              <pre className="error-boundary__details">
                {this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              onClick={this.handleReset}
              className="error-boundary__btn"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
