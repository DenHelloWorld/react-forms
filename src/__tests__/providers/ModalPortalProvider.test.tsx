import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ModalPortalProvider from '../../providers/ModalPortalProvider/ModalPortalProvider.tsx';

describe('ModalPortalProvider', () => {
  it('should render its children', () => {
    render(
      <ModalPortalProvider>
        <div>content</div>
      </ModalPortalProvider>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('should mount a portal root div in the DOM', () => {
    render(
      <ModalPortalProvider>
        <span />
      </ModalPortalProvider>
    );

    expect(document.getElementById('modal-root')).toBeInTheDocument();
  });
});
