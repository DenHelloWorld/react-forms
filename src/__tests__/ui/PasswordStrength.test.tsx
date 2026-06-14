import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PasswordStrength from '../../ui/PasswordStrength/PasswordStrength.tsx';
import type { PasswordRuleResult } from '../../hooks/usePasswordStrength/usePasswordStrength.ts';

const makeRules = (met: boolean): PasswordRuleResult[] => [
  { key: 'hasCount', label: 'At least 8 characters', met },
  { key: 'hasUpper', label: 'One uppercase letter', met },
  { key: 'hasLower', label: 'One lowercase letter', met },
  { key: 'hasNumber', label: 'One number', met },
  { key: 'hasSpecial', label: 'One special character', met },
];

const ALL_LABELS = [
  'At least 8 characters',
  'One uppercase letter',
  'One lowercase letter',
  'One number',
  'One special character',
];

describe('PasswordStrength', () => {
  it('should render all rule labels', () => {
    render(<PasswordStrength rules={makeRules(false)} />);

    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('One uppercase letter')).toBeInTheDocument();
    expect(screen.getByText('One lowercase letter')).toBeInTheDocument();
    expect(screen.getByText('One number')).toBeInTheDocument();
    expect(screen.getByText('One special character')).toBeInTheDocument();
  });

  it('should render met modifier class when a rule is satisfied', () => {
    render(<PasswordStrength rules={makeRules(true)} />);

    ALL_LABELS.forEach((label) => {
      expect(screen.getByText(label)).toHaveClass(
        'password-strength__label--met'
      );
    });
  });

  it('should render no met modifier class when no rules are satisfied', () => {
    render(<PasswordStrength rules={makeRules(false)} />);

    ALL_LABELS.forEach((label) => {
      expect(screen.getByText(label)).not.toHaveClass(
        'password-strength__label--met'
      );
    });
  });
});
