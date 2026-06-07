import { describe, it, expect } from 'vitest';
import { usePasswordStrength } from '../../hooks/usePasswordStrength/usePasswordStrength.ts';

describe('usePasswordStrength', () => {
  it('should return all rules as unmet for an empty string', () => {
    const rules = usePasswordStrength('');

    expect(rules.every((r) => !r.met)).toBe(true);
  });

  it('should mark hasCount met when password is ≥8 chars', () => {
    const rules = usePasswordStrength('abcdefgh');

    expect(rules.find((r) => r.key === 'hasCount')?.met).toBe(true);
  });

  it('should mark hasUpper met for an uppercase letter', () => {
    const rules = usePasswordStrength('A');

    expect(rules.find((r) => r.key === 'hasUpper')?.met).toBe(true);
  });

  it('should mark hasLower met for a lowercase letter', () => {
    const rules = usePasswordStrength('a');

    expect(rules.find((r) => r.key === 'hasLower')?.met).toBe(true);
  });

  it('should mark hasNumber met for a digit', () => {
    const rules = usePasswordStrength('1');

    expect(rules.find((r) => r.key === 'hasNumber')?.met).toBe(true);
  });

  it('should mark hasSpecial met for a special character', () => {
    const rules = usePasswordStrength('!');

    expect(rules.find((r) => r.key === 'hasSpecial')?.met).toBe(true);
  });

  it('should mark all rules met for a strong password', () => {
    const rules = usePasswordStrength('Abcdefg1!');

    expect(rules.every((r) => r.met)).toBe(true);
  });

  it('should return a label for each rule', () => {
    const rules = usePasswordStrength('x');

    expect(
      rules.every((r) => typeof r.label === 'string' && r.label.length > 0)
    ).toBe(true);
  });
});
