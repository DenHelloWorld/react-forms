import { passwordStrengthRules } from '../../forms/password-strength-schema.ts';

export interface PasswordRuleResult {
  key: string;
  label: string;
  met: boolean;
}

export const usePasswordStrength = (password: string): PasswordRuleResult[] =>
  passwordStrengthRules.map((rule) => ({
    key: rule.key,
    label: rule.label,
    met: password ? rule.schema.isValidSync(password) : false,
  }));
